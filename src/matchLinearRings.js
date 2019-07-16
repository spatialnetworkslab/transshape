/*
  Taken from flubber:
  https://github.com/veltman/flubber
*/

import { pointDistance } from './utils/distance.js'
import linearRingCentroid from './utils/linearRingCentroid.js'
import { map } from '../utils/array.js'

export default function matchLinearRings (fromRings, toRings) {
  const distanceMatrix = map(fromRings, fromRing => map(toRings, toRing => squaredDistance(fromRing, toRing)))

  return bestOrder(fromRings, toRings, distanceMatrix)
}

export function bestOrder (start, end, distances) {
  let min = Infinity
  let best = map(start, (_, i) => i)

  function permute (arr, order = [], sum = 0) {
    for (let i = 0; i < arr.length; i++) {
      const cur = arr.splice(i, 1)
      const dist = distances[cur[0]][order.length]

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
  const d = pointDistance(
    linearRingCentroid(fromRing), linearRingCentroid(toRing)
  )

  return d * d
}
