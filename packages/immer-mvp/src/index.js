import {
  shallowCopy,
  has,
  PROXY_STATE,
  isProxyable,
  isProxy,
  is,
  finalize
} from './utils'

const objectTraps = {
  get,
  has(target, prop) {
    return prop in source(target)
  },
  ownKeys(target) {
    return Reflect.ownKeys(source(target))
  },
  set,
  // deleteProperty,
  // getOwnPropertyDescriptor,
  // defineProperty,
  setPrototypeOf() {
    throw new Error("Don't even try this...")
  },
}

function source(state) {
  return state.modified === true ? state.copy : state.base
}

export default function produceProxy(baseState, producer) {
  // create proxy for root
  const rootProxy = createProxy(undefined, baseState)
  const returnValue = producer.call(rootProxy, rootProxy)
  return finalize(rootProxy)
}

function createProxy(parentState, base) {
  const state = createState(parentState, base)
  const proxy = Proxy.revocable(state, objectTraps)
  return proxy.proxy
}

function createState(parent, base) {
  return {
    modified: false,
    finalized: false,
    parent,
    base,
    copy: undefined,
    proxies: {},
  }
}

function get(state, prop) {
  if (prop === PROXY_STATE) return state

  if (state.modified) {
    const value = state.copy[prop]
    if (value === state.base[prop] && isProxyable(value))
      // only create proxy if it is not yet a proxy, and not a new object
      // (new objects don't need proxying, they will be processed in finalize anyway)
      return (state.copy[prop] = createProxy(state, value))
    return value
  } else {
    if (has(state.proxies, prop)) return state.proxies[prop]
    const value = state.base[prop]
    if (!isProxy(value) && isProxyable(value))
      return (state.proxies[prop] = createProxy(state, value))
    return value
  }
}

function set(state, prop, value) {
  console.log(`set prop: ${prop}`)
  if (!state.modified) {
    if (
      (prop in state.base && is(state.base[prop], value)) ||
      (has(state.proxies, prop) && state.proxies[prop] === value)
    )
      return true
    markChanged(state)
  }
  state.copy[prop] = value
  return true
}

function markChanged(state) {
  console.log('mark changed')
  if (!state.modified) {
    state.modified = true
    state.copy = shallowCopy(state.base)
    // copy the proxies over the base-copy
    Object.assign(state.copy, state.proxies) // yup that works for arrays as well

    if (state.parent) markChanged(state.parent)
  }
}
