import { transshape } from '../../src'

describe('transshape: MultiLineString to MultiLineString', () => {
  test('same number of sub-LineStrings', () => {
    const fromMultiLineString = {
      type: 'MultiLineString',
      coordinates: [
        [[1, 1], [1, 2], [2, 2]],
        [[3, 2], [4, 2], [4, 1], [5, 1]]
      ]
    }

    const toMultiLineString = {
      type: 'MultiLineString',
      coordinates: [
        [[0, 3], [1, 3.5], [2, 4]],
        [[3, 3], [4, 3], [4, 4], [5, 4]]
      ]
    }

    const interpolator = transshape(fromMultiLineString, toMultiLineString)

    const expectedHalfWayMultiLineString = {
      type: 'MultiLineString',
      coordinates: [
        [[0.5, 2], [1, 2.75], [2, 3]],
        [[3, 2.5], [4, 2.5], [4, 2.5], [5, 2.5]]
      ]
    }

    expect(interpolator(0.5)).toEqual(expectedHalfWayMultiLineString)
  })

  // test('different number of sub-LineStrings', () => {

  // })
})
