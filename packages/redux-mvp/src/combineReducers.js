/**
 * reducers -> reducer
 * 
 * @param {object} reducers 
 */
export default function combineReducers(reducers = {}) {
  return function(state = {}, action = {}) {
    return Object.keys(reducers).reduce((prevState, key) => {
      const reducer = reducers[key]
      return {
        ...prevState,
        [key]: reducer(prevState[key], action),
      }
    }, state)
  }
}
