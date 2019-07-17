import { transshape } from '../../src'

describe('transshape: Polygon to Polygon', () => {
  test('same number of points, no rotation, no holes', () => {
    const from = {
      type: 'Polygon',
      coordinates: [
        [[0, 0], [5, 0], [5, 5], [0, 5], [0, 0]]
      ]
    }

    const to = {
      type: 'Polygon',
      coordinates: [
        [[5, 5], [15, 5], [15, 15], [5, 15], [5, 5]]
      ]
    }

    const expectedHalfWayPolygon = {
      type: 'Polygon',
      coordinates: [
        [[2.5, 2.5], [10, 2.5], [10, 10], [2.5, 10], [2.5, 2.5]]
      ]
    }

    const interpolator = transshape(from, to)

    expect(interpolator(0)).toEqual(from)
    expect(interpolator(0.5)).toEqual(expectedHalfWayPolygon)
    expect(interpolator(1)).toEqual(to)
  })

  test('different number of points, no rotation, no holes', () => {
    const fromSquare = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [4, 1], [4, 4], [1, 4], [1, 1]]
      ]
    }

    const toStar = {
      type: 'Polygon',
      coordinates: [
        [[2, 2], [2.5, 0], [3, 2], [5, 2.5], [3, 3], [2.5, 5], [2, 3], [0, 2.5], [2, 2]]
      ]
    }

    const interpolator = transshape(fromSquare, toStar)

    const expectedHalfWayPolygon = {
      type: 'Polygon',
      coordinates: [
        [
          [1.5, 1.5], [2.5, 0.5], [3.5, 1.5], [4.5, 2.5],
          [3.5, 3.5], [2.5, 4.5], [1.5, 3.5], [0.5, 2.5], [1.5, 1.5]
        ]
      ]
    }

    expect(interpolator(0.5)).toEqual(expectedHalfWayPolygon)
  })

  test('different number of points, rotation, no holes', () => {
    const fromSquare = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [4, 1], [4, 4], [1, 4], [1, 1]]
      ]
    }

    const toStar = {
      type: 'Polygon',
      coordinates: [
        [[3, 3], [2.5, 5], [2, 3], [0, 2.5], [2, 2], [2.5, 0], [3, 2], [5, 2.5], [3, 3]]
      ]
    }

    const interpolator = transshape(fromSquare, toStar)

    const expectedHalfWayPolygon = {
      type: 'Polygon',
      coordinates: [
        [
          [3.5, 3.5], [2.5, 4.5], [1.5, 3.5], [0.5, 2.5],
          [1.5, 1.5], [2.5, 0.5], [3.5, 1.5], [4.5, 2.5], [3.5, 3.5]
        ]
      ]
    }

    expect(interpolator(0.5)).toEqual(expectedHalfWayPolygon)
  })

  test('different number of points, rotation, both 1 hole', () => {
    const fromPolygon = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [2.5, 0], [4, 1], [4, 4], [2.5, 5], [1, 4], [1, 1]],
        [[2, 2], [2, 3], [3, 3], [3, 2], [2, 2]]
      ]
    }

    const toPolygon = {
      type: 'Polygon',
      coordinates: [
        [[5, 5], [1, 5], [1, 2], [2, 2], [2, 1], [5, 1], [5, 5]],
        [[2, 4], [4, 4], [4, 2], [3, 2], [2, 3], [2, 4]]
      ]
    }

    const interpolator = transshape(fromPolygon, toPolygon)

    const expectedHalfWayPolygon = {
      type: 'Polygon',
      coordinates: [
        [[4.5, 4.5], [1.75, 5], [1, 3], [1.5, 1.5], [2.25, 0.5], [4.5, 1], [4.5, 4.5]],
        [[2, 3.5], [3.5, 3.5], [3.5, 2], [2.5, 2], [2, 2.75], [2, 3.5]]
      ]
    }

    expect(interpolator(0.5)).toEqual(expectedHalfWayPolygon)
  })

  test('same number of points, no rotation, both 2 holes (hole matching)', () => {
    const fromPolygon = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [5, 1], [5, 5], [1, 5], [1, 1]],
        [[3.5, 3.5], [3.5, 4], [4, 3.75], [4, 3.5], [3.5, 3.5]],
        [[1.5, 1.5], [1.5, 2], [2, 2], [2, 1.5], [1.5, 1.5]]
      ]
    }

    const toPolygon = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [5, 1], [5, 4], [1, 4], [1, 1]],
        [[2, 2], [2, 3], [2.5, 3], [2.5, 2], [2, 2]],
        [[3.5, 2], [3.5, 3], [4, 2.75], [4, 2], [3.5, 2]]
      ]
    }

    const interpolator = transshape(fromPolygon, toPolygon)

    const expectedHalfWayPolygon = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [5, 1], [5, 4.5], [1, 4.5], [1, 1]],
        [[1.75, 1.75], [1.75, 2.5], [2.25, 2.5], [2.25, 1.75], [1.75, 1.75]],
        [[3.5, 2.75], [3.5, 3.5], [4, 3.25], [4, 2.75], [3.5, 2.75]]
      ]
    }

    expect(interpolator(0.5)).toEqual(expectedHalfWayPolygon)
  })

  test('same number of points, no rotation, different number of holes (imploding)', () => {
    const fromPolygon = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [5, 1], [5, 5], [1, 5], [1, 1]],
        [[1.5, 2], [1.5, 2.5], [2, 2.5], [2, 2], [1.5, 2]],
        [[3, 2], [3, 4], [4, 4], [4, 2], [3, 2]]
      ]
    }

    const toPolygon = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [5, 1], [5, 5], [1, 5], [1, 1]],
        [[1.5, 3], [1.5, 3.5], [2, 3.5], [2, 3], [1.5, 3]]
      ]
    }

    const interpolator = transshape(fromPolygon, toPolygon)

    const expectedHalfWayPolygon = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [5, 1], [5, 5], [1, 5], [1, 1]],
        [[1.5, 2.5], [1.5, 3], [2, 3], [2, 2.5], [1.5, 2.5]],
        [[3.25, 2.5], [3.25, 3.5], [3.75, 3.5], [3.75, 2.5], [3.25, 2.5]]
      ]
    }

    const roundedOutput = roundValuesPolygon(interpolator(0.5))

    expect(roundedOutput).toEqual(expectedHalfWayPolygon)
  })

  test('same number of points, no rotation, different number of holes (exploding)', () => {
    const fromPolygon = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [5, 1], [5, 5], [1, 5], [1, 1]],
        [[1.5, 3], [1.5, 3.5], [2, 3.5], [2, 3], [1.5, 3]]
      ]
    }

    const toPolygon = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [5, 1], [5, 5], [1, 5], [1, 1]],
        [[1.5, 2], [1.5, 2.5], [2, 2.5], [2, 2], [1.5, 2]],
        [[3, 2], [3, 4], [4, 4], [4, 2], [3, 2]]
      ]
    }

    const interpolator = transshape(fromPolygon, toPolygon)

    const expectedHalfWayPolygon = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [5, 1], [5, 5], [1, 5], [1, 1]],
        [[1.5, 2.5], [1.5, 3], [2, 3], [2, 2.5], [1.5, 2.5]],
        [[3.25, 2.5], [3.25, 3.5], [3.75, 3.5], [3.75, 2.5], [3.25, 2.5]]
      ]
    }

    const roundedOutput = roundValuesPolygon(interpolator(0.5))

    expect(roundedOutput).toEqual(expectedHalfWayPolygon)
  })
})

function round (value, decimals = 2) {
  const multiplier = 10 ** decimals

  return Math.round(value * multiplier) / multiplier
}

export function roundValuesPolygon (polygon, decimals = 2) {
  const roundedCoordinates = polygon.coordinates.map(linearRing => {
    return linearRing.map(point => {
      return point.map(value => round(value, decimals))
    })
  })

  return {
    type: 'Polygon',
    coordinates: roundedCoordinates
  }
}
