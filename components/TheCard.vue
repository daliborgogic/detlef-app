<script>
export default {
  props: {
    card: {
      type: Object,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      tld: process.env.CMS_DOMAIN
    }
  },

  computed: {
    isGif () {
      const { w400 } = this.card.featuredImage.media_details.sizes
      return w400['mime-type'] === 'image/gif'
    }
  }
}
</script>

<template lang="pug">
.c
  .overlay
    h3(v-if="card.title" v-html="card.title")
  span(v-if="card.images")
    span(v-if="card.images[0].vimeo")
      svg.iconPlay(
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24")
        path(d="M8 5v14l11-7z" fill="#ffffff")
        path(d="M0 0h24v24H0z" fill="none")
  span(v-if="card.featuredImage")
    span(v-if="card.categories.includes(5)")
      img(
        :src="'https://' + tld + '/wp-content/uploads/' + card.featuredImage.media_details.file"
        :alt="card.featuredImage.alt_text")
      svg.placeholder(width="400" height="225" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg")
        path(d="M0 0h400v225H0z" fill="#F2F2F2")
    span(v-else)
      img(:src="card.featuredImage.media_details.sizes.w400.source_url"  :alt="card.featuredImage.alt_text")
      svg.placeholder(
        :height="card.featuredImage.media_details.sizes.w400.height"
        :viewBox="'0 0 ' +  card.featuredImage.media_details.sizes.w400.width + ' ' + card.featuredImage.media_details.sizes.w400.height"
        :width="card.featuredImage.media_details.sizes.w400.width" xmlns="http://www.w3.org/2000/svg")
        path(
          :d="'M0 0h' + card.featuredImage.media_details.sizes.w400.width + 'v' + card.featuredImage.media_details.sizes.w400.height + 'H0z'"
          fill="#F2F2F2")
</template>

<style lang="stylus" scoped>
.c
  position relative
  margin-bottom 50px
  // outline 1px dashed tomato
  transition opacity 250ms ease-in
  &:hover .overlay
    opacity 1
  &:hover .iconPlay
    opacity 0
img
svg
  width 100%
  height auto
  vertical-align middle
img
  object-fit cover

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
  width 370px
  // outline 1px dashed
  cursor pointer
  pre
    overflow-x scroll
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
