/*
  Taken from flubber:
  https://github.com/veltman/flubber
*/

import { pointDistance } from './utils/distance.js'
import { cloneLinearRing } from './insertPointsLinearRing.js'
import { removeClosingPoint, closeRing } from './utils/closingPoint.js'

export default function rotatePointsLinearRing (inputLinearRing, toLinearRing) {
  let fromLinearRing = cloneLinearRing(inputLinearRing)
  fromLinearRing = removeClosingPoint(fromLinearRing)

  const fromLength = fromLinearRing.length
  let min = Infinity
  let bestOffset
  let sumOfSquares
  let spliced

  for (let offset = 0; offset < fromLength; offset++) {
    sumOfSquares = 0

    toLinearRing.forEach((point, i) => {
      const distance = pointDistance(fromLinearRing[(offset + i) % fromLength], point)
      sumOfSquares += distance * distance
    })

    if (sumOfSquares < min) {
      min = sumOfSquares
      bestOffset = offset
    }
  }

  if (bestOffset) {
    spliced = fromLinearRing.splice(0, bestOffset)
    fromLinearRing.splice(fromLinearRing.length, 0, ...spliced)
  }

  fromLinearRing = closeRing(fromLinearRing)

  return fromLinearRing
}
