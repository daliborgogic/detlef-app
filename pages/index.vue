<template lang="pug">
.container
  TheIsotope
</template>

<script>
import r2 from 'r2'
import TheIsotope from '@/components/TheIsotope'

export default {
  name: 'Index',
  components: { TheIsotope },

  head () {
    return {
      titleTemplate: 'Detlef Schneider — Photographer'
    }
  },

  async asyncData ({store}) {
    const featured = await r2(`https://${process.env.CMS}/wp-json/wp/v2/posts?featured=1`).response
    const posts = await featured.json()
    store.commit('setPosts', posts)
  }
}
</script>

<style lang="stylus" scoped>
.container
  max-width 1140px
  margin 0 auto 10vh auto
</style>

