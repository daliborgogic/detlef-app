const { Nuxt, Builder } = require('nuxt-edge')
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
const r2 = require('r2')
const { json } = require('micro')

const {
  MAILCHIMP_API_KEY,
  MAILCHIMP_LIST_ID,
  MAILCHIMP_INSTANCE
} = process.env

// Enable live build & reloading on dev
if (nuxt.options.dev) {
  new Builder(nuxt).build()
}

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')

    const data = await json(req)

    const { email } = data

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'apikey ' + MAILCHIMP_API_KEY
    }
    const obj = {
      email_address: email,
      status: 'pending' // Double Opt In
    }
    const response = await r2.post(`https://${MAILCHIMP_INSTANCE}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`, {headers, json: obj}).response
    const mailchimp = await response.json()

    console.log({data})
    console.log({mailchimp})
    return mailchimp
  }
  return nuxt.render(req, res)
}
