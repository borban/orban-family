import React from 'react';
import { Box, Paper } from '@mui/material';
import VisitCard from '../components/VisitCard';
import Grid from '@mui/material/Unstable_Grid2';

const PlacesVisited = () => {
    return (
        <Box>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={2}>
                    <VisitCard />
                </Grid>
                <Grid item xs={2}>
                    <VisitCard />
                </Grid>
                <Grid item xs={2}>
                    <VisitCard />
                </Grid>
                <Grid item xs={2}>
                    <VisitCard />
                </Grid>
                <Grid item xs={2}>
                    <VisitCard />
                </Grid>
                <Grid item xs={2}>
                    <VisitCard />
                </Grid>
            </Grid>
        </Box>
    );
};

export default PlacesVisited;
