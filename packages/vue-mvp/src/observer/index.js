import Dependency from './Dependency'

export function walk(object) {
  Object.keys(object).forEach(key => {
    const value = object[key]
    defineReactive(object, key, value)
  })
}

function defineReactive(object, key, value) {
  if (value !== null && typeof value === 'object') walk(value)

  const dependency = new Dependency() 

  Object.defineProperty(object, key, {
    enumerable: true,
    configurable: true,

    get() {
      dependency.depend()
      return value
    },

    set(newValue) {
      value = newValue
      dependency.notify()
    }
  })
}
