import config from 'config/app-config';
import InactiveProfileNew from './InactiveProfileNew';
import InactiveProfileLegacy from './InactiveProfileLegacy';

const UserInfo = config.featureFlags.FF_AUTH_V2 ? InactiveProfileNew : InactiveProfileLegacy;

export default UserInfo;
