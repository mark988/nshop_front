'use client';

import { Box } from '@mui/material';
import Banner from '@/components/home/Banner'; // 轮播图组件
import FeaturedProducts from '@/components/home/FeaturedProducts';
import NewArrivals from '@/components/home/NewArrivals';
import CategorySection from '@/components/home/CategorySection';
import ContentContainer from '@/components/layout/ContentContainer';

export default function Home() {
  return (
    <Box>
      {/* 轮播图与头部间距 */}
      <ContentContainer sx={{ marginTop: '2rem', marginBottom: '1rem' }}>
        <Banner />
      </ContentContainer>
      <ContentContainer sx={{ marginBottom: '1rem' }}>
        <FeaturedProducts />
      </ContentContainer>
      <ContentContainer sx={{ marginBottom: '1rem' }}>
        <NewArrivals />
      </ContentContainer>
      <ContentContainer sx={{ marginBottom: '1rem' }}>
        <CategorySection />
      </ContentContainer>
    </Box>
  );
}