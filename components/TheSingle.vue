<template lang="pug">
.div(ref="div")
  section(v-for="(p, index) in post[0].acf.gallery_images" v-if="p.image_visibility"  :data-slide="index" :id="index")
    //- pre {{p}}
    .s(v-if="p.img")
      img(:datasrc="p.img.url")
      svg(:height="p.img.height" :viewBox="'0 0 ' +  p.img.width + ' ' + p.img.height" :width="p.img.width" xmlns="http://www.w3.org/2000/svg")
        path(:d="'M0 0h' + p.img.width + 'v' + p.img.height + 'H0z'" fill="#f2f2f2")
    .s(v-else)
      .videoContainer()
        iframe(ref="video" :src="'https://player.vimeo.com/video/'+p.vimeo+'?color=ffffff&byline=0&portrait=0'" width="100%"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen)

  section(:data-slide="count" :id="count")
    .back
      div
        .content(v-if="post[0].content.rendered" v-html="post[0].content.rendered")
        h3(v-else v-html="post[0].title.rendered")
        nuxt-link(to="/") Back to Overview
</template>

<script>
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
      slides: 0,
      observer: null
    }
  },

  computed: {
    count () {
      return this.post[0].acf.gallery_images.length
    }
  },

  mounted () {
    let self = this
    const slides = [...self.$refs.div.getElementsByTagName('section')]
    this.slides = slides.length - 1
    if (typeof IntersectionObserver === 'undefined') {
      console.warn(`IntersectionObserver API is not available in your browser.`)

      import('intersection-observer')
    } else  {
      setTimeout(() => {
        self.observer =  new IntersectionObserver(entries =>{
          entries.forEach(change => {
            if (change.isIntersecting === true) {
              const count = change.target.getAttribute('data-slide')

              if (slides.length - count !== 1) {
                const image = change.target.getElementsByTagName('img')[0]
                image.setAttribute('src', image.getAttribute('datasrc'))
                }

              self.scrollIt(change.target, 300, 'easeOutQuad')
              self.observer.unobserve(change.target)
            }
          })
        },{
        root: this.$refs.div[0],
        rootMargin: '-64px',
        threshold: [0],
      })

        slides.forEach(slide => self.observer.observe(slide))
      }, 1000)
    }
    // this.$refs.a[0].setAttribute('tabindex', 0)
    // if (this.$refs.a) {
      // let sefl = this
      // const { videoParent } = sefl.$refs
      // console.log(sefl.$refs.video)
      // if (videoParent) {
      //   let videoParentHeight = videoParent.clientHeight || 0
      //   console.log({videoParentHeight})
      //   const iframe = this.$refs.video
      //   iframe.setAttribute('height', videoParentHeight)
      // }

    // }
  },

  destroyed() {
    // console.log('observer destroyed')
    this.observer.disconnect()
  },

  methods:{
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
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight
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
  height 100%
.s
  width 100%
  height 100%
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
  transform: translateX(-50%);
.back
  height 100%
  display flex
  align-items center
  text-align center

  max-width 500px
  margin 0 auto
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
  object-fit: cover;
</style>

