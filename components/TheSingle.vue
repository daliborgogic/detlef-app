<template lang="pug">
no-ssr(ref="a" tabindex="0" @keydown.up="up" @keydown.down="down")
  .fullpage-container
    .fullpage-wp(v-fullpage="opts" ref="fullpage" tabindex="0" @keydown.up="up" @keydown.down="down")
      section.page(ref="videoParent" v-for="(p, index) in post[0].acf.gallery_images" :class="'page-'+index" :data-anchor="index")
        //- pre {{p}}
        .s(v-if="p.img")
          img(:src="p.img.url")
          svg(:height="p.img.height" :viewBox="'0 0 ' +  p.img.width + ' ' + p.img.height" :width="p.img.width" xmlns="http://www.w3.org/2000/svg")
            path(:d="'M0 0h' + p.img.width + 'v' + p.img.height + 'H0z'" fill="#f2f2f2")
        .s(v-else)
          .videoContainer()
            iframe(ref="video" :src="'https://player.vimeo.com/video/'+p.vimeo+'?color=ffffff&byline=0&portrait=0'" width="100%"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen)

      section.page
        .back
          div(v-if="post[0].content.rendered" v-html="post[0].content.rendered")
          h3(v-else v-html="post[0].title.rendered")
          nuxt-link(to="/" @click.native="setFilter('*')") Back to Overview
</template>

<script>
import NoSsr from 'vue-no-ssr'

export default {
  components: { NoSsr },
  props: {
    post: {
      type: Array,
      default () {
        return []
      }
    }
  },

  data() {
    var that = this
    return {
      index: 0,
      pageNum: 0,
      opts: {
        keyboardScrolling: true,
        start: 0,
        dir: 'v',
        loop: false,
        duration: 300,
        beforeChange: function(ele, current, next) {
            // console.log('before', current, next)
            that.index = next
        },
        afterChange: function(ele, current) {
            that.index = current
            // console.log('after', current)
        }
      }
    }
  },


  mounted () {
    // this.$refs.a[0].setAttribute('tabindex', 0)
    // if (this.$refs.a) {
      // let sefl = this
      // const { videoParent } = sefl.$refs
      // console.log(sefl.$refs.video)
      // if (videoParent) {
      //   let videoParentHeight = videoParent.clientHeight || 0
      //   console.log({videoParentHeight})
      //   const iframe = this.$refs.video
      //   iframe.setAttribute('height', videoParentHeight)
      // }


    // }
  },

  // destroyed () {
  //   this.$refs.fullpage.$fullpage.destroy('all')
  // },

  methods:{
    setFilter (value) {
      this.$router.push('/')
      this.$store.commit('setFilter', value)
      // console.log({value})
    },
    // moveTo (index) {
    //   this.$refs.fullpage.$fullpage.moveTo(index, true)
    // },
    // showPage () {
    //   this.pageNum++
    //   this.$refs.fullpage.$fullpage.$update()
    // },
    up () {
      console.log('UP')
    },
    down () {
      console.log('DOWN')
    }
  }
}
</script>

<style lang="stylus" scoped>
.fullpage-container
  position absolute
  left 0
  top 0
  width 100%
  height 100%
// section
//   height 50vh
//   img
//     max-width 100%
//     max-height 100%

section
  height 100%
  padding-top 64px
  padding-bottom 64px
  // outline 1px dashed
  display flex
  align-items center
  justify-content center
  // &:last-child
  //   margin-bottom 0
  //   height calc(100vh - 128px)
.s
  width 100%
  height 100%
  position relative
img
svg
  max-width 100%
  max-height 100%
  vertical-align middle
img
  position absolute
  top 0
  left 50%
  transform: translateX(-50%);
.back
  text-align center
  max-width 500px
  margin 0 auto
  >>> div p
    margin 0
    font-size 23px
    line-height 1.3
    letter-spacing 0.171px
  a
    font-size 13px
    color #000
    text-decoration none
.videoContainer
  position:relative;
  height:100%;
  width:100%;
  overflow: hidden;

.videoContainer iframe
  position absolute
  top 0
  left 0
  object-fit: cover;
</style>

