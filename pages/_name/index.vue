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

  async asyncData ({params}) {
    let b
    switch(params.name) {
      case('advertising'):
        b = 2
        break
      case('fashion'):
        b = 3
        break
      case('sports'):
        b = 4
        break
      default:
        b = 5
    }
    const res = await r2(`https://${process.env.CMS}/wp-json/wp/v2/posts?categories=${b}&per_page=100`).response
    const list = await res.json()
    return {list}
  }
}
</script>

<style lang="stylus" scoped>
.container
  max-width 1140px
  margin 0 auto
</style>
