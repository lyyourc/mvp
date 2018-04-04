const observers = new WeakMap()
const queuedObservers = new Set()
let currentObserver = null

export function observable(obj) {
  observers.set(obj, new Map())

  return new Proxy(obj, {
    // collect dependency
    get(target, key, ...args) {
      const value = Reflect.get(target, key, ...args)

      // register observer
      if (currentObserver) {
        let observersForKey = observers.get(target).get(key)

        if (!observersForKey) {
          observersForKey = new Set()
          observers.get(target).set(key, observersForKey)
        }

        observersForKey.add(currentObserver)
      }

      return value
    },

    set(target, key, ...args) {
      const observersForKey = observers.get(target).get(key)
      
      if (observersForKey) {
        observersForKey.forEach(queueObserver)
      }

      return Reflect.set(target, key, ...args)
    }
  })
}

export function observe(fn, options = {}) {
  queueObserver(fn)
}


function queueObserver(observer) {
  if (queuedObservers.size === 0) {
    Promise.resolve().then(runObservers)
  }

  queuedObservers.add(observer)
}

function runObservers() {
  try {
    queuedObservers.forEach(runObserver)
  } finally {
    currentObserver = null
    queuedObservers.clear()
  }
}

function runObserver(observer) {
  currentObserver = observer
  observer()
}
