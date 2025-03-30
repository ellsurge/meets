
import {
  createTRPCReact,
  type inferReactQueryProcedureOptions,
} from '@trpc/react-query';

import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "../../backend/src/trpc";


export const getBaseUrl = () => {
    // Default to localhost for development
    return 'http://localhost:4000'; // Replace with your machine's local IP address
};

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export const trpc = createTRPCReact<AppRouter>();




