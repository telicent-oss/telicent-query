import React from 'react';
import { AppSettings, ThemeSwitchRow } from '@telicent-oss/ds';
import { useThemeMode } from '../../hooks/useThemeMode';

const AppSettingsPopover = () => {
  const { dark, setDark } = useThemeMode();
  return (
    <AppSettings>
      <ThemeSwitchRow checked={dark} onChange={setDark} label="Theme" />
    </AppSettings>
  );
};

export default AppSettingsPopover;
