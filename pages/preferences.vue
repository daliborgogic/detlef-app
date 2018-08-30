<template lang="pug">
.profile
  h1(v-if="!loading") Update your preferences
  h1.error(v-else-if="error") {{error}}
  h1.loading(v-else) {{title}}
  div
    .email
      label Email Address {{validateEmail}}
      input(type="email" v-model="email" @keyup.up="validateEmail")
    .cta
      div
        button(@click="unsubscribe" :disabled="loading") UNSUBSCRIBE
        button.update(@click="update" :disabled="loading") UPDATE
  //- div(v-else) subscribe
</template>

<script>
const { APP_DOMAIN } = process.env
import r2 from 'r2'
export default {
  data () {
    return {
      loading: false,
      title: null,
      error: null,
      email: this.$store.state.email
    }
  },

  computed: {
    validateEmail () {
      console.log('aaaaaaaaaaa', this.email) // eslint-disable-line
      // eslint-disable-next-line  no-useless-escape
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const isValid = re.test(this.email)
      if (isValid) {
        this.$store.commit('setEmail', this.email)
      }
      return isValid
    },
    obj () {
      return {
        email: this.email,
        status: 'subscribed'
      }
    }
  },

  methods: {
    async unsubscribe () {
      if (this.email) {
        try {
          this.loading = true
          this.title =  'Unsubscribing'
          const res = await r2.delete(`https://${APP_DOMAIN}`, {json: this.obj}).response
          const unsubscribe = await res.json()
          const { status }  = unsubscribe.unsubscribe
          if (status === 204) {
            this.title = 'Unsubscribed'
          }
          if (status === 404) {
            this.title = 'Not Found'
          }
          this.loading = false

          console.log({unsubscribe}) // eslint-disable-line
          return
        } catch (error) {
          this.error = 'Something Goes Wrong',
          // this.unsubscribed = false
          // this.loading = false
          console.error(error) // eslint-disable-line
        }
      }
    },
    async update () {
      if (this.validateEmail) {
        try {
          this.loading = true
          this.title =  'Updating'
          const res = await r2.patch(`https://${APP_DOMAIN}`, {json: this.obj}).response
          const update = await res.json()
          console.log({update}) // eslint-disable-line
          if (update) {
            this.loading = false
            this.title = null
            return { update }
          }

        } catch (error) {
          this.error = 'Something Goes Wrong',
          // this.unsubscribed = false
          this.loading = false
          console.error(error) // eslint-disable-line
          return
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.error
  color $pink
.profile
  font-size 23px
  letter-spacing 0.2px
  line-height 1.3
  max-width 400px
  margin 64px auto 25vh auto
  padding-left 16px
  padding-right 16px
h1
  font-family "Custom Font"
  font-weight 400
  font-size 23px
  display inline-block
.email
.cta
  display flex
.email
  flex-direction column
  margin-bottom 16px
.cta
  div
    margin-left auto
label
  font-size 14px
input
  border none
  border-bottom 1px solid #000 + 88%
  padding 0
  margin-top 8px
  font-size 1rem
  &:focus
    border-color #000
button
input
  height 32px
  &:focus
    outline none
button
  padding 0 16px
  background-color transparent
  border none
  font-weight 700
  color #999
  &:disabled
    color #000 + 88%
.update
  margin-left 16px
  color #000
input
.update
  border-radius 2px
.loading:after
  overflow hidden
  display inline-block
  margin-left 8px
  vertical-align bottom
  -webkit-animation ellipsis steps(4,end) 900ms infinite
  animation ellipsis steps(4,end) 900ms infinite
  content "\2026" /* ascii code for the ellipsis character */
  width 0px

@keyframes ellipsis
  to
    width: 20px
</style>
