module.exports = {
  output: 'standalone',
  i18n: {
    locales: ['default', 'en-US', 'ru-RU'],
    defaultLocale: 'default',
    localeDetection: false,
    domains: [
      {
        domain: 'istlift.com',
        defaultLocale: 'en-US',
      },
      {
        domain: 'istlift.ru',
        defaultLocale: 'ru-RU',
      },
    ],
  },
  trailingSlash: true,

  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'admin.istlift.com', 'admin.istlift.ru'],
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
    }

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })

    return config
  },
}
