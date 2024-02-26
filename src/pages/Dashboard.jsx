import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import familyImage from '../assets/family.jpg';

const Dashboard = () => {
  return (
    <Box component="main" maxWidth="xs" height="90vh">
      <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
        <Typography variant="h4" style={{ textAlign: 'center' }}>
          Welcome to the Orban Family Homepage!
        </Typography>
        <Box style={{textAlign: 'center'}}>
          <img
            src={familyImage}
            alt="Family"
            style={{ maxWidth: '50%', maxHeight: '70vh', marginTop: '5vh' }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
