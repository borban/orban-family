import * as React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Homepage from './components/Homepage';
import Travel from './components/Travel';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

export default function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Link to="/">
            <Button variant="contained" disableElevation>
              Home
            </Button>
          </Link>
          <Link to="/travel">
            <Button variant="contained" disableElevation>
              Travel
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="travel" element={<Travel />} />
      </Routes>
    </div >
  );
}
