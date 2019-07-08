export default function combineIntoMultiPolygon (inputGeometries) {
  let multiPolygon = createEmptyMultiPolygon()

  for (let inputGeometry of inputGeometries) {
    if (inputGeometry.type === 'Polygon') {
      multiPolygon.coordinates.push(inputGeometry.coordinates)
    }

    if (inputGeometry.type === 'MultiPolygon') {
      for (let polygon of inputGeometry.coordinates) {
        multiPolygon.coordinates.push(polygon)
      }
    }
  }

  return multiPolygon
}

function createEmptyMultiPolygon () {
  return {
    type: 'MultiPolygon',
    coordinates: []
  }
}
