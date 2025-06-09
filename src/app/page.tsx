'use client';
import { Box } from '@mui/material';
import HeroBanner from '@/components/home/HeroBanner';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import NewArrivals from '@/components/home/NewArrivals';
import CategorySection from '@/components/home/CategorySection';

export default function Home() {
  return (
    <Box sx={{ marginTop: '2rem' }}>
      <HeroBanner />
      <FeaturedProducts />
      <NewArrivals />
      <CategorySection />
    </Box>
  );
}

