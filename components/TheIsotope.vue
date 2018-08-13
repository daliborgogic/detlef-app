<template lang="pug">
no-ssr
  isotope(:options="option" :list="list")
    nuxt-link(tag="div" v-for="(l, index) in list" :key="l.id" :to="'/' + cat(l.categories) +'/'+ l.slug")
      .gutter
      .c
        //- (v-if="!l.acf.hide")
        .overlay
          h3(v-if="l.title.rendered" v-html="l.title.rendered")
        svg.iconPlay(v-if="l.acf.gallery_images[0].vimeo && $route.path !== '/film'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24")
          path(d="M8 5v14l11-7z" fill="#ffffff")
          path(d="M0 0h24v24H0z" fill="none")
        img(ref="img" v-if="l.better_featured_image" :datasrc="l.better_featured_image.media_details.sizes.w360.source_url" :alt="l.better_featured_image.alt_text")
        svg.placeholder(v-if="l.better_featured_image" :height="l.better_featured_image.media_details.sizes.w360.height" :viewBox="'0 0 ' +  l.better_featured_image.media_details.sizes.w360.width + ' ' + l.better_featured_image.media_details.sizes.w360.height" :width="l.better_featured_image.media_details.sizes.w360.width" xmlns="http://www.w3.org/2000/svg")
          path(:d="'M0 0h' + l.better_featured_image.media_details.sizes.w360.width + 'v' + l.better_featured_image.media_details.sizes.w360.height + 'H0z'" fill="#F2F2F2")
      //- pre(v-if="!l.acf.hide").
      //-   {{cat(l.categories)}}
</template>

<script>
export default {
  // name: 'Isotope',
  props: {
    list: {
      type: Array,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      observer: null,
      option:  {
        masonry: {
           gutter: '.gutter'
        }
      }
    }
  },
  mounted () {
    let self  = this
    if (typeof IntersectionObserver === 'undefined') {
      console.warn(`IntersectionObserver API is not available in your browser.`)
      import('intersection-observer')
    } else  {
      self.observer =  new IntersectionObserver(entries => {
        entries.forEach(change => {
          if (change.isIntersecting === true) {
            change.target.setAttribute('src', change.target.getAttribute('datasrc'))
            self.observer.unobserve(change.target)
          }
        })
      })

      self.$nextTick(() => {
        self.$refs.img.forEach(slide => self.observer.observe(slide))
      })
    }
  },

  destroyed() {
    this.observer.disconnect()
  },

  methods: {
    cat (val) {
      let b
      val.map(x => {
        if (x === 2) {
          b = 'advertising'
        }
        if (x === 3) {
          b = 'fashion'
        }
        if (x === 4) {
          b = 'sports'
        }
        if (x === 5) {
          b = 'film'
        }
      })
      return b
    }

  }
}
</script>

<style lang="stylus" scoped>
img
svg
  vertical-align middle
.c
  position relative
  margin-bottom 50px
  // outline 1px dashed tomato
  transition opacity 250ms ease-in
  &:hover .overlay
    opacity 1
  &:hover .iconPlay
    opacity 0
.iconPlay
  position absolute
  top calc(50% - 12px)
  left calc(50% - 12px)
  z-index 1
img
.overlay
  position absolute
  top 0
  left 0
.overlay
  width 100%
  height 100%
  background-color rgba(255,255,255,0.7)
  z-index 3
  display flex
  align-items center
  justify-content center
  opacity 0
.item
  width 360px
  // outline 1px dashed
  cursor pointer
  pre
    overflow-x scroll
h3
  margin-top 0
  margin-bottom 0
  font-size 23px
  letter-spacing 0.2px
  line-height 30px
  font-weight normal
  text-align center
  padding-left 20px
  padding-right 20px
.gutter
  width 30px
</style>

