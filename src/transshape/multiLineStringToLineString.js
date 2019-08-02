import { pointDistance, linearRingLength } from '../utils/distance.js'
import { map } from '../utils/array.js'
import movePointAlongLine from '../utils/movePointAlongLine.js'
import { prepareCoordinates } from './lineStringToLineString.js'
import { interpolate } from 'd3-interpolate'

export function multiLineStringToLineString (from, to) {
  const numberOfFromLineStrings = from.coordinates.length
  const preparedToCoordinates = cutIntoMultiLineString(to.coordinates, numberOfFromLineStrings)

  const lineStringInterpolators = createLineStringInterpolators(from.coordinates, preparedToCoordinates)

  return createInterpolator(from, to, lineStringInterpolators)
}

export function lineStringToMultiLineString (from, to) {
  // TODO
}

function cutIntoMultiLineString (toCoordinates, numberOfLineStrings) {
  const [newToCoordinates, cutIndices] = createCuttingPoints(toCoordinates, numberOfLineStrings)
  const multiLineStringCoordinates = cutLineString(newToCoordinates, cutIndices)

  return multiLineStringCoordinates
}

function createCuttingPoints (toCoordinates, numberOfDesiredSegments) {
  const totalLengthTo = linearRingLength(toCoordinates)
  const desiredSegmentSize = totalLengthTo / numberOfDesiredSegments

  let newToCoordinates = []
  let cutIndices = []

  const lastPointIndex = toCoordinates.length - 1
  let elapsedDistanceSinceLastCut = 0

  for (let i = 0; i < lastPointIndex; i++) {
    const a = toCoordinates[i]
    const b = toCoordinates[i + 1]
    newToCoordinates.push(a)

    const distanceAB = pointDistance(a, b)
    const distanceIncludingCurrentSegment = elapsedDistanceSinceLastCut + distanceAB

    if (distanceIncludingCurrentSegment >= desiredSegmentSize) {
      const numberOfCuts = Math.floor(distanceIncludingCurrentSegment / desiredSegmentSize)

      const segmentCutCoordinates = calculateCutCoordinates(
        a, b, elapsedDistanceSinceLastCut, desiredSegmentSize, numberOfCuts
      )

      const segmentCutIndices = calculateCutIndices(numberOfCuts, newToCoordinates.length)

      if (isLastEdge(i, lastPointIndex) && thereIsACutAtTheEnd(segmentCutCoordinates, b)) {
        segmentCutCoordinates.pop()
        segmentCutIndices.pop()
      }

      newToCoordinates = newToCoordinates.concat(segmentCutCoordinates)
      cutIndices = cutIndices.concat(segmentCutIndices)

      if (!isLastEdge(i, lastPointIndex)) {
        const lastCut = segmentCutCoordinates[segmentCutCoordinates.length - 1]
        const distanceLastCutToB = pointDistance(lastCut, b)
        elapsedDistanceSinceLastCut = distanceLastCutToB
      }
    }

    if (distanceIncludingCurrentSegment < desiredSegmentSize) {
      elapsedDistanceSinceLastCut += distanceAB
    }
  }

  newToCoordinates.push(toCoordinates[toCoordinates.length - 1])

  return [newToCoordinates, cutIndices]
}

function calculateCutCoordinates (a, b, offset, size, numberOfCuts) {
  const cuts = []

  for (let i = 1; i <= numberOfCuts; i++) {
    cuts.push(movePointAlongLine(a, b, ((size * i) - offset)))
  }

  return cuts
}

function calculateCutIndices (numberOfCuts, currentIndex) {
  return new Array(numberOfCuts).fill(currentIndex).map((l, i) => l + i)
}

function isLastEdge (i, lastPointIndex) {
  return i === (lastPointIndex - 1)
}

function thereIsACutAtTheEnd (cutCoordinates, lastPoint) {
  const lastCut = cutCoordinates[cutCoordinates.length - 1]

  return lastCut[0] === lastPoint[0] && lastCut[1] === lastPoint[1]
}

function cutLineString (lineStringCoordinates, cutIndices) {
  const multiLineStringCoordinates = []

  const firstLineString = getIndexRange(lineStringCoordinates, 0, cutIndices[0])

  multiLineStringCoordinates.push(firstLineString)

  for (let i = 0; i < cutIndices.length - 1; i++) {
    const lineString = getIndexRange(
      lineStringCoordinates,
      cutIndices[i] + 1,
      cutIndices[i + 1]
    )

    multiLineStringCoordinates.push(lineString)
  }

  const lastLineString = getIndexRange(
    lineStringCoordinates,
    cutIndices[cutIndices.length - 1] + 1,
    lineStringCoordinates.length - 1
  )

  multiLineStringCoordinates.push(lastLineString)

  return multiLineStringCoordinates
}

function getIndexRange (array, a, b) {
  const itemsInRange = []

  for (let i = a; i <= b; i++) {
    itemsInRange.push(array[i])
  }

  return itemsInRange
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
