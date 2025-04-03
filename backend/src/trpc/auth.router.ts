import { z } from "zod";
import { t } from "../config/prisma";
import { AuthService } from "../modules/auth.service";



export const auth_reg_schema = z.object({email: z.string().email(),password: z.string().min(6)})
export const auth_login_schema = z.object({ email: z.string().email(), password: z.string() });
export const auth_verify_schema = z.object({ email: z.string().email(), code: z.string() });
export const auth_refresh_token_schema = z.object({ refreshToken: z.string() });   
export const auth_native_schema = z.object({ provider:z.enum(['apple', 'google']), idToken: z.string() });

export const authRouter = t.router({
    register: t.procedure
        .input(auth_reg_schema)
        .mutation(async ({ input }) => {
            return await AuthService.register(input );         
        }),
    login: t.procedure.input(auth_login_schema)
        .mutation(async ({ input }) => {
            return await AuthService.login(input);
        }),
    verify: t.procedure.input(auth_verify_schema)
        .mutation(async ({ input }) => {
            return await AuthService.verifyEmail(input);
        }),
    refreshToken: t.procedure.input(auth_refresh_token_schema)
        .mutation(async ({ input }) => {
            return await AuthService.refreshToken(input);
        }),
    native: t.procedure
        .input(auth_native_schema)
        .mutation(async ({ input }) => {
            return await AuthService.native(input);
    })
    
})
    
export type AuthRegInput = z.infer<typeof auth_reg_schema>;
export type AuthLoginInput = z.infer<typeof auth_login_schema>;
export type AuthVerifyInput = z.infer<typeof auth_verify_schema>;
export type AuthRefreshTokenInput = z.infer<typeof auth_refresh_token_schema>;
export type AuthNativeInput = z.infer<typeof auth_native_schema>;
