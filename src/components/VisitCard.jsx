import React from 'react';
import { Card, CardContent, CardHeader, CardMedia } from '@mui/material';

const VisitCard = () => {
    return (
        <Card sx={{ maxWidth: 200 }}>
            <CardMedia sx={{ height: 200 }}
                image="https://picsum.photos/200"
                title="lorem ipsum" />
        </Card>
    );
};

export default VisitCard;
