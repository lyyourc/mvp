const compose = require('../compose')

let arr = []
const middleware1 = async (ctx, next) => {
  await next()
  arr.push(1)
}

const middleware2 = async (ctx, next) => {
  arr.push(2)
  await next()
}

const middleware3 = async (ctx, next) => {
  arr.push(3)
  await next()
}

test('compose', async () => {
  const chain = compose([middleware1, middleware2, middleware3])
  const app = await chain({})
  expect(arr).toEqual([2, 3, 1])
})
