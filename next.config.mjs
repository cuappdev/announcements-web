/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    UPLOAD_BUCKET: process.env.NEXT_PUBLIC_UPLOAD_BUCKET,
    UPLOAD_URL: process.env.NEXT_PUBLIC_UPLOAD_URL,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
