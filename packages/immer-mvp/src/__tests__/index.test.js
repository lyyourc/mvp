import produceProxy from '../index'

test('produce', () => {
  const base = {
    name: 'foo',
    colors: ['red'],
  }

  const another = produceProxy(base, draft => {
    draft.name = 'bar'
  })
  
  expect(another.name).toBe('bar')
})
