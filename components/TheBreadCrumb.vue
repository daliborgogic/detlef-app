<template lang="pug">
.breadcrumb(v-if="!isGotIt")
  .container
    span.msg(v-if="$route.name !== 'privacy'") {{appName}} has a new #[nuxt-link(to="/privacy") Privacy Policy], effective May 25, 2018.
    span(v-else)
    span.button(@click="gotIt") GOT IT
</template>

<script>
import Cookie from 'js-cookie'

export default {

  computed: {
    isGotIt () {
      return this.$store.state.gotIt
    },
    appName () {
      return process.env.FIRST_NAME + ' ' + process.env.LAST_NAME
    }
  },
  methods: {
    gotIt () {
      this.$store.commit('setGotIt', true)
      Cookie.set('gotIt', true)
    }
  }
}
</script>

<style lang="stylus" scoped>
.breadcrumb
  position fixed
  bottom 0
  left 0
  min-height 64px
  background-color white
  width 100%
  display flex
  align-items center
  letter-spacing 0.15px
  z-index 10
.container
  max-width 1260px
  margin 0 auto
  padding 16px
  display flex
  flex 1
  justify-content space-between
a
  color black
.msg
  padding-right 16px
.button
  font-weight 700
  cursor pointer
  min-width 50px
@media (max-width 512px)
  .breadcrumb
    align-items baseline
    font-size 14px
    line-height 1.4
  .container
    text-align center
    flex-direction column
  .msg
    padding-left 16px
    padding-bottom 16px
</style>
