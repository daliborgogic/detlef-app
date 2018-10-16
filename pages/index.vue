<template lang="pug">
.container(ref="container")
  no-ssr
    isotope(ref="isotope" :options="option" :list="list")
      div(v-for="(l, index) in list" :key="index")
        .gutter
        .grid-sizer
        nuxt-link(:to="'/' + l.slug")
          TheCard(:card="l" :id="index" :class="{isVideo: l.categories.includes(5)}")
</template>

<script>
import r2 from 'r2'
import TheCard from '@/components/TheCard'

export default {
  name: 'Index',

  components: { TheCard },

  head () {
    return {
      titleTemplate: 'Detlef Schneider — Photographer'
    }
  },

  async asyncData () {
    const featured = await r2(`https://${process.env.CMS_DOMAIN}/wp-json/wp/v2/posts?per_page=100`).response
    const posts = await featured.json()

    const list = posts.map(post => {
      const { id, title, slug, sticky, content, acf, better_featured_image } = post

      return {
        id,
        title: title.rendered,
        slug: slug,
        sticky,
        hide: acf.hide,
        content: content.rendered,
        categories: post.categories,
        featuredImage: better_featured_image,
        images: acf.gallery_images,
        additional: acf.additional_gif
      }
    })
    return { list }
  },

  data () {
    return {
      sortOption: 'original-order',
      observer: null,
      images: null
    }
  },

  computed: {
    isVideo () {
      return this.$store.state.category
    },
    option () {
      return {
        filter: this.$store.getters.getCategory,
        masonry: {
          gutter: '.gutter',
          layout: 'masonry',
          horizontalOrder: true,
          transitionDuration: 0,
          columnWidth: '.grid-sizer',
          percentPosition: true
        },
        getFilterData: {
          sticky: el => { return !!el.sticky },
          film: el => {
            return !!el.categories.includes(5) && !!el.hide
          },
          fashion: el => {
            return !!el.categories.includes(3) && !!el.hide
          },
          advertising: el => {
            return !!el.categories.includes(2) && !!el.hide
          },
          sports: el => {
            return !!el.categories.includes(4) && !!el.hide
          }
        }
      }
    },
    filterOption () {
      return this.$store.state.category
    }
  },

  watch: {
    filterOption () {
      this.$refs.isotope.filter(this.$store.getters.getCategory)
    }
  },

  methods: {
    filter (key) { this.$refs.isotope.filter(key) }
  }
}
</script>

<style lang="stylus" scoped>
.container
  max-width 1320px // 30px + 1260px + 30px
  margin 0 auto 25vh auto
  padding-top 16px
  padding-left 30px
  padding-right 30px
.gutter
  width 30px
.grid-sizer
.item
  width calc(100% / 3 - 20px + 0.01px)
.isVideo
  // outline 1px dashed tomato
  // margin-bottom 50px
  >>> img
    width 100%
    height 100%
  >>> .placeholder
    width 100%
    height auto
  >>> img
    object-fit cover
  >>>.c
    height 100%
    margin-bottom 0
@media (max-width 511px)
  .container
    padding-top 0
    padding-left 16px
    padding-right 16px
  .gutter
    width 8px
  .grid-sizer
  .item
    width 100%
  .isVideo
    margin-bottom 16px
@media (min-width 512px) and (max-width 1024px) and (orientation portrait)
  .container
    padding-left 30px
    padding-right 30px
  .gutter
    width 30px
  .grid-sizer
  .item
    width calc(50% - 15px)
</style>

