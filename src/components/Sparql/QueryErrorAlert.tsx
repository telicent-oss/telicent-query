import { Alert, AlertTitle } from '@telicent-oss/ds';
import React from 'react';
import type { QueryError } from '../../adapters/http/httpError';

type QueryErrorAlertProps = { error: QueryError };

export const QueryErrorAlert = ({ error }: QueryErrorAlertProps) => (
  <Alert id="query-error" severity="error" sx={{ mx: 4, mb: 2 }}>
    <AlertTitle>{error.title}</AlertTitle>
    {/* Monospace + preserved whitespace keeps Fuseki's line/column markers aligned. */}
    {error.detail && <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{error.detail}</pre>}
  </Alert>
);
