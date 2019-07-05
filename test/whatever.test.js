import transshape from '../dist/transshape.esm.js'

describe('everything works', () => {
  test('our setup works', () => {
    expect(transshape()).toBe('bla')
  })

  test('2 + 2 = 4', () => {
    expect(2 + 2).toBe(4)
  })
})