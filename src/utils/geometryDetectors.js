export function isLinearRing (polygon) {
  return polygon.constructor === Array
}

export function isPolygon (polygon) {
  return polygon.constructor === Object && polygon.type === 'Polygon'
}

export function isMultiPolygon (polygon) {
  return polygon.constructor === Object && polygon.type === 'MultiPolygon'
}
