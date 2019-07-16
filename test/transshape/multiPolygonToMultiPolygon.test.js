import { transshape } from '../../src'

describe('transshape: MultiPolygon to MultiPolygon', () => {
  test('2 polygons to 3 polygons', () => {
    const from = {
      type: 'MultiPolygon',
      coordinates: [
        [
          [[5, 2], [5, 5], [1, 5], [2, 2], [5, 2]]
        ],
        [
          [[7, 6], [8, 6], [8, 7], [7, 7], [7, 6]]
        ]
      ]
    }

    const to = {
      type: 'MultiPolygon',
      coordinates: [
        [
          [[1, 4], [3, 4], [3, 6], [0, 7], [1, 4]]
        ],
        [
          [[4, 1], [6, 1], [6, 3], [4, 3], [4, 1]]
        ],
        [
          [[7, 5], [8, 5], [8, 6], [7, 6], [7, 5]]
        ]
      ]
    }

    const expectedHalfWayMultiPolygon = {
      type: 'MultiPolygon',
      coordinates: [
        [
          [[1.5, 3], [3.25, 3.75], [4, 5.5], [0.5, 6], [1.5, 3]]
        ],
        [
          [[3, 1.5], [5.5, 1.5], [5.5, 4], [3.75, 3.25], [3, 1.5]]
        ],
        [
          [[7, 5.5], [8, 5.5], [8, 6.5], [7, 6.5], [7, 5.5]]
        ]
      ]
    }

    const interpolator = transshape(from, to)

    expect(interpolator(0.5)).toEqual(expectedHalfWayMultiPolygon)
  })
})
