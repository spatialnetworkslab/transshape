/*
  Taken from flubber:
  https://github.com/veltman/flubber
*/

import { interpolate } from 'd3-interpolate'
import { pointDistance, linearRingLength } from '../utils/distance.js'

export default function insertPoints (linearRing, numberOfAdditionalPoints) {
  const desiredLength = linearRing.length + numberOfAdditionalPoints
  const step = linearRingLength(linearRing) / numberOfAdditionalPoints

  let i = 0
  let cursor = 0
  let insertAt = step / 2

  while (linearRing.length < desiredLength) {
    let a = linearRing[i]
    let b = linearRing[(i + 1) % linearRing.length]
    let segment = pointDistance(a, b)

    if (insertAt <= cursor + segment) {
      let pointBetweenAB = interpolate(a, b)((insertAt - cursor) / segment)
      let aCopy = a.slice(0)

      linearRing.splice(i + 1, 0, segment ? pointBetweenAB : aCopy)
      insertAt += step
      continue
    }

    cursor += segment
    i++
  }
}
