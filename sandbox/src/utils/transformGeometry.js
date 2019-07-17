export default function (geometry, transformFunction) {
  if (geometry.type === 'Polygon') {
    return transformPolygon(geometry, transformFunction)
  }

  if (geometry.type === 'MultiPolygon') {
    return transformMultiPolygon(geometry, transformFunction)
  }
}

function transformPolygon (polygon, transformFunction) {
  return {
    type: 'Polygon',
    coordinates: transformPolygonCoordinates(polygon.coordinates, transformFunction)
  }
}

function transformPolygonCoordinates (coordinates, transformFunction) {
  const newCoordinates = []

  for (let i = 0; i < coordinates.length; i++) {
    const linearRing = coordinates[i]
    newCoordinates.push(transformLinearRing(linearRing, transformFunction))
  }

  return newCoordinates
}

function transformLinearRing (linearRing, transformFunction) {
  const newLinearRing = []

  for (let i = 0; i < linearRing.length; i++) {
    const position = linearRing[i]
    newLinearRing.push(roundPoint(transformFunction(position)))
  }

  return newLinearRing
}

function transformMultiPolygon (multiPolygon, transformFunction) {
  const newMultiPolygon = { type: 'MultiPolygon', coordinates: [] }

  for (let i = 0; i < multiPolygon.coordinates.length; i++) {
    const polygonCoordinates = multiPolygon.coordinates[i]

    newMultiPolygon.coordinates.push(
      transformPolygonCoordinates(polygonCoordinates, transformFunction)
    )
  }

  return newMultiPolygon
}

function roundPoint (point, decimals = 2) {
  const multiplier = 10 ** decimals
  return [
    Math.round(point[0] * multiplier) / multiplier,
    Math.round(point[1] * multiplier) / multiplier
  ]
}
