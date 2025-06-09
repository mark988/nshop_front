'use client';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We provide quality furniture and home decor items to help you create your dream living space.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: support@nshop.com
              <br />
              Phone: (555) 123-4567
              <br />
              Address: 123 Furniture Street
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/about" color="text.secondary" display="block">
              About
            </Link>
            <Link href="/contact" color="text.secondary" display="block">
              Contact
            </Link>
            <Link href="/terms" color="text.secondary" display="block">
              Terms & Conditions
            </Link>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          © {new Date().getFullYear()} NShop. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
