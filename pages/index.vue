<template lang="pug">
.container(ref="container")
  no-ssr
    isotope(
      ref="isotope"
      :options="option"
      :list="list")
      nuxt-link(
        tag="div"
        v-for="(l, index) in list"
        :key="index"
        :to="'/' + l.slug")
        .gutter
         .grid-sizer
        .c
          .overlay
            h3(v-if="l.title" v-html="l.title")
          svg.iconPlay(
            v-if="l.images[0].vimeo && filterOption !== 5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24")
            path(d="M8 5v14l11-7z" fill="#ffffff")
            path(d="M0 0h24v24H0z" fill="none")
          //- span(v-if="l.featuredImage")
          img(
            ref="img"
            src="l.featuredImage.w360.source_url"
            :srcset="`data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==`"
            :datasrcset="srcset(l.featuredImage)"
            :alt="l.featuredImage.alt_text")
          svg.placeholder(
            :height="l.featuredImage.w360.height"
            :viewBox="'0 0 ' +  l.featuredImage.w360.width + ' ' + l.featuredImage.w360.height"
            :width="l.featuredImage.w360.width" xmlns="http://www.w3.org/2000/svg")
            path(
              :d="'M0 0h' + l.featuredImage.w360.width + 'v' + l.featuredImage.w360.height + 'H0z'"
              fill="#F2F2F2")
</template>

<script>
import('intersection-observer')
export default {
  name: 'Index',

  head () {
    return {
      titleTemplate: 'Detlef Schneider — Photographer'
    }
  },

  data () {
    return {
      sortOption: 'original-order',
      observer: null,
      images: null
    }
  },

  computed: {
    option () {
      return {
        filter: this.slug(this.$store.state.category),
        masonry: {
          gutter: '.gutter',
          layout: 'masonry',
          horizontalOrder: true,
          transitionDuration: 0,
          columnWidth: '.grid-sizer',
          percentPosition: true
        },
        getFilterData: {
          featured: el => { return !!el.featured },
          film: el => { return !!el.categories.includes(5) },
          fashion: el => { return !!el.categories.includes(3) },
          advertising: el => { return !!el.categories.includes(2) },
          sports: el => { return !!el.categories.includes(4) }
        }
      }
    },
    filterOption () { return this.$store.state.category },
    list () { return this.$store.state.posts }
  },

  watch: {
    filterOption (option) { this.$refs.isotope.filter(this.slug(option)) }
  },

 async mounted () {
    await timeout(1000)

    const images = [...this.$refs.img]
    this.observer =  new IntersectionObserver(entries =>{
      entries.forEach(change => {
        if (change.isIntersecting === true) {
          change.target.setAttribute('srcset', change.target.getAttribute('datasrcset'))
          this.observer.unobserve(change.target)
        }
      })
    },{
      root: this.$refs.container[0],
      rootMargin: '0px',
      threshold: [0],
    })

    images.forEach(image => this.observer.observe(image))
  },

  beforeDestroy () {
    this.observer.disconnect()
  },

  methods: {
    timeout (ms) {
      new Promise(res => setTimeout(res, ms))
    },
    filter (key) { this.$refs.isotope.filter(key) },

    srcset (value) {
      const {w360, w720} = value
      return `${w360.source_url} 1x, ${w720.source_url} 2x`
    },

    slug (value) {
      let s
      switch(value) {
        case(2):
          s = 'advertising'
          break
        case(3):
          s = 'fashion'
          break
        case(4):
          s = 'sports'
          break
        case(5):
          s = 'film'
          break
        default:
          s = 'featured'
      }
      return s
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  max-width 1172px
  margin 0 auto 10vh auto
  padding-left 16px
  padding-right 16px
// @media (max-width 512px)
//   .container
//     padding-left
//     padding-right
img
svg
  width 100%
  height auto
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
  width 32px
  height 32px
  position absolute
  top calc(50% - 16px)
  left calc(50% - 16px)
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
.grid-sizer
.item
  width calc(100% / 3 - 20px)
@media (max-width 512px)
  .gutter
    width 0
  .grid-sizer
  .item
    width 100%
  .c
    margin-bottom 16px
@media (min-width 512px) and (max-width 1024px) and (orientation portrait)
  .gutter
    width 16px
  .grid-sizer
  .item
    width calc(50% - 8px)
</style>

