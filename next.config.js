// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withContentlayer } = require('next-contentlayer')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextTranslate = require('next-translate')

module.exports = withContentlayer(
  nextTranslate({
    optimizeFonts: true,
    images: {
      domains: [
        'img.youtube.com',
        'avatars.githubusercontent.com',
        'github.com',
        'avatars0.githubusercontent.com',
        'avatars1.githubusercontent.com',
        'avatars2.githubusercontent.com',
        'avatars3.githubusercontent.com',
        'res.cloudinary.com',
      ],
    },
    productionBrowserSourceMaps: true,
    redirects: require('./next-redirect'),
    reactStrictMode: true,
  }),
)
