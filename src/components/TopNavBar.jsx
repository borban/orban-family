import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import { AppBar, Button, Toolbar, Box } from '@mui/material';

import Dashboard from '../pages/Dashboard';
import Travel from '../pages/Travel';
import { signOut } from 'aws-amplify/auth';
import Signout from '../pages/Signout';

const TopNavBar = () => {
    return (
        <Box>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Box sx={{ flexGrow: 1 }}>
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
                    </Box>
                    <Link to="/" sx={{ flex: 1 }}>
                            <Button variant="contained" disableElevation onClick={signOut} >
                                Sign Out
                            </Button>
                        </Link>
                </Toolbar>
            </AppBar>

            <Routes>
                <Route index element={<Dashboard />} />
                <Route path="travel" element={<Travel />} />
            </Routes>
        </Box>
    );
};

export default TopNavBar;