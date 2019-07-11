import { transshape } from '../../src'

describe('transshape: Polygon to Polygon', () => {
  test('transforms Polygon w/o holes into another Polygon w/o holes w/ same number of points as expected', () => {
    let from = {
      type: 'Polygon',
      coordinates: [
        [[0, 0], [5, 0], [5, 5], [0, 5], [0, 0]]
      ]
    }

    let to = {
      type: 'Polygon',
      coordinates: [
        [[5, 5], [15, 5], [15, 15], [5, 15], [5, 5]]
      ]
    }

    let expectedHalfWayPolygon = {
      type: 'Polygon',
      coordinates: [
        [[2.5, 2.5], [10, 2.5], [10, 10], [2.5, 10], [2.5, 2.5]]
      ]
    }

    let interpolator = transshape(from, to)

    expect(interpolator(0)).toEqual(from)
    expect(interpolator(0.5)).toEqual(expectedHalfWayPolygon)
    expect(interpolator(1)).toEqual(to)
  })

  test('transforms Polygon w/o holes into another Polygon w/o holes w/ different number of points (w/o rotation) as expected', () => {
    let fromSquare = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [4, 1], [4, 4], [1, 4], [1, 1]]
      ]
    }

    let toStar = {
      type: 'Polygon',
      coordinates: [
        [[2, 2], [2.5, 0], [3, 2], [5, 2.5], [3, 3], [2.5, 5], [2, 3], [0, 2.5], [2, 2]]
      ]
    }

    let interpolator = transshape(fromSquare, toStar)

    let expectedHalfWayPolygon = {
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

  test('transforms Polygon w/o holes into another Polygon w/o holes w/ different number of points (w/ rotation) as expected', () => {
    let fromSquare = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [4, 1], [4, 4], [1, 4], [1, 1]]
      ]
    }

    let toStar = {
      type: 'Polygon',
      coordinates: [
        [[3, 3], [2.5, 5], [2, 3], [0, 2.5], [2, 2], [2.5, 0], [3, 2], [5, 2.5], [3, 3]]
      ]
    }

    let interpolator = transshape(fromSquare, toStar)

    let expectedHalfWayPolygon = {
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

  test('transforms Polygon w/ 1 hole into another Polygon w/ 1 hole as expected', () => {
    let fromPolygon = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [2.5, 0], [4, 1], [4, 4], [2.5, 5], [1, 4], [1, 1]],
        [[2, 2], [2, 3], [3, 3], [3, 2], [2, 2]]
      ]
    }

    let toPolygon = {
      type: 'Polygon',
      coordinates: [
        [[5, 5], [1, 5], [1, 2], [2, 2], [2, 1], [5, 1], [5, 5]],
        [[2, 4], [4, 4], [4, 2], [3, 2], [2, 3], [2, 4]]
      ]
    }

    let interpolator = transshape(fromPolygon, toPolygon)

    let expectedHalfWayPolygon = {
      type: 'Polygon',
      coordinates: [
        [[4.5, 4.5], [1.75, 5], [1, 3], [1.5, 1.5], [2.25, 0.5], [4.5, 1], [4.5, 4.5]],
        [[2, 3.5], [3.5, 3.5], [3.5, 2], [2.5, 2], [2, 2.75], [2, 3.5]]
      ]
    }

    expect(interpolator(0.5)).toEqual(expectedHalfWayPolygon)
  })

  test('transforms Polygon w/ 2 holes into another Polygon w/ 2 holes with matching as expected', () => {
    let fromPolygon = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [5, 1], [5, 5], [1, 5], [1, 1]],
        [[3.5, 3.5], [3.5, 4], [4, 4], [4, 3.5], [3.5, 3.5]],
        [[1.5, 1.5], [1.5, 2], [2, 2], [2, 1.5], [1.5, 1.5]]
      ]
    }

    let toPolygon = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [5, 1], [5, 4], [1, 4], [1, 1]],
        [[2, 2], [2, 3], [2.5, 3], [2.5, 2], [2, 2]],
        [[3.5, 2], [3.5, 3], [4, 3], [4, 2], [3.5, 2]]
      ]
    }

    let interpolator = transshape(fromPolygon, toPolygon)

    let expectedHalfWayPolygon = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [5, 1], [5, 4.5], [1, 4.5], [1, 1]],
        [[1.75, 1.75], [1.75, 2.5], [2.25, 2.5], [2.25, 1.75], [1.75, 1.75]],
        [[3.5, 2.75], [3.5, 3.5], [4, 3.5], [4, 2.75], [3.5, 2.75]]
      ]
    }

    expect(interpolator(0.5)).toEqual(expectedHalfWayPolygon)
  })

  test('transforms Polygon with 2 holes into another Polygon w/ 1 hole with imploding working as expected', () => {
    let fromPolygon = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [5, 1], [5, 5], [1, 5], [1, 1]],
        [[1.5, 2], [1.5, 2.5], [2, 2.5], [2, 2], [1.5, 2]],
        [[3, 2], [3, 4], [4, 4], [4, 2], [3, 2]]
      ]
    }

    let toPolygon = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [5, 1], [5, 5], [1, 5], [1, 1]],
        [[1.5, 3], [1.5, 3.5], [2, 3.5], [2, 3], [1.5, 3]]
      ]
    }

    let interpolator = transshape(fromPolygon, toPolygon)

    let expectedHalfWayPolygon = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [5, 1], [5, 5], [1, 5], [1, 1]],
        [[1.5, 2.5], [1.5, 3], [2, 3], [2, 2.5], [1.5, 2.5]],
        [[3.25, 2.5], [3.25, 3.5], [3.75, 3.5], [3.75, 2.5], [3.25, 2.5]]
      ]
    }

    let roundedOutput = roundValuesPolygon(interpolator(0.5))

    expect(roundedOutput).toEqual(expectedHalfWayPolygon)
  })
})

function round (value, decimals = 2) {
  let multiplier = 10 ** decimals

  return Math.round(value * multiplier) / multiplier
}

function roundValuesPolygon (polygon, decimals = 2) {
  let roundedCoordinates = polygon.coordinates.map(linearRing => {
    return linearRing.map(point => {
      return point.map(value => round(value, decimals))
    })
  })

  return {
    type: 'Polygon',
    coordinates: roundedCoordinates
  }
}
