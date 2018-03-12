import combineReducers from '../combineReducers'
import { todoReducer, counterReducer } from './fixtures/reducers'

test('combineReducer', () => {
  const rootReducer = combineReducers({
    todos: todoReducer,
    counter: counterReducer,
  })

  expect(rootReducer(undefined, undefined)).toEqual({ todos: [], counter: 0 })
})
