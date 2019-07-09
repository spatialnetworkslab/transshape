import polygonToPolygon from './polygonToPolygon.js'

export default function transshape (from, to) {
  ensureValidInput(from, to)

  if (from.type === 'Polygon' && to.type === 'Polygon') {
    return polygonToPolygon(from, to)
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
    input.hasOwnProperty('coordinates')
}
