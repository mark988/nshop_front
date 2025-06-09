'use client';

import { Box } from '@mui/material';
import Banner from '@/components/home/Banner'; // 使用你新加的轮播图组件
import FeaturedProducts from '@/components/home/FeaturedProducts';
import NewArrivals from '@/components/home/NewArrivals';
import CategorySection from '@/components/home/CategorySection';
import ContentContainer from '@/components/layout/ContentContainer';

export default function Home() {
  return (
    <Box>
      {/* 轮播图与头部间距 */}
      <ContentContainer sx={{ marginTop: '2rem' }}>
        <Banner />
      </ContentContainer>
      <ContentContainer>
        <FeaturedProducts />
      </ContentContainer>
      <ContentContainer>
        <NewArrivals />
      </ContentContainer>
      <ContentContainer>
        <CategorySection />
      </ContentContainer>
    </Box>
  );
}