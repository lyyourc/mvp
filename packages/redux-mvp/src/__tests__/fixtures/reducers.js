import {
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
} from './actionTypes'

export const todoReducer = (state = [], action) => {
  const { payload } = action

  switch (action.type) {
    case CREATE_TODO:
      return [...state, payload]

    case UPDATE_TODO:
      return state.map(
        todo => (todo.id !== payload.id ? todo : { ...todo, ...payload })
      )

    case DELETE_TODO:
      return state.filter(todo => todo.id !== payload.id)

    default:
      return state
  }
}

export const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case INCREASE_COUNTER:
      return state + 1

    case DECREASE_COUNTER:
      return state - 1

    default:
      return state
  }
}
