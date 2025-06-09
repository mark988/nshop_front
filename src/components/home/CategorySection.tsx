'use client';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { images } from '@/config/images';

export default function CategorySection() {
  return (
    <Box sx={{ py: 8, px: 4 }}>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Shop by Category
      </Typography>
      <Grid container spacing={4}>
        {images.categories.map((category) => (
          <Grid item xs={12} sm={6} md={3} key={category.id}>
            <Card 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={category.path}
                alt={category.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
