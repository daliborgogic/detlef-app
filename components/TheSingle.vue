<template lang="pug">
.div(ref="div")
  section(v-for="(p, index) in post[0].images" v-if="p.image_visibility" :key="index")

    .s(v-if="p.img")
      img(
        ref="img"
        :src="p.img.sizes.large"
        :srcset="`data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==`"
        :datasrcset="p.img.sizes.w370 + ' 370w, ' + p.img.sizes.w740 + ' 740w, ' + p.img.url + ' 2000w'"
        :alt="p.img.alt_text"
      )
      svg.placeholder(:height="p.img.height" :viewBox="'0 0 ' +  p.img.width + ' ' + p.img.height" :width="p.img.width" xmlns="http://www.w3.org/2000/svg")
          path(:d="'M0 0h' + p.img.width + 'v' + p.img.height + 'H0z'" fill="#f2f2f2")
    .s(v-else)
      .videoContainer(ref="videoContainer")
        iframe(ref="video" :src="'https://player.vimeo.com/video/'+p.vimeo+'?color=ffffff&portrait=0&title=0&byline=0&portrait=0'" width="100%"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen)

  section(:data-slide="count")
    .back
      div
        .content(v-if="post[0].content" v-html="post[0].content")
        h3(v-else v-html="post[0].title")
        TheSubscribe
        nuxt-link(to="/" @click.native="featured()") Back to Overview
</template>

<script>
export default {
  components: {
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
    return {
      title: this.post[0].title
    }
  },

  computed: {
    count () {
      return this.post[0].images.length
    }
  },

  async mounted () {
    window.addEventListener('resize', () => this.handleResize())

    if (this.$refs.videoContainer) {
      this.handleResize()
    }

    const slides = [...document.getElementsByTagName('section')]

    if ('IntersectionObserver' in window) {
      this.observer =  new IntersectionObserver(entries =>{
        entries.forEach(change => {
          if (change.isIntersecting) {

            // https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
            if (window.matchMedia(`(min-width: 512px`).matches) {
              // this.observer.unobserve(change.target)
              this.scrollIt(change.target, 500, 'easeInQuad')
              // images.forEach(image => image.setAttribute('srcset', image.getAttribute('datasrcset')))
            }

            const image = change.target.getElementsByTagName('img')[0]
            if (image) {
              image.setAttribute('srcset', image.getAttribute('datasrcset'))
            }
          }
        })
      },{
        root: this.$refs.div[0],
        rootMargin: '-32px 0px -32px 0px',
        threshold: [0],
      })

      slides.forEach(slide => this.observer.observe(slide))
    } else {
      // Not Supported
      slides.forEach(slide => {
        const image = slide.getElementsByTagName('img')[0]
        image.setAttribute('srcset', image.getAttribute('datasrcset'))
      })
    }

  },

  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize())
    if ('IntersectionObserver' in window) {
      this.observer.disconnect()
    }
  },

  methods:{
      handleResize () {
      if (this.$refs.videoContainer) {
        this.videoContainerHeight =  this.$refs.videoContainer[0].clientHeight || 0
        const iframe = this.$refs.video[0]
        iframe.setAttribute('height', this.videoContainerHeight)
      }
    },
    featured () { this.$store.dispatch('nuxtServerInit') },
    wh () {
      return window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight
    },
    scrollIt (destination, duration = 200, easing = 'linear', callback) {
      const easings = {
        easeInQuad(t) {
          return t * t
        },
        easeOutQuad(t) {
          return t * (2 - t)
        }
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
.div
  position absolute
  top 0
  left 0
  width 100%
  height 100%
section
  padding-top 64px
  padding-bottom 64px
.s
  width 100%
  height calc(100vh - 128px)
  position relative
img
.placeholder
  max-width 100%
  max-height 100%
  vertical-align middle
img
  position absolute
  top 0
  left 50%
  transform translateX(-50%)
.back
  height calc(100vh - 128px)
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
    line-height 1.3
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
.videoContainer iframe
  position absolute
  top 0
  left 0
  object-fit cover
@media (max-width 512px)
  .external
  .externalImg
    position relative
    top auto
    left auto
    transform translate(0, 0)
  .videoContainer
    padding-bottom 56%
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

