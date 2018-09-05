<template lang="pug">
TheSingle(:post="post")
//- pre {{post}}
</template>

<script>
import TheSingle from '@/components/TheSingle'

export default {
  scrollToTop: true,

  components: {
    TheSingle
  },

  computed: {
    post () {
      return this.$store.state.post
    }
  }
}
</script>

<style lang="stylus" scoped>
section
  height calc(100vh - 128px)
  outline 1px dashed
  display flex
  align-items center
  justify-content center
img
  max-width 100%
  max-height 100%
</style>

