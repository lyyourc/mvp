import combineReducers from '../combineReducers'
import createStore from '../createStore'
import { todoReducer } from './fixtures/reducers'
import {
  createTodo,
  updateTodo,
  deleteTodo,
  increateCounter,
  decreaceCounter,
} from './fixtures/actions'

const newTodo = { id: 1, task: 'learning redux' }
const updatedTodo = { id: 1, task: 'finishing unit test' }
let store = null

beforeEach(() => {
  store = createStore(combineReducers({ todos: todoReducer }))
})
afterEach(() => {
  store = null
})

test('createStore', () => {
  expect(store).toHaveProperty('getState')
  expect(store).toHaveProperty('dispatch')
  expect(store).toHaveProperty('subscribe')
})

test('dispatch', () => {
  expect(store.getState().todos).toHaveLength(0)

  store.dispatch(createTodo(newTodo))
  expect(store.getState().todos.slice(-1)[0]).toEqual(newTodo)

  store.dispatch(updateTodo(updatedTodo))
  expect(store.getState().todos.slice(-1)[0]).toEqual(updatedTodo)

  store.dispatch(deleteTodo(newTodo.id))
  expect(store.getState().todos).toHaveLength(0)
})

test('subscribe', () => {
  const render = jest.fn()

  store.subscribe(render)
  expect(render.mock.calls).toHaveLength(0)

  store.dispatch(createTodo(newTodo))
  expect(render.mock.calls).toHaveLength(1)
})
