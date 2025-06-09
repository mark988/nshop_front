'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Box, Skeleton } from '@mui/material';
import { imageService, ImageConfig } from '@/services/imageService';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  config?: Partial<ImageConfig>;
  preload?: boolean;
  onLoad?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  sizes = "100vw",
  config,
  preload = false,
  onLoad,
  className,
  style,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (preload) {
      imageService.preloadImage(src).catch(console.error);
    }

    setOptimizedSrc(imageService.getOptimizedImageUrl(src, config));
  }, [src, preload, config]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

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
        }}
      >
        Failed to load image
      </Box>
    );
  }

  return (
    <Box position="relative">
      {isLoading && (
        <Skeleton
          variant="rectangular"
          width={width || '100%'}
          height={height || '100%'}
          animation="wave"
        />
      )}
      <Image
        ref={imgRef}
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          ...style,
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.2s ease-in-out',
        }}
        className={className}
      />
    </Box>
  );
}
