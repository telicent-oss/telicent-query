import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorPage from 'lib/ErrorPage';

jest.mock('@telicent-oss/ds', () => {
  return {
    AppBar: () => <div>AppBar</div>,
    FlexBox: ({ children }) => <div>{children}</div>,
    Text: ({ children }) => <div>{children}</div>,
    Button: ({ children }) => <button>{children}</button>,
    Paper: ({ children }) => <div>{children}</div>,
    H5: ({ children }) => <h5>{children}</h5>,
    useExtendedTheme: () => ({
      palette: {
        primary: {
          main: '#FFFFFF',
        },
      },
    }),
  };
});

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <div id="error-icon">Icon</div>,
}));

jest.mock('../../config/app-config', () => ({
  _esModule: true,
  default: {
    apps: [],
  },
}));

jest.mock('react-router-dom', () => ({
  Link: ({ to, children }) => (
    <a id="retry-link" href={to}>
      {children}
    </a>
  ),
  useLocation: () => ({ state: { err: { message: 'test', code: '123' } } }),
}));

describe('ErrorPage', () => {
  it('renders error message and code', () => {
    render(<ErrorPage />);

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Error code: 123')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('renders retry button', () => {
    render(<ErrorPage />);

    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('renders the AppBar', () => {
    render(<ErrorPage />);

    expect(screen.getByText('AppBar')).toBeInTheDocument();
  });

  it('renders the error icon', () => {
    render(<ErrorPage />);

    expect(screen.getByTestId('error-icon')).toBeInTheDocument();
  });

  it('retry button links to home', () => {
    render(<ErrorPage />);

    const retryLink = screen.getByTestId('retry-link');

    expect(retryLink).toBeInTheDocument();
  });
});
