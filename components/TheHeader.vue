<template lang="pug">
header(ref="header")
  nuxt-link.link(v-if="showNav" to="/" @click.native="category('featured')") DETLEF SCHNEIDER
  nuxt-link.link(v-else to="/" @click.native="onlyCategory('featured')") DETLEF SCHNEIDER
  svg.icon-menu(@click="toogleNav" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24")
    path(d="M0 0h24v24H0z" fill="none")
    path(v-if="!showNav" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z")
    path(v-else d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z")
  nav(:class="{navHidden: showNav}")
    span.filter(v-if="$route.name === 'index'")
      span.link(@click="category(5)") Film
      span.dash
      span.link(@click="category(3)") Fashion
      span.dash
      span.link(@click="category(2)") Advertising
      span.dash
      span.link(@click="category(4)") Sports
      span.dash
    nuxt-link.link(@click.native="toogleNav" to="/about") About
    span.dash
    nuxt-link.link(@click.native="toogleNav" to="/privacy") Privacy
    span.dash
    nuxt-link.link(@click.native="toogleNav" to="/contact") Contact
</template>


<script>
// const timeout = ms => new Promise(res => setTimeout(res, ms))

export default {
  data () {
    return {
      showNav: false
    }
  },

  beforeMount () {
    this.category('featured')
  },

  async mounted () {
    // await timeout(3000)
    // this.$refs.header.classList.add('loaded')
  },

  methods: {
    category (value) {
      this.$store.commit('setCategory', value)
      this.toogleNav()
    },
    onlyCategory (value) {
      this.$store.commit('setCategory', value)
    },
    async toogleNav () {
      // await timeout(300)
      this.showNav = !this.showNav
    }
  }
}
</script>


<style lang="stylus" scoped>
.icon-menu
  display none
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
  padding-left 16px
  padding-right 16px
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
  display block
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
@media (max-width 512px)
  nav
  .dash
    display none
  header
    height 56px
  .icon-menu
    display block
    vertical-align middle
  .navHidden
    display flex
    flex-direction column
    position fixed
    top 56px
    left 0
    bottom 0
    width 100%
    background-color white
    padding-left 16px
    padding-right 16px
  .filter
    display flex
    flex-direction column
  .link
    padding-top 8px
    padding-bottom 8px
    // text-align center
@media (min-width 512px) and (max-width 1024px) and (orientation portrait)
  .dash
    width 0
</style>
