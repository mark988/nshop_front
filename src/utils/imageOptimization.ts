export interface ImageMetrics {
  loadTime: number;
  size: number;
  format: string;
}

export const imageMetrics = new Map<string, ImageMetrics>();

export const generateBlurDataUrl = async (src: string): Promise<string> => {
  try {
    const response = await fetch(src);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error('Error generating blur data URL:', error);
    return '';
  }
};

export const trackImageMetrics = (src: string, metrics: ImageMetrics) => {
  imageMetrics.set(src, metrics);
  
  // You could send this to your analytics service
  console.log(`Image metrics for ${src}:`, metrics);
};
