import { linearRingLength } from './utils/distance.js'
import { getOrderDescending } from './utils/sort.js'
import { map } from './utils/array.js'

export default function matchLineStrings (input, target) {
  const inputOrder = getInputOrder(input, target)
  return inputOrder.map(i => input[i])
}

function getInputOrder (input, target) {
  const inputLengths = map(input, linearRingLength)
  const targetLengths = map(target, linearRingLength)

  const inputLengthOrderDescending = getOrderDescending(inputLengths)
  const targetLengthOrderDescending = getOrderDescending(targetLengths)

  const pairs = {}

  for (let i = 0; i < targetLengthOrderDescending.length; i++) {
    const inputIndex = inputLengthOrderDescending[i]
    const targetIndex = targetLengthOrderDescending[i]

    pairs[inputIndex] = targetIndex
  }

  const inputOrder = []

  for (let i = 0; i < target.length; i++) {
    inputOrder.push(pairs[i])
  }

  return inputOrder
}
