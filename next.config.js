const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer()({
  experimental: {
    optimizeFonts: true,
    modern: true,
  },
  images: {
    domains: ['img.youtube.com', 'avatars.githubusercontent.com'],
  },
  productionBrowserSourceMaps: true,
  target: 'serverless',
  redirects: require('./next-redirect'),
})
