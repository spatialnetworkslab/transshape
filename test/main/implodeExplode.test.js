import { implode, explode } from '../../src'
import roundGeometry from '../roundGeometry.js'

describe('implode / explode', () => {
  test('implode: Polygon', () => {
    const polygon = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [5, 1], [5, 5], [1, 5], [1, 1]]
      ]
    }

    const halfwayPolygon = {
      type: 'Polygon',
      coordinates: [
        [[2, 2], [4, 2], [4, 4], [2, 4], [2, 2]]
      ]
    }

    const interpolator = implode(polygon)
    const roundedOutput = roundGeometry(interpolator(0.5))

    expect(roundedOutput).toEqual(halfwayPolygon)
  })

  test('implode: MultiPolygon', () => {
    const multiPolygon = {
      type: 'MultiPolygon',
      coordinates: [
        [
          [[0, 0], [2, 0], [2, 2], [0, 2], [0, 0]]
        ],
        [
          [[4, 4], [6, 4], [6, 6], [4, 6], [4, 4]]
        ]
      ]
    }

    const halfwayMultiPolygon = {
      type: 'MultiPolygon',
      coordinates: [
        [
          [[2.5, 2.5], [1.5, 2.5], [1.5, 1.5], [2.5, 1.5], [2.5, 2.5]]
        ],
        [
          [[3.5, 3.5], [4.5, 3.5], [4.5, 4.5], [3.5, 4.5], [3.5, 3.5]]
        ]
      ]
    }

    const interpolator = implode(multiPolygon)
    const roundedOutput = roundGeometry(interpolator(0.5))

    expect(roundedOutput).toEqual(halfwayMultiPolygon)
  })

  test('implode: LineString', () => {
    const lineString = {
      type: 'LineString',
      coordinates: [
        [1, 1], [1, 4], [4, 4], [4, 1]
      ]
    }

    const halfwayLineString = {
      type: 'LineString',
      coordinates: [
        [1.75, 1.75], [1.75, 3.25], [3.25, 3.25], [3.25, 1.75]
      ]
    }

    const interpolator = implode(lineString)
    const roundedOutput = roundGeometry(interpolator(0.5))

    expect(roundedOutput).toEqual(halfwayLineString)
  })

  test('implode: MultiLineString', () => {

  })

  test('explode: Polygon', () => {
    const polygon = {
      type: 'Polygon',
      coordinates: [
        [[1, 1], [5, 1], [5, 5], [1, 5], [1, 1]]
      ]
    }

    const halfwayPolygon = {
      type: 'Polygon',
      coordinates: [
        [[2, 2], [4, 2], [4, 4], [2, 4], [2, 2]]
      ]
    }

    const interpolator = explode(polygon)
    const roundedOutput = roundGeometry(interpolator(0.5))

    expect(roundedOutput).toEqual(halfwayPolygon)
  })

  test('explode: MultiPolygon', () => {
    const multiPolygon = {
      type: 'MultiPolygon',
      coordinates: [
        [
          [[0, 0], [2, 0], [2, 2], [0, 2], [0, 0]]
        ],
        [
          [[4, 4], [6, 4], [6, 6], [4, 6], [4, 4]]
        ]
      ]
    }

    const halfwayMultiPolygon = {
      type: 'MultiPolygon',
      coordinates: [
        [
          [[2.5, 2.5], [1.5, 2.5], [1.5, 1.5], [2.5, 1.5], [2.5, 2.5]]
        ],
        [
          [[3.5, 3.5], [4.5, 3.5], [4.5, 4.5], [3.5, 4.5], [3.5, 3.5]]
        ]
      ]
    }

    const interpolator = explode(multiPolygon)
    const roundedOutput = roundGeometry(interpolator(0.5))

    expect(roundedOutput).toEqual(halfwayMultiPolygon)
  })
})
