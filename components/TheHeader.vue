<template lang="pug">
header(ref="header")
  nuxt-link.link(v-if="!showNav" to="/" @click.native="category('sticky')") DETLEF SCHNEIDER
  nuxt-link.link(v-else to="/" @click.native="toogleNav") DETLEF SCHNEIDER

  nav(:class="{navHidden: showNav}")
    nuxt-link.link.filter(to="/" @click.native="category(5)" :class="{ active: active === 5}") FILM
    //- span.dash
    nuxt-link.link.filter(to="/" @click.native="category(3)" :class="{ active: active === 3}") FASHION
    //- span.dash
    nuxt-link.link.filter(to="/" @click.native="category(2)" :class="{ active: active === 2}") ADVERTISING
    //- span.dash
    nuxt-link.link.filter(to="/" @click.native="category(4)" :class="{ active: active === 4}") SPORTS
    //- span.dash
    nuxt-link.link(to="/about" @click.native="toogleNav") ABOUT
    //- span.dash
    nuxt-link.link(to="/privacy" @click.native="toogleNav") PRIVACY
    //- span.dash
    nuxt-link.link(to="/contact" @click.native="toogleNav") CONTACT
</template>


<script>
import { timeout } from  '~/helpers'

export default {
  data () {
    return {
      showNav: false,
      isMobile: false
    }
  },

  computed: {
    active () {
      return this.$store.state.category
    }
  },

  async mounted () {
    this.isMobile = window.matchMedia('(max-width: 1024px)')

    if (!this.isMobile.matches) {
      await timeout(3000)
      this.$refs.header.classList.add('loaded')
    }
  },


  methods: {
    category (value) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      this.toogleNav(value)
    },
    toogleNav (value) {
      if (this.$route.name !== 'index') {
        this.$store.commit('setCategory', 'sticky')
      }
      this.$store.commit('setCategory', value)
      if (this.isMobile.matches)
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
  padding-left 20px
  padding-right 20px
  z-index 10
  &:hover
    background-color white
  a
    text-decoration none
    outline 0
  > a
    color #000
    font-size 24px
    letter-spacing 4.8px
    line-height 28.8px
    font-weight 400
    span
      color #999
      font-size 14px
.loaded
  opacity 1
  &:hover
    animation fadein 0.3s
    opacity 1
nav
  display flex
  align-items center
  .link
    font-size 24px
    letter-spacing 4.8px
    font-weight 400
    cursor pointer
    color rgba(black, 0.12)
    margin-right 1vw
    &:hover
      color #000
    &:last-child
      margin-right 0
    &.filter
      color rgba(black, 0.12)
      &:hover
        color #000
.link.nuxt-link-active
.link.nuxt-link-active.active
  color #000
.dash
  height 1px
  width 20px
  background-color rgba(black, 0.12)
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
.active
  color #000
@media (max-width 512px)
  nav
  .dash
    display none
  header
    height 56px
    > a
      font-size 18px
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
      font-size 18px
      padding-top 8px
      padding-bottom 8px
@media (min-width 512px) and (max-width 1024px) and (orientation portrait)
  .dash
    width 0
@keyframes fadein
  from
    opacity 0.1
  to
    opacity 1
</style>
