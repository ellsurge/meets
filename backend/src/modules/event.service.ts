import { Event, Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";

export class EventService {
    static async getAll() {
        // Fetch all events from the database
        return await prisma.event.findMany();
    }

    static async create(data: Prisma.EventCreateInput): Promise<Event> {
        return await prisma.event.create({ data });
    }

    static async delete(id: string): Promise<Event> {
        // Delete an event by its ID
        return await prisma.event.delete({
            where: { id },
        });
    }
}