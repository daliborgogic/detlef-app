<template lang="pug">
div(v-html="about.content.rendered")
</template>

<script>
import r2 from 'r2'

export default {
  head () {
    return {
      title: 'About',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'About — Detlef Schneider — Photographer' },
        { hid: 'og:url', property: 'og:url', content: `https://${process.env.APP_DOMAIN + this.$route.path}` }
      ]
    }
  },

  async asyncData () {
    const res = await r2(`https://${process.env.CMS_DOMAIN}/wp-json/wp/v2/pages/2`).response
    const about = await res.json()

    return { about }
  }
}
</script>

<style lang="stylus" scoped>
div
  font-size 12px
  line-height 14.4px
  max-width 680px
  margin 128px auto 25vh auto
  padding-left 16px
  padding-right 16px
  text-transform uppercase
  >>> h1
  >>> h2
  >>> h3
    font-size 24px
    letter-spacing 4.8px
    margin-top 0
    margin-bottom 16px
    font-weight normal
  >>> hr
    display block
    width 32px
    height 1px
    border 0
    border-top 1px solid black
    margin 32px 0
    padding 0
  >>> a
    color black
</style>
