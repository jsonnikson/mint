import React from 'react';
import { Typography } from '@material-ui/core';

const wikipaliIconSrc = require('../public/wikipali-logo.svg')

export const WikipaliBranding = () => (
    <>
        <img src={wikipaliIconSrc} />
        <Typography variant="h6"><b>wikipali</b>studio</Typography>
    </>
)