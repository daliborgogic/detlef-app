require('dotenv').config()

const {
  CMS_DOMAIN,
  APP_DOMAIN
} = process.env

module.exports = {
  env: {
    CMS_DOMAIN,
    APP_DOMAIN
  },
  head: {
    title: '###',
    titleTemplate: (titleChunk) => {
      // If undefined or blank then we don't need the hyphen
      return titleChunk
        ? `${titleChunk} — Detlef Schneider`
        : 'Detlef Schneider'
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
    // https://github.com/nuxt-community/dotenv-module
    ['@nuxtjs/dotenv'],

    // // https://pwa.nuxtjs.org/
    [
      '@nuxtjs/pwa', {
        workbox: {},
        manifest: {
          name: 'Detlef Schneider',
          short_name: 'Detlef'
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
