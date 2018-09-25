require('dotenv').config()

const { CMS_DOMAIN, APP_DOMAIN } = process.env
const DESCRIPTION = 'Detlef Schneider is a German born photographer whose work is predominantly focused on sport and fashion'
const TITLE = 'Detlef Schneider — Photographer'

module.exports = {
  env: { CMS_DOMAIN, APP_DOMAIN },
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    titleTemplate: `%s - ${TITLE}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: DESCRIPTION },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-config', content: '/icons/browserconfig.xml' },
      { name: 'theme-color', content: '#FFFFFF' },

      /*
        Open Graph
        http://ogp.me/

        Twitter Card Validator
        https://cards-dev.twitter.com/validator

        Facebook Debug
        https://developers.facebook.com/tools/debug/sharing
      */
      { hid: 'twitter:card', name: 'twitter:card', value: 'summary_large_image' },
      // { hid: 'og:image', property: 'og:image', content: `https://${CMS_DOMAIN}/wp-content/uploads/2018/08/PDS03_01.jpg` },
      // { hid: 'og:image:width', property: 'og:image:width', content: '1680' },
      // { hid: 'og:image:height', property: 'og:image:height', content: '945' },
      { hid: 'og:title', property: 'og:title', content: TITLE },
      { hid: 'og:description', property: 'og:description', content: DESCRIPTION },
      { hid: 'og:url', property: 'og:url', content: `https://${APP_DOMAIN}` }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' },
      { rel: 'manifest', href: '/icons/manifest.json' },
      { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#000000' },
      { rel: 'shortcut icon', href: '/icons/favicon.ico' }
    ]
  },

  css: [
    '~assets/css/main.styl'
  ],

  plugins: [
    { src: '~/plugins/isotope', ssr: false }
  ],

  watch: [
    '~/nuxt.config.js',
    '~/index.js'
  ],

  build: {
    parallel: true,
    extractCSS: false,
    cssSourceMap: false,
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
