<template lang="pug">
.subscribe
  input(type="email" placeholder="you@example.com" v-model="email")
  .message(v-if="message") {{message}}
  .error(v-if="error") {{error}}
  button(@click="subscribe")
    span(v-if="loading") SUBSCRIBING
    span(v-else) SUBSCRIBE
</template>

<script>
import r2 from 'r2'
export default {
  data () {
    return {
      loading: false,
      email: null,
      message: null,
      error: null
    }
  },
  methods: {
    async subscribe () {
      this.error = null
      this.message = null
      this.loading = true
      console.log({email: this.email})
      const { APP_DOMAIN } = process.env
      const obj = {
        email: this.email
      }
      const request = await r2.post(`https://${APP_DOMAIN}`, {json: obj}).response
      const sub = await request.json()
      if (sub.title === 'Member Exists') {
        this.error = sub.title
      }
      if (sub.status === 'subscribed') {
        this.message = 'Subscribed'
        await tmeout(3000)
        this.message = null
        this.email = null
      }
      // title: "Forgotten Email Not Subscribed", status: 400,
      console.log(sub)
      this.loading = false
    },
    timeout (ms) { new Promise(res => setTimeout(res, ms)) }
  }
}
</script>

<style lang="stylus" scoped>
.error
  color $pink
.message
  color $blue
.error
.message
  padding-bottom 8px
.subscribe
  padding-top 32px
  padding-bottom 32px
  display flex
  justify-content center
  flex-direction column
input
button
  height 32px
  padding 0 16px
  color #000
  font-size 16px
  letter-spacing 0.25px
  font-family "Custom font"
  border none
  background-color transparent
  &:focus
    outline none
input
  text-align center
  min-width 300px
  max-width 400px
  flex-basis auto // default value
  flex-grow 1
  margin 0 auto
  border-bottom 1px solid #000 + 88%
  margin-bottom 16px
  &:focus
    border-color #000
  &:focus::-webkit-input-placeholder
    color transparent
button
  letter-spacing .15px
  font-weight 700
.dash
  height 2px
  width 20px
  background-color #999
  display inline-block
  margin-left .5vw
  margin-right .5vw
  vertical-align middle
  transition all 250ms ease-in
  &:hover
    color #000
</style>
