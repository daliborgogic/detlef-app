<template lang="pug">
no-ssr
  isotope(ref="a" :options="option" :list="list")
    nuxt-link(tag="div" v-for="(l, index) in list" :key="index" :to="'/' + l.slug")
      .gutter
      .c
        .overlay
          h3(v-if="l.title.rendered" v-html="l.title.rendered")
        svg.iconPlay(v-if="l.acf.gallery_images[0].vimeo && $route.path !== '/film'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24")
          path(d="M8 5v14l11-7z" fill="#ffffff")
          path(d="M0 0h24v24H0z" fill="none")
        span(v-if="l.better_featured_image")
          img(ref="img" :src="l.better_featured_image.media_details.sizes.w360.source_url" :alt="l.better_featured_image.alt_text")
          svg.placeholder(:height="l.better_featured_image.media_details.sizes.w360.height" :viewBox="'0 0 ' +  l.better_featured_image.media_details.sizes.w360.width + ' ' + l.better_featured_image.media_details.sizes.w360.height" :width="l.better_featured_image.media_details.sizes.w360.width" xmlns="http://www.w3.org/2000/svg")
            path(:d="'M0 0h' + l.better_featured_image.media_details.sizes.w360.width + 'v' + l.better_featured_image.media_details.sizes.w360.height + 'H0z'" fill="#F2F2F2")
</template>

<script>
const timeout = ms => new Promise(res => setTimeout(res, ms))

export default {
  data () {
    return {
      option:  {
        masonry: {
          gutter: '.gutter',
          horizontalOrder: true,
          transitionDuration: 0
        }
      }
    }
  },

  computed: {
    list () {
      return this.$store.state.posts
    }
  },

  async updated () {
    await timeout(200)
    this.$refs.a.iso.reloadItems()
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
</style>

