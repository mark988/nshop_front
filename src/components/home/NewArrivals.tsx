'use client';
import { Box, Typography, Grid, Container } from '@mui/material';
import ProductCard from '../shared/ProductCard';
import { images } from '@/config/images';

export default function NewArrivals() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ 
        py: 6,
        px: { xs: 2, md: 4 }
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4
        }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            New Arrivals
          </Typography>
          <Typography 
            variant="body2"
            sx={{ 
              color: 'primary.main',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            View All
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {images.products.newArrivals.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard {...product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
