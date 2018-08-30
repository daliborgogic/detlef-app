<template lang="pug">
.subscribe
  input(type="email" placeholder="you@example.com" v-model="email" @keyup.up="validateEmail")
  .message(v-if="message" v-html="message")
  .error(v-if="error") {{error}}
  button(v-if="!exist" @click="subscribe" :disabled="!validateEmail")
    span(v-if="loading") SUBSCRIBING
    span(v-else) SUBSCRIBE
  nuxt-link(v-else tag="button" to="/preferences") MANAGE YOUR PREFERENCES
</template>

<script>
const timeout = ms => new Promise(res => setTimeout(res, ms))
import r2 from 'r2'
const { APP_DOMAIN } = process.env

export default {
  data () {
    return {
      loading: false,
      email: null,
      message: null,
      error: null,
      exist: null
    }
  },

  computed: {
    validateEmail () {
      // eslint-disable-next-line  no-useless-escape
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const isValid = re.test(this.email)
      if (isValid) {
        this.$store.commit('setEmail', this.email)
      }
      return isValid
    }
  },

  methods: {
    async subscribe () {
      if(this.validateEmail) {
        this.error = null
        this.message = null
        this.loading = true

        const obj = {
          email: this.email,
          status: 'pending'
        }
        const request = await r2.post(`https://${APP_DOMAIN}`, {json: obj}).response
        const sub = await request.json()
        const { title, status } = sub.mailchimp

        if (title === 'Member Exists') {
          this.error = title
          this.exist = true
        }
        if(title === 'Forgotten Email Not Subscribed') {
          this.resubscribe = true
          this.error = 'Member Exists, need to resubscribe'
        }
        if (status === 'pending') {
          this.message = `We sent an email to <strong>${this.email}</strong>`
          await timeout(6000)
          this.message = null
          this.email = null
        }
        this.loading = false
        console.log('SUBSCRIBE ', sub) // eslint-disable-line
      }
    }
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
  &:disabled
    color #999
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
