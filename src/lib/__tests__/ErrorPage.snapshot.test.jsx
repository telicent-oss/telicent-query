import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UIThemeProvider } from '@telicent-oss/ds';
import ErrorPage from 'lib/ErrorPage';

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({ state: { err: { message: 'Something went wrong', code: '500' } } }),
  };
});

jest.mock('../../config/app-config', () => ({
  __esModule: true,
  default: { apps: [] },
}));

describe('ErrorPage snapshot', () => {
  it('matches snapshot with error state', () => {
    const { container } = render(
      <UIThemeProvider dark theme="GraphOrange">
        <MemoryRouter>
          <ErrorPage />
        </MemoryRouter>
      </UIThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
