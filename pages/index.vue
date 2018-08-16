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
  max-width 1172px
  margin 0 auto 10vh auto
  padding-left 16px
  padding-right 16px
// @media (max-width 512px)
//   .container
//     padding-left
//     padding-right
</style>

