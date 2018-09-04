<template lang="pug">
.container(ref="container")
  no-ssr
    isotope(ref="isotope" :options="option" :list="list")
      div(v-for="(l, index) in list" :key="index" :class="{isVideo: l.categories.includes(5)}")
        .gutter
        .grid-sizer
        div(@click="setCategory(l.categories[0], l.slug)")
          TheCard(:card="l")
</template>

<script>
import TheCard from '@/components/TheCard'
import { timeout } from  '~/plugins/helpers'
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
    filterOption () { return this.$store.state.category },
    list () {
      return this.$store.state.posts
    }
  },

  watch: {
    filterOption () { this.$refs.isotope.filter(this.$store.getters.getCategory) }
  },
  methods: {
    filter (key) { this.$refs.isotope.filter(key) },
    async setCategory (category, slug) {
      this.$router.push('/' + slug)
      await timeout(500)
      this.$store.commit('setCategory', category)
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  max-width 1292px // 16px + 1260px + 16px
  margin 0 auto 10vh auto
  padding-top 16px
  padding-left 16px
  padding-right 16px
.gutter
  width 30px
.grid-sizer
.item
  width calc(100% / 3 - 20px + 0.01px)
.isVideo
  // outline 1px dashed tomato
  margin-bottom 50px
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
@media (max-width 512px)
  .container
    padding-top 0
  .gutter
    width 0
  .grid-sizer
  .item
    width 100%
  .c
    margin-bottom 32px
  .isVideo
    margin-bottom 32px
@media (min-width 512px) and (max-width 1024px) and (orientation portrait)
  .gutter
    width 16px
  .grid-sizer
  .item
    width calc(50% - 8px)
</style>

