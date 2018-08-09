<template lang="pug">
TheSingle(:post="post")
</template>

<script>
import r2 from 'r2'
import TheSingle from '@/components/TheSingle'

export default {
  components: { TheSingle },
  // validate({ params }) {
  //   return !isNaN(+params.slug)
  // },
  async asyncData({ params, error }) {
    try {
      const res = await r2(`https://cms.detlefschneider.com/wp-json/wp/v2/posts?slug=${params.slug}`).response
      const post = await res.json() || []
      return { post }
    } catch (e) {
      error({ message: 'Post not found', statusCode: 404 })
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

