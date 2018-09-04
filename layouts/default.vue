<template lang="pug">
div
  TheHeader
  main
    nuxt
  TheSnackBar
</template>

<script>
import TheHeader from '@/components/TheHeader'

const timeout = ms => new Promise(res => setTimeout(res, ms))

export default {
  components: {
    TheHeader,
    TheSnackBar: () => import('@/components/TheSnackBar')
  },

  beforeMount () {
    this.loadFont()
  },

  async mounted () {
    window.addEventListener('load', () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(reg => {
          reg.onupdatefound = () => {
            const installingWorker = reg.installing
            installingWorker.onstatechange = async () => {
              // States:
              // 1 New or updated content is available
              // 2 Caching complete. Future visits will work offline
              let state = navigator.serviceWorker.controller !== null ? 1 : 2
              switch (installingWorker.state) {
                case 'installed':
                  this.$store.commit('setGotNew', {
                    show: true,
                    state
                  })
                  if (state === 2) {
                    await timeout(6000)
                    this.$store.commit('setGotNew', {
                      show: false,
                      state: null
                    })
                  }
                  break
                case 'redundant':
                  // eslint-disable-next-line no-console
                  console.error('The installing service worker became redundant.')
                  break
                default:
                  // Ignore
              }
            }
          }
        }).catch(e =>
          // eslint-disable-next-line no-console
          console.error(`Error during service worker registration: ${e}`))
      }
    })
  },

  methods: {
    // CSS Font Loading Module Level 3
    async loadFont () {
      const font = new FontFace('Custom Font', 'url(./fonts/custom.woff)')
      await font.load()

      document.fonts.add(font)
      document.getElementById('__nuxt').classList.add('font-loaded')
    }
  }
}
</script>

<style lang="stylus">
#__nuxt
  font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
#__nuxt.font-loaded
  font-size 1rem
  font-family "Custom Font"
</style>
