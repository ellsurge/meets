
import { eventRouter } from "./event.router";
import { publicProcedure, t } from "../config/prisma";



export const appRouter = t.router({
    greetings: publicProcedure.query(() => 'hello tRPC v10!'),
    event: eventRouter
});

export type AppRouter = typeof appRouter;