import { interpolate } from 'd3-interpolate'
import polygonArea from '../utils/polygonArea.js'

export default function (geometries, numberOfPieces) {
  let areas = geometries.map(polygonArea)

  let order = getOrderDescending(areas)

  let areasSorted = sortIntoOrder(areas, order)
  let geometriesSorted = sortIntoOrder(geometries, order)

  while (geometriesSorted.length < numberOfPieces) {
    areasSorted.shift()
    let biggestTriangle = geometriesSorted.shift()

    let cutTriangles = cutTriangleInTwo(biggestTriangle)

    let areaCutTriangles = cutTriangles.map(polygonArea)

    for (let i = 0; i < cutTriangles.length; i++) {
      let areaCutTriangle = areaCutTriangles[i]
      let cutTriangle = cutTriangles[i]

      let insertionIndex = getInsertionIndex(areasSorted, areaCutTriangle)

      areasSorted.splice(insertionIndex, 0, areaCutTriangle)
      geometriesSorted.splice(insertionIndex, 0, cutTriangle)
    }
  }

  return geometriesSorted
}

function getOrderDescending (array) {
  let indexArray = array.map((_, i) => i)
  indexArray.sort((a, b) => array[b] - array[a])

  return indexArray
}

function sortIntoOrder (array, order) {
  return order.map(i => array[i])
}

function cutTriangleInTwo (triangle) {
  let a = triangle.coordinates[0][0]
  let b = triangle.coordinates[0][1]
  let c = triangle.coordinates[0][2]

  let pointBetweenAB = interpolate(a, b)(0.5)

  let firstTriangle = createTriangleGeometry([a, pointBetweenAB, c, a])
  let secondTriangle = createTriangleGeometry([b, c, pointBetweenAB, b])

  return [firstTriangle, secondTriangle]
}

function createTriangleGeometry (points) {
  return {
    type: 'Polygon',
    coordinates: [points]
  }
}

function getInsertionIndex (arraySortedDescending, value) {
  if (arraySortedDescending.length === 0) return 0

  for (let i = arraySortedDescending.length - 1; i >= 0; i--) {
    let arrayValue = arraySortedDescending[i]

    if (value <= arrayValue) return i
  }

  return 0
}
