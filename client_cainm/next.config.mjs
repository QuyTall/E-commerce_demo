/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }, // 🔥 CHẤP NHẬN MỌI DOMAIN ẢNH (Dùng cho dev/demo)
    ],
  },
};

export default nextConfig;