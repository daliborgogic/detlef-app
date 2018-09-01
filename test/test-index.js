import dotenv from 'dotenv'
dotenv.config()

import test from 'ava'
import micro from 'micro'
import listen from 'test-listen'
import request from 'request-promise'
import { Nuxt } from 'nuxt-edge'
import config  from './../nuxt.config.js'

const nuxt = new Nuxt(config)

const getUrl = fn => {
  const srv = micro(fn)

  return listen(srv)
}

test('Route / exits and render HTML', async t => {
  const fn = async (req, res) => {
    const html  = await nuxt.render(req, res)
    return html
  }
  const url = await getUrl(fn)
  const res = await request(url)

  t.true(res.includes(process.env.FIRST_NAME))
})
