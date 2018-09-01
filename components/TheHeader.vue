<template lang="pug">
header(ref="header")
  nuxt-link.link(v-if="showNav" to="/" @click.native="category('sticky')" v-html="appName")
  nuxt-link.link(v-else to="/" @click.native="toogleNav" v-html="appName")

  nav(:class="{navHidden: showNav}")
    nuxt-link.link(to="/" @click.native="category(5)") Film
    span.dash
    nuxt-link.link(to="/" @click.native="category(3)") Fashion
    span.dash
    nuxt-link.link(to="/" @click.native="category(2)") Advertising
    span.dash
    nuxt-link.link(to="/" @click.native="category(4)") Sports
    span.dash
    nuxt-link.link(to="/about" @click.native="toogleNav") About
    span.dash
    nuxt-link.link(to="/privacy" @click.native="toogleNav") Privacy
    span.dash
    nuxt-link.link(to="/contact" @click.native="toogleNav") Contact
</template>


<script>
export default {
  data () {
    return {
      showNav: false,
      appName: process.env.APP_NAME
    }
  },

  async mounted () {
    const mq = window.matchMedia('(max-width: 512px)')

    if (!mq.matches) {
      await this.timeout(3000)
      this.$refs.header.classList.add('loaded')
    }
  },

  methods: {
    async category (value) {
      this.$store.commit('setCategory', value)
      this.toogleNav()
    },
    toogleNav () { this.showNav = !this.showNav },
    timeout (ms) {
      new Promise(res => setTimeout(res, ms))
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
    font-size 20px
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
    width 100%
    display block
    text-align center
  nav
    padding-bottom 16px
    & .link
      padding-top 8px
      padding-bottom 8px
@media (min-width 512px) and (max-width 1024px) and (orientation portrait)
  .dash
    width 0
</style>
