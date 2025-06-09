export interface ImageConfig {
  quality: number;
  format: 'webp' | 'avif' | 'jpeg';
  width: number;
  height: number;
  blur: number;
  compression: 'lossy' | 'lossless';
}

export interface PreloadConfig {
  paths: string[];
  viewport: 'mobile' | 'tablet' | 'desktop';
  priority: 'high' | 'medium' | 'low';
}

export const defaultImageConfig: ImageConfig = {
  quality: 85,
  format: 'webp',
  width: 800,
  height: 600,
  blur: 20,
  compression: 'lossy',
};

class ImageService {
  private preloadQueue: Set<string> = new Set();
  private loadedImages: Map<string, boolean> = new Map();
  private imageConfigs: Map<string, ImageConfig> = new Map();

  constructor() {
    if (typeof window !== 'undefined') {
      this.initIntersectionObserver();
    }
  }

  private initIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              this.preloadImage(img.dataset.src);
            }
          }
        });
      },
      { rootMargin: '50px' }
    );

    document.querySelectorAll('img[data-src]').forEach((img) => {
      observer.observe(img);
    });
  }

  async preloadImage(src: string): Promise<void> {
    if (this.loadedImages.has(src)) return;

    this.preloadQueue.add(src);
    const img = new Image();
    img.src = src;

    return new Promise((resolve, reject) => {
      img.onload = () => {
        this.loadedImages.set(src, true);
        this.preloadQueue.delete(src);
        resolve();
      };
      img.onerror = reject;
    });
  }

  getOptimizedImageUrl(src: string, config?: Partial<ImageConfig>): string {
    const finalConfig = { ...defaultImageConfig, ...config };
    
    if (src.startsWith('https://images.unsplash.com')) {
      const params = new URLSearchParams({
        w: finalConfig.width.toString(),
        q: finalConfig.quality.toString(),
        fm: finalConfig.format,
        fit: 'crop',
      });
      return `${src}?${params.toString()}`;
    }

    return src;
  }

  setImageConfig(pattern: string, config: Partial<ImageConfig>) {
    this.imageConfigs.set(pattern, { ...defaultImageConfig, ...config });
  }
}

export const imageService = new ImageService();
