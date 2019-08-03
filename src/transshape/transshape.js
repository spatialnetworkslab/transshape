import polygonToPolygon from './polygonToPolygon.js'
import {
  multiPolygonToPolygon,
  polygonToMultiPolygon
} from './multiPolygonToPolygon.js'
import multiPolygonToMultiPolygon from './multiPolygonToMultiPolygon.js'

import lineStringtoLineString from './lineStringToLineString.js'
import {
  multiLineStringToLineString,
  lineStringToMultiLineString
} from './multiLineStringToLineString.js'
import multiLineStringToMultiLineString from './multiLineStringToMultiLineString.js'

import {
  isPolygonOrMultiPolygon,
  isLineStringOrMultiLineString
} from '../utils/geometryDetectors.js'

export default function transshape (from, to) {
  ensureValidInput(from, to)

  // Polygon transitions
  if (from.type === 'Polygon' && to.type === 'Polygon') {
    return polygonToPolygon(from, to)
  }

  if (from.type === 'MultiPolygon' && to.type === 'Polygon') {
    return multiPolygonToPolygon(from, to)
  }

  if (from.type === 'Polygon' && to.type === 'MultiPolygon') {
    return polygonToMultiPolygon(from, to)
  }

  if (from.type === 'MultiPolygon' && to.type === 'MultiPolygon') {
    return multiPolygonToMultiPolygon(from, to)
  }

  // LineString transitions
  if (from.type === 'LineString' && to.type === 'LineString') {
    return lineStringtoLineString(from, to)
  }

  if (from.type === 'MultiLineString' && to.type === 'LineString') {
    return multiLineStringToLineString(from, to)
  }

  if (from.type === 'LineString' && to.type === 'MultiLineString') {
    return lineStringToMultiLineString(from, to)
  }

  if (from.type === 'MultiLineString' && to.type === 'MultiLineString') {
    return multiLineStringToMultiLineString(from, to)
  }
}

function ensureValidInput (from, to) {
  if (bothPolygons(from, to) || bothLines(from, to)) {
    return
  }

  throw new Error('Invalid input')
}

function bothPolygons (from, to) {
  return isPolygonOrMultiPolygon(from) && isPolygonOrMultiPolygon(to)
}

function bothLines (from, to) {
  return isLineStringOrMultiLineString(from) && isLineStringOrMultiLineString(to)
}
