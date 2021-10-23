const locales = require('./i18n/locales');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const defaultConfig = {
  target: 'serverless',
  webpack: (config) => ({
    ...config,
    externals: [...config.externals, 'sharp'],
  }),
  experimental: {
    optimizeFonts: true,
    modern: true,
  },
  i18n: {
    locales: locales.locales,
    defaultLocale: locales.defaultLocale,
  },
  redirects: require('./next-redirect'),
};

module.exports = withPlugins([withBundleAnalyzer], defaultConfig);
