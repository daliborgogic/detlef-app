<template lang="pug">
.snackbar
  .container
    .bar(ref="bar" v-if="willShow" :class="{active: willShow }")
      div
        span(v-if="state === 1") New or updated content is available
        span(v-else) Caching complete. Future visits will work offline
      div
        span.cta(v-if="state === 1" @click="reload") REFRESH
    .bar(ref="bar" v-if="!$store.state.gotIt" :class="{active: !$store.state.gotIt }")
      div
        span(v-if="$route.name !== 'privacy'") New #[nuxt-link(to="/privacy") Privacy Policy]
      span.cta(@click="gotIt") GOT IT
</template>

<script>
import Cookie from 'js-cookie'

export default {

  computed: {
    showBar () {
      return this.$store.state.gotNew
    },
    willShow () {
      return this.$store.state.gotNew.show
    },
    state () {
      return this.$store.state.gotNew.state
    }
  },
  methods: {
    gotIt () {
      this.$store.commit('setGotIt', true)
      Cookie.set('gotIt', true)
    },
    reload () {
      this.dismis()
      window.location.reload()
    },
    dismis () {
      this.$store.commit('setGotNew', {
        show: false,
        state: null
      })
    }
  }
}
</script>


<style lang="stylus" scoped>
.snackbar
  position fixed
  width 100%
  left 0
  bottom 24px
  z-index 10
  display flex
  justify-content center
.container
  font-size 14px
  line-height 1.3
  letter-spacing 1px
  min-width 400px
  background-color #fff
  display flex
  font-weight 400
  flex-direction column

  .bar
    padding 16px
    display flex
    justify-content space-between
    min-height 50px
    border-bottom 1px solid #f2f2f2
    // transition transform 250ms ease-in
    // transform translateY(100% + 48px)
    // &.active
    //   transform translateY(0)
    a
      color #000
  .bar + .bar
    border-bottom none
.cta
  font-weight 700
  cursor pointer
@media (max-width 512px)
  .snackbar
    bottom 0
  .container
    min-width 0
    width 100%
</style>
