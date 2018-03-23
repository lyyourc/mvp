import { pushTarget, popTarget } from './Dependency'

export default class Watch {
  constructor(getter, callback) {
    this.getter = getter
    this.callback = callback
    this.value = this.get()
  }

  get() {
    pushTarget(this)
    const value = this.getter()
    popTarget()

    return value
  }

  update() {
    const oldValue = this.value
    const value = this.get()

    this.value = value
    this.callback(value, oldValue)
  }
}
