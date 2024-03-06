import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import familyImage from '../assets/family.jpg';

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" style={{ textAlign: 'center' }}>
        Welcome to the Orban Family Homepage!
      </Typography>
      <Box style={{ textAlign: 'center' }}>
        <img
          src={familyImage}
          alt="Family"
          style={{ maxWidth: '50%', maxHeight: '70vh', marginTop: '5vh' }}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
