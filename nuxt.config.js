module.exports = {
  env: {
    CMS: process.env.CMS || 'cms.detlefschneider.com'
  },

  head: {
    title: '###',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },

  css: [
    '~assets/css/main.styl'
  ],

  plugins: [
    { src: '~/plugins/isotope', ssr: false }
  ],

  modules: [['@nuxtjs/pwa', {
    workbox: {
      offline: true
    }
  }]],

  build: {
    parallel: true,
    cache: false,
    styleResources: {
      stylus: './assets/css/variables.styl'
    },
    // Extend webpack
    extend(config, ctx) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  },
  render: {
    resourceHints: false,
    http2: {
      push: true
    }
  }
}
