import { pointDistance, linearRingLength } from '../utils/distance.js'
import { movePointAlongLine } from '../utils/movePointAlongLine.js'

export function multiLineStringToLineString (from, to) {
  const numberOfFromLineStrings = from.coordinates.length
  
  let preparedFromCoordinates = from.coordinates
  let preparedToCoordinates = cutIntoMultiLineString(to.coordinates, numberOfFromLineStrings)
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
  const cutSizeTo = getCutSize(totalLengthTo, numberOfDesiredSegments)

  let newToCoordinates = []
  let cutIndices = []

  for (let i = 0; i < toCoordinates.length - 1; i++) {
    const a = toCoordinates[i]
    const b = toCoordinates[i + 1]
    const distanceAB = pointDistance(a, b)

    newToCoordinates.push(a)

    const numberOfCuts = Math.floor(distanceAB / cutSizeTo)
    const segmentCutCoordinates = calculateCutCoordinates(a, b, cutSizeTo, numberOfCuts)
    const segmentCutIndices = calculateCutIndices(numberOfCuts, newToCoordinates.length)

    newToCoordinates = newToCoordinates.concat(segmentCutCoordinates)
    cutIndices = cutIndices.concat(segmentCutIndices)
  }

  return [newToCoordinates, cutIndices]
}

function getCutSize (length, desiredNumberOfPieces) {
  return length / (desiredNumberOfPieces - 1)
}

function calculateCutCoordinates (a, b, size, numberOfCuts) {
  const cuts = []

  for (let i = 1; i <= numberOfCuts; i++) {
    cuts.push(movePointAlongLine(a, b, (size * i)))
  }

  return cuts
}

function calculateCutIndices (numberOfCuts, currentIndex) {
  return new Array(numberOfCuts).fill(currentIndex).map((l, i) => l + i)
}

function cutLineString (lineStringCoordinates, cutIndices) {
  const multiLineStringCoordinates = []

  const firstLineString = getIndexRange(lineStringCoordinates, 0, cutIndices[0])

  multiLineStringCoordinates.push(firstLineString)

  for (let i = 0; i < cutIndices.length - 1; i++) {
    const lineString = getIndexRange(
      lineStringCoordinates,
      cutIndices[i],
      cutIndices[i + 1]
    )

    multiLineStringCoordinates.push(lineString)
  }

  const lastLineString = getIndexRange(
    lineStringCoordinates,
    cutIndices[cutIndices.length - 1],
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
