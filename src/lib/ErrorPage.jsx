import React, { useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { AppBar, FlexBox, Text, Button, Paper, H5, useExtendedTheme } from '@telicent-oss/ds';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import config from '../config/app-config';
import { Box } from '@mui/material';

const ErrorPage = () => {
  // const { state } = useLocation();

  const theme = useExtendedTheme();

  const primaryColour = theme.palette.primary.main;

  const state = { err: { message: 'test', code: '123' } };
  if (!state?.err) return <Navigate to="/" replace />;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar appName="query" apps={config.apps} isElevated />

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', pt: 6 }}>
        <FlexBox gap={3} sx={{ minWidth: 320, maxWidth: 480, width: '100%', px: 0 }}>
          <Paper sx={{ p: 2 }} elevation={4}>
            <FlexBox gap={3}>
              <FlexBox direction="row" gap={1} sx={{ justifyContent: 'flex-start' }}>
                <FontAwesomeIcon icon={faCircleExclamation} size="2x" color={primaryColour} />
                <H5 sx={{ fontWeight: '500' }}>Error</H5>
              </FlexBox>

              <FlexBox alignItems="flex-start">
                <Text variant="body1">Error code: {state.err.code}</Text>
                <Text variant="body1">{state.err.message}</Text>
              </FlexBox>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Button color="primary" variant="outlined" component={Link} to="/">
                  Retry
                </Button>
              </Box>
            </FlexBox>
          </Paper>
        </FlexBox>
      </Box>
    </Box>
  );
};

export default ErrorPage;
