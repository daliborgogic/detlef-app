<template lang="pug">
.div(ref="div")
  section(v-for="(p, index) in post[0].images" v-if="p.image_visibility" :key="index")
    .s(v-if="p.img")
      img(
        ref="img"
        :src="p.img.sizes.w1920"
        :srcset="`data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==`"
        :datasrcset="p.img.sizes.w400 + ' 400w, ' + p.img.sizes.w800 + ' 800w, ' + p.img.sizes.w1920 + ' 2000w'"
        :alt="p.img.alt_text"
      )
      TheLoading
      svg.placeholder(:height="p.img.height" :viewBox="'0 0 ' +  p.img.width + ' ' + p.img.height" :width="p.img.width" xmlns="http://www.w3.org/2000/svg")
          path(:d="'M0 0h' + p.img.width + 'v' + p.img.height + 'H0z'" fill="#f2f2f2")
    .s(v-else)
      .videoContainer(ref="videoContainer")
        iframe(ref="video" :src="'https://player.vimeo.com/video/'+p.vimeo+'?color=ffffff&portrait=0&title=0&byline=0&portrait=0'" width="100%"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen)
        TheLoading
        svg.videoPlaceholder(v-if="$route.path === '/walk-music'" width="754" height="377" viewBox="0 0 754 377" xmlns="http://www.w3.org/2000/svg")
            path(d="M0 0h754v377H0z" fill="#f2f2f2")
        svg.videoPlaceholder(v-else width="400" height="225" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg")
            path(d="M0 0h400v225H0z" fill="#f2f2f2")


  section(:data-slide="count")
    .back
      div
        .content(v-if="post[0].content" v-html="post[0].content")
        h3(v-else v-html="post[0].title")
        TheSubscribe
        //- Back to Overview
        nuxt-link.cat(v-for="c, index in post[0].categories" to="/" @click.native="categorySet(c)" :key="index") {{ categoryName(c) }}
          span(v-if="post[0].categories.slice(-1)[0] === c")
          span(v-else) ,&nbsp;
</template>

<script>
import TheLoading from '@/components/TheLoading'

export default {
  components: {
    TheLoading,
    TheSubscribe: () => import('@/components/TheSubscribe')
  },

  props: {
    post: {
      type: Array,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      slides: 0,
      videoContainerHeight: 0,
      observer: null
    }
  },

  head () {
    const { title, content, images } = this.post[0]
    const clean = content.replace(/<\/?[^>]+(>|$)/g, '') || title

    let meta = [
      { hid: 'description', name: 'description', content: clean },
      { hid: 'og:title', property: 'og:title', content: title },
      { hid: 'og:description', property: 'og:description', content: clean },
      { hid: 'og:url', property: 'og:url', content: `https://${process.env.APP_DOMAIN + this.$route.path}` }
    ]

    if (images[0].vimeo) {
      console.log('VIMEO') // eslint-disable-line
      meta.push(
        { hid: 'og:video:type', property: 'og:video:type', content: 'text/html' },
        { hid: 'og:video:url', property: 'og:video:url', content: `https://player.vimeo.com/video/${images[0].vimeo}?autoplay=1` },
        { hid: 'og:video:secure_url', property: 'og:video:secure_url', content: `https://player.vimeo.com/video/${images[0].vimeo}?autoplay=1` },
        { hid: 'video:tag', property: 'video:tag', content: title },
        { hid: 'video:tag', property: 'video:tag', content: process.env.FIRST_NAME + ' ' + process.env.LAST_NAME }
      )
    }

    if (images[0].img) {
      console.log('IMG') // eslint-disable-line
      meta.push(
        { hid: 'og:image', property: 'og:image', content: images[0].img.sizes.w1920 },
        { hid: 'og:image:width', property: 'og:image:width', content: images[0].img.width },
        { hid: 'og:image:height', property: 'og:image:height', content: images[0].img.height }
      )
    }
    console.log(meta) // eslint-disable-line
    return {
      title,
      meta
    }
  },

  computed: {
    count () {
      return this.post[0].images.length
    }
  },

  async mounted () {
    window.addEventListener('resize', () =>
      this.handleResize()
    )
    if (this.$route.name === 'slug' && this.$refs.videoContainer) {
      this.handleResize()
    }

    const slides = [...document.getElementsByTagName('section')]

    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(async change => {
          if (change.isIntersecting) {
            const image = change.target.getElementsByTagName('img')[0]
            if (image) {
              image.setAttribute('srcset', image.getAttribute('datasrcset'))
              this.observer.unobserve(image)
            }
            if (window.matchMedia('(min-width: 512px)').matches)
              this.scrollIt(change.target, 500)
          }
        })
      },{
        root: this.$refs.div[0],
        rootMargin: '-40px 0px -40px 0px',
        threshold: [0]
      })

      slides.forEach(slide => this.observer.observe(slide))
    } else {
      // IntersectionObserver  Not Supported
      slides.forEach(slide => {
        const image = slide.getElementsByTagName('img')[0]
        image.setAttribute('srcset', image.getAttribute('datasrcset'))
      })
    }

  },

  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize())

    if ('IntersectionObserver' in window)
      this.observer.disconnect()
  },

  methods: {
    handleResize () {
      if (this.$refs.videoContainer && this.$route.name === 'slug') {
        this.videoContainerHeight =  this.$refs.videoContainer[0].clientHeight || 0
        const iframe = this.$refs.video[0]
        iframe.setAttribute('height', this.videoContainerHeight)
      }
    },
    featured () { this.$store.dispatch('nuxtServerInit') },
    categoryName (value) {
      let cat
      switch(value) {
        case(2):
          cat = 'advertising'
          break
        case(3):
          cat = 'fashion'
          break
        case(4):
          cat = 'sports'
          break
        case(5):
          cat = 'film'
          break
        default:
          cat = 'sticky'
      }
      return cat
    },
    categorySet (value) {
      this.$store.commit('setCategory', value)
    },
    wh () {
      return window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight
    },
    scrollIt (destination, duration = 200, easing = 'linear', callback) {
      const easings = {
        linear (t) { return t },
      }
      const start = window.pageYOffset
      const startTime = 'now' in window.performance ? performance.now() : new Date().getTime()
      const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
      const windowHeight = this.wh()
      const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop
      const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset)

      if ('requestAnimationFrame' in window === false) {
        window.scroll(0, destinationOffsetToScroll)
        if (callback) {
          callback()
        }
        return
      }

      function scroll() {
        const now = 'now' in window.performance ? performance.now() : new Date().getTime()
        const time = Math.min(1, ((now - startTime) / duration))
        const timeFunction = easings[easing](time)
        window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start))
        if (window.pageYOffset === destinationOffsetToScroll) {
          if (callback) {
            callback()
          }
          return
        }
        requestAnimationFrame(scroll)
      }
      scroll()
    }
  }
}
</script>

