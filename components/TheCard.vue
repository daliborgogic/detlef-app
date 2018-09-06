<template lang="pug">
.c(ref="div")
  .overlay
    h3(v-if="card.title" v-html="card.title")
  span(v-if="card.images")
    span(v-if="card.featuredImage")
      //- It's a video
      span(v-if="card.categories.includes(5)")
        img(ref="img"
          :src="'https://' + tld + '/wp-content/uploads/' + card.featuredImage.media_details.file"
          alt="")
        TheLoading
        svg.placeholder(width="400" height="225" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg")
          path(d="M0 0h400v225H0z" fill="#f2f2f2")
      span(v-else)
        img(
          ref="img"
          :src="card.featuredImage.media_details.sizes.w400.source_url"
          :alt="card.featuredImage.alt_text")
        TheLoading
        svg.placeholder(
          :height="card.featuredImage.media_details.sizes.w400.height"
          :viewBox="'0 0 ' +  card.featuredImage.media_details.sizes.w400.width + ' ' + card.featuredImage.media_details.sizes.w400.height"
          :width="card.featuredImage.media_details.sizes.w400.width" xmlns="http://www.w3.org/2000/svg")
          path(
            :d="'M0 0h' + card.featuredImage.media_details.sizes.w400.width + 'v' + card.featuredImage.media_details.sizes.w400.height + 'H0z'"
            fill="#f2f2f2")
</template>

<script>
import TheLoading from '@/components/TheLoading'

export default {
  components: { TheLoading },

  props: {
    card: {
      type: Object,
      default () {
        return []
      }
    },
    id: {
      type: [Number, String],
      default: null
    }
  },

  data () {
    return {
      tld: process.env.CMS_DOMAIN,
      images: [],
      observer: null
    }
  },

  computed: {
    isGif () {
      this.images.forEach(img => img.setAttribute('src', img.getAttribute('datasrc')))
      const { w400 } = this.card.featuredImage.media_details.sizes
      return w400['mime-type'] === 'image/gif'
    }
  },

  mounted () {
    this.images =  [...document.getElementsByTagName('img')]

    if ('IntersectionObserver' in window) {
      this.observer =  new IntersectionObserver(entries =>{
        entries.forEach(change => {
          if (change.isIntersecting) {
            const image = change.target
            if (image) {
              //image.setAttribute('src', image.getAttribute('datasrc'))
              this.observer.unobserve(image)
            }
          }
        })
      },{
        root: this.$refs.div[0],
        rootMargin: '0px',
        threshold: [0],
      })

      this.images.forEach(img => this.observer.observe(img))
    } else {
      // IntersectionObserver  Not Supported
      this.images.forEach(img => img.setAttribute('src', img.getAttribute('datasrc')))
    }
  },

  beforeDestroy () {
    if ('IntersectionObserver' in window) {
      this.observer.disconnect()
    }
  }
}
</script>


<style lang="stylus" scoped>
.c
  position relative
  margin-bottom 50px

  transition opacity 250ms ease-in
  &:hover .overlay
    opacity 1
  &:hover .iconPlay
    opacity 0
img
  // border 1px solid #f2f2f2
  z-index 3
img
svg
  width 100%
  height auto
  vertical-align middle
img
.overlay
  position absolute
  top 0
  left 0
.overlay
  width 100%
  height 100%
  background-color rgba(255,255,255,0.7)
  z-index 4
  display flex
  align-items center
  justify-content center
  opacity 0
  cursor pointer

h3
  color black
  margin-top 0
  margin-bottom 0
  font-size 23px
  letter-spacing 0.2px
  line-height 30px
  font-weight normal
  text-align center
  padding-left 20px
  padding-right 20px
</style>
