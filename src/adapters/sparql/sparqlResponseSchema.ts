import { z } from 'zod';

// Success: SPARQL JSON results (SELECT). Yasqe passes the superagent response.
export const SPARQL_SELECT_RESPONSE_SCHEMA = z.object({
  body: z.object({ results: z.object({ bindings: z.array(z.unknown()) }) }),
});

// Failure: superagent error. `status` is missing for network/CORS failures.
export const SPARQL_ERROR_RESPONSE_SCHEMA = z.object({
  status: z.number().optional(),
  response: z.object({ statusText: z.string().optional(), text: z.string().optional() }).optional(),
});
