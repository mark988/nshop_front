'use client';
import { useRef } from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

const banners = [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd',
    alt: '图片1'
  },
  {
    type: 'video',
    src: 'http://vjs.zencdn.net/v/oceans.mp4',
    alt: '视频1',
    poster: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
    alt: '图片2'
  }
];

export default function Banner() {
  const swiperRef = useRef<any>(null);

  // 暂停自动切换
  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  // 恢复自动切换
  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: 160, md: 320 },
        borderRadius: 2,
        overflow: 'hidden',
        mb: 4,
        position: 'relative',
      }}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        style={{ height: '100%' }}
        onSwiper={swiper => { swiperRef.current = swiper; }}
      >
        {banners.map((banner, idx) => (
          <SwiperSlide
            key={idx}
            style={{ height: '100%' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
              {banner.type === 'image' ? (
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="100vw"
                  priority={idx === 0}
                />
              ) : (
                <video
                  src={banner.src}
                  poster={banner.poster}
                  controls={false}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              )}
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}