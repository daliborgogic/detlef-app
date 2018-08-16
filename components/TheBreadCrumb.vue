<template lang="pug">
.breadcrumb
  .container
    span.msg(v-if="$route.name !== 'privacy'") Detlef Schneider has a new #[nuxt-link(to="/privacy") Privacy Policy], effective May 25, 2018.
    span.msg(v-else)
    span.button(@click="gotIt") GOT IT
</template>

<script>
export default {
  methods: {
    gotIt () {
      console.log(`trigger gotIt`)
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
  max-width 1172px
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
</style>
