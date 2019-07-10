import { cutPolygon } from '../../src'

describe('cutPolygon', () => {
  test('cuts up a square polygon into 2 pieces as expected', () => {
    let inputPolygonGeometry = {
      type: 'Polygon', coordinates: [[[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]]]
    }

    let expectedOutputGeometries = [
      { type: 'Polygon', coordinates: [[[0, 10], [0, 0], [10, 0], [0, 10]]] },
      { type: 'Polygon', coordinates: [[[10, 0], [10, 10], [0, 10], [10, 0]]] }
    ]

    expect(cutPolygon(inputPolygonGeometry, 2)).toEqual(expectedOutputGeometries)
  })

  test('cuts up a triangle into 2 triangles as expected', () => {
    let inputTriangleGeometry = {
      type: 'Polygon', coordinates: [[[0, 0], [10, 0], [0, 10], [0, 0]]]
    }

    let expectedOutputGeometries = [
      { type: 'Polygon', coordinates: [[[0, 0], [10, 0], [0, 5], [0, 0]]] },
      { type: 'Polygon', coordinates: [[[0, 10], [0, 5], [10, 0], [0, 10]]] }
    ]

    expect(cutPolygon(inputTriangleGeometry, 2)).toEqual(expectedOutputGeometries)
  })
})
