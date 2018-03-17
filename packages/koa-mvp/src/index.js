const http = require('http')

const Context = require('./Context')
const compose = require('./utils/compose')

module.exports = class Koa {
  constructor() {
    this.middlewares = []
  }

  listen(port = 3000) {
    const server = http.createServer((req, res) => {
      const context = new Context(req, res)
      const chain = compose(this.middlewares)

      chain(context)
        .then(() => this.handleResponse(context))
        .catch(console.error)
    })

    return server.listen(port)
  }

  handleResponse(ctx) {
    const { body, res } = ctx
    res.setHeader('Content-type', 'application/json')
    res.end(typeof body === 'string' ? body : JSON.stringify(body))
  }

  use(middleware) {
    this.middlewares.push(middleware)
    return this
  }
}
