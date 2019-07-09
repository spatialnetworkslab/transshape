export function getOrderDescending (array) {
  let indexArray = array.map((_, i) => i)
  indexArray.sort((a, b) => array[b] - array[a])

  return indexArray
}

export function sortIntoOrder (array, order) {
  return order.map(i => array[i])
}

export function getInsertionIndexDescending (arraySortedDescending, value) {
  if (arraySortedDescending.length === 0) return 0

  for (let i = arraySortedDescending.length - 1; i >= 0; i--) {
    let arrayValue = arraySortedDescending[i]

    if (value <= arrayValue) return i
  }

  return 0
}
