<template lang="pug">
.container(ref="container")
  no-ssr
    isotope(
      ref="isotope"
      :options="option"
      :list="list")
      div(v-for="(l, index) in list" :key="index")
        .gutter
        .grid-sizer
        a(v-if="RegExp('^https?://|^//').test(l.ad_link)" :href="l.ad_link")
          TheCard(:card="l")
        nuxt-link(v-else :to="'/' + l.slug")
          TheCard(:card="l")
</template>

<script>
import TheCard from '@/components/TheCard'
export default {
  name: 'Index',

  components: { TheCard },

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
          sticky: el => { return !!el.sticky },
          film: el => { return !!el.categories.includes(5) },
          fashion: el => { return !!el.categories.includes(3) },
          advertising: el => { return !!el.categories.includes(2) },
          sports: el => { return !!el.categories.includes(4) }
        }
      }
    },
    filterOption () { return this.$store.state.category },
    list () {
      return this.$store.state.posts
    }
  },

  watch: {
    filterOption (option) { this.$refs.isotope.filter(this.slug(option)) }
  },
  methods: {
    filter (key) { this.$refs.isotope.filter(key) },

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
          s = 'sticky'
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
.gutter
  width 15px
.grid-sizer
.item
  width calc(100% / 3 - 9.99px)
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

