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
    const a = await r2(`https://${process.env.CMS}/wp-json/acf/v3/pages/40`).response
    const b = await a.json()
    const { featured = [] } = b.acf

    let params = []

    for (let f in featured) {
      params +='include[]=' + featured[f] + '&'
    }

    const c = await r2(`https://${process.env.CMS}/wp-json/wp/v2/posts?${params}`).response
    const list = await c.json()

    return { list }
  }
}
</script>

<style lang="stylus" scoped>
.container
  max-width 1140px
  margin 0 auto
</style>

