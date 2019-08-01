import polygonArea from './utils/polygonArea.js'
import { map } from './utils/array.js'
import { getOrderDescending } from './utils/sort.js'

export default function matchLinearRings (fromRings, toRings) {
  if (tooManyRings(fromRings)) {
    return map(fromRings, (_, i) => i)
  }

  return bestOrder(fromRings, toRings)
}

function tooManyRings (rings) {
  // with more than 9 rings, everything will be too chaotic to notice this stuff anyway.
  return rings.length > 9
}

export function bestOrderDescending (fromRings, toRings) {
  const fromAreas = map(fromRings, polygonArea)
  const toAreas = map(toRings, polygonArea)

  const fromAreasOrderDescending = getOrderDescending(fromAreas)
  const toAreasOrderDescending = getOrderDescending(toAreas)

  const pairs = {}

  for (let i = 0; i < toAreasOrderDescending.length; i++) {
    const fromIndex = fromAreasOrderDescending[i]
    const toIndex = toAreasOrderDescending[i]

    pairs[toIndex] = fromIndex
  }

  const fromOrder = []

  for (let i = 0; i < toRings.length; i++) {
    fromOrder.push(pairs[i])
  }

  return fromOrder
}
