export default function createStore(reducer, enhancer) {
  const listeners = []
  let state = undefined

  if (enhancer) {
    return enhancer(createStore)(reducer)
  }

  const dispatch = action => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  const subscribe = listener => {
    listeners.push(listener)

    return () => {
      const index = listeners.indexOf(listener)
      if (index !== -1) listeners.slice(index, 1)
    }
  }

  const getState = () => {
    return state
  }

  dispatch({ type: '@@redux/init' })

  return {
    dispatch,
    subscribe,
    getState,
  }
}
