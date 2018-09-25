<template lang="pug">
TheSingle(:post="post")
</template>

<script>
import r2 from 'r2'
import TheSingle from '@/components/TheSingle'

export default {
  components: {
    TheSingle
  },

  data () {
    return {
      vimeo: null
    }
  },

  head () {
    const { title, content, images } = this.post[0]
    const clean = content.replace(/<\/?[^>]+(>|$)/g, '') || title

    let meta = [
      { hid: 'og:url', property: 'og:url', content: `https://${process.env.APP_DOMAIN + this.$route.path}` }
    ]

    if (images[0].vimeo) {
      const cleanVimeo = this.vimeo.description.replace(/(?:\n)/g, ' ') || clean || title
      meta.push(
        { hid: 'og:description', property: 'og:description', content: cleanVimeo },
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'description', name: 'description', content: cleanVimeo },
        { hid: 'og:video:type', property: 'og:video:type', content: 'text/html' },
        { hid: 'og:video:url', property: 'og:video:url', content: `https://player.vimeo.com/video/${images[0].vimeo}?autoplay=1` },
        { hid: 'og:video:secure_url', property: 'og:video:secure_url', content: `https://player.vimeo.com/video/${images[0].vimeo}?autoplay=1` },
        { hid: 'video:tag', property: 'video:tag', content: title },
        { hid: 'video:tag', property: 'video:tag', content: this.vimeo.author_name },
        { hid: 'og:image', property: 'og:image', content: this.vimeo.thumbnail_url },
        { hid: 'og:image:width', property: 'og:image:width', content: this.vimeo.thumbnail_width },
        { hid: 'og:image:height', property: 'og:image:height', content: this.vimeo.thumbnail_height }
      )
    }

    if (images[0].img) {
      meta.push(
        { hid: 'og:description', property: 'og:description', content: clean },
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'description', name: 'description', content: clean },
        { hid: 'og:image', property: 'og:image', content: images[0].img.sizes.w1920 },
        { hid: 'og:image:width', property: 'og:image:width', content: images[0].img.width },
        { hid: 'og:image:height', property: 'og:image:height', content: images[0].img.height }
      )
    }

    return { title, meta }
  },

  async asyncData({ params, error }) {
    const request = await r2(`https://${process.env.CMS_DOMAIN}/wp-json/wp/v2/posts?slug=${params.slug}`).json

    if (!Array.isArray(request) || !request.length) {
      // array does not exist, is not an array, or is empty
      error({ statusCode: 404, message: 'Post not found' })
    } else {
      const post = request.map(post => {
      const { id, title, content, acf, categories } = post
        return {
          id,
          title: title.rendered,
          content: content.rendered,
          images: acf.gallery_images,
          categories
        }
      })

      let vimeo

      if (post[0].images[0].vimeo) {
        vimeo = await r2(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${post[0].images[0].vimeo}`).json
      }

      return { post, vimeo }
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
