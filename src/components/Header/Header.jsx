import React from 'react';
import { AppSwitch, AppBar, FlexBox, Button, ThemeSwitch } from '@telicent-oss/ds';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../UserProfile/UserProfile';
import AppInfoPopover from './AppInfoPopover';
import config from '../../config/app-config';
import { useThemeMode } from '../../hooks/useThemeMode';

const Header = ({ children }) => {
  const navigate = useNavigate();
  const { dark, setDark } = useThemeMode();
  const apps = config.APP_SWITCH_LIBRARY.map(({ iconDark, iconLight, ...rest }) => ({
    ...rest,
    icon: dark ? iconDark : iconLight,
  }));
  const goToGraphiql = (e) => {
    e.stopPropagation();
    navigate('/graphiql');
  };
  return (
    <AppBar
      onClick={() => navigate('/')}
      appName={config.APP_CONFIG_JSON.app_name}
      startChild={
        <FlexBox direction="row" alignItems="center" gap={1}>
          <AppSwitch apps={apps} />
          {/* Match the height of the small DS Autocomplete beside it. */}
          <Button variant="secondary" size="small" sx={{ height: 40 }} onClick={goToGraphiql}>
            GraphiQL
          </Button>
          {children && (
            // Stop clicks (including from the portalled listbox) reaching the AppBar's navigate.
            <FlexBox direction="row" alignItems="center" onClick={(e) => e.stopPropagation()}>
              {children}
            </FlexBox>
          )}
        </FlexBox>
      }
      endChild={
        <FlexBox direction="row" alignItems="center" gap={1}>
          <ThemeSwitch checked={dark} onChange={setDark} />
          <AppInfoPopover />
          <UserProfile />
        </FlexBox>
      }
      isElevated
    />
  );
};

export default Header;
