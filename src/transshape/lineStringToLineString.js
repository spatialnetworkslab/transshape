import { insertPointsLineString, cloneLinearRing } from '../insertPoints.js'
import { interpolate } from 'd3-interpolate'
import { pointDistance } from '../utils/distance.js'

export default function (from, to) {
  const lengthDifference = from.coordinates.length - to.coordinates.length

  let preparedFromCoordinates = from.coordinates
  let preparedToCoordinates = to.coordinates

  if (lengthDifference > 0) {
    preparedToCoordinates = insertPointsLineString(to.coordinates, lengthDifference)
  }

  if (lengthDifference < 0) {
    preparedFromCoordinates = insertPointsLineString(from.coordinates, -lengthDifference)
  }

  preparedFromCoordinates = reverseIfBetterMatching(preparedFromCoordinates, preparedToCoordinates)

  return createInterpolator(from, to, preparedFromCoordinates, preparedToCoordinates)
}

function createInterpolator (from, to, preparedFromCoordinates, preparedToCoordinates) {
  const coordinateInterpolator = interpolate(preparedFromCoordinates, preparedToCoordinates)

  return function interpolator (t) {
    if (t === 0) return from
    if (t === 1) return to

    return {
      type: 'LineString',
      coordinates: coordinateInterpolator(t)
    }
  }
}

function reverseIfBetterMatching (from, to) {
  const normalTotalSquareDistance = getTotalSquaredDistancePositions(from, to)
  const fromReversed = cloneLinearRing(from).reverse()
  const reversedTotalSquareDistance = getTotalSquaredDistancePositions(fromReversed, to)

  if (normalTotalSquareDistance <= reversedTotalSquareDistance) {
    return from
  } else {
    return fromReversed
  }
}

function getTotalSquaredDistancePositions (from, to) {
  let totalSquaredDistance = 0

  for (let i = 0; i < from.length; i++) {
    totalSquaredDistance += pointDistance(from[i], to[i])
  }

  return totalSquaredDistance
}
