import React from 'react';
import {
  UserProfile as UserProfileWrapper,
  UserProfileContent,
  TitleAndContent,
  Button,
  Divider,
  useAuth,
} from '@telicent-oss/ds';

import Box from '@mui/material/Box';

const UserProfile = () => {
  const { user, error, logout, loading } = useAuth();

  const handleSignOut = () => {
    logout();
  };

  return (
    // Icon-only trigger — username lives inside the dropdown, not beside the avatar.
    <UserProfileWrapper fullName="">
      <UserProfileContent>
        {loading && <section>Loading...</section>}
        {error && <section>{error.message}</section>}
        {user && (
          <>
            <TitleAndContent title={'Username'} content={user.preferred_name} />
            <TitleAndContent title={'Email'} content={user.email} />
          </>
        )}
      </UserProfileContent>
      <>
        <Divider />
        <Box sx={{ pt: 1 }}>
          <Button
            onClick={handleSignOut}
            color="primary"
            variant="contained"
            startIcon={<i className="fa-solid fa-arrow-right-from-bracket" />}
          >
            Sign Out
          </Button>
        </Box>
      </>
    </UserProfileWrapper>
  );
};

export default UserProfile;
