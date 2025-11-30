/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'down-vn.img.susercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cf.shopee.vn',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // 👇 FIX LỖI HIỆN TẠI (Link ảnh Google Shopping)
      {
        protocol: 'https',
        hostname: 'encrypted-tbn3.gstatic.com',
      },
      // 👇 FIX DỰ PHÒNG (Cho các link Google khác: tbn0, tbn1, tbn2...)
      {
        protocol: 'https',
        hostname: '**.gstatic.com',
      },
    ],
  },
};

export default nextConfig;