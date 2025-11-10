import React from 'react';
import config from '../../config/app-config';
import UserFetchNew from './UserFetchNew';
import UserFetchLegacy from './UserFetchLegacy';

const UserFetch = config.featureFlags?.FF_AUTH_V2 ? UserFetchNew : UserFetchLegacy;

export default UserFetch;
