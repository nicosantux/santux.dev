import { type NextConfig } from 'next'

const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
} satisfies NextConfig

export default nextConfig
