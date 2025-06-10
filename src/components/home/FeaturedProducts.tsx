'use client';
import { Grid, Typography, Box } from '@mui/material';
import ProductCard from '@/components/shared/ProductCard';

const products = [
  {
    id: 1,
    name: 'Product A',
    price: 99,
    memberPrice: 79,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=100',
    type: 'image'
  },
  {
    id: 2,
    name: 'Product B',
    price: 199,
    memberPrice: 159,
    video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4',
    type: 'video'
  },
  {
    id: 3,
    name: 'Product C',
    price: 299,
    memberPrice: 259,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=400&q=100',
    type: 'image'
  },
  {
    id: 4,
    name: 'Product D',
    price: 239,
    memberPrice: 209,
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=100',
    type: 'image'
  }
];

export default function FeaturedProducts() {
  return (
    <Box sx={{ py: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            fontSize: { xs: '1.25rem', md: '1.5rem' },
          }}
        >
          Featured Products
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'primary.main',
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
            fontWeight: 500,
            fontSize: { xs: '0.95rem', md: '1rem' },
          }}
        >
          View All
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}