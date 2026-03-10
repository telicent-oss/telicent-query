import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TeliButton, TeliStandardLayout, AppBar, FlexBox, Text } from '@telicent-oss/ds';
import config from 'config/app-config';
import { Box } from '@mui/material';

const InactiveProfileLegacy = () => (
  <>
    <AppBar appName="query" apps={config.apps} isElevated />
    <FlexBox direction="column" gap={2} sx={{ p: 4 }}>
      <FlexBox>
        <Text variant="body1">
          Your profile is currently inactive. Please contact your system administrator. You cannot
          continue until your profile is activated and attributes have been set.
        </Text>
      </FlexBox>
      <Box>
        <Button color="primary" variant="outlined">
          <Link to="/">Retry</Link>
        </Button>
      </Box>
    </FlexBox>
  </>
);

export default InactiveProfileLegacy;
