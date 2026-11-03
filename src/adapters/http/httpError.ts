export type QueryError = { title: string; detail?: string };

const MAX_DETAIL_LENGTH = 1000;

// HTTP/2 responses carry no reason phrase, so fall back to the common ones.
const STATUS_TEXT: Record<number, string> = {
  400: 'Bad Request',
  403: 'Forbidden',
  404: 'Not Found',
  408: 'Request Timeout',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
};

const toDetail = (text: string | undefined): string | undefined => {
  const trimmed = text?.trim();
  // Drop empty bodies and gateway HTML error pages.
  if (!trimmed || trimmed.startsWith('<')) return undefined;
  return trimmed.length > MAX_DETAIL_LENGTH ? `${trimmed.slice(0, MAX_DETAIL_LENGTH)}…` : trimmed;
};

export const unreachableError = (service: string): QueryError => ({
  title: `Could not reach the ${service} endpoint`,
  detail: 'Check your connection. The server may be down or refusing the request.',
});

export const httpStatusError = (
  status: number,
  statusText: string | undefined,
  body: string | undefined,
): QueryError => {
  const text = statusText || STATUS_TEXT[status];
  return {
    title: text ? `${status} ${text}` : `Request failed (${status})`,
    detail: toDetail(body),
  };
};
