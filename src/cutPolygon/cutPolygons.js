import cutPolygon from './cutPolygon.js'
import polygonArea from '../utils/polygonArea.js'
import { getOrderDescending, sortIntoOrder } from '../utils/sort.js'

export default function cutPolygons (polygons, numberOfPieces) {
  let polygonAreas = polygons.map(polygonArea)
  let sortedAreaOrder = getOrderDescending(polygonAreas)

  let sortedPolygons = sortIntoOrder(polygons, sortedAreaOrder)
  let sortedAreas = sortIntoOrder(polygonAreas, sortedAreaOrder)
  let smallestArea = sortedAreas[sortedAreas.length - 1]

  let numberOfPiecesLeft = numberOfPieces

  while (numberOfPiecesLeft > 0) {


    numberOfPiecesLeft--
  }
}
