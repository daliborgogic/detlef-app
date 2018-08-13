<template lang="pug">
.container
  TheIsotope(:list="list")
</template>

<script>
import TheIsotope from '@/components/TheIsotope'
import r2 from 'r2'

export default {
  name: 'Index',
  components: { TheIsotope },

  head () {
    return {
      titleTemplate: 'Detlef Schneider — Photographer'
    }
  },

  async asyncData () {
    const featured = await r2(`https://${process.env.CMS}/wp-json/wp/v2/posts?featured=1`).response
    const list = await featured.json()

    return { list }
  }
}
</script>

<style lang="stylus" scoped>
.container
  max-width 1140px
  margin 0 auto
</style>

