const locales = require("./i18n/locales")
const withPlugins = require("next-compose-plugins")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const defaultConfig = {
  experimental: {
    optimizeFonts: true,
    modern: true,
  },
  i18n: {
    locales: locales.locales,
    defaultLocale: locales.defaultLocale,
  },
  swcMinify: true,
  redirects: require("./next-redirect"),
  experimental: {
    esmExternals: false,
  },
}

module.exports = withPlugins([withBundleAnalyzer], defaultConfig)
