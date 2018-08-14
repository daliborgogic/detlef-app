<template lang="pug">
header(ref="header")
  nuxt-link.link(to="/" @click.native="fetaured()") DETLEF SCHNEIDER #[span.loading(v-if="loading") Loading...]
  nav
    span.link(@click="category(5)") Film
    span.dash
    span.link(@click="category(3)") Fashion
    span.dash
    span.link(@click="category(2)") Advertising
    span.dash
    span.link(@click="category(4)") Sports
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
  computed: {
    loading () {
      return this.$store.state.loading
    },
    count () {
      return this.$store.state.posts.length
    }
  },

  mounted () {
    setTimeout(() => {
      // this.$refs.header.classList.add('loaded')
    }, 3000)
  },

  methods: {
    async fetaured () {
      this.$store.dispatch('nuxtServerInit')
    },
    async category (value) {
      this.$store.commit('setLoading', true)
      const res = await r2(`https://${process.env.CMS}/wp-json/wp/v2/posts?categories=${value}&hide=1&per_page=100`).response
      const posts = await res.json()
      this.$router.push('/')
      this.$store.commit('setPosts',  posts)
      this.$store.commit('setLoading', false)
    }
  }
}
</script>


<style lang="stylus" scoped>
header
  position fixed
  top 0
  left 0
  width 100%
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
.loaded
  opacity: 0.1
  &:hover
    opacity 1
nav
  .link
    font-size 16px
    margin-right 0.5vw
    cursor pointer
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
.loading
  font-size 16px
  margin-left 8px
  width 30px
  height auto
</style>
