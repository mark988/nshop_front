'use client';
import { Grid, Typography, Box, Container } from '@mui/material';
import ProductCard from '@/components/shared/ProductCard';

const products = [
  {
    id: 1,
    name: 'Product A',
    price: 99,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=100'
  },
  {
    id: 2,
    name: 'Product B',
    price: 199,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=scale&w=800&q=100'
  },
  {
    id: 3,
    name: 'Product C',
    price: 299,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=400&q=100'
  }
];

export default function FeaturedProducts() {
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
            Featured Products
          </Typography>
          {/* 如果需要"View All"，取消注释下面一行 */}
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
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard {...product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}