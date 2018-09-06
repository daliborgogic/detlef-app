require('dotenv').config()

const { Nuxt, Builder } = require('nuxt-edge')
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
const r2 = require('r2')
const micro = require('micro')
const { json } = micro
const crypto = require('crypto')

const {
  MAILCHIMP_API_KEY,
  APP_DOMAIN,
  MAILCHIMP_LIST_ID,
  MAILCHIMP_INSTANCE
} = process.env

/**
 * Calculates the MD5 hash of a string.
 *
 * @param  {String} string - The string (or buffer).
 * @return {String}        - The MD5 hash.
 */
const md5 = string => {
  return crypto.createHash('md5').update(string).digest('hex')
}

// Enable live build & reloading on dev
if (nuxt.options.dev) {
  new Builder(nuxt).build()
}

module.exports = async (req, res) => {
  const allowOrigin = nuxt.options.dev
    ? '*'
    : APP_DOMAIN

  res.setHeader('Access-Control-Allow-Origin', allowOrigin)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Origin')

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'apikey ' + MAILCHIMP_API_KEY
  }

  if (req.method === 'PATCH') {
    res.setHeader('Content-Type', 'application/json')
    const body = await json(req)
    const { email_address, status } = body
    const obj = { email_address, status }
    const emailHash = md5(email_address)
    const response = await r2.patch(`https://${MAILCHIMP_INSTANCE}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${emailHash}`, {headers, json: obj}).response
    const data = await response.json()

    return { data }
  }

  if (req.method === 'POST') {
    res.setHeader('Content-Type', 'application/json')
    const body = await json(req)
    const { email_address } = body
    if (email_address) {
      const obj = {
        email_address,
        status: 'pending'  //Double Opt In
      }
      const response = await r2.post(`https://${MAILCHIMP_INSTANCE}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`, {headers, json: obj}).response
      const data = await response.json()

      return { data }
    }

  }
  return nuxt.render(req, res)
}
