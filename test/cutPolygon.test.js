import { cutPolygon } from '../src/index.js'

describe('cutPolygon', () => {
  test('cutPolygon cuts up a square polygon as expected', () => {
    let inputPolygonGeometry = {
      type: 'Polygon',
      coordinates: [
        [[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]]
      ]
    }

    let expectedOutputGeometry = {
      type: 'MultiPolygon',
      coordinates: [
        [

        ],

        [

        ]
      ]
    }

    expect(cutPolygon(inputPolygonGeometry)).toEqual(expectedOutputGeometry)
  })
})
