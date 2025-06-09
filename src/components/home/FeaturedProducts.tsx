'use client';
import { Box, Typography, Grid } from '@mui/material';
import ProductCard from '../shared/ProductCard';
import { images } from '@/config/images';

export default function FeaturedProducts() {
  return (
    <Box sx={{ py: 8, px: 4 }}>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Featured Products
      </Typography>
      <Grid container spacing={4}>
        {images.products.featured.map((product) => (
          <Grid item xs={12} md={4} key={product.id}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
