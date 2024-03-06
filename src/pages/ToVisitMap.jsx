import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const ToVisitMap = () => {
  return (
    <Box height="85vh">
        <Typography variant="h4" style={{ textAlign: 'center' }}>
          Oh, the places you'll go!
          <br /><br />
        </Typography>
        <Box height="80vh">
          <iframe src="https://www.google.com/maps/d/embed?mid=19wt6SLUq2xUin43M8U8J1WQ6JbcZWxo&ehbc=2E312F" width="100%" height="100%"></iframe>
        </Box>
    </Box>
  );
};

export default ToVisitMap;
