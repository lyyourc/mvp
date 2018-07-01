export const PROXY_STATE = 'state'

export function shallowCopy(value) {
  if (Array.isArray(value)) return value.slice()
  if (value.__proto__ === undefined)
      return Object.assign(Object.create(null), value)
  return Object.assign({}, value)
}

export function has(thing, prop) {
  return Object.prototype.hasOwnProperty.call(thing, prop)
}

export function isProxyable(value) {
  if (!value) return false
  if (typeof value !== "object") return false
  if (Array.isArray(value)) return true
  const proto = Object.getPrototypeOf(value)
  return proto === null || proto === Object.prototype
}

export function isProxy(value) {
  return !!value && !!value[PROXY_STATE]
}

export function is(x, y) {
  // From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
  if (x === y) {
      return x !== 0 || 1 / x === 1 / y
  } else {
      return x !== x && y !== y
  }
}

export function each(value, cb) {
  if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) cb(i, value[i])
  } else {
      for (let key in value) cb(key, value[key])
  }
}
export function freeze(value) {
  console.log('freeze', value)
  let autoFreeze = false
  if (autoFreeze) {
      Object.freeze(value)
  }
  return value
}

let useProxies = typeof Proxy !== "undefined"
export function finalize(base) {
  if (isProxy(base)) {
      const state = base[PROXY_STATE]
      if (state.modified === true) {
          if (state.finalized === true) return state.copy
          state.finalized = true
          return finalizeObject(
              useProxies ? state.copy : (state.copy = shallowCopy(base)),
              state
          )
      } else {
          return state.base
      }
  }
  finalizeNonProxiedObject(base)
  return base
}

function finalizeObject(copy, state) {
  console.log('finalize proxy', state)
  const base = state.base
  each(copy, (prop, value) => {
      if (value !== base[prop]) copy[prop] = finalize(value)
  })
  return freeze(copy)
}


function finalizeNonProxiedObject(parent) {
  console.log('finalize non-proxy', parent)
  // If finalize is called on an object that was not a proxy, it means that it is an object that was not there in the original
  // tree and it could contain proxies at arbitrarily places. Let's find and finalize them as well
  if (!isProxyable(parent)) return
  if (Object.isFrozen(parent)) return
  each(parent, (i, child) => {
      if (isProxy(child)) {
          parent[i] = finalize(child)
      } else finalizeNonProxiedObject(child)
  })
  // always freeze completely new data
  freeze(parent)
}
