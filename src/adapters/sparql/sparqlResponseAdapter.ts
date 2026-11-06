import { httpStatusError, unreachableError } from '../http/httpError';
import type { QueryError } from '../http/httpError';
import {
  SPARQL_ERROR_RESPONSE_SCHEMA,
  SPARQL_SELECT_RESPONSE_SCHEMA,
} from './sparqlResponseSchema';

export type QueryOutcome =
  | { kind: 'results'; bindings: unknown[] }
  | { kind: 'unauthorized' }
  | { kind: 'error'; error: QueryError };

export const toQueryOutcome = (response: unknown): QueryOutcome => {
  const success = SPARQL_SELECT_RESPONSE_SCHEMA.safeParse(response);
  if (success.success) return { kind: 'results', bindings: success.data.body.results.bindings };

  const failure = SPARQL_ERROR_RESPONSE_SCHEMA.safeParse(response);
  const data = failure.success ? failure.data : undefined;
  const status = data?.status;
  if (status === 401) return { kind: 'unauthorized' };
  if (status === undefined) return { kind: 'error', error: unreachableError('SPARQL') };
  if (status >= 200 && status < 300) {
    return {
      kind: 'error',
      error: {
        title: 'Unsupported response',
        detail: 'Only SELECT query results can be shown in the table.',
      },
    };
  }
  return {
    kind: 'error',
    error: httpStatusError(status, data?.response?.statusText, data?.response?.text),
  };
};
