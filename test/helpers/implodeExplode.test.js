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

  // test('explode: Polygon', () => {

  // })

  // test('explode: MultiPolygon', () => {

  // })
})
