const { withContentlayer } = require('next-contentlayer');

module.exports = withContentlayer()({
  target: 'serverless',
  swcMinify: true,
  redirects: require('./next-redirect'),
});
