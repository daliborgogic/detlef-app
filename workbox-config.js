require('dotenv').config()

const { FIRST_NAME, CMS_DOMAIN } = process.env
const isDev = () => process.env.NODE_ENV === 'development'

module.exports = {
  cacheId: FIRST_NAME.toLowerCase(),
  globDirectory: isDev ? '.nuxt' : '.nuxt/dist',
  clientsClaim: true,
  skipWaiting: true,
  directoryIndex: '/',
  globPatterns: ['**/*.{js,css}'],
  swDest: 'static/sw.js',
  modifyUrlPrefix: {
    '': '/_nuxt/'
  },
  // importScripts: ['custom-sw.js'],
  // Increase the limit to 4mb:
  maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,

  // Define runtime caching rules.
  runtimeCaching: [
    {
      urlPattern: new RegExp('/_nuxt/.*'),
      handler: 'cacheFirst',
      options: {
        cacheableResponse: {
          statuses: [0, 200]
        }
      }
    },
    {
      urlPattern: new RegExp('/.*'),
      handler: 'networkFirst',
      options: {
        cacheableResponse: {
          statuses: [0, 200]
        }
      }
    }
  ]
};
