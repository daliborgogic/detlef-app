<template lang="pug">
.c
  .overlay
    h3(v-if="card.title" v-html="card.title")
  svg.iconPlay(
    v-if="card.ad"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24")
    path(d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" fill="#ffffff")
    path(d="M0 0h24v24H0z" fill="none")
  span(v-if="card.images")
    span(v-if="card.images[0].vimeo")
      svg.iconPlay(
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24")
        path(d="M8 5v14l11-7z" fill="#ffffff")
        path(d="M0 0h24v24H0z" fill="none")
  span(v-if="card.featuredImage")
    img(
      :src="card.featuredImage.w370.source_url"
      :alt="card.featuredImage.alt_text")
    svg.placeholder(
      :height="card.featuredImage.w370.height"
      :viewBox="'0 0 ' +  card.featuredImage.w370.width + ' ' + card.featuredImage.w370.height"
      :width="card.featuredImage.w370.width" xmlns="http://www.w3.org/2000/svg")
      path(
        :d="'M0 0h' + card.featuredImage.w370.width + 'v' + card.featuredImage.w370.height + 'H0z'"
        fill="#F2F2F2")
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
img
svg
  width 100%
  height auto
  vertical-align middle
.c
  position relative
  margin-bottom 45px
  // outline 1px dashed tomato
  transition opacity 250ms ease-in
  &:hover .overlay
    opacity 1
  &:hover .iconPlay
    opacity 0
.iconPlay
  width 32px
  height 32px
  position absolute
  top calc(50% - 16px)
  left calc(50% - 16px)
  z-index 1
img
.overlay
  position absolute
  top 0
  left 0
.overlay
  width 100%
  height 100%
  background-color rgba(255,255,255,0.7)
  z-index 3
  display flex
  align-items center
  justify-content center
  opacity 0
.item
  width 370px
  // outline 1px dashed
  cursor pointer
  pre
    overflow-x scroll
h3
  color black
  margin-top 0
  margin-bottom 0
  font-size 23px
  letter-spacing 0.2px
  line-height 30px
  font-weight normal
  text-align center
  padding-left 20px
  padding-right 20px

</style>
