'use client';
import { Box, Typography, Button } from '@mui/material';
import { images } from '@/config/images';

export default function HeroBanner() {
  const currentSlide = images.carousel[0]; // 可以添加轮播功能

  return (
    <Box
      sx={{
        position: 'relative',
        height: '600px',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: 8,
        background: `linear-gradient(rgba(47, 79, 79, 0.8), rgba(47, 79, 79, 0.8)), url(${currentSlide.path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 2,         // 8px圆角
        overflow: 'hidden',      // 保证内容也有圆角
        width: '100%',
      }}
    >
      <Typography variant="h1" sx={{ mb: 2 }}>
        {currentSlide.title}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4, maxWidth: '600px' }}>
        {currentSlide.description}
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{
          width: 'fit-content',
          px: 4,
          py: 1.5,
          bgcolor: 'white',
          color: '#2F4F4F',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.9)',
          },
        }}
      >
        Shop Now
      </Button>
    </Box>
  );
}
