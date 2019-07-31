import { insertPointsLineString } from '../insertPoints.js'
import { interpolate } from 'd3-interpolate'

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
