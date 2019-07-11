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
})