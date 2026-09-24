import React from 'react';
import { AppSwitch, AppBar, FlexBox, Button } from '@telicent-oss/ds';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../UserProfile/UserProfile';
import AppInfoPopover from './AppInfoPopover';
import AppSettingsPopover from './AppSettingsPopover';
import config from '../../config/app-config';
import { useThemeMode } from '../../hooks/useThemeMode';

const Header = () => {
  const navigate = useNavigate();
  const { dark } = useThemeMode();
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
          <Button variant="secondary" size="small" onClick={goToGraphiql}>
            GraphQL
          </Button>
        </FlexBox>
      }
      endChild={
        <FlexBox direction="row" alignItems="center" gap={1}>
          <AppInfoPopover />
          <AppSettingsPopover />
          <UserProfile />
        </FlexBox>
      }
      isElevated
    />
  );
};

export default Header;
