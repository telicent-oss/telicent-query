import React from 'react';
import { render } from '@testing-library/react';
import { UIThemeProvider } from '@telicent-oss/ds';
import UserProfile from './UserProfile';

jest.mock('@telicent-oss/ds', () => {
  const actual = jest.requireActual('@telicent-oss/ds');
  return {
    ...actual,
    useAuth: () => ({
      user: { preferred_name: 'Vanessa', email: 'vanessa@example.com' },
      error: null,
      logout: jest.fn(),
      loading: false,
    }),
  };
});

const renderWithTheme = (ui) =>
  render(
    <UIThemeProvider dark theme="GraphOrange">
      {ui}
    </UIThemeProvider>,
  );

describe('UserProfile snapshot', () => {
  it('matches snapshot when user is present', () => {
    const { container } = renderWithTheme(<UserProfile />);
    expect(container).toMatchSnapshot();
  });
});
