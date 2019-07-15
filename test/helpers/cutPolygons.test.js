import { cutPolygons } from '../../src/'

describe('cutPolygons', () => {
  test('cuts up 3 polygons into 5 polygons as expected', () => {
    const geometries = [
      { type: 'Polygon', coordinates: [[[0, 0], [5, 0], [5, 5], [0, 5], [0, 0]]] },
      { type: 'Polygon', coordinates: [[[0, 0], [8, 0], [0, 8], [0, 0]]] },
      { type: 'Polygon', coordinates: [[[10, 10], [11, 10], [11, 11], [10, 11], [10, 10]]] }
    ]

    const expectedOutputGeometries = [
      { type: 'Polygon', coordinates: [[[0, 5], [0, 0], [5, 0], [0, 5]]] },
      { type: 'Polygon', coordinates: [[[5, 0], [5, 5], [0, 5], [5, 0]]] },

      { type: 'Polygon', coordinates: [[[0, 0], [8, 0], [0, 4], [0, 0]]] },
      { type: 'Polygon', coordinates: [[[0, 8], [0, 4], [8, 0], [0, 8]]] },

      { type: 'Polygon', coordinates: [[[10, 10], [11, 10], [11, 11], [10, 11], [10, 10]]] }
    ]

    expect(cutPolygons(geometries, 2)).toEqual(expectedOutputGeometries)
  })
})
