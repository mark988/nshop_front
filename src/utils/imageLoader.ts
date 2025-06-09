export default function imageLoader({ src, width, quality }: {
  src: string;
  width: number;
  quality?: number;
}) {
  // If using a CDN, modify the URL here
  if (src.startsWith('https://images.unsplash.com')) {
    // Unsplash already provides optimized images
    return `${src}&w=${width}&q=${quality || 75}`;
  }

  // For your own CDN, you would do something like:
  // return `https://your-cdn.com/${src}?w=${width}&q=${quality || 75}`;
  
  return src;
}
