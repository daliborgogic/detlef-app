<script>
export default {
  props: {
    strokeWidth: {
      type: [String, Number],
      default: 2
    },
    radius: {
      type: [Number, String],
      default: 12
    },
    stroke: {
      type: String,
      default: '#999'
    }
  }
}
</script>

<template lang="pug">
<svg class="iconPlay" width="82px"  height="82px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background: none;"><circle cx="50" cy="50" fill="none" :stroke="stroke" stroke-width="2" r="12" stroke-dasharray="56.548667764616276 20.84955592153876" transform="rotate(30 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>
</template>

<style lang="stylus" scoped>
.iconPlay
  width 100px
  height 100px
  position absolute
  top calc(50% - 50px)
  left calc(50% - 50px)
  z-index 2
</style>
