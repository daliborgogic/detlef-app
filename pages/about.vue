<template lang="pug">
div(v-html="about.content.rendered")
</template>

<script>
import r2 from 'r2'
export default {
  async asyncData () {
     const res = await r2('https://cms.detlefschneider.com/wp-json/wp/v2/pages/2').response
     const about = await res.json()
     return { about }
  }
}
</script>

<style lang="stylus" scoped>
div
  font-size 23px
  letter-spacing 0.2px
  line-height 1.3
  max-width 680px
  margin 0 auto
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
