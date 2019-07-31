import { insertPoints } from '../insertPoints.js'
import { interpolate } from 'd3-interpolate'

export default function (from, to) {
  const lengthDifference = from.length - to.length

  let preparedFrom = from
  let preparedTo = to

  if (lengthDifference > 0) {
    preparedTo = insertPoints(to, lengthDifference)
  }

  if (lengthDifference < 0) {
    preparedFrom = insertPoints(from, lengthDifference)
  }

  return createInterpolator(from, to, preparedFrom, preparedTo)
}

function createInterpolator (from, to, preparedFrom, preparedTo) {
  const lineStringInterpolator = interpolate(preparedFrom, preparedTo)

  return function interpolator (t) {
    if (t === 0) return from
    if (t === 1) return to

    return lineStringInterpolator(t)
  }
}
