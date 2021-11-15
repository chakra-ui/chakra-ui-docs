const { withContentlayer } = require('next-contentlayer');

module.exports = withContentlayer()({
  swcMinify: true,
  redirects: require('./next-redirect'),
  experimental: {
    esmExternals: false,
  },
});
