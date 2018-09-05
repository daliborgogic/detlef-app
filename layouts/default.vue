<template lang="pug">
div
  TheHeader
  main
    nuxt
  TheSnackBar
</template>

<script>
import io from 'socket.io-client'
import TheHeader from '@/components/TheHeader'
import { timeout } from  '~/helpers'

export default {
  components: {
    TheHeader,
    TheSnackBar: () => import('@/components/TheSnackBar')
  },

  beforeMount () {
    this.loadFont()
  },

  async mounted () {
    const socket = io.connect()

    socket.on('hooks', hook => {
      const { id, title, slug, sticky, content, acf, better_featured_image } = hook

      const postMap =  {
        id,
        title: title.rendered,
        slug: slug,
        sticky,
        hide: acf.hide,
        content: content.rendered,
        categories: hook.categories,
        featuredImage: better_featured_image,
        images: acf.gallery_images
      }

      this.$store.commit('setPost', [postMap])

      let posts = this.$store.state.posts

      const getId = posts.findIndex(i => { return i.id === hook.id })

      posts[getId].title = title.rendered
      posts[getId].slug = slug,
      posts[getId].sticky = sticky
      posts[getId].hide = acf.hide
      posts[getId].content = content.rendered
      posts[getId].categories = hook.categories
      posts[getId].featuredImage = better_featured_image
      posts[getId].images = acf.gallery_images

      console.log([postMap]) //eslint-disable-line

      // console.log({hook}) // eslint-disable-line
      this.$store.commit('setPosts', posts)
    })

    window.addEventListener('load', () => {
      if ('serviceWorker' in navigator && location.protocol === 'https:') {
        //var preventDevToolsReloadLoop
        navigator.serviceWorker.register('sw.js').then(reg => {
          //if (preventDevToolsReloadLoop) return
          //preventDevToolsReloadLoop = true

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
          navigator.serviceWorker.addEventListener('message', event =>
            // eslint-disable-next-line no-console
            console.log(event.data.message)
          )
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
