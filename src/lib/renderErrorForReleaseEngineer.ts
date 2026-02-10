import { ZodError } from 'zod';

export const renderErrorForReleaseEngineer = (error: unknown, context = '') => {
  if (
    document.body.innerHTML.includes('<h1>Configuration Error</h1>') ||
    document.body.innerHTML.includes('<h1>Unexpected Error')
  ) {
    return;
  }
  console.error(error);
  if (error instanceof ZodError) {
    const prettyPrint = error.issues.map(
      (issue) => `${issue.code}@[${issue.path.join('.')}] — ${issue.message}`,
    );
    document.body.innerHTML = `
      <h1>Configuration Error</h1>
      <p>An error occurred while parsing the configuration:</p>
      <pre>${prettyPrint.join('\n')}</pre>
    `;
  } else {
    document.body.innerHTML = `
      <h1>Unexpected Error${context ? `: ${context}` : ''}</h1>
      <pre>${error instanceof Error ? error.message : String(error)}</pre>
    `;
  }
  throw error;
};
