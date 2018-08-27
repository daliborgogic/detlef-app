<template lang="pug">
footer(ref="footer")
  div
    nuxt-link.link(to="/") &copy; Detlef Schneider
    span.dash
    nuxt-link.link(to="/privacy") Privacy
</template>

<script>
export default {
  async mounted () {
    await this.timeout(3000)
    this.$refs.footer.classList.add('loaded')
  },

  methods: {
    timeout (ms) {
      new Promise(res => setTimeout(res, ms))
    }
  }
}
</script>

<style lang="stylus" scoped>
footer
  position fixed
  bottom 0
  left 0
  width 100%
  background-color transparent
  height 64px
  display flex
  align-items center
  // justify-content space-between
  padding-left 16px
  padding-right 16px
  transition all 250ms ease-in
  // margin-bottom 16px
  // outline 1px dashed tomato
  z-index 10
  &:hover
    background-color white
  a
    color black
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
.link
  font-size 16px
  margin-right 0.5vw
  cursor pointer
  // color #999
  &:hover
    color #000
</style>
