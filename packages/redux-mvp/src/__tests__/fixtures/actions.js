import {
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
} from './actionTypes'

export const createTodo = todo => ({ type: CREATE_TODO, payload: todo })
export const updateTodo = todo => ({ type: UPDATE_TODO, payload: todo })
export const deleteTodo = id => ({ type: DELETE_TODO, payload: { id } })

export const increateCounter = () => ({ type: INCREASE_COUNTER })
export const decreaceCounter = () => ({ type: DECREASE_COUNTER })
