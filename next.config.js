// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer({
  experimental: {
    optimizeFonts: true,
    modern: true,
  },
  images: {
    domains: [
      'img.youtube.com',
      'avatars.githubusercontent.com',
      'github.com',
      'avatars0.githubusercontent.com',
      'avatars1.githubusercontent.com',
      'avatars2.githubusercontent.com',
      'avatars3.githubusercontent.com',
    ],
  },
  productionBrowserSourceMaps: true,
  redirects: require('./next-redirect'),
  reactStrictMode: true,
})
