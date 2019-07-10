export function removeClosingPoint (linearRing) {
  linearRing.pop()

  return linearRing
}

export function closeRing (linearRing) {
  let firstPoint = linearRing[0]
  linearRing.push(firstPoint)

  return linearRing
}
