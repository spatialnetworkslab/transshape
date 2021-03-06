import { transshapeLayer } from '../../src'
import roundGeometry from '../roundGeometry.js'

describe('transshapeLayer', () => {
  test('keys overlap', () => {
    const fromLayer = {
      1: {
        type: 'Polygon',
        coordinates: [
          [[0, 0], [5, 0], [5, 5], [0, 5], [0, 0]]
        ]
      },
      2: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [[1, 2], [3, 2], [2, 5], [1, 5], [1, 2]]
          ],
          [
            [[5, 2], [7, 2], [7, 5], [5, 5], [5, 2]]
          ]
        ]
      }
    }

    const toLayer = {
      1: {
        type: 'Polygon',
        coordinates: [
          [[5, 5], [15, 5], [15, 15], [5, 15], [5, 5]]
        ]
      },
      2: {
        type: 'Polygon',
        coordinates: [
          [[2, 2], [6, 2], [6, 6], [3, 6], [2, 5], [2, 2]]
        ]
      }
    }

    const expectedHalfwayLayer = {
      1: {
        type: 'Polygon',
        coordinates: [
          [[2.5, 2.5], [10, 2.5], [10, 10], [2.5, 10], [2.5, 2.5]]
        ]
      },
      2: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [[4.5, 2], [4, 5.5], [2, 5.5], [2.75, 3], [4.5, 2]]
          ],
          [
            [[6.5, 2], [5, 5.5], [3.5, 5], [3.5, 2], [6.5, 2]]
          ]
        ]
      }
    }

    const layerInterpolator = transshapeLayer(fromLayer, toLayer)

    expect(layerInterpolator(0.5)).toEqual(expectedHalfwayLayer)
  })

  test('keys don\'t  overlap', () => {
    const fromLayer = {
      1: {
        type: 'Polygon',
        coordinates: [
          [[2, 2], [6, 2], [6, 6], [3, 6], [2, 5], [2, 2]]
        ]
      },
      2: {
        type: 'Polygon',
        coordinates: [
          [[1, 1], [5, 1], [5, 5], [1, 5], [1, 1]]
        ]
      }
    }

    const toLayer = {
      1: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [[1, 2], [3, 2], [2, 5], [1, 5], [1, 2]]
          ],
          [
            [[5, 2], [7, 2], [7, 5], [5, 5], [5, 2]]
          ]
        ]
      },
      3: {
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
    }

    const expectedHalfwayLayer = {
      1: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [[4.5, 2], [4, 5.5], [2, 5.5], [2.75, 3], [4.5, 2]]
          ],
          [
            [[6.5, 2], [5, 5.5], [3.5, 5], [3.5, 2], [6.5, 2]]
          ]
        ]
      },
      2: {
        type: 'Polygon',
        coordinates: [
          [[2, 2], [4, 2], [4, 4], [2, 4], [2, 2]]
        ]
      },
      3: {
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
    }

    const layerInterpolator = transshapeLayer(fromLayer, toLayer)
    const halfwayLayer = roundLayer(layerInterpolator(0.5))

    expect(halfwayLayer).toEqual(expectedHalfwayLayer)
  })
})

function roundLayer (layer) {
  const newLayer = {}

  for (const key in layer) {
    newLayer[key] = roundGeometry(layer[key])
  }

  return newLayer
}
