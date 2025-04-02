
import { eventRouter } from "./event.router";
import { publicProcedure, t } from "../config/prisma";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { authRouter } from "./auth.router";

export const appRouter = t.router({
    greetings: publicProcedure.query(() => 'hello tRPC v10!'),
    event: eventRouter,
    auth: authRouter
});

export type AppRouter = typeof appRouter;
