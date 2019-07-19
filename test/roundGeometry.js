import { isPolygon, isMultiPolygon } from '../src/utils/geometryDetectors.js'

export default function roundGeometry (geometry) {
  if (isPolygon(geometry)) {
    return roundValuesPolygon(geometry)
  }

  if (isMultiPolygon(geometry)) {
    return roundValuesMultiPolygon(geometry)
  }
}

function roundValuesPolygon (polygon, decimals = 2) {
  const roundedCoordinates = roundPolygonCoordinates(polygon.coordinates)

  return {
    type: 'Polygon',
    coordinates: roundedCoordinates
  }
}

function roundValuesMultiPolygon (multiPolygon, decimals = 2) {
  const roundedPolygons = []

  for (let i = 0; i < multiPolygon.coordinates.length; i++) {
    const polygonCoordinates = multiPolygon.coordinates[i]

    roundedPolygons.push(roundPolygonCoordinates(polygonCoordinates))
  }

  return {
    type: 'MultiPolygon',
    coordinates: roundedPolygons
  }
}

function roundPolygonCoordinates (polygonCoordinates, decimals = 2) {
  return polygonCoordinates.map(linearRing => {
    return linearRing.map(point => {
      return point.map(value => round(value, decimals))
    })
  })
}

function round (value, decimals = 2) {
  const multiplier = 10 ** decimals

  return Math.round(value * multiplier) / multiplier
}