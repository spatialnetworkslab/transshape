import cutPolygon from '../cutPolygon/cutPolygon.js'
import { createInterpolatorPolygons } from './multiPolygonToMultiPolygon.js'
import { splitMultiPolygon } from '../utils/convertMultiPolygon.js'

export function multiPolygonToPolygon (from, to) {
  const fromPolygons = splitMultiPolygon(from)
  let toPolygons = [to]

  const numberOfFromPolygons = fromPolygons.length
  const numberOfAdditionalToPolygonsRequried = numberOfFromPolygons - 1

  if (numberOfAdditionalToPolygonsRequried > 0) {
    toPolygons = cutPolygon(to, numberOfFromPolygons)
  }

  return createInterpolatorPolygons(from, to, fromPolygons, toPolygons)
}

export function polygonToMultiPolygon (from, to) {
  const reverseInterpolator = multiPolygonToPolygon(to, from)

  return function interpolator (t) {
    return reverseInterpolator(1 - t)
  }
}
