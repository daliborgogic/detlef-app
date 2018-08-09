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

  computed: {
    list () {
      return this.$store.state.posts
    }
  },

  async asyncData ({store}) {
    const res = await r2(`https://${process.env.CMS}/wp-json/wp/v2/posts?per_page=20`).response
    const list = await res.json()

    store.commit('setPosts', list)
  }
}
</script>

<style lang="stylus" scoped>
.container
  max-width 1140px
  margin 0 auto
</style>

