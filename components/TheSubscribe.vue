<template lang="pug">
.subscribe
  input(type="email" placeholder="you@example.com" v-model="email" @keyup.up="validateEmail")
  .message(v-if="message" v-html="message")
  .error(v-if="error") {{error}}
  button(v-if="!resubscribe" @click="subscribe" :disabled="!validateEmail")
    span(v-if="loading") SUBSCRIBING
    span(v-else) SUBSCRIBE
  button(v-else @click="resubscribe")
    span(v-if="loading") RESUBSCRIBING
    span(v-else) RESUBSCIBE?
</template>

<script>
import r2 from 'r2'
const { APP_DOMAIN } = process.env

export default {
  data () {
    return {
      loading: false,
      email: null,
      message: null,
      error: null,
      resubscribe: false,
      instance: null
    }
  },

  computed: {
    validateEmail () {
      // eslint-disable-next-line  no-useless-escape
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(this.email)
    }
  },

  methods: {
    async subscribe () {
      if(this.validateEmail) {
        this.error = null
        this.message = null
        this.loading = true

        const obj = {
          email: this.email
        }
        const request = await r2.post(`https://${APP_DOMAIN}`, {json: obj}).response
        const sub = await request.json()
        if (sub.title === 'Member Exists') {
          this.error = sub.title
        }
        if(sub.title === 'Forgotten Email Not Subscribed') {
          this.resubscribe = true
          this.instance = sub.instance
          this.error = 'Member Exists, need to resubscribe'
        }
        if (sub.status === 'subscribed') {
          this.message = 'Subscribed'
          await this.timeout(3000)
          this.message = null
          this.email = null
        }
        if (sub.status === 'pending') {
          this.email = null
          this.message = `We sent an email to <strong>$this.email</strong>`
        }
        this.loading = false
      }
    },
    timeout (ms) { new Promise(res => setTimeout(res, ms)) }
  },
  async resubscribe () {
    this.loading = true
    const obj = {
      email: this.email,
      instance: this.instance
    }
    const request = await r2.post(`https://${APP_DOMAIN}`, {json: obj}).response
    const sub = await request.json()

    if (sub.status === 'subscribed') {
      this.message = 'Subscribed'
      await this.timeout(3000)
      this.message = null
      this.email = null
    }
    if (sub.status === 'pending') {
      this.email = null
      this.message = `We sent an email to <strong>$this.email</strong>`
    }

    this.loading = false
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
