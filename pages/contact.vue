<template lang="pug">
.container
  .content(v-html="contact.content.rendered")
  .social
    //- Facebook
    a(v-if="contact.acf.facebook" :href="contact.acf.facebook")
      svg.logo(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430.113 430.114")
        path(d="M158.081 83.3v59.218h-43.385v72.412h43.385v215.183h89.122V214.936h59.805s5.601-34.721 8.316-72.685H247.54V92.74c0-7.4 9.717-17.354 19.321-17.354h48.557V.001h-66.021C155.878-.004 158.081 72.48 158.081 83.3z")

    //- Instagram
    a(v-if="contact.acf.instagram" :href="contact.acf.instagram")
      svg.logo(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 504.4 504.4")
        path(d="M296.8 219.8c-10-14-26.4-23.2-44.8-23.2s-34.8 9.2-44.8 23.2c-6.4 9.2-10.4 20.4-10.4 32.4 0 30.4 24.8 55.2 55.2 55.2 30.4 0 55.2-24.8 55.2-55.2 0-12-4-23.2-10.4-32.4z")
        path(d="M331.6 220.2c4 8 6.4 20.8 6.4 32 0 47.2-38.4 86-86 86s-86-38.4-86-86c0-11.6 2.4-24 6.4-32H124v128.4c0 16.8 14.8 31.6 31.6 31.6h192.8c16.8 0 31.6-14.8 31.6-31.6V220.2h-48.4zM365.6 131.4h-46.4v53.2H372V131z")
        path(d="M377.6.2H126.4C56.8.2 0 57 0 126.6v251.6c0 69.2 56.8 126 126.4 126H378c69.6 0 126.4-56.8 126.4-126.4V126.6C504 57 447.2.2 377.6.2zM408 219.8v128.8c0 33.6-26 59.6-59.6 59.6H155.6c-33.6 0-59.6-26-59.6-59.6V155.8c0-33.6 26-59.6 59.6-59.6h192.8c33.6 0 59.6 26 59.6 59.6v64z")

    //- Linkedin
    a(v-if="contact.acf.linkedin" :href="contact.acf.linkedin")
      svg.logo(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430.117 430.117")
        path(d="M430.117 261.543V420.56h-92.188V272.193c0-37.271-13.334-62.707-46.703-62.707-25.473 0-40.632 17.142-47.301 33.724-2.432 5.928-3.058 14.179-3.058 22.477V420.56h-92.219s1.242-251.285 0-277.32h92.21v39.309c-.187.294-.43.611-.606.896h.606v-.896c12.251-18.869 34.13-45.824 83.102-45.824 60.673-.001 106.157 39.636 106.157 124.818zM52.183 9.558C20.635 9.558 0 30.251 0 57.463c0 26.619 20.038 47.94 50.959 47.94h.616c32.159 0 52.159-21.317 52.159-47.94-.606-27.212-20-47.905-51.551-47.905zM5.477 420.56h92.184V143.24H5.477v277.32z")

    //- Vimeo
    a(v-if="contact.acf.vimeo" :href="contact.acf.vimeo")
      svg.logo(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430.118 430.118")
        path(d="M367.243 28.754c-59.795-1.951-100.259 31.591-121.447 100.664 10.912-4.494 21.516-6.762 31.858-6.762 21.804 0 31.455 12.237 28.879 36.776-1.278 14.86-10.911 36.482-28.879 64.858-18.039 28.423-31.513 42.61-40.464 42.61-11.621 0-22.199-21.958-31.857-65.82-3.239-12.918-9.031-45.812-17.324-98.765-7.775-49.046-28.32-71.962-61.727-68.741-14.132 1.299-35.302 14.241-63.556 38.734C42.113 91.032 21.228 109.761 0 128.471l20.225 26.112c19.303-13.562 30.595-20.311 33.731-20.311 14.802 0 28.625 23.219 41.488 69.651 11.53 42.644 23.158 85.23 34.744 127.812 17.256 46.466 38.529 69.708 63.552 69.708 40.473 0 90.028-38.065 148.469-114.223 56.537-72.909 85.725-130.352 87.694-172.341 2.595-56.115-18.29-84.851-62.66-86.125z")
</template>

<script>
import r2 from 'r2'

export default {
  head () {
    return {
      title: 'Contact',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'Contact — Detlef Schneider — Photographer' },
        { hid: 'og:url', property: 'og:url', content: `https://${process.env.APP_DOMAIN + this.$route.path}` }
      ]
    }
  },
  async asyncData () {
    const res = await r2(`https://${process.env.CMS_DOMAIN}/wp-json/wp/v2/pages/17`).response
    const contact = await res.json()

    return { contact }
  }
}
</script>

<style lang="stylus" scoped>
.container
  font-size 23px
  line-height 1.3
  max-width 362px
  margin 128px auto 25vh auto
  padding-left 16px
  padding-right 16px
.content
  >>> h1
    font-size 23px
  >>> h1
  >>> h2
  >>> h3
    margin-top 0
    margin-bottom 16px
    font-weight normal
  >>> hr
    display block
    width 32px
    height 2px
    border 0
    border-top 2px solid black
    margin 32px 0
    padding 0
  >>> a
    text-decoration none
    color black
.social
  display flex
  align-items center
  a
    margin-right 8px
    &:last-child
      margin-right 0
.logo
  width 24px
  height auto
  vertical-align middle
@media (max-width 512px)
  .container
    max-width 100%
</style>
