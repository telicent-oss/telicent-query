import { httpStatusError, unreachableError } from '../http/httpError';
import type { QueryError } from '../http/httpError';
import { GRAPHQL_ERRORS_BODY_SCHEMA, GRAPHQL_ERROR_RESPONSE_SCHEMA } from './graphqlResponseSchema';

export type GraphqlErrorResult = { errors: { message: string }[] };

export type GraphqlFailure =
  | { kind: 'unauthorized' }
  | { kind: 'result'; result: GraphqlErrorResult };

const toResult = ({ title, detail }: QueryError): GraphqlErrorResult => ({
  errors: [{ message: detail ? `${title}: ${detail}` : title }],
});

// Turns a failed fetch into a GraphQL-shaped result so GraphiQL shows it in the response pane.
export const toGraphqlFailure = (error: unknown): GraphqlFailure => {
  const parsed = GRAPHQL_ERROR_RESPONSE_SCHEMA.safeParse(error);
  const response = parsed.success ? parsed.data.response : undefined;
  if (!response) return { kind: 'result', result: toResult(unreachableError('GraphQL')) };
  if (response.status === 401) return { kind: 'unauthorized' };

  const graphqlBody = GRAPHQL_ERRORS_BODY_SCHEMA.safeParse(response.data);
  if (graphqlBody.success) return { kind: 'result', result: graphqlBody.data };

  const body = typeof response.data === 'string' ? response.data : undefined;
  return {
    kind: 'result',
    result: toResult(httpStatusError(response.status, response.statusText, body)),
  };
};
