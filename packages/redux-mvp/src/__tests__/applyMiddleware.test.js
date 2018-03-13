import applyMiddleware from '../applyMiddleware'
import createStore from '../createStore'
import { counterReducer } from './fixtures/reducers'
import { asyncMiddleware } from './fixtures/middlewares'
import { increateCounterAsync } from './fixtures/actions'

test('applyMiddleware', async () => {
  const store = createStore(counterReducer, applyMiddleware(asyncMiddleware))
  expect(store.getState()).toBe(0)
  await store.dispatch(increateCounterAsync())
  expect(store.getState()).toBe(1)
})