<style lang="stylus" scoped>
.cat
  text-transform capitalize
.div
  position absolute
  top 0
  left 0
  width 100%
  height 100%
section
  padding-top 80px
  padding-bottom 80px
.s
  width 100%
  padding-left 30px
  padding-right 30px
  height calc(100vh - 160px)
  position relative
img
.placeholder
  max-width 100%
  max-height 100%
  vertical-align middle
img
  position absolute
  // border 1px solid #f2f2f2
  top 0
  left 50%
  transform translateX(-50%)
  z-index 3
.back
  height calc(100vh - 160px)
  display flex
  align-items center
  text-align center
  max-width 500px
  margin 0 auto
  h3
    font-weight 400
  // flex-grow 1
  > div
    width 100%
  >>> .content p
    margin 0
    font-size 23px
    line-height 1.4
    letter-spacing 0.171px
  a
    font-size 13px
    color #000
    text-decoration none
.videoContainer
  position relative
  height 100%
  width 100%
  overflow: hidden
  z-index 4
.videoContainer iframe
  position absolute
  top 0
  left 0
  z-index 3
  object-fit cover
.videoPlaceholder
  vertical-align middle
  object-fit cover
  width 100%
  height 100%
@media (max-width 512px)
  .s
    padding-left 0
    padding-right 0
  .external
  .externalImg
    position relative
    top auto
    left auto
    transform translate(0, 0)
  .div
    top 64px
    height auto
    padding-left 16px
    padding-right 16px
  .s
    height auto
  img
  .placeholder
  .externalPlaceholder
  .videoPlaceholder
    max-width none
    max-height none
    width 100%
    height auto
  .externalImg
    max-width none
    max-height none
  section
    padding-top 0
    padding-bottom 32px
  .back
    height auto
    padding-top 56px
    padding-bottom 56px
</style>

