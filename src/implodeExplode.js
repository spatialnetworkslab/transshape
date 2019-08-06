import transshape from './transshape/transshape.js'
import calculateCentroid from './utils/calculateCentroid.js'
import { makeSmallRectangleAroundPoint } from './transshape/polygonToPolygon.js'
import {
  isPolygonOrMultiPolygon,
  isLineStringOrMultiLineString
} from './utils/geometryDetectors.js'

export function implode (geometry) {
  ensureValidInput(geometry)

  const centroid = calculateCentroid(geometry)
  let implosionPoint = createSmallPolygonAroundPoint(centroid)

  if (isLineStringOrMultiLineString(geometry)) {
    implosionPoint = convertPolygonToLineString(implosionPoint)
  }

  return transshape(geometry, implosionPoint)
}

export function explode (geometry) {
  ensureValidInput(geometry)

  const centroid = calculateCentroid(geometry)
  let explosionPoint = createSmallPolygonAroundPoint(centroid)

  if (isLineStringOrMultiLineString(geometry)) {
    explosionPoint = convertPolygonToLineString(explosionPoint)
  }

  return transshape(explosionPoint, geometry)
}

function ensureValidInput (geometry) {
  if (!(isPolygonOrMultiPolygon(geometry) || isLineStringOrMultiLineString(geometry))) {
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

function convertPolygonToLineString (geometry) {
  const coordinates = geometry.coordinates[0]
  coordinates.pop()

  return {
    type: 'LineString',
    coordinates
  }
}
