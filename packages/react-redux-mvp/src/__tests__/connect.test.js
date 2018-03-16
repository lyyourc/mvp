import React from 'react'
import renderer from 'react-test-renderer'
import connect from '../connect'
import Provider from '../Provider'
import Counter from '../__fixtures__/Counter'
import store from '../__fixtures__/store'

const mapStateToProps = state => ({
  count: state,
})

const mapDispatchToProps = dispatch => ({
  handleIncreaseBtnClick: () => dispatch({ type: 'INCREASE' }),
  handleDecreaseBtnClick: () => dispatch({ type: 'DECREASE' }),
})


test('connnect', () => {
  const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(
    Counter
  )
  const CounterApp = () => {
    return (
      <div>
        <Provider store={store}>
          <CounterContainer />
        </Provider>
      </div>
    )
  }
  const component = renderer.create(CounterApp())
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  const child = component.root.findByType(Counter)
  child.props.handleIncreaseBtnClick()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  child.props.handleDecreaseBtnClick()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
