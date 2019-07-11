import { interpolate } from 'd3-interpolate'
import insertPointsLinearRing from '../insertPointsLinearRing.js'
import rotatePointsLinearRing from '../rotatePointsLinearRing.js'
import matchLinearRings from '../matchLinearRings.js'
import linearRingCentroid from '../utils/linearRingCentroid.js'

export default function (from, to) {
  let fromOuterRing = from.coordinates[0]
  let toOuterRing = to.coordinates[0]

  let [fromOuterRingPrepared, toOuterRingPrepared] = prepareLinearRings(fromOuterRing, toOuterRing)

  if (neitherHasHoles(from, to)) {
    return createInterpolatorNoHoles(from, to, fromOuterRingPrepared, toOuterRingPrepared)
  }

  let holeInterpolators = createHoleInterpolators(from, to)

  return createInterpolatorWithHoles(
    from, to, fromOuterRingPrepared, toOuterRingPrepared, holeInterpolators
  )
}

function prepareLinearRings (fromRing, toRing) {
  let lengthDifference = fromRing.length - toRing.length

  if (lengthDifference > 0) {
    toRing = insertPointsLinearRing(toRing, lengthDifference)
  }

  if (lengthDifference < 0) {
    fromRing = insertPointsLinearRing(fromRing, -lengthDifference)
  }

  let rotatedFromRing = rotatePointsLinearRing(fromRing, toRing)

  return [rotatedFromRing, toRing]
}

function createInterpolatorNoHoles (from, to, fromOuterRingPrepared, toOuterRingPrepared) {
  let outerRingInterpolator = interpolate(fromOuterRingPrepared, toOuterRingPrepared)

  return function interpolator (t) {
    if (t === 0) return from
    if (t === 1) return to

    let interpolatedLinearRing = outerRingInterpolator(t)

    return {
      type: 'Polygon',
      coordinates: [interpolatedLinearRing]
    }
  }
}

function neitherHasHoles (from, to) {
  return from.coordinates.length === 1 && to.coordinates.length === 1
}

function getHoles (polygon, numberOfHoles) {
  let holes = []

  for (let i = 1; i <= numberOfHoles; i++) {
    holes.push(polygon.coordinates[i])
  }

  return holes
}

function createHoleInterpolators (from, to) {
  let holeInterpolators = []

  let numberOfMatchableHoles = Math.min(from.coordinates.length, to.coordinates.length) - 1

  if (numberOfMatchableHoles > 0) {
    holeInterpolators.push(...createMatchableHoleInterpolators(from, to, numberOfMatchableHoles))
  }

  let differenceBetweenNumberOfHoles = from.coordinates.length - to.coordinates.length

  if (differenceBetweenNumberOfHoles > 0) {
    holeInterpolators.push(...createHoleImploders(from, differenceBetweenNumberOfHoles))
  }

  if (differenceBetweenNumberOfHoles < 0) {
    holeInterpolators.push(...createHoleExploders(to, differenceBetweenNumberOfHoles))
  }

  return holeInterpolators
}

function createMatchableHoleInterpolators (from, to, numberOfMatchableHoles) {
  let holeInterpolators = []

  let fromHoles = getHoles(from, numberOfMatchableHoles)
  let toHoles = getHoles(to, numberOfMatchableHoles)

  let fromOrder = matchLinearRings(fromHoles, toHoles)
  let fromHolesSorted = fromOrder.map(i => fromHoles[i])

  for (let i = 0; i < numberOfMatchableHoles; i++) {
    let fromHole = fromHolesSorted[i]
    let toHole = toHoles[i]

    let [fromHolePrepared, toHolePrepared] = prepareLinearRings(fromHole, toHole)

    let holeInterpolator = interpolate(fromHolePrepared, toHolePrepared)

    holeInterpolators.push(holeInterpolator)
  }

  return holeInterpolators
}

function createHoleImploders (polygon, differenceBetweenNumberOfHoles) {
  let interpolators = []

  let firstHoleThatNeedsImplodingIndex = polygon.coordinates.length - differenceBetweenNumberOfHoles

  for (let i = firstHoleThatNeedsImplodingIndex; i < polygon.coordinates.length; i++) {
    let hole = polygon.coordinates[i]
    let holeCentroid = linearRingCentroid(hole)
    let smallRectangleAroundCentroid = makeSmallRectangleAroundPoint(holeCentroid)

    let [preparedPolygon, preparedImplodePoint] = prepareLinearRings(hole, smallRectangleAroundCentroid)

    interpolators.push(interpolate(preparedPolygon, preparedImplodePoint))
  }

  return interpolators
}

function createHoleExploders (polygon, differenceBetweenNumberOfHoles) {
  // TODO
}

function makeSmallRectangleAroundPoint ([x, y]) {
  let epsilon = 1e-6

  let x1 = x - epsilon
  let x2 = x + epsilon
  let y1 = y - epsilon
  let y2 = y + epsilon

  return [[x1, y1], [x1, y2], [x2, y2], [x2, y1], [x1, y1]]
}

function createInterpolatorWithHoles (
  from, to, fromOuterRingPrepared, toOuterRingPrepared, holeInterpolators
) {
  let outerRingInterpolator = interpolate(fromOuterRingPrepared, toOuterRingPrepared)

  return function interpolator (t) {
    if (t === 0) return from
    if (t === 1) return to

    let interpolatedLinearRing = outerRingInterpolator(t)

    return {
      type: 'Polygon',
      coordinates: [
        interpolatedLinearRing,
        ...holeInterpolators.map(holeInterpolator => holeInterpolator(t))
      ]
    }
  }
}