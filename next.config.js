/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      // 如有其它图片源可在此添加
    ],
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1920, 2048, 3840], // 增加320/420等移动端尺寸
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // 保持常用小图尺寸
    formats: ['image/webp', 'image/avif'], // 支持AVIF和WebP
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30天缓存，提升CDN缓存命中率
    dangerouslyAllowSVG: false,         // 默认禁止SVG增强安全性
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
  // 仅在需要时开启远程图片优化，Next.js 14+自动处理
  // experimental: {
  //   images: { allowFutureImage: true }
  // }
};

module.exports = nextConfig;