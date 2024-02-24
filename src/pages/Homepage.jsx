// src/components/Homepage.js

import React from 'react';
import { Typography, Container } from '@mui/material';

const Homepage = () => {
  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: '20px' }}>
        Welcome to the Orban Family Homepage!
      </Typography>
      <Typography variant="body1" style={{ marginTop: '10px' }}>
        We are glad to have you here.
      </Typography>
    </Container>
  );
};

export default Homepage;
