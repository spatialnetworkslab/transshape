import transshape from './transshape/transshape.js'
import calculateCentroid from './utils/calculateCentroid.js'
import { makeSmallRectangleAroundPoint } from './transshape/polygonToPolygon.js'
import { isPolygonOrMultiPolygon } from './utils/geometryDetectors.js'

export function implode (geometry) {
  ensureValidInput(geometry)

  const centroid = calculateCentroid(geometry)
  const implosionPoint = createSmallPolygonAroundPoint(centroid)

  return transshape(geometry, implosionPoint)
}

export function explode (geometry) {
  ensureValidInput(geometry)

  const centroid = calculateCentroid(geometry)
  const explosionPoint = createSmallPolygonAroundPoint(centroid)

  return transshape(explosionPoint, geometry)
}

function ensureValidInput (geometry) {
  if (!isPolygonOrMultiPolygon(geometry)) {
    throw new Error('Invalid input')
  }
}

function createSmallPolygonAroundPoint (point) {
  const linearRingAroundPoint = makeSmallRectangleAroundPoint(point)
  return {
    type: 'Polygon',
    coordinates: [linearRingAroundPoint]
  }
}
