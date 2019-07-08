/*
  Taken from flubber:
  https://github.com/veltman/flubber
*/

import { interpolate } from 'd3-interpolate'
import { pointDistance, linearRingLength } from './utils/distance.js'

export default function insertPointsLinearRing (inputLinearRing, numberOfAdditionalPoints) {
  let linearRing = copyLinearRing(inputLinearRing)

  const desiredLength = linearRing.length + numberOfAdditionalPoints
  const step = linearRingLength(linearRing) / numberOfAdditionalPoints

  let i = 0
  let cursor = 0
  let insertAt = step / 2

  while (linearRing.length < desiredLength) {
    let a = linearRing[i]
    let b = linearRing[(i + 1) % linearRing.length]

    let segmentLength = pointDistance(a, b)

    if (insertAt <= cursor + segmentLength) {
      let pointBetweenAB = interpolate(a, b)((insertAt - cursor) / segmentLength)
      let aCopy = a.slice(0)

      linearRing.splice(i + 1, 0, segmentLength !== 0 ? pointBetweenAB : aCopy)
      insertAt += step
      continue
    }

    cursor += segmentLength
    i++
  }

  return linearRing
}

function copyLinearRing (linearRing) {
  let newLinearRing = []

  for (let i = 0; i < linearRing.length; i++) {
    newLinearRing.push(linearRing[i].slice(0))
  }

  return newLinearRing
}
