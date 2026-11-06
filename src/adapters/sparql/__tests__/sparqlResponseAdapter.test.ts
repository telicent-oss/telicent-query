import { toQueryOutcome } from '../sparqlResponseAdapter';

describe('toQueryOutcome', () => {
  it('returns bindings for a SELECT response', () => {
    const bindings = [{ s: { type: 'uri', value: 'urn:a' } }];
    expect(toQueryOutcome({ status: 200, body: { results: { bindings } } })).toEqual({
      kind: 'results',
      bindings,
    });
  });

  it('flags 401 as unauthorized', () => {
    expect(toQueryOutcome({ status: 401, response: { text: '' } })).toEqual({
      kind: 'unauthorized',
    });
  });

  it('surfaces the status and body of a 503', () => {
    const error = Object.assign(new Error('cannot POST /sparql (503)'), {
      status: 503,
      response: { statusText: '', text: 'Dataset is compacting. Try again later.' },
    });
    expect(toQueryOutcome(error)).toEqual({
      kind: 'error',
      error: {
        title: '503 Service Unavailable',
        detail: 'Dataset is compacting. Try again later.',
      },
    });
  });

  it('surfaces a Fuseki parse error', () => {
    const outcome = toQueryOutcome({
      status: 400,
      response: { statusText: 'Bad Request', text: 'Parse error: line 3, column 7' },
    });
    expect(outcome).toEqual({
      kind: 'error',
      error: { title: '400 Bad Request', detail: 'Parse error: line 3, column 7' },
    });
  });

  it('reports network or CORS failures as unreachable', () => {
    const outcome = toQueryOutcome(new Error('Request has been terminated'));
    expect(outcome.kind === 'error' && outcome.error.title).toBe(
      'Could not reach the SPARQL endpoint',
    );
  });

  it('reports a 200 without SELECT bindings as unsupported', () => {
    const outcome = toQueryOutcome({ status: 200, body: { boolean: true } });
    expect(outcome.kind === 'error' && outcome.error.title).toBe('Unsupported response');
  });
});
