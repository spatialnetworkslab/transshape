import { pointDistance, linearRingLength } from '../utils/distance.js'
import { map } from '../utils/array.js'
import movePointAlongLine from '../utils/movePointAlongLine.js'
import { prepareCoordinates } from './lineStringToLineString.js'
import { interpolate } from 'd3-interpolate'

export function multiLineStringToLineString (from, to) {
  const numberOfFromLineStrings = from.coordinates.length
  const preparedToCoordinates = cutLineString(to.coordinates, numberOfFromLineStrings)
  const lineStringInterpolators = createLineStringInterpolators(from.coordinates, preparedToCoordinates)

  return createInterpolator(from, to, lineStringInterpolators)
}

export function lineStringToMultiLineString (from, to) {
  const reverseInterpolator = multiLineStringToLineString(to, from)

  return function interpolator (t) {
    return reverseInterpolator(1 - t)
  }
}

export function cutLineString (toCoordinates, numberOfLineStrings) {
  const multiLineStringCoordinates = []

  const totalLengthTo = linearRingLength(toCoordinates)
  const desiredSegmentSize = totalLengthTo / numberOfLineStrings

  const lastPointIndex = toCoordinates.length - 1

  let currentSegment = []
  let elapsedDistanceSinceLastCut = 0

  for (let i = 0; i < lastPointIndex; i++) {
    const a = toCoordinates[i]
    currentSegment.push(a)
    const b = toCoordinates[i + 1]

    const distanceAB = pointDistance(a, b)
    const distanceIncludingCurrentSegment = elapsedDistanceSinceLastCut + distanceAB

    if (distanceIncludingCurrentSegment < desiredSegmentSize) {
      elapsedDistanceSinceLastCut += distanceAB
    }

    if (distanceIncludingCurrentSegment >= desiredSegmentSize) {
      const numberOfCuts = Math.floor(distanceIncludingCurrentSegment / desiredSegmentSize)

      const cutCoordinates = calculateCutCoordinates(
        a, b, elapsedDistanceSinceLastCut, desiredSegmentSize, numberOfCuts
      )

      currentSegment = currentSegment.concat(cutCoordinates)
      multiLineStringCoordinates.push(currentSegment)

      const lastCut = cutCoordinates[cutCoordinates.length - 1]

      if (pointsEqual(lastCut, b)) {
        currentSegment = []
      } else {
        currentSegment = [lastCut]
      }

      elapsedDistanceSinceLastCut = pointDistance(lastCut, b)
    }
  }

  return multiLineStringCoordinates
}

function calculateCutCoordinates (a, b, offset, size, numberOfCuts) {
  const cuts = []

  for (let i = 1; i <= numberOfCuts; i++) {
    cuts.push(movePointAlongLine(a, b, ((size * i) - offset)))
  }

  return cuts
}

function pointsEqual (a, b) {
  return a[0] === b[0] && a[1] === b[1]
}

function createLineStringInterpolators (fromCoordinates, toCoordinates) {
  const interpolators = []

  for (let i = 0; i < fromCoordinates.length; i++) {
    const fromLineString = fromCoordinates[i]
    const toLineString = toCoordinates[i]

    const [preparedFromLineString, preparedToLineString] = prepareCoordinates(fromLineString, toLineString)
    const interpolator = interpolate(preparedFromLineString, preparedToLineString)
    interpolators.push(interpolator)
  }

  return interpolators
}

function createInterpolator (from, to, lineStringInterpolators) {
  return function interpolator (t) {
    if (t === 0) return from
    if (t === 1) return to

    return {
      type: 'MultiLineString',
      coordinates: map(
        lineStringInterpolators,
        lineStringInterpolator => lineStringInterpolator(t)
      )
    }
  }
}
