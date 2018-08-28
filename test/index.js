import test from 'ava'
// import { Nuxt, Builder } from 'nuxt-edge'
// import { resolve } from 'path'
import micro from 'micro'
import listen from 'test-listen'
import request from 'request-promise'

const { send } = micro

const getUrl = fn => {
  const srv = micro(fn)

  return listen(srv)
}

test('send(200, <String>)', async t => {
  const fn = async (req, res) => send(res, 200, 'woot')

  const url = await getUrl(fn)
  const res = await request(url)

  t.deepEqual(res, 'woot')
})
