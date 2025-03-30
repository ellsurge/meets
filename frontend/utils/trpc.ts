import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from '../../backend/src/trpc/index';

export const getBaseUrl = () => {



    // Default to localhost for development
    return 'http://localhost:4000'; // Replace with your machine's local IP address
};

export const trpc = createTRPCReact<AppRouter>();


