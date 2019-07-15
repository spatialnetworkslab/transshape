import cutPolygon from './cutPolygon.js'
import polygonArea from '../utils/polygonArea.js'

export default function cutPolygons (polygons, numberOfDesiredAdditionalPolygons) {
  const polygonAreas = polygons.map(polygonArea)
  const numberOfCutsPerPolygon = assignCuts(polygonAreas, numberOfDesiredAdditionalPolygons)

  const resultingPolygons = []

  for (let i = 0; i < polygons.length; i++) {
    const polygon = polygons[i]
    const numberOfCuts = numberOfCutsPerPolygon[i]

    if (numberOfCuts === 0) {
      resultingPolygons.push(polygon)
    }

    if (numberOfCuts > 0) {
      const numberOfDesiredPolygons = numberOfCuts + 1
      resultingPolygons.push(...cutPolygon(polygon, numberOfDesiredPolygons))
    }
  }

  return resultingPolygons
}

// https://stackoverflow.com/a/38905829/7237112
function assignCuts (polygonAreas, numberOfPieces) {
  const numberOfCutsPerPolygon = []
  let totalArea = sum(polygonAreas)

  for (let i = 0; i < polygonAreas.length; i++) {
    const area = polygonAreas[i]
    const numberOfCuts = Math.round(area / totalArea * numberOfPieces)

    numberOfCutsPerPolygon.push(numberOfCuts)
    totalArea -= area
    numberOfPieces -= numberOfCuts
  }

  return numberOfCutsPerPolygon
}

function sum (array) {
  let sum = 0

  for (let i = 0; i < array.length; i++) {
    sum += array[i]
  }

  return sum
}
