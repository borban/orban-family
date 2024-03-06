import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import { AppBar, Button, Toolbar, Box, Menu, MenuItem } from '@mui/material';

import Dashboard from '../pages/Dashboard';
import ToVisitMap from '../pages/ToVisitMap';
import PlacesVisited from '../pages/PlacesVisited';
import Chat from '../pages/Chat';
import CenteredContainer from './CenteredContainer';

import { signOut } from 'aws-amplify/auth';

const TopNavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <CenteredContainer>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/">
              <Button variant="contained" disableElevation>
                Home
              </Button>
            </Link>
            <Button
              variant="contained"
              disableElevation
              onClick={handleClick}
            >
              Travel
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/travel/places-visited">Places Visited</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/travel/to-visit">To Visit</Link>
              </MenuItem>
            </Menu>

            <Link to="/chat">
              <Button variant="contained" disableElevation>
                Chat
              </Button>
            </Link>
          </Box>
          <Link to="/" sx={{ flex: 1 }}>
            <Button variant="contained" disableElevation onClick={signOut}>
              Sign Out
            </Button>
          </Link>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route index element={<CenteredContainer><Dashboard /></CenteredContainer>} />
        <Route path="travel" element={<CenteredContainer><ToVisitMap /></CenteredContainer>} />
        <Route path="travel/places-visited" element={<CenteredContainer><PlacesVisited /></CenteredContainer>} />
        <Route path="travel/to-visit" element={<CenteredContainer><ToVisitMap /></CenteredContainer>} />
        <Route path="chat" element={<CenteredContainer><Chat /></CenteredContainer>} />
      </Routes>
    </CenteredContainer>
  );
};

export default TopNavBar;
