import React from 'react';
import { Box, Typography, Link, Divider } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f8f8f8',
        padding: '20px',
        textAlign: 'center',
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <Divider sx={{ marginBottom: '16px' }} />
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </Typography>
      <Box sx={{ marginTop: '8px' }}>
        <Link href="/privacy-policy" variant="body2" color="textPrimary" sx={{ marginRight: '16px' }}>
          Privacy Policy
        </Link>
        <Link href="/terms-of-service" variant="body2" color="textPrimary">
          Terms of Service
        </Link>
      </Box>
    </Box>
  );
}

export default Footer;
