import fastify from "fastify";
import cors from "@fastify/cors";
import { fastifyTRPCPlugin, FastifyTRPCPluginOptions } from "@trpc/server/adapters/fastify";
import { type AppRouter, appRouter } from "./trpc";

import ws, { fastifyWebsocket } from "@fastify/websocket";

const environment = (process.env.NODE_ENV || 'development') as keyof typeof envToLogger;

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
}
const server = fastify({
    maxParamLength: 5000,
    logger:envToLogger[environment] ?? true
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
            server.log.error(`Error in ${path}: ${error}`);
        },
    } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
});

server.register(ws, {   
    options: { clientTracking: true },
});

(async () => {
    try {
        await server.listen({ port: 4000 });
        server.log.info(`🚀 Server running on http://localhost:4000"`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}
)();