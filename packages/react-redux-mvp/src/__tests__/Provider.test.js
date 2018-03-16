import React from 'react'
import TestUtils from 'react-dom/test-utils'

import Provider from '../Provider'
import Counter from '../__fixtures__/Counter'
import store from '../__fixtures__/store'

test('Provider', () => {
  const App = (
    <Provider store={store}>
      <Counter />
    </Provider>
  )
  const tree = TestUtils.renderIntoDocument(App)
  const child = TestUtils.findRenderedComponentWithType(tree, Counter)
  expect(child.context.store).toBe(store)
})
