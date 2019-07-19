import { transshape } from '../../src'

describe('transshape: input validation', () => {
  test('throws error if args are not geojson Polygons or MultiPolygons', () => {
    let from = {
      type: 'LineString',
      coordinates: [[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]]
    }

    let to = {
      type: 'Polygon',
      coordinates: [
        [[0, 0], [5, 0], [5, 5], [0, 5], [0, 0]]
      ]
    }

    expect(() => transshape(from, to)).toThrow()
  })

  // test('throws error if any outer ring is not counterclockwise', () => {

  // })

  // test('throws error if any hole is not clockwise', () => {

  // })
})
