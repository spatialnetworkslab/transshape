import { isPolygon, isMultiPolygon, isLineString, isMultiLineString } from '../src/utils/geometryDetectors.js'

export default function roundGeometry (geometry) {
  if (isPolygon(geometry)) {
    return roundValuesPolygon(geometry)
  }

  if (isMultiPolygon(geometry)) {
    return roundValuesMultiPolygon(geometry)
  }

  if (isLineString(geometry)) {
    return roundValuesLineString(geometry)
  }

  if (isMultiLineString(geometry)) {
    return roundValuesMultiLineString(geometry)
  }
}

function roundValuesPolygon (polygon) {
  const roundedCoordinates = roundPolygonCoordinates(polygon.coordinates)

  return {
    type: 'Polygon',
    coordinates: roundedCoordinates
  }
}

function roundValuesMultiPolygon (multiPolygon) {
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

function roundValuesLineString (lineString) {
  const roundedCoordinates = roundLineStringCoordinates(lineString.coordinates)

  return {
    type: 'LineString',
    coordinates: roundedCoordinates
  }
}

function roundValuesMultiLineString (multiLineString) {
  const roundedLineStrings = []

  for (let i = 0; i < multiLineString.coordinates.length; i++) {
    const lineStringCoordinates = multiLineString.coordinates[i]

    roundedLineStrings.push(roundLineStringCoordinates(lineStringCoordinates))
  }

  return {
    type: 'MultiLineString',
    coordinates: roundedLineStrings
  }
}

function roundPolygonCoordinates (polygonCoordinates, decimals = 2) {
  return polygonCoordinates.map(linearRing => {
    return linearRing.map(point => {
      return point.map(value => round(value, decimals))
    })
  })
}

function roundLineStringCoordinates (lineStringCoordinates, decimals = 2) {
  return lineStringCoordinates.map(point => {
    return point.map(value => round(value, decimals))
  })
}

function round (value, decimals = 2) {
  const multiplier = 10 ** decimals

  return Math.round(value * multiplier) / multiplier
}
