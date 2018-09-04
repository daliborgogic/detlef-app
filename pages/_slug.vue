<template lang="pug">
TheSingle(:post="post")
</template>

<script>
import r2 from 'r2'
import TheSingle from '@/components/TheSingle'
export default {
  scrollToTop: true,

  components: {
    TheSingle
  },

  async asyncData({ params, error }) {
    try {
      const res = await r2(`https://${process.env.CMS_DOMAIN}/wp-json/wp/v2/posts?slug=${params.slug}`).response
      const posts = await res.json()

      if (!Array.isArray(posts) || !posts.length) {
        // array does not exist, is not an array, or is empty
        error({ statusCode: 404, message: 'Post not found' })
      } else {
        const post = posts.map(post => {
        const { id, title, content, acf  } = post

          return {
            id,
            title: title.rendered,
            content: content.rendered,
            images: acf.gallery_images
          }
        })
        return { post }
      }
    } catch (error) {
      error({ statusCode: 404, message: 'Post not found' })
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

