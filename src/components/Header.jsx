import React from 'react';
import { AppSwitch, AppBar } from '@telicent-oss/ds';
import { useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import config from '../config/app-config';

const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar
      onClick={() => navigate('/')}
      appName={config.APP_CONFIG_JSON.app_name}
      startChild={<AppSwitch apps={config.APP_SWITCH_LIBRARY} />}
      endChild={<UserProfile />}
      isElevated
    />
  );
};

export default Header;
