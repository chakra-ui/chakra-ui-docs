const { withContentlayer } = require('next-contentlayer');

module.exports = withContentlayer()({
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  swcMinify: true,
  redirects: require('./next-redirect'),
  experimental: {
    esmExternals: false,
  },
});
