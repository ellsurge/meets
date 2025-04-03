import {
  createTRPCReact,
  type inferReactQueryProcedureOptions,
} from '@trpc/react-query';

import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '../../backend/src/trpc';
import { QueryClient } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useAuthStore } from '@/store/authStore';

export const getBaseUrl = () => {
  return 'http://localhost:4000'; // Replace with your machine's local IP if needed
};

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export const trpc = createTRPCReact<AppRouter>();

export const queryClient = new QueryClient();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/trpc`,
      async headers() {
        const token = useAuthStore.getState().user?.token;
        return token ? { Authorization: `Bearer ${token}` } : {};
      },
      async fetch(url, options) {
        const response = await fetch(url, options);

        if (response.status === 401) {
          await useAuthStore.getState().refreshToken();
          const newToken = useAuthStore.getState().user?.token;

          if (newToken) {
            return fetch(url, {
              ...options,
              headers: {
                ...options?.headers,
                Authorization: `Bearer ${newToken}`,
              },
            });
          }
        }
        return response;
      },
    }),
  ],
});
