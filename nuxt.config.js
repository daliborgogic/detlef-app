require('dotenv').config()

const { CMS_DOMAIN, APP_DOMAIN, FIRST_NAME, LAST_NAME } = process.env

module.exports = {
  env: { CMS_DOMAIN, APP_DOMAIN, FIRST_NAME, LAST_NAME },
  head: {
    title: '###',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#FFFFFF' }
    ]
  },

  css: [
    '~assets/css/main.styl'
  ],

  plugins: [
    { src: '~/plugins/isotope', ssr: false },
    // { src: '~/plugins/in-view', ssr: false }
  ],

  watch: [
    '~/nuxt.config.js'
  ],

  workbox: {
    importScripts: [
      'custom-sw.js'
    ],
    runtimeCaching: [
      {
        // Should be a regex string. Compiles into new RegExp('https://my-cdn.com/.*')
        urlPattern: `https://${CMS_DOMAIN}/pages/.*`,
        // Defaults to `networkFirst` if omitted
        handler: 'cacheFirst',
        // Defaults to `GET` if omitted
        method: 'GET',
        strategyOptions: {
          cacheName: FIRST_NAME.toLowerCase() + 's-pages',
          cacheExpiration: {
            maxEntries: 10,
            maxAgeSeconds: 300
          }
        }
      },
      {
        // Should be a regex string. Compiles into new RegExp('https://my-cdn.com/.*')
        urlPattern: `https://${CMS_DOMAIN}/posts/.*`,
        // Defaults to `networkFirst` if omitted
        handler: 'cacheFirst',
        // Defaults to `GET` if omitted
        method: 'GET',
        strategyOptions: {
          cacheName: FIRST_NAME.toLowerCase() + 's-posts',
          cacheExpiration: {
            maxEntries: 100,
            maxAgeSeconds: 300
          }
        }
      }
    ]
  },

  build: {
    parallel: true,
    styleResources: {
      stylus: './assets/css/variables.styl'
    },
    // Extend webpack
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  render: {
    resourceHints: false,
    http2: {
      push: true
    }
  }
}
