<template lang="pug">
.div(ref="div")
  section(v-for="(p, index) in post[0].images" v-if="p.image_visibility"  :data-slide="index" :key="index")

    .s(v-if="p.img")
      img(ref="img" :datasrc="p.img.url" :datasrcset="p.img.sizes.w360 + ' 360w, ' + p.img.sizes.w720 + ' 720w, ' + p.img.url + ' 2000w'")
      svg(:height="p.img.height" :viewBox="'0 0 ' +  p.img.width + ' ' + p.img.height" :width="p.img.width" xmlns="http://www.w3.org/2000/svg")
        path(:d="'M0 0h' + p.img.width + 'v' + p.img.height + 'H0z'" fill="#f2f2f2")
    .s(v-else)
      .videoContainer(ref="videoContainer")
        iframe(ref="video" :src="'https://player.vimeo.com/video/'+p.vimeo+'?color=ffffff&byline=0&portrait=0'" width="100%"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen)

  section(:data-slide="count")
    .back
      div
        .content(v-if="post[0].content" v-html="post[0].content")
        h3(v-else v-html="post[0].title")
        nuxt-link(to="/" @click.native="featured()") Back to Overview
</template>

<script>
import('intersection-observer')
export default {
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
      width: '512px',
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

    const slides = [...this.$refs.div.getElementsByTagName('section')]
    const images = [...this.$refs.img]

    setTimeout(() => {
      this.observer =  new IntersectionObserver(entries =>{
        entries.forEach(change => {
          if (change.isIntersecting === true) {

            // https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
            if (window.matchMedia(`(max-width: ${this.width})`).matches) {
              const image = change.target.getElementsByTagName('img')[0]
              image.setAttribute('srcset', image.getAttribute('datasrcset'))
              image.setAttribute('src', image.getAttribute('datasrc'))
              // Need to observe
            } else {
              this.observer.unobserve(change.target)
              this.scrollIt(change.target, 500, 'easeInQuad')
              images.forEach(image => image.setAttribute('srcset', image.getAttribute('datasrcset')))
            }
          }
        })
      },{
        root: this.$refs.div[0],
        rootMargin: '-32px 0px -32px 0px',
        threshold: [0],
      })

      slides.forEach(slide => this.observer.observe(slide))
    }, 1000)

    if (this.$refs.videoContainer) {
      this.handleResize()
    }
  },

   beforeDestroy () {
    window.removeEventListener('resize', this.handleResize())
    this.observer.disconnect()
  },

  methods:{
    handleResize () {
      if (this.$refs.videoContainer) {
        this.videoContainerHeight =  this.$refs.videoContainer[0].clientHeight || 0
        const iframe = this.$refs.video[0]
        iframe.setAttribute('height', this.videoContainerHeight)
      }
    },
    featured () {
      this.$store.dispatch('nuxtServerInit')
    },
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
svg
  max-width 100%
  max-height 100%
  vertical-align middle
img
  position absolute
  top 0
  left 50%
  transform translateX(-50%)
// svg
//   path
//     fill tomato
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
  position:relative;
  height:100%;
  width:100%;
  overflow: hidden;


.videoContainer iframe
  position absolute
  top 0
  left 0
  object-fit cover
@media (max-width 512px)
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
  svg
    max-width none
    max-height none
    width 100%
    height auto
  section
    padding-top 0
    padding-bottom 16px
  .back
    height auto
    padding-top 56px
    padding-bottom 56px
</style>

