import { date, z } from "zod";
import {  t } from "../config/prisma";
import { EventService } from "../modules/event.service";


const eventSchema = z.object({
    title: z.string(),
    date: z.string(),
    location: z.string(),
});

export const eventRouter = t.router({
    getAll: t.procedure.query( () => EventService.getAll() ),

    add: t.procedure.input(eventSchema).mutation(async ({ input }) => {
        return await EventService.create(input);
    }),
    delete: t.procedure.input(z.string()).mutation(async ({ input }) => {
        return await EventService.delete(input);
    }),
});