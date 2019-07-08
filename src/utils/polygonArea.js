/*
  Taken from: https://stackoverflow.com/a/33670691/7237112
*/
export default function polygonArea (polygon) {
  if (isLinearRing(polygon)) {
    return getRingArea(polygon)
  }

  if (isPolygon(polygon)) {
    return getPolygonArea(polygon)
  }

  if (isMultiPolygon(polygon)) {
    return getMultiPolygonArea(polygon)
  }

  throw new Error('Invalid input')
}

export function linearRingIsClockwise (ring) {
  return getSignedRingArea(ring) < 0
}

function getRingArea (ring) {
  return Math.abs(getSignedRingArea(ring))
}

function getSignedRingArea (ring) {
  let total = 0

  for (let i = 0, l = ring.length; i < l; i++) {
    let addX = ring[i][0]
    let addY = ring[i === ring.length - 1 ? 0 : i + 1][1]
    let subX = ring[i === ring.length - 1 ? 0 : i + 1][0]
    let subY = ring[i][1]

    total += (addX * addY * 0.5)
    total -= (subX * subY * 0.5)
  }

  return total
}

function getPolygonArea (polygon) {
  let totalArea = getRingArea(polygon.coordinates[0])

  for (let i = 1; i < polygon.coordinates.length; i++) {
    let holeArea = getRingArea(polygon.coordinates[i])
    totalArea -= holeArea
  }

  return totalArea
}

function getMultiPolygonArea (multiPolygon) {
  let totalArea = 0

  for (let i = 0; i < multiPolygon.coordinates.length; i++) {
    totalArea += getPolygonArea(multiPolygon.coordinates[i])
  }

  return totalArea
}

function isLinearRing (polygon) {
  return polygon.constructor === Array
}

function isPolygon (polygon) {
  return polygon.constructor === Object && polygon.type === 'Polygon'
}

function isMultiPolygon (polygon) {
  return polygon.constructor === Object && polygon.type === 'MultiPolygon'
}