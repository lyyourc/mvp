export default class Dependency {
  constructor() {
    this.subscribes = new Set()
  }

  addSubscribe(subscribe) {
    this.subscribes.add(subscribe)
  }

  depend() {
    const { target } = Dependency
    if (target) this.addSubscribe(target)
  }

  notify() {
    this.subscribes.forEach(subscribe => subscribe.update())
  }
}

Dependency.target = null
const targetStack = []

export function pushTarget(target) {
  if (Dependency.target) targetStack.push(Dependency.target)
  Dependency.target = target
}

export function popTarget(target) {
  Dependency.target = targetStack.pop()
}
