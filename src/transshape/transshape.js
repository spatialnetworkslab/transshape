import polygonToPolygon from './polygonToPolygon.js'
import { multiPolygonToPolygon, polygonToMultiPolygon } from './multiPolygonToPolygon.js'
import multiPolygonToMultiPolygon from './multiPolygonToMultiPolygon.js'

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
}

function ensureValidInput (from, to) {
  if (!(
    isPolygonOrMultiPolygon(from) &&
    isPolygonOrMultiPolygon(to)
  )) throw new Error('Invalid input')
}

function isPolygonOrMultiPolygon (input) {
  return input.constructor === Object &&
    ['Polygon', 'MultiPolygon'].includes(input.type) &&
    'coordinates' in input
}
