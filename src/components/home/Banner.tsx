'use client';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
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
    alt: '图片1',
    link: '/activity/1'
  },
  {
    type: 'video',
    src: 'http://vjs.zencdn.net/v/oceans.mp4',
    alt: '视频1',
    poster: 'http://vjs.zencdn.net/v/oceans.mp4',
    link: 'https://www.google.com'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
    alt: '图片2',
    link: '/activity/3'
  }
];

export default function Banner() {
  const swiperRef = useRef<any>(null);
  const router = useRouter();

  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  const handleClick = (link?: string) => {
    if (link) {
      router.push(link);
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
            style={{ height: '100%', cursor: banner.link ? 'pointer' : 'default' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(banner.link)}
          >
            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
              {banner.type === 'image' ? (
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  style={{ objectFit: 'cover', cursor: banner.link ? 'pointer' : 'default' }}
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
                    cursor: banner.link ? 'pointer' : 'default'
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