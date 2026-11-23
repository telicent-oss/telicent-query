import { buildEndpoint, hasDatasetPlaceholder } from '../buildEndpoint';

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

describe('hasDatasetPlaceholder', () => {
  it('is true when the URL has a {dataset} placeholder', () => {
    expect(hasDatasetPlaceholder('https://api.test/sparql/{dataset}/sparql')).toBe(true);
  });

  it('is false for a fixed URL', () => {
    expect(hasDatasetPlaceholder('https://api.test/sparql/knowledge/sparql')).toBe(false);
  });
});
