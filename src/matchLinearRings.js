/*
  Taken from flubber:
  https://github.com/veltman/flubber
*/

import { pointDistance } from './utils/distance.js'
import linearRingCentroid from './utils/linearRingCentroid.js'

export default function matchLinearRings (fromRings, toRings) {
  let distanceMatrix = fromRings.map(fromRing => toRings.map(toRing => squaredDistance(fromRing, toRing)))

  return bestOrder(fromRings, toRings, distanceMatrix)
}

export function bestOrder (start, end, distances) {
  let min = Infinity
  let best = start.map((d, i) => i)

  function permute (arr, order = [], sum = 0) {
    for (let i = 0; i < arr.length; i++) {
      let cur = arr.splice(i, 1)
      let dist = distances[cur[0]][order.length]

      if (sum + dist < min) {
        if (arr.length) {
          permute(arr.slice(), order.concat(cur), sum + dist)
        } else {
          min = sum + dist
          best = order.concat(cur)
        }
      }
      if (arr.length) {
        arr.splice(i, 0, cur[0])
      }
    }
  }

  permute(best)

  return best
}

function squaredDistance (fromRing, toRing) {
  let d = pointDistance(
    linearRingCentroid(fromRing), linearRingCentroid(toRing)
  )

  return d * d
}
