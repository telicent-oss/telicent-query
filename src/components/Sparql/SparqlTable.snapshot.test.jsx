import React from 'react';
import { render } from '@testing-library/react';
import { UIThemeProvider } from '@telicent-oss/ds';
import SparqlTable from './SparqlTable';

const bindings = [
  {
    subject: { type: 'uri', value: 'https://example.com#alice' },
    predicate: { type: 'uri', value: 'http://xmlns.com/foaf/0.1/name' },
    object: { type: 'literal', value: 'Alice' },
  },
  {
    subject: { type: 'uri', value: 'https://example.com#bob' },
    predicate: { type: 'uri', value: 'http://xmlns.com/foaf/0.1/name' },
    object: { type: 'literal', value: 'Bob' },
  },
];

const renderWithTheme = (ui) =>
  render(
    <UIThemeProvider dark theme="GraphOrange">
      {ui}
    </UIThemeProvider>,
  );

describe('SparqlTable snapshot', () => {
  it('matches snapshot with results', () => {
    const { container } = renderWithTheme(<SparqlTable bindings={bindings} />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with empty results', () => {
    const { container } = renderWithTheme(<SparqlTable bindings={[]} />);
    expect(container).toMatchSnapshot();
  });
});
