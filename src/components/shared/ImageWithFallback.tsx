'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Skeleton, Box } from '@mui/material';
import { trackImageMetrics } from '@/utils/imageOptimization';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
  className?: string;
  blurDataUrl?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  sizes = "100vw",
  style,
  className,
  blurDataUrl,
}: ImageWithFallbackProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loadStartTime, setLoadStartTime] = useState<number>(0);

  useEffect(() => {
    setLoadStartTime(Date.now());
  }, [src]);

  const handleLoad = (event: any) => {
    setIsLoading(false);
    
    // Track metrics
    const loadTime = Date.now() - loadStartTime;
    const size = event.target.naturalWidth * event.target.naturalHeight;
    trackImageMetrics(src, {
      loadTime,
      size,
      format: src.split('.').pop() || 'unknown'
    });
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f6f7f8" offset="20%" />
          <stop stop-color="#edeef1" offset="50%" />
          <stop stop-color="#f6f7f8" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f6f7f8" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  if (error) {
    return (
      <Box
        sx={{
          width: width || '100%',
          height: height || '100%',
          bgcolor: 'grey.200',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.secondary',
          fontSize: '0.875rem',
        }}
      >
        Image not available
      </Box>
    );
  }

  return (
    <>
      {isLoading && (
        <Skeleton
          variant="rectangular"
          width={width || '100%'}
          height={height || '100%'}
          animation="wave"
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        sizes={sizes}
        style={{
          ...style,
          display: isLoading ? 'none' : 'block',
        }}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
        quality={85}
        placeholder="blur"
        blurDataURL={blurDataUrl || `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        loading={priority ? 'eager' : 'lazy'}
      />
    </>
  );
}
