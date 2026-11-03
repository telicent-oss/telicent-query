import { buildEndpoint } from '../buildEndpoint';

describe('buildEndpoint', () => {
  it('substitutes the dataset placeholder', () => {
    expect(buildEndpoint('https://api.test/sparql/{dataset}/sparql', 'ontology')).toBe(
      'https://api.test/sparql/ontology/sparql',
    );
  });

  it('returns URLs without a placeholder unchanged', () => {
    expect(buildEndpoint('https://api.test/sparql/knowledge/sparql', 'ontology')).toBe(
      'https://api.test/sparql/knowledge/sparql',
    );
  });

  it('encodes the dataset name', () => {
    expect(buildEndpoint('https://api.test/{dataset}/q', 'a/b')).toBe('https://api.test/a%2Fb/q');
  });
});
