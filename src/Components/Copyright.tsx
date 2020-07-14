import React from 'react';
import {
	Link,
	Typography,
} from '@material-ui/core';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      ©&nbsp;

      <Link color="inherit" href="https://material-ui.com/">Listic</Link>&nbsp;

      { new Date().getFullYear() }.
    </Typography>
  );
}

export default Copyright