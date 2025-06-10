'use client';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 2, // 更紧凑的上下内边距
        mt: 'auto',
        // 去掉顶部边框线
        // borderTop: '1px solid',
        // borderColor: 'divider',
        minHeight: '48px', // 优化整体高度
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontSize: '1.1rem' }}>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.95rem' }}>
              We provide quality furniture and home decor items to help you create your dream living space.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontSize: '1.1rem' }}>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.95rem' }}>
              Email: support@nshop.com
              <br />
              Phone: (555) 123-4567
              <br />
              Address: 123 Furniture Street
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontSize: '1.1rem' }}>
              Quick Links
            </Typography>
            <Link href="/about" color="text.secondary" display="block" sx={{ fontSize: '0.95rem', mb: 0.5 }}>
              About
            </Link>
            <Link href="/contact" color="text.secondary" display="block" sx={{ fontSize: '0.95rem', mb: 0.5 }}>
              Contact
            </Link>
            <Link href="/terms" color="text.secondary" display="block" sx={{ fontSize: '0.95rem' }}>
              Terms & Conditions
            </Link>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 2, fontSize: '0.95rem' }}
        >
          © {new Date().getFullYear()} NShop. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}