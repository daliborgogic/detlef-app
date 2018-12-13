<template lang="pug">
div(v-html="privacy.content.rendered")
</template>

<script>
import r2 from 'r2'
export default {
  name: 'Privacy',

  head () {
    return {
      title: 'Privacy Policy',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'Privacy Policy — Detlef Schneider — Photographer' },
        { hid: 'og:url', property: 'og:url', content: `https://${process.env.APP_DOMAIN + this.$route.path}` }
      ]
    }
  },

  async asyncData () {
    const res = await r2(`https://${process.env.CMS_DOMAIN}/wp-json/wp/v2/pages/3`).response
    const privacy = await res.json()

    return { privacy }
  }
}
</script>

<style lang="stylus" scoped>
div
  max-width 712px
  margin 128px auto 25vh auto
  padding-left 16px
  padding-right 16px
  text-transform uppercase
  font-size 12px
  line-height 1.8
  >>> h1
  >>> h2
  >>> h3
    font-size 18px
    letter-spacing 4.8px
    line-height 28.8px
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
