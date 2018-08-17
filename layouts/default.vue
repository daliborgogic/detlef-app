<template lang="pug">
div
  TheHeader
  main
    nuxt
  TheBreadCrumb
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheBreadCrumb from '@/components/TheBreadCrumb'

export default {
  components: {
    TheHeader,
    TheBreadCrumb
  },

  beforeMount () {
    this.loadFont()
  },

  methods: {
    // CSS Font Loading Module Level 3
    async loadFont () {
      const font = new FontFace('Custom Font', 'url(./fonts/custom.woff)')
      await font.load()

      document.fonts.add(font)
      document.getElementById('__nuxt').classList.add('font-loaded')
    }
  }
}
</script>

<style lang="stylus">
#__nuxt
  font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
#__nuxt.font-loaded
  font-family "Custom Font"
</style>
