import { imageService, ImageConfig } from '@/services/imageService';

describe('Image Optimization Tests', () => {
  const testImages = [
    {
      src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
      expectedSize: { width: 800, height: 600 },
      config: { quality: 85, format: 'webp' as const },
    },
    // Add more test cases
  ];

  test.each(testImages)(
    'optimizes image correctly',
    async ({ src, expectedSize, config }) => {
      const optimizedUrl = imageService.getOptimizedImageUrl(src, config);
      const urlParams = new URL(optimizedUrl).searchParams;

      expect(urlParams.get('w')).toBe(expectedSize.width.toString());
      expect(urlParams.get('q')).toBe(config.quality.toString());
      expect(urlParams.get('fm')).toBe(config.format);
    }
  );

  test('preloads images correctly', async () => {
    const src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc';
    await imageService.preloadImage(src);
    expect(imageService['loadedImages'].has(src)).toBeTruthy();
  });
});
