/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deshabilitar la generación automática de favicon
  webpack: (config) => {
    config.plugins = config.plugins.filter(
      (plugin) => 
        plugin.constructor.name !== 'FaviconWebpackPlugin' && 
        plugin.constructor.name !== 'FaviconsWebpackPlugin'
    );
    return config;
  },
  // Asegurarse de que no se generen assets automáticamente
  assetPrefix: '',
  // Deshabilitar la optimización de imágenes para evitar problemas con favicons
  images: {
    disableStaticImages: true,
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
