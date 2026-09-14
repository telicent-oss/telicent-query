// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { configure } from '@testing-library/react';

configure({ testIdAttribute: 'id' });

beforeEach(() => {
  jest.restoreAllMocks();
  window.localStorage.clear();
});

process.env = {
  ...process.env,
  GRAPHQL_URL: 'http://localhost:4000',
  FF_CYTOSCAPE: true,
};
