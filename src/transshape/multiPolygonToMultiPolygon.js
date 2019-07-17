import cutPolygons from '../cutPolygon/cutPolygons.js'
import matchLinearRings from '../matchLinearRings.js'
import polygonToPolygon from './polygonToPolygon.js'
import { combineIntoMultiPolygon, splitMultiPolygon } from '../utils/convertMultiPolygon.js'
import { map } from '../utils/array.js'

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
  const fromOuterRings = map(fromPolygons, polygon => polygon.coordinates[0])
  const toOuterRings = map(toPolygons, polygon => polygon.coordinates[0])

  const fromOrder = matchLinearRings(fromOuterRings, toOuterRings)
  fromPolygons = map(fromOrder, i => fromPolygons[i])

  const polygonInterpolators = []

  for (let i = 0; i < fromPolygons.length; i++) {
    const fromPolygon = fromPolygons[i]
    const toPolygon = toPolygons[i]

    polygonInterpolators.push(polygonToPolygon(fromPolygon, toPolygon))
  }

  return function interpolator (t) {
    if (t === 0) return from
    if (t === 1) return to

    const interpolatedPolygons = map(polygonInterpolators, polygonInterpolator => polygonInterpolator(t))

    return combineIntoMultiPolygon(
      map(polygonInterpolators, polygonInterpolator => polygonInterpolator(t))
    )
  }
}
