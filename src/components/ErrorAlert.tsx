import React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

type Props = {}

const ErrorAlert = (props: Props) => {
  return (
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Alert severity="error">Some Error Occurred</Alert>
      </Box>
  )
}

export default ErrorAlert