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
      {
        id: '1',
        name: 'App One',
        url: '/app-one',
        iconDark: 'icon-1-dark',
        iconLight: 'icon-1-light',
      },
      {
        id: '2',
        name: 'App Two',
        url: '/app-two',
        iconDark: 'icon-2-dark',
        iconLight: 'icon-2-light',
      },
    ],
  },
}));

jest.mock('../../hooks/useThemeMode', () => ({
  useThemeMode: () => ({ dark: true, setDark: () => {}, toggle: () => {} }),
}));

jest.mock('../UserProfile/UserProfile', () => () => <div id="user-profile">User Profile</div>);
jest.mock('./AppInfoPopover', () => () => <div id="app-info-popover">App Info</div>);
jest.mock('./AppSettingsPopover', () => () => <div id="app-settings-popover">App Settings</div>);

jest.mock('@telicent-oss/ds', () => ({
  AppSwitch: ({ apps }) => <div id="app-switch">{apps.map((app) => app.name).join(', ')}</div>,
  FlexBox: ({ children }) => <div id="flex-box">{children}</div>,
  Button: ({ children, onClick }) => (
    <button id="graphiql-nav-button" onClick={onClick}>
      {children}
    </button>
  ),
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
    expect(screen.getByTestId('app-info-popover')).toBeInTheDocument();
    expect(screen.getByTestId('user-profile')).toBeInTheDocument();
    expect(screen.getByTestId('is-elevated')).toHaveTextContent('true');
  });

  it('navigates to home when AppBar is clicked', () => {
    render(<Header />);

    fireEvent.click(screen.getByTestId('app-bar'));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
