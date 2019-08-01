import { pointDistance } from './distance.js'

export default function movePointAlongLine (a, b, distance) {
  const unitVector = getUnitVector(a, b)
  return movePoint(a, unitVector, distance)
}

function getUnitVector (a, b) {
  const magnitude = pointDistance(a, b)
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]

  return [dx / magnitude, dy / magnitude]
}

function movePoint (point, unitVector, distance) {
  return [
    point[0] + unitVector[0] * distance,
    point[1] + unitVector[1] * distance
  ]
}