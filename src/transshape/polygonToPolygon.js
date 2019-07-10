import { interpolate } from 'd3-interpolate'
import insertPointsLinearRing from '../insertPointsLinearRing.js'
import rotatePointsLinearRing from '../rotatePointsLinearRing.js'

export default function (from, to) {
  let fromOuterRing = from.coordinates[0]
  let toOuterRing = to.coordinates[0]

  let lengthDifference = fromOuterRing.length - toOuterRing.length

  if (lengthDifference > 0) {
    toOuterRing = insertPointsLinearRing(toOuterRing, lengthDifference)
  }

  if (lengthDifference < 0) {
    fromOuterRing = insertPointsLinearRing(fromOuterRing, -lengthDifference)
  }

  let rotatedFromOuterRing = rotatePointsLinearRing(fromOuterRing, toOuterRing)

  return createLinearRingInterpolator(from, to, rotatedFromOuterRing, toOuterRing)
}

function createLinearRingInterpolator (from, to, fromOuterRing, toOuterRing) {
  let outerRingInterpolator = interpolate(fromOuterRing, toOuterRing)

  return function interpolator (t) {
    if (t === 0) return from
    if (t === 1) return to

    let interpolatedLinearRing = outerRingInterpolator(t)

    return {
      type: 'Polygon',
      coordinates: [interpolatedLinearRing]
    }
  }
}
