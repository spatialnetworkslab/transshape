import { transshape } from '../../src'

describe('transshape: MultiPolygon to Polygon and vice versa', () => {
  test('MultiPolygon (2) to Polygon', () => {
    const from = {
      type: 'MultiPolygon',
      coordinates: [
        [
          [[1, 2], [3, 2], [2, 5], [1, 5], [1, 2]]
        ],
        [
          [[5, 2], [7, 2], [7, 5], [5, 5], [5, 2]]
        ]
      ]
    }

    const to = {
      type: 'Polygon',
      coordinates: [
        [[2, 2], [6, 2], [6, 6], [3, 6], [2, 5], [2, 2]]
      ]
    }

    const expectedHalfWayMultiPolygon = {
      type: 'MultiPolygon',
      coordinates: [
        [
          [[4.5, 2], [4, 5.5], [2, 5.5], [2.75, 3], [4.5, 2]]
        ],
        [
          [[6.5, 2], [5, 5.5], [3.5, 5], [3.5, 2], [6.5, 2]]
        ]
      ]
    }

    const interpolator = transshape(from, to)

    expect(interpolator(0.5)).toEqual(expectedHalfWayMultiPolygon)
  })

  test('Polygon to MultiPolygon (2)', () => {
    const from = {
      type: 'Polygon',
      coordinates: [
        [[2, 2], [6, 2], [6, 6], [3, 6], [2, 5], [2, 2]]
      ]
    }

    const to = {
      type: 'MultiPolygon',
      coordinates: [
        [
          [[1, 2], [3, 2], [2, 5], [1, 5], [1, 2]]
        ],
        [
          [[5, 2], [7, 2], [7, 5], [5, 5], [5, 2]]
        ]
      ]
    }

    const expectedHalfWayMultiPolygon = {
      type: 'MultiPolygon',
      coordinates: [
        [
          [[4.5, 2], [4, 5.5], [2, 5.5], [2.75, 3], [4.5, 2]]
        ],
        [
          [[6.5, 2], [5, 5.5], [3.5, 5], [3.5, 2], [6.5, 2]]
        ]
      ]
    }

    const interpolator = transshape(from, to)

    expect(interpolator(0.5)).toEqual(expectedHalfWayMultiPolygon)
  })
})
