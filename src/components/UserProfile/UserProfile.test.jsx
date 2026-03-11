import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserProfile from './UserProfile';

const mockLogout = jest.fn();
const mockUseAuth = jest.fn();

jest.mock('@telicent-oss/ds', () => {
  const React = require('react');

  return {
    UserProfile: ({ fullName, children }) => (
      <div id="user-profile-wrapper" data-fullname={fullName}>
        {children}
      </div>
    ),
    UserProfileContent: ({ children }) => <div id="user-profile-content">{children}</div>,
    TitleAndContent: ({ title, content }) => (
      <div id="title-and-content">
        <span>{title}</span>
        <span>{content}</span>
      </div>
    ),
    Button: ({ children, onClick }) => (
      <button id="sign-out-button" onClick={onClick}>
        {children}
      </button>
    ),
    Divider: () => <hr id="divider" />,
    useAuth: () => mockUseAuth(),
  };
});

jest.mock('@mui/material/Box', () => ({ children }) => <div id="box">{children}</div>);

jest.mock('../../../package.json', () => ({
  version: '1.2.3',
}));

describe('UserProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders base version number and sign out button', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      error: null,
      logout: mockLogout,
      loading: false,
    });

    render(<UserProfile />);

    expect(screen.getByTestId('user-profile-wrapper')).toBeInTheDocument();
    expect(screen.getByText('Version number')).toBeInTheDocument();
    expect(screen.getByText('1.2.3')).toBeInTheDocument();
    expect(screen.getByTestId('sign-out-button')).toHaveTextContent('Sign Out');
  });

  it('renders loading state', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      error: null,
      logout: mockLogout,
      loading: true,
    });

    render(<UserProfile />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      error: { message: 'Something went wrong' },
      logout: mockLogout,
      loading: false,
    });

    render(<UserProfile />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders user information when user exists', () => {
    mockUseAuth.mockReturnValue({
      user: {
        preferred_name: 'Vanessa',
        email: 'vanessa@example.com',
      },
      error: null,
      logout: mockLogout,
      loading: false,
    });

    render(<UserProfile />);

    expect(screen.getByTestId('user-profile-wrapper')).toHaveAttribute('data-fullname', 'Vanessa');

    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Vanessa')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('vanessa@example.com')).toBeInTheDocument();
  });

  it('calls logout when sign out is clicked', () => {
    mockUseAuth.mockReturnValue({
      user: {
        preferred_name: 'Vanessa',
        email: 'vanessa@example.com',
      },
      error: null,
      logout: mockLogout,
      loading: false,
    });

    render(<UserProfile />);

    fireEvent.click(screen.getByTestId('sign-out-button'));

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
