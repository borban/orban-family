import React from 'react';
import { Typography, Container } from '@mui/material';

const Travel = () => {
  return (
    <div>
      <Container>
        <Typography variant="h4" style={{ marginTop: '20px' }}>
          Oh, the places you'll' go!
          <br/><br/>
        </Typography>
        <iframe src="https://www.google.com/maps/d/embed?mid=19wt6SLUq2xUin43M8U8J1WQ6JbcZWxo&ehbc=2E312F" width="100%" height="700"></iframe>
      </Container>
    </div>
  );
};

export default Travel;
