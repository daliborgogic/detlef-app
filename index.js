require('dotenv').config()

const { Nuxt, Builder } = require('nuxt-edge')
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
const r2 = require('r2')
const { json } = require('micro')
const md5 = require('./md5')

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
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Origin')

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'apikey ' + MAILCHIMP_API_KEY
  }

  if (req.method === 'DELETE') {
    const data = await json(req)
    const { email } = data

    const obj = {
      email_address: email,
      status: 'subscribed'
    }

    const emailHash = md5(email)

    const response = await r2.delete(`https://${MAILCHIMP_INSTANCE}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${emailHash}`, {headers, json: obj}).response
    const { ok, statusText, status } = response

    return { ok, statusText, status }
  }

  if (req.method === 'PATCH') {
    const data = await json(req)
    const { email } = data

    const obj = {
      email_address: email,
      status: 'subscribed'
    }

    const emailHash = md5(email)

    const response = await r2.patch(`https://${MAILCHIMP_INSTANCE}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${emailHash}`, {headers, json: obj}).response
    const update = await response.json()
    const { ok, statusText, status } = update

    return { update, ok, statusText, status }
  }

  if (req.method === 'POST') {

    const data = await json(req)

    const { email } = data

    const obj = {
      email_address: email,
      status: 'pending'  //Double Opt In
    }

    const response = await r2.post(`https://${MAILCHIMP_INSTANCE}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`, {headers, json: obj}).response
    const mailchimp = await response.json()
    const { ok, statusText, status } = mailchimp
    // console.log({data})
    // console.log({mailchimp})
    return { mailchimp, ok, statusText, status }
  }
  return nuxt.render(req, res)
}
