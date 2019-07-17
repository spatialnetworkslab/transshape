import { isLinearRing, isPolygon, isMultiPolygon } from './geometryDetectors.js'
import polygonArea from './polygonArea.js'

export default function calculateCentroid (geometry) {
  if (isLinearRing(geometry)) {
    return calculateLinearRingCentroid(geometry)
  }

  if (isPolygon(geometry)) {
    return calculatePolygonCentroid(geometry)
  }

  if (isMultiPolygon(geometry)) {
    return calculateMultiPolygonCentroid(geometry)
  }
}

// https://stackoverflow.com/a/33852627/7237112
function calculateLinearRingCentroid (ring) {
  const nPts = ring.length
  const off = ring[0]
  let twicearea = 0
  let x = 0
  let y = 0
  let p1
  let p2
  let f

  for (let i = 0, j = nPts - 1; i < nPts; j = i++) {
    p1 = ring[i]
    p2 = ring[j]
    f = (p1[0] - off[0]) * (p2[1] - off[1]) - (p2[0] - off[0]) * (p1[1] - off[1])
    twicearea += f
    x += (p1[0] + p2[0] - 2 * off[0]) * f
    y += (p1[1] + p2[1] - 2 * off[1]) * f
  }

  f = twicearea * 3

  return [x / f + off[0], y / f + off[1]]
}

function calculatePolygonCentroid (polygon) {
  // We will ignore holes and just take the outer ring
  return calculateLinearRingCentroid(polygon.coordinates[0])
}

function calculateMultiPolygonCentroid (multiPolygon) {
  // We will take the centroid of each polygon (ignoring holes)
  // and take the weighted (by area) center of these.
  let x = 0
  let y = 0
  let totalArea = 0

  for (let i = 0; i < multiPolygon.coordinates.length; i++) {
    const polygon = multiPolygon.coordinates[i]
    const polygonCentroid = calculatePolygonCentroid(polygon)
    const area = polygonArea(polygon[0])

    x += polygonCentroid[0]
    y += polygonCentroid[1]
    totalArea += area
  }

  return [x / totalArea, y / totalArea]
}
