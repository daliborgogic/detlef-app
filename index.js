// require('dotenv').config()

const { Nuxt, Builder } = require('nuxt-edge')
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
const r2 = require('r2')
const { json } = require('micro')
const md5 = require('./md5')

const {
  // APP_DOMAIN,
  MAILCHIMP_API_KEY,
  MAILCHIMP_LIST_ID,
  MAILCHIMP_INSTANCE
} = process.env

// Enable live build & reloading on dev
if (nuxt.options.dev) {
  new Builder(nuxt).build()
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // APP_DOMAIN
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Origin')

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'apikey ' + MAILCHIMP_API_KEY
  }

  if (req.method === 'PATCH') {
    const body = await json(req)
    const { email_address, status } = body
    const obj = { email_address, status }
    const emailHash = md5(email_address)
    const response = await r2.patch(`https://${MAILCHIMP_INSTANCE}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${emailHash}`, {headers, json: obj}).response
    const data = await response.json()

    return { data }
  }

  if (req.method === 'POST') {
    const body = await json(req)
    const { email_address } = body
    const obj = {
      email_address,
      status: 'pending'  //Double Opt In
    }
    const response = await r2.post(`https://${MAILCHIMP_INSTANCE}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`, {headers, json: obj}).response
    const data = await response.json()

    return { data }
  }
  return nuxt.render(req, res)
}
