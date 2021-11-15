const { withContentlayer } = require('next-contentlayer');

module.exports = withContentlayer()({
  experimental: {
    optimizeFonts: true,
    modern: true,
  },
  target: 'serverless',
  redirects: require('./next-redirect'),
});
