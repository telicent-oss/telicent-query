import { z } from 'zod';

// A GraphQL error body, which some servers send with a 4xx/5xx status.
export const GRAPHQL_ERRORS_BODY_SCHEMA = z.object({
  errors: z.array(z.object({ message: z.string() }).loose()).min(1),
});

// Failure: axios error. `response` is missing for network/CORS failures.
export const GRAPHQL_ERROR_RESPONSE_SCHEMA = z.object({
  response: z
    .object({ status: z.number(), statusText: z.string().optional(), data: z.unknown() })
    .optional(),
});
