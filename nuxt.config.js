const {
  APP_NAME,
  APP_SHORT_NAME
} = process.env

module.exports = {
  head: {
    title: '###',
    titleTemplate: (titleChunk, APP_NAME) => {
      // If undefined or blank then we don't need the hyphen
      return titleChunk
        ? titleChunk + ' — ' + APP_NAME
        : APP_NAME
    },
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

  modules: [
    [
      // https://github.com/nuxt-community/dotenv-module
      '@nuxtjs/dotenv',
      {
        only: [
          'APP_NAME',
          'CMS_DOMAIN',
          'APP_DOMAIN'
        ]
      }
    ],

    [
      // // https://pwa.nuxtjs.org/
      '@nuxtjs/pwa', {
        workbox: {},
        manifest: {
          name: APP_NAME,
          short_name: APP_SHORT_NAME
          // display: 'fullscreen'
        }
      }
    ]
  ],

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
