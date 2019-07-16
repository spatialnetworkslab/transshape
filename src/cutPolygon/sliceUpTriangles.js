import { interpolate } from 'd3-interpolate'
import polygonArea from '../utils/polygonArea.js'
import { getOrderDescending, sortIntoOrder, getInsertionIndexDescending } from '../utils/sort.js'
import { map } from '../utils/array.js'

export default function (geometries, numberOfPieces) {
  const areas = map(geometries, polygonArea)

  const order = getOrderDescending(areas)

  const areasSorted = sortIntoOrder(areas, order)
  const geometriesSorted = sortIntoOrder(geometries, order)

  while (geometriesSorted.length < numberOfPieces) {
    areasSorted.shift()
    const biggestTriangle = geometriesSorted.shift()

    const cutTriangles = cutTriangleInTwo(biggestTriangle)

    const areaCutTriangles = map(cutTriangles, polygonArea)

    for (let i = 0; i < cutTriangles.length; i++) {
      const areaCutTriangle = areaCutTriangles[i]
      const cutTriangle = cutTriangles[i]

      const insertionIndex = getInsertionIndexDescending(areasSorted, areaCutTriangle)

      areasSorted.splice(insertionIndex, 0, areaCutTriangle)
      geometriesSorted.splice(insertionIndex, 0, cutTriangle)
    }
  }

  return geometriesSorted
}

function cutTriangleInTwo (triangle) {
  const a = triangle.coordinates[0][0]
  const b = triangle.coordinates[0][1]
  const c = triangle.coordinates[0][2]

  const pointBetweenAB = interpolate(a, b)(0.5)

  const firstTriangle = createTriangleGeometry([a, pointBetweenAB, c, a])
  const secondTriangle = createTriangleGeometry([b, c, pointBetweenAB, b])

  return [firstTriangle, secondTriangle]
}

function createTriangleGeometry (points) {
  return {
    type: 'Polygon',
    coordinates: [points]
  }
}
