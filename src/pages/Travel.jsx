import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const Travel = () => {
  return (
    <Box component="main" maxWidth="xs" height="90vh">
      <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
        <Typography variant="h4" style={{ textAlign: 'center' }}>
          Oh, the places you'll go!
          <br /><br />
        </Typography>
        <Box height="70vh">
          <iframe src="https://www.google.com/maps/d/embed?mid=19wt6SLUq2xUin43M8U8J1WQ6JbcZWxo&ehbc=2E312F" width="100%" height="100%"></iframe>
        </Box>
      </Paper>
    </Box>
  );
};

export default Travel;
