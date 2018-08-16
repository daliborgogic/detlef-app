<template lang="pug">
div(v-html="privacy.content.rendered")
</template>

<script>
import r2 from 'r2'
export default {
  name: 'Privacy',

  async asyncData () {
    const res = await r2(`https://${process.env.CMS}/wp-json/wp/v2/pages/3`).response
    const privacy = await res.json()
    return { privacy }
  }
}
</script>

<style lang="stylus" scoped>
div
  max-width 680px
  margin 64px auto 25vh auto
  >>> h1
    font-size 23px
  >>> h1
  >>> h2
  >>> h3
    margin-top 0
    margin-bottom 16px
    font-weight normal
  >>> hr
    display block
    width 32px
    height 2px
    border 0
    border-top 2px solid black
    margin 32px 0
    padding 0
  >>> a
    color black
</style>
