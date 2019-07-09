/*
  Taken from flubber:
  https://github.com/veltman/flubber
*/

import { pointDistance } from './utils/distance.js'
import { cloneLinearRing } from './insertPointsLinearRing.js'

export default function rotatePointsLinearRing (inputLinearRing, toLinearRing) {
  let fromLinearRing = cloneLinearRing(inputLinearRing)
  fromLinearRing = removeClosingPoint(fromLinearRing)

  let fromLength = fromLinearRing.length
  let min = Infinity
  let bestOffset
  let sumOfSquares
  let spliced

  for (let offset = 0; offset < fromLength; offset++) {
    sumOfSquares = 0

    toLinearRing.forEach((point, i) => {
      let distance = pointDistance(fromLinearRing[(offset + i) % fromLength], point)
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

  fromLinearRing = addClosingPoint(fromLinearRing)

  return fromLinearRing
}

function removeClosingPoint (linearRing) {
  let firstPoint = linearRing[0]
  let lastPoint = linearRing[linearRing.length - 1]

  if (firstPoint[0] === lastPoint[0] && firstPoint[1] === lastPoint[1]) {
    linearRing.pop()
  }

  return linearRing
}

function addClosingPoint (linearRing) {
  let firstPoint = linearRing[0]
  linearRing.push(firstPoint)

  return linearRing
}
