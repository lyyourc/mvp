import { observable, observe } from '../index'

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve))
}

describe('observe', () => {
  test('should run the passed function once', async () => {
    const stub = jest.fn()
    observe(stub)

    await flushPromises()

    expect(stub).toHaveBeenCalledTimes(1)
  })

  test('should observe basic properties', async () => {
    let dummy
    const counter = observable({ count: 0 })
    observe(() => dummy = counter.count)
    counter.count = 1

    await flushPromises()

    expect(dummy).toBe(1)
  })
})
