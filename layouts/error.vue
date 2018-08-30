<script>
export default {
  props: {
    error: {
      type: Object,
      default () {
        return []
      }
    }
  }
}
</script>

<template lang="pug">
.container
  h1(v-if="error.statusCode === 404") Page not found
  h1(v-else) An error occurred
  nuxt-link(tag="button" to="/") Home page
  </div>
</template>

<style lang="stylus" scoped>
.container
  font-size 23px
  letter-spacing 0.2px
  line-height 1.3
  max-width 400px
  margin 64px auto 25vh auto
  padding-left 16px
  padding-right 16px
h1
  font-size 23px
</style>
