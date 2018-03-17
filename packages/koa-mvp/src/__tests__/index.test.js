const request = require('supertest')
const Koa = require('../index')

test('koa', async () => {
  const app = new Koa()

  app.use(async (ctx, next) => {
    await next()
    ctx.body.arr.push(2)
  })

  app.use(async (ctx, next) => {
    ctx.body.arr = [1] 
    await next()
  })

  const res = await request(app.listen()).get('/')
  expect(res.body).toMatchSnapshot()
})
