import React from 'react';
import { Typography, Box } from '@mui/material';
import familyImage from '../assets/family.jpg';

const Dashboard = () => {
  return (
    <Box style={{ textAlign: 'center', overflow: 'hidden' }}>
      <Typography variant="h4" style={{ marginTop: '20px' }}>
        Welcome to the Orban Family Homepage!
      </Typography>
      <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', maxHeight: '80vh' }}>
        <img src={familyImage} alt="Family" style={{ maxWidth: '50%', height: 'auto' }} />
      </Box>
    </Box>
  );
};

export default Dashboard;
