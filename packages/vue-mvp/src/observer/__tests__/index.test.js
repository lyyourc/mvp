import { walk } from '../index'
import Watcher from '../Watcher'

test('observer', () => {
  const stub = jest.fn()
  const foods = { apple: 5 }
  walk(foods)

  const foodsWatcher = new Watcher(
    () => foods.apple,
    () => stub()
  )
  foods.apple = 6

  expect(stub).toHaveBeenCalledTimes(1)
})
