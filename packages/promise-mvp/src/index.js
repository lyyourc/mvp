import { STATES } from './utils/consts'

const noop = () => {}

export default class Promise {
  constructor(executor) {
    this.chain = []
    this.state = STATES.PENDING
    this.value = null

    executor(this.resolve.bind(this), this.reject.bind(this))
  }

  resolve(value) {
    this.state = STATES.FULFILLED
    this.value = value

    this.notify()
  }

  reject(reason) {
    this.state = STATES.REJECTED
    this.value = reason

    this.notify()
  }

  /**
   * 
   * @param {Function} onFulfilled 
   * @param {Function} onRejected 
   * @return {Promise}
   */
  then(onFulfilled = noop, onRejected = noop) {
    // save current then()
    const chainItem = { onFulfilled, onRejected }

    // save next then()
    const promise = new this.constructor((resolve, reject) => {
      chainItem.resolve = resolve
      chainItem.reject = reject
    })

    this.chain = [...this.chain, chainItem]

    // sync resolve or reject
    if (this.state === STATES.FULFILLED) this.resolve(this.value)
    else if (this.state === STATES.REJECTED) this.reject(this.value)

    // should return a new instance, not 'this'
    return promise
  }

  notify() {
    this.chain.forEach(item => {
      if (this.state === STATES.FULFILLED) {
        const result = item.onFulfilled(this.value)

        // if 'promise'
        if (result instanceof this.constructor) {
          result.then(item.resolve, item.reject)
        } else {
          item.resolve(result)
        }
      } else if (this.state === STATES.REJECTED) {
        const reason = item.onRejected(this.value)
        item.reject(reason)
      }
    })
  }
}
