import { httpStatusError, unreachableError } from '../httpError';

describe('httpStatusError', () => {
  it('uses the server status text when present', () => {
    expect(httpStatusError(503, 'Busy', 'compacting')).toEqual({
      title: '503 Busy',
      detail: 'compacting',
    });
  });

  it('falls back to a known reason phrase for HTTP/2 responses', () => {
    expect(httpStatusError(503, '', undefined)).toEqual({
      title: '503 Service Unavailable',
      detail: undefined,
    });
  });

  it('handles unknown statuses', () => {
    expect(httpStatusError(599, undefined, undefined).title).toBe('Request failed (599)');
  });

  it('drops HTML and blank bodies', () => {
    expect(httpStatusError(502, undefined, '<html><body>Bad</body></html>').detail).toBeUndefined();
    expect(httpStatusError(502, undefined, '   ').detail).toBeUndefined();
  });

  it('truncates long bodies', () => {
    const detail = httpStatusError(400, undefined, 'x'.repeat(1500)).detail ?? '';
    expect(detail).toHaveLength(1001);
    expect(detail.endsWith('…')).toBe(true);
  });
});

describe('unreachableError', () => {
  it('names the service', () => {
    expect(unreachableError('SPARQL').title).toBe('Could not reach the SPARQL endpoint');
  });
});
