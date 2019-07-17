import { cutPolygon } from '../../src'

describe('cutPolygon', () => {
  test('throws if the number of desired pieces is less than 2', () => {
    const inputPolygonGeometry = {
      type: 'Polygon', coordinates: [[[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]]]
    }

    expect(() => cutPolygon(inputPolygonGeometry, 1)).toThrow()
    expect(() => cutPolygon(inputPolygonGeometry, 0)).toThrow()
    expect(() => cutPolygon(inputPolygonGeometry, -1)).toThrow()
  })

  test('cuts up a square polygon into 2 pieces as expected', () => {
    const inputPolygonGeometry = {
      type: 'Polygon', coordinates: [[[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]]]
    }

    const expectedOutputGeometries = [
      { type: 'Polygon', coordinates: [[[0, 10], [0, 0], [10, 0], [0, 10]]] },
      { type: 'Polygon', coordinates: [[[10, 0], [10, 10], [0, 10], [10, 0]]] }
    ]

    expect(cutPolygon(inputPolygonGeometry, 2)).toEqual(expectedOutputGeometries)
  })

  test('cuts up a triangle into 2 triangles as expected', () => {
    const inputTriangleGeometry = {
      type: 'Polygon', coordinates: [[[0, 0], [10, 0], [0, 10], [0, 0]]]
    }

    const expectedOutputGeometries = [
      { type: 'Polygon', coordinates: [[[0, 0], [10, 0], [0, 5], [0, 0]]] },
      { type: 'Polygon', coordinates: [[[0, 10], [0, 5], [10, 0], [0, 10]]] }
    ]

    expect(cutPolygon(inputTriangleGeometry, 2)).toEqual(expectedOutputGeometries)
  })
})
