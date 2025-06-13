'use client';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { images } from '@/config/images';
import { useRouter } from 'next/navigation'; // 新增

export default function CategorySection() {
  const router = useRouter(); // 新增

  return (
    <Box sx={{ py: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          Shop by Category
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'primary.main',
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          View All
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {images.categories.map((category) => (
          <Grid item xs={12} sm={6} md={3} key={category.id}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                boxShadow: 'none',
                border: 'none',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
              onClick={() => router.push(`/products?tab=${encodeURIComponent(category.name)}`)} // 跳转并带tab参数
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