import React from 'react';
import { screen } from '@testing-library/react';
import SparqlTable from './SparqlTable';
import { render } from '@testing-library/react';

const bindings = [
  {
    y: {
      type: 'uri',
      value: 'https://starwars.com#6d23cb05-b834-43bb-96bb-21da81ad137f',
    },
    pred: {
      type: 'uri',
      value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
    },
    name: {
      type: 'uri',
      value: 'http://ies.data.gov.uk/ontology/ies4#PlaceName',
    },
  },
  {
    y: {
      type: 'uri',
      value: 'https://starwars.com#6d23cb05-b834-43bb-96bb-21da81ad137f',
    },
    pred: {
      type: 'uri',
      value: 'http://ies.data.gov.uk/ontology/ies4#representationValue',
    },
    name: { type: 'literal', value: 'Ut' },
  },
  {
    y: { type: 'uri', value: 'https://starwars.com#planet_Vandelhelm' },
    pred: { type: 'uri', value: 'http://telicent.io/ontology/primaryName' },
    name: { type: 'literal', value: 'Vandelhelm' },
  },
  {
    y: { type: 'uri', value: 'https://starwars.com#planet_Vandelhelm' },
    pred: {
      type: 'uri',
      value: 'http://www.w3.org/2000/01/rdf-schema#comment',
    },
    name: {
      type: 'literal',
      value:
        "Vandelhelm was an astronomical object located in the galaxy's Expansion Region, along the Rimma Trade Route. ",
    },
  },
];

describe('Sparql table component', () => {
  test('displays query results in the table', () => {
    render(<SparqlTable bindings={bindings} />);

    expect(screen.getAllByText('pred').length).toBeGreaterThan(0);
    expect(screen.getByText('http://www.w3.org/2000/01/rdf-schema#comment')).toBeInTheDocument();
    expect(
      screen.getByText('http://ies.data.gov.uk/ontology/ies4#representationValue'),
    ).toBeInTheDocument();
    expect(screen.getAllByText('https://starwars.com#planet_Vandelhelm').length).toBeGreaterThan(1);
  });

  test('displays an error message when no results are passed in', () => {
    render(<SparqlTable bindings={[]} />);

    expect(screen.getByText('No results were returned from your query.')).toBeInTheDocument();
  });
});
