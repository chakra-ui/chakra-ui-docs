const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer()({
  experimental: {
    optimizeFonts: true,
    modern: true,
  },
  images: { domains: ['img.youtube.com'] },
  target: 'serverless',
  redirects: require('./next-redirect'),
})
