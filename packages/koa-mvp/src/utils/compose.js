module.exports = middlewares => {
  let current = -1

  return ctx => {
    const next = function() {
      return new Promise((resolve, reject) => {
        if (current === middlewares.length - 1) return resolve()

        const middleware = middlewares[++current]
        try {
          resolve(middleware(ctx, next))
        } catch (err) {
          reject(err)
        }
      })
    }

    return next()
  }
}
