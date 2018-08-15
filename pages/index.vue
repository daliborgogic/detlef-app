<template lang="pug">
.container
  TheIsotope
</template>

<script>
import TheIsotope from '@/components/TheIsotope'

export default {
  name: 'Index',
  components: { TheIsotope },

  head () {
    return {
      titleTemplate: 'Detlef Schneider — Photographer'
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  max-width 1140px
  margin 0 auto 10vh auto
</style>

