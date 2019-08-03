import { assignCuts } from '../cutPolygon/cutPolygons.js'
import { linearRingLength } from '../utils/distance.js'
import {
  cutLineString, createLineStringInterpolators, createMultiLineStringInterpolator
} from './multiLineStringToLineString.js'
import matchLineStrings from '../matchLineStrings.js'

export default function multiLineStringToMultiLineString (from, to) {
  let fromLineStrings = from.coordinates
  let toLineStrings = to.coordinates

  const lengthDifference = fromLineStrings.length - toLineStrings.length

  if (lengthDifference > 0) {
    toLineStrings = splitLineStrings(toLineStrings, lengthDifference)
  }

  if (lengthDifference < 0) {
    fromLineStrings = splitLineStrings(fromLineStrings, -lengthDifference)
  }

  fromLineStrings = matchLineStrings(fromLineStrings, toLineStrings)

  const lineStringInterpolators = createLineStringInterpolators(fromLineStrings, toLineStrings)

  return createMultiLineStringInterpolator(from, to, lineStringInterpolators)
}

function splitLineStrings (lineStrings, numberOfDesiredLineStrings) {
  const lineStringLengths = getLengths(lineStrings)
  const numberOfCutsPerLineString = assignCuts(lineStringLengths, numberOfDesiredLineStrings)

  let resultingLineStrings = []

  for (let i = 0; i < numberOfCutsPerLineString.length; i++) {
    const lineString = lineStrings[i]
    const numberOfCuts = numberOfCutsPerLineString[i]

    if (numberOfCuts === 0) {
      resultingLineStrings.push(lineString)
    }

    if (numberOfCuts > 0) {
      const numberOfDesiredPieces = numberOfCuts + 1

      resultingLineStrings = resultingLineStrings.concat(
        cutLineString(lineString, numberOfDesiredPieces)
      )
    }
  }

  return resultingLineStrings
}

function getLengths (lineStrings) {
  const lengths = []

  for (let i = 0; i < lineStrings.length; i++) {
    lengths.push(
      linearRingLength(lineStrings[i])
    )
  }

  return lengths
}
