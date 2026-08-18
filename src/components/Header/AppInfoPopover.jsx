import React from 'react';
import { AppInfo, AppInfoRow } from '@telicent-oss/ds';
import packageJson from '../../../package.json';

const AppInfoPopover = () => (
  <AppInfo id="app-info" ariaLabel="App information">
    <AppInfoRow id="app-info-version" label="Version" value={packageJson.version} />
  </AppInfo>
);

export default AppInfoPopover;
