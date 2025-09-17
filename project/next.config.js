const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  // Configure PostCSS to use config directory
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Find the existing PostCSS loader and update its config path
    const rules = config.module.rules
    rules.forEach((rule) => {
      if (rule.oneOf) {
        rule.oneOf.forEach((oneOfRule) => {
          if (oneOfRule.use && Array.isArray(oneOfRule.use)) {
            oneOfRule.use.forEach((use) => {
              if (use.loader && use.loader.includes('postcss-loader')) {
                use.options = {
                  ...use.options,
                  postcssOptions: {
                    config: path.resolve(__dirname, 'config/postcss.config.js')
                  }
                }
              }
            })
          }
        })
      }
    })
    return config
  },
}

module.exports = nextConfig