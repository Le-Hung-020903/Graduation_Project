import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc"
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com" // Thêm tên miền Cloudinary
      },
      {
        protocol: "https",
        hostname: "qr.sepay.vn"
      }
    ]
  }
}

export default nextConfig
