<template lang="pug">
header
  nuxt-link(to="/" @click.native="setFilter('all')") DETLEF SCHNEIDER #[span(v-if="loading") Filtering....]
  nav
    span.button(@click="setFilter(5)") Film
    span.dash
    span.button(@click="setFilter(3)") Fashion
    span.dash
    span.button(@click="setFilter(2)") Advertising
    span.dash
    span.button(@click="setFilter(4)") Sports
    span.dash
    nuxt-link.link(to="/about") About
    span.dash
    nuxt-link.link(to="/privacy") Privacy
    span.dash
    nuxt-link.link(to="/contact") Contact
</template>

<script>
  import r2 from 'r2'
export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async setFilter (value) {
      this.loading = true

      this.$router.push('/')
      let url
      if (value === 'all') {
         url = `https://cms.detlefschneider.com/wp-json/wp/v2/posts/?&per_page=20`
      } else {
         url = `https://cms.detlefschneider.com/wp-json/wp/v2/posts/?categories=${value}&per_page=100`

      }

      const res = await r2(url).response


      const list = await res.json()
      this.$store.commit('setPosts', list)
        window.scroll(0, 0)
       this.loading = false
    }
  }
}
</script>

<style lang="stylus" scoped>
header
  position sticky
  top 0
  background-color transparent
  height 64px
  display flex
  align-items center
  justify-content space-between
  padding-left 20px
  padding-right 20px
  transition all 250ms ease-in
  // margin-bottom 16px
  // outline 1px dashed tomato
  z-index 10
  &:hover
    background-color white
  a
    text-decoration none
  > a
    color #000
    font-size 18px
    letter-spacing 0.25px
    span
      color #999
      font-size 14px
nav
  .link
    font-size 14px
    margin-right 0.5vw
    // color #999
    &:hover
      color #000
    &:last-child
      margin-right 0
.link.nuxt-link-active
  color #000
.dash
  height 2px
  width 20px
  background-color #999
  display inline-block
  margin-left .5vw
  margin-right .5vw
  vertical-align middle
  transition all 250ms ease-in
  &:hover
    color #000
.button
  cursor pointer
  color #000
</style>
