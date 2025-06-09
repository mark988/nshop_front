'use client';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { imageMetrics, ImageMetrics } from '@/utils/imageOptimization';

export default function ImagePerformanceMonitor() {
  const [metrics, setMetrics] = useState<[string, ImageMetrics][]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(Array.from(imageMetrics.entries()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        bgcolor: 'background.paper',
        p: 2,
        borderRadius: 1,
        boxShadow: 2,
        maxWidth: 300,
        maxHeight: 400,
        overflow: 'auto',
        zIndex: 9999,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Image Metrics
      </Typography>
      {metrics.map(([src, metric]) => (
        <Box key={src} sx={{ mb: 1 }}>
          <Typography variant="caption" component="div">
            Path: {src.substring(src.lastIndexOf('/') + 1)}
          </Typography>
          <Typography variant="caption" component="div">
            Load Time: {metric.loadTime}ms
          </Typography>
          <Typography variant="caption" component="div">
            Size: {Math.round(metric.size / 1024)}KB
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
