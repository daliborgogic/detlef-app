<template lang="pug">
.subscribe
  input(type="email" placeholder="you@example.com" v-model="email" @keyup.up="validateEmail")
  .message
    span.error(v-if="error" v-html="error")
    span(v-if="message" v-html="message")
  small(v-if="exist") Email exists, update your preferences?#[br]

  div(v-if="!hide")
    button(v-if="!isSubscribed" @click="subscribe" :disabled="!validateEmail") SUBSCRIB{{sufix}}
    button.resubscribe(v-else @click="resubscribe" :disabled="!validateEmail") RESUBSCRIB{{sufix}}
</template>

<script>
const timeout = ms => new Promise(res => setTimeout(res, ms))
import r2 from 'r2'

export default {
  data () {
    return {
      loading: false,
      email: null,
      message: null,
      error: null,
      isSubscribed: false,
      hide: false,
      exist: false
    }
  },

  computed: {
    validateEmail () {
      // eslint-disable-next-line  no-useless-escape
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const isValid = re.test(this.email)
      return isValid
    },
    sufix () {
      return this.loading ? 'ING' : 'E'
    }
  },

  methods: {
    reset () {
      this.exist = false
      this.error = null
      this.isSubscribed = false
      this.message = null
    },
    async subscribe () {
      if(this.validateEmail) {
        this.loading = true
        this.reset()
        const obj = {
          email_address: this.email,
          status: 'pending'
        }
        const request = await r2.post(`https://${process.env.APP_DOMAIN}`, {json: obj}).response
        const { data } = await request.json()
        const { title, status } = data

        if (title === 'Member Exists' && status === 400) {
          this.isSubscribed = true
          this.exist = true

        }
        if (status === 'pending') {
          this.message = `We sent an email to <strong>${this.email}</strong>`
          this.hide = true
          await timeout(6000)
          this.hide = false
          this.email = null
          this.reset()
        }
        if (title === 'Invalid Resource' && status === 400) {
          this.error = `<strong>${this.email}</strong> has signed up to a lot of lists very recently; we're not allowing more signups for now.`
          this.hide = true
          await timeout(6000)
          this.hide = false
          this.reset()
          this.email = null
        }
        this.loading = false
        // console.log('SUBSCRIBE ', data) // eslint-disable-line
      }
    },
    async resubscribe () {
      this.loading = true
      this.reset()
      this.isSubscribed = true
      this.exist = true
      const obj = {
        email_address: this.email,
        status: 'pending'
      }
      const request = await r2.patch(`https://${process.env.APP_DOMAIN}`, {json: obj}).response
      const { data } = await request.json()
      const { status, title } = data
      if (status === 'pending') {
        this.message = `We sent an email to <strong>${this.email}</strong>`
        this.isSubscribed = true
        this.exist = false
        await timeout(6000)
        this.hide = false
        this.email = null
        this.reset()
      }
      if (title === 'Invalid Resource' && status === 400) {
        this.error = `<strong>${this.email}</strong> has signed up to a lot of lists very recently; we're not allowing more signups for now.`
        this.exist = false
        this.hide = true
        await timeout(6000)
        this.hide = false
        this.reset()
        this.email = null
      }
      this.loading = false
      // console.log('RESUBSCRIBE ', data) // eslint-disable-line
    }
  }
}
</script>

<style lang="stylus" scoped>
.message
  min-height 16px
  color $blue
.error
  color $pink
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
.unsubscribe
  color #999
</style>
