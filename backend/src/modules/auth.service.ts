import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { prisma } from "../config/prisma";
import {
  AuthLoginInput,
  AuthNativeInput,
  AuthRefreshTokenInput,
  AuthRegInput,
  AuthVerifyInput,
} from "../trpc/auth.router";
import { User } from "@prisma/client";

export class AuthService {
  static async register(input: AuthRegInput) {
    const { email, password } = input;
    const hashedPassword = await this.hashPassword(password);
    const verificationCode = this.generateVerificationCode();

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, verificationCode },
    });

    // TODO: Implement email sending logic here

    return {
      success: true,
      message: `User registered successfully. Code: ${verificationCode}`,
    };
  }

  static async verifyEmail(input: AuthVerifyInput) {
    const user = await this.findUserByEmail(input.email);

    if (user.verificationCode !== input.code) {
      throw new Error("Invalid verification code");
    }

    await prisma.user.update({
      where: { email: input.email },
      data: { isVerified: true },
    });

    return { success: true, message: "Email verified successfully" };
  }

  static async refreshToken(input: AuthRefreshTokenInput) {
    try {
      const decoded = jwt.verify(input.refreshToken, process.env.REFRESH_SECRET!) as { userId: string };
      const { accessToken } = this.generateTokens(decoded.userId);
      return { accessToken };
    } catch {
      throw new Error("Invalid refresh token");
    }
  }

  static async login(input: AuthLoginInput) {
    const user = await this.findUserByEmail(input.email);

    if (!user.password) {
      throw new Error("User has not set a password");
    }

    const isValidPassword = await bcrypt.compare(input.password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    const { accessToken, refreshToken } = this.generateTokens(user.id);
    await prisma.user.update({
      where: { email: input.email },
      data: { refreshToken },
    });

    return {user,  token: { accessToken, refreshToken } };
  }

  static async native(input: AuthNativeInput) {
    let user: User | null = null;

    if (input.provider === "google") {
      const { data } = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${input.idToken}`);
      user = await this.findOrCreateUser("googleId", data.sub, { email: data.email, fullname: data.name });
    } else if (input.provider === "apple") {
      const decoded: any = jwtDecode(input.idToken);
      user = await this.findOrCreateUser("appleId", decoded.sub, { email: decoded.email });
    } else {
      throw new Error("Unsupported provider");
    }

    const { accessToken, refreshToken } = this.generateTokens(user.id);
    return {user,  token: { accessToken, refreshToken } };
  }

  private static async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  private static generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private static generateTokens(userId: string) {
    return {
      accessToken: jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "15m" }),
      refreshToken: jwt.sign({ userId }, process.env.REFRESH_SECRET!, { expiresIn: "7d" }),
    };
  }

  private static async findUserByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");
    return user;
  }

 private static async findOrCreateUser(
    providerKey: "googleId" | "appleId",
    providerId: string,
    data: Partial<User>
    ): Promise<User> {
    let user;

    // Find the user based on the provider's key
    if (providerKey === "googleId") {
        user = await prisma.user.findUnique({ where: { googleId: providerId } });
    } else if (providerKey === "appleId") {
        user = await prisma.user.findUnique({ where: { appleId: providerId } });
    }

    // If no user found, create one
    if (!user) {
        user = await prisma.user.create({
        data: { ...data, [providerKey]: providerId } as any, // Use type assertion here
        });
    }

  return user;
}

}
