import polygonToPolygon from './polygonToPolygon.js'
import { multiPolygonToPolygon, polygonToMultiPolygon } from './multiPolygonToPolygon.js'
import multiPolygonToMultiPolygon from './multiPolygonToMultiPolygon.js'
import lineStringtoLineString from './lineStringToLineString.js'
import {
  isPolygonOrMultiPolygon,
  isLineStringOrMultiLineString
} from '../utils/geometryDetectors.js'

export default function transshape (from, to) {
  ensureValidInput(from, to)

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

  if (from.type === 'LineString' && to.type === 'LineStrnig') {
    return lineStringtoLineString(from, to)
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
