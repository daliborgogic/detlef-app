<template lang="pug">
.snackbar
  .container
    .bar(ref="bar" v-if="willShow" :class="{active: willShow }")
      div
        span(v-if="state === 1") NEW CONTENT IS AVAILABLE
        span(v-else) CACHING COMPLETE. FUTURE VISITS WILL WORK OFFLINE
      div
        span.cta(@click="dismiss") DISMISS
        span.cta(v-if="state === 1" @click="reload") REFRESH
</template>

<script>
export default {
  computed: {
    willShow () {
      return this.$store.state.gotNew.show
    },
    state () {
      return this.$store.state.gotNew.state
    }
  },
  methods: {
    reload () {
      this.dismiss()
      window.location.reload()
    },
    dismiss () {
      this.$store.commit('setGotNew', {
        show: false,
        state: 1
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
  bottom 0
  z-index 10
  display flex
  justify-content center
.container
  font-size 13px
  line-height 1.3
  letter-spacing .2px
  width 400px
  display flex
  font-weight 400
  flex-direction column

  .bar
    padding 16px
    display flex
    align-items baseline
    background-color #fff
    justify-content space-between
    min-height 50px
    margin-bottom 30px
    // transition transform 250ms ease-in
    // transform translateY(100% + 48px)
    // &.active
    //   transform translateY(0)
    a
      color #000
.cta
  margin-left 16px
  font-weight 700
  cursor pointer
@media (max-width 512px)
  .snackbar
    bottom 0
  .container
    min-width 0
    width 100%
</style>
