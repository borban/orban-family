import React from 'react';

import { Box } from '@mui/material';

const CenteredContainer = ({ children }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="90vh"
        >
            <div style={{ width: "95%", height:"100%" }}>
                {children}
            </div>
        </Box>
    )
};

export default CenteredContainer;