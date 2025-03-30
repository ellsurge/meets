import fastify from "fastify";
import cors from "@fastify/cors";
import { fastifyTRPCPlugin, FastifyTRPCPluginOptions } from "@trpc/server/adapters/fastify";
import { type AppRouter, appRouter } from "./trpc";

import ws, { fastifyWebsocket } from "@fastify/websocket";

const server = fastify({
    maxParamLength: 5000,
});
server.register(cors, {
    origin: "*"
});
server.register(fastifyTRPCPlugin, {
    useWSS: true,
    keepAlive: {
        enable: true,
        pingMs: 30000,
        pongMs: 5000,
        timeout: 5000,
        interval: 1000,

    },
    prefix: '/trpc',
    trpcOptions: {
        router: appRouter,
        // createContext,
        onError({
            path, error
        }) {
            console.error(`Error in ${path}: ${error}`);
        },
    } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
});



// server.register(fastifyCors, {
//     origin: (origin, cb) => {
//         if (origin) {
//             cb(null, true);
//         } else {
//             cb(new Error("Not allowed"), false);
//         }
//     }
// });

server.register(ws, {   
    options: { clientTracking: true },
});

(async () => {
    try {
        await server.listen({ port: 4000 });
        console.log(`🚀 Server running on http://localhost:4000"`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}
)();