import { toGraphqlFailure } from '../graphqlResponseAdapter';

describe('toGraphqlFailure', () => {
  it('flags 401 as unauthorized', () => {
    expect(toGraphqlFailure({ response: { status: 401, data: '' } })).toEqual({
      kind: 'unauthorized',
    });
  });

  it('turns a plain-text 503 into a GraphQL error', () => {
    expect(
      toGraphqlFailure({
        message: 'Request failed with status code 503',
        response: { status: 503, statusText: '', data: 'Dataset is compacting.' },
      }),
    ).toEqual({
      kind: 'result',
      result: { errors: [{ message: '503 Service Unavailable: Dataset is compacting.' }] },
    });
  });

  it('passes through a GraphQL errors body sent with an error status', () => {
    const data = { errors: [{ message: 'Cannot query field "x"', locations: [] }] };
    expect(toGraphqlFailure({ response: { status: 400, data } })).toEqual({
      kind: 'result',
      result: data,
    });
  });

  it('ignores non-string, non-GraphQL bodies', () => {
    expect(toGraphqlFailure({ response: { status: 500, data: { oops: true } } })).toEqual({
      kind: 'result',
      result: { errors: [{ message: '500 Internal Server Error' }] },
    });
  });

  it('reports network or CORS failures as unreachable', () => {
    const failure = toGraphqlFailure(new Error('Network Error'));
    expect(failure.kind === 'result' && failure.result.errors[0].message).toMatch(
      /^Could not reach the GraphQL endpoint/,
    );
  });
});
