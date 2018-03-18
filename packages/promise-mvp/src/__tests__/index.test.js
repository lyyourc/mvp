import PromiseMVP from '../index'

test('.then() success handler', async () => {
  const p1 = new PromiseMVP((resolve, reject) => {
    setTimeout(() => {
      resolve(42)
    }, 100)
  })
    .then(res => res)
    .then(res => res + 3)

  expect(await p1).toBe(45)
})

test('.then() error handler', async () => {
  let error = null

  const p1 = new PromiseMVP((resolve, reject) => {
    reject(new Error('oops'))
  }).then(console.log, reason => {
    error = reason
  })

  expect(error.message).toBe('oops')
})
