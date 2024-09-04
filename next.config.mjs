/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Ensure strict TypeScript checks
    tsconfigPath: './tsconfig.json', // Explicitly point to your custom tsconfig
  },
};

export default nextConfig;
