import {
  UserProfile as UserProfileWrapper,
  UserProfileContent,
  TitleAndContent,
  Button,
  Divider,
  useAuth,
} from '@telicent-oss/ds';

import packgeJson from '../../package.json';
import Box from '@mui/material/Box';

const UserProfile = () => {
  const { user, error, logout, loading } = useAuth();

  const handleSignOut = () => {
    logout();
  };

  return (
    <UserProfileWrapper fullName={user?.preferred_name || ''}>
      <UserProfileContent>
        {loading && <section>Loading...</section>}
        {error && <section>{error.message}</section>}
        {user && (
          <>
            <TitleAndContent title={'Username'} content={user.preferred_name} />
            <TitleAndContent title={'Email'} content={user.email} />
            <TitleAndContent title={'Version number'} content={packgeJson.version} />
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
