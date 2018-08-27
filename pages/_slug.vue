<template lang="pug">
TheSingle(:post="post")
</template>

<script>
import r2 from 'r2'
import TheSingle from '@/components/TheSingle'
export default {
  components: { TheSingle },

  async asyncData({ params }) {
    const { CMS_DOMAIN } = process.env
    const res = await r2(`https://${CMS_DOMAIN}/wp-json/wp/v2/posts?slug=${params.slug}`).response
    const posts = await res.json()
    const mapPosts = posts.map(post => {
      const { id, title, content, acf  } = post

      return {
        id,
        title: title.rendered,
        content: content.rendered,
        images: acf.gallery_images
      }
    })
    return { post: mapPosts }
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

