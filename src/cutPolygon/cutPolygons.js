import cutPolygon from './cutPolygon.js'
import polygonArea from '../utils/polygonArea.js'
import { map } from '../utils/array.js'

export default function cutPolygons (polygons, numberOfDesiredAdditionalPolygons) {
  if (numberOfDesiredAdditionalPolygons < 1) throw wrongNumberOfPolygonsError

  const polygonAreas = map(polygons, polygonArea)
  const numberOfCutsPerPolygon = assignCuts(polygonAreas, numberOfDesiredAdditionalPolygons)

  let resultingPolygons = []

  for (let i = 0; i < polygons.length; i++) {
    const polygon = polygons[i]
    const numberOfCuts = numberOfCutsPerPolygon[i]

    if (numberOfCuts === 0) {
      resultingPolygons.push(polygon)
    }

    if (numberOfCuts > 0) {
      const numberOfDesiredPolygons = numberOfCuts + 1
      resultingPolygons = resultingPolygons.concat(cutPolygon(polygon, numberOfDesiredPolygons))
    }
  }

  return resultingPolygons
}

const wrongNumberOfPolygonsError = new Error('Number of desired additional polygons must be larger than 0')

// https://stackoverflow.com/a/38905829/7237112
export function assignCuts (polygonAreas, numberOfPieces) {
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
