export function combineIntoMultiPolygon (inputGeometries) {
  const multiPolygon = createEmptyMultiPolygon()

  for (const inputGeometry of inputGeometries) {
    if (inputGeometry.type === 'Polygon') {
      multiPolygon.coordinates.push(inputGeometry.coordinates)
    }

    if (inputGeometry.type === 'MultiPolygon') {
      for (const polygon of inputGeometry.coordinates) {
        multiPolygon.coordinates.push(polygon)
      }
    }
  }

  return multiPolygon
}

export function splitMultiPolygon (multiPolygon) {
  const polygons = []

  for (const polygonCoordinates of multiPolygon.coordinates) {
    const polygon = createEmptyPolygon()
    polygon.coordinates = polygonCoordinates

    polygons.push(polygon)
  }

  return polygons
}

function createEmptyMultiPolygon () {
  return { type: 'MultiPolygon', coordinates: [] }
}

function createEmptyPolygon () {
  return { type: 'Polygon', coordinates: undefined }
}
