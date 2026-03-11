import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('../../config/app-config', () => ({
  __esModule: true,
  default: {
    APP_CONFIG_JSON: {
      app_name: 'Test App',
    },
    APP_SWITCH_LIBRARY: [
      { id: '1', name: 'App One', url: '/app-one', icon: 'icon-1' },
      { id: '2', name: 'App Two', url: '/app-two', icon: 'icon-2' },
    ],
  },
}));

jest.mock('../UserProfile/UserProfile', () => () => <div id="user-profile">User Profile</div>);

jest.mock('@telicent-oss/ds', () => ({
  AppSwitch: ({ apps }) => <div id="app-switch">{apps.map((app) => app.name).join(', ')}</div>,
  AppBar: ({ onClick, appName, startChild, endChild, isElevated }) => (
    <div>
      <button id="app-bar" onClick={onClick}>
        {appName}
      </button>
      <div id="start-child">{startChild}</div>
      <div id="end-child">{endChild}</div>
      <div id="is-elevated">{String(isElevated)}</div>
    </div>
  ),
}));

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders AppBar with correct props and children', () => {
    render(<Header />);

    expect(screen.getByTestId('app-bar')).toHaveTextContent('Test App');
    expect(screen.getByTestId('app-switch')).toHaveTextContent('App One, App Two');
    expect(screen.getByTestId('user-profile')).toBeInTheDocument();
    expect(screen.getByTestId('is-elevated')).toHaveTextContent('true');
  });

  it('navigates to home when AppBar is clicked', () => {
    render(<Header />);

    fireEvent.click(screen.getByTestId('app-bar'));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
