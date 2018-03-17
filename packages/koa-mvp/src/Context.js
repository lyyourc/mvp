module.exports = class Context {
  constructor(req, res) {
    this.req = req
    this.res = res
    this.body = {}
  }
}
