import { PrismaClient } from "@prisma/client";
import { initTRPC } from "@trpc/server";




export const prisma = new PrismaClient();
export const t = initTRPC.create();
export const publicProcedure = t.procedure;

