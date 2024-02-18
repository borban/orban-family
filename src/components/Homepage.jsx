// src/components/Homepage.js

import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const Homepage = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
        </Toolbar>
      </AppBar>

      <Container>
        <Typography variant="h4" style={{ marginTop: '20px' }}>
          Welcome to the Orban Family Homepage!
        </Typography>
        <Typography variant="body1" style={{ marginTop: '10px' }}>
          We are glad to have you here.
        </Typography>
      </Container>
    </div>
  );
};

export default Homepage;
