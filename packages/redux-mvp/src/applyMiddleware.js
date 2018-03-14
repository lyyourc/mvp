/**
 * origin.dispatch -> middlewares -> final.dispatch
 * 
 * @param {Function} middlewares 
 */
export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    const middlewareApi = {
      getValue: store.getValue,
      dispatch: store.dispatch
    }

    const chain = middlewares.map(middleware => middleware(middlewareApi))
    const dispatch = compose(...chain)(store.dispatch)
    
    return {
      ...store,
      dispatch
    }
  }
}

function compose(...fns) {
  if (fns.length === 0) {
    return arg => arg
  }

  if (fns.length === 1) {
    return fns[0]
  }

  return fns.reduce((a, b) => (...args) => a(b(...arg)))
}
