import cutPolygons from '../cutPolygon/cutPolygons.js'
import matchLinearRings from '../matchLinearRings.js'
import polygonToPolygon from './polygonToPolygon.js'
import { combineIntoMultiPolygon, splitMultiPolygon } from '../utils/convertMultiPolygon.js'

export default function multiPolygonToMultiPolygon (from, to) {
  let fromPolygons = splitMultiPolygon(from)
  let toPolygons = splitMultiPolygon(to)

  const lengthDifference = fromPolygons.length - toPolygons.length

  if (lengthDifference > 0) {
    toPolygons = cutPolygons(toPolygons, lengthDifference)
  }

  if (lengthDifference < 0) {
    fromPolygons = cutPolygons(fromPolygons, -lengthDifference)
  }

  return createInterpolatorPolygons(from, to, fromPolygons, toPolygons)
}

export function createInterpolatorPolygons (from, to, fromPolygons, toPolygons) {
  const fromOuterRings = fromPolygons.map(polygon => polygon.coordinates[0])
  const toOuterRings = toPolygons.map(polygon => polygon.coordinates[0])

  const fromOrder = matchLinearRings(fromOuterRings, toOuterRings)
  fromPolygons = fromOrder.map(i => fromPolygons[i])

  const polygonInterpolators = []

  for (let i = 0; i < fromPolygons.length; i++) {
    const fromPolygon = fromPolygons[i]
    const toPolygon = toPolygons[i]

    polygonInterpolators.push(polygonToPolygon(fromPolygon, toPolygon))
  }

  return function interpolator (t) {
    if (t === 0) return from
    if (t === 1) return to

    return combineIntoMultiPolygon(
      polygonInterpolators.map(polygonInterpolator => polygonInterpolator(t))
    )
  }
}
