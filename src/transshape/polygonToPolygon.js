import { interpolate } from 'd3-interpolate'
import insertPointsLinearRing from '../insertPointsLinearRing.js'
import rotatePointsLinearRing from '../rotatePointsLinearRing.js'
import matchLinearRings from '../matchLinearRings.js'
import linearRingCentroid from '../utils/linearRingCentroid.js'
import { map } from '../utils/array.js'

export default function polygonToPolygon (from, to) {
  const fromOuterRing = from.coordinates[0]
  const toOuterRing = to.coordinates[0]

  const [fromOuterRingPrepared, toOuterRingPrepared] = prepareLinearRings(fromOuterRing, toOuterRing)

  if (neitherHasHoles(from, to)) {
    return createInterpolatorNoHoles(from, to, fromOuterRingPrepared, toOuterRingPrepared)
  }

  const holeInterpolators = createHoleInterpolators(from, to)

  return createInterpolatorWithHoles(
    from, to, fromOuterRingPrepared, toOuterRingPrepared, holeInterpolators
  )
}

function prepareLinearRings (fromRing, toRing) {
  const lengthDifference = fromRing.length - toRing.length

  if (lengthDifference > 0) {
    toRing = insertPointsLinearRing(toRing, lengthDifference)
  }

  if (lengthDifference < 0) {
    fromRing = insertPointsLinearRing(fromRing, -lengthDifference)
  }

  const rotatedFromRing = rotatePointsLinearRing(fromRing, toRing)

  return [rotatedFromRing, toRing]
}

function createInterpolatorNoHoles (from, to, fromOuterRingPrepared, toOuterRingPrepared) {
  const outerRingInterpolator = interpolate(fromOuterRingPrepared, toOuterRingPrepared)

  return function interpolator (t) {
    if (t === 0) return from
    if (t === 1) return to

    const interpolatedLinearRing = outerRingInterpolator(t)

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
  const holes = []

  for (let i = 1; i <= numberOfHoles; i++) {
    holes.push(polygon.coordinates[i])
  }

  return holes
}

function createHoleInterpolators (from, to) {
  let holeInterpolators = []

  const numberOfMatchableHoles = Math.min(from.coordinates.length, to.coordinates.length) - 1

  if (numberOfMatchableHoles > 0) {
    holeInterpolators = holeInterpolators.concat(
      createMatchableHoleInterpolators(from, to, numberOfMatchableHoles)
    )
  }

  const differenceBetweenNumberOfHoles = from.coordinates.length - to.coordinates.length

  if (differenceBetweenNumberOfHoles > 0) {
    holeInterpolators = holeInterpolators.concat(
      createHoleImploders(from, differenceBetweenNumberOfHoles)
    )
  }

  if (differenceBetweenNumberOfHoles < 0) {
    holeInterpolators = holeInterpolators.concat(
      createHoleExploders(to, -differenceBetweenNumberOfHoles)
    )
  }

  return holeInterpolators
}

function createMatchableHoleInterpolators (from, to, numberOfMatchableHoles) {
  const holeInterpolators = []

  const fromHoles = getHoles(from, numberOfMatchableHoles)
  const toHoles = getHoles(to, numberOfMatchableHoles)

  const fromOrder = matchLinearRings(fromHoles, toHoles)
  const fromHolesSorted = map(fromOrder, i => fromHoles[i])

  for (let i = 0; i < numberOfMatchableHoles; i++) {
    const fromHole = fromHolesSorted[i]
    const toHole = toHoles[i]

    const [fromHolePrepared, toHolePrepared] = prepareLinearRings(fromHole, toHole)

    const holeInterpolator = interpolate(fromHolePrepared, toHolePrepared)

    holeInterpolators.push(holeInterpolator)
  }

  return holeInterpolators
}

function createHoleImploders (polygon, differenceBetweenNumberOfHoles) {
  const interpolators = []

  const firstHoleThatNeedsImplodingIndex = polygon.coordinates.length - differenceBetweenNumberOfHoles

  for (let i = firstHoleThatNeedsImplodingIndex; i < polygon.coordinates.length; i++) {
    const hole = polygon.coordinates[i]
    const holeCentroid = linearRingCentroid(hole)
    const smallRectangleAroundCentroid = makeSmallRectangleAroundPoint(holeCentroid)

    const [preparedPolygon, preparedImplodePoint] = prepareLinearRings(hole, smallRectangleAroundCentroid)

    interpolators.push(interpolate(preparedPolygon, preparedImplodePoint))
  }

  return interpolators
}

function createHoleExploders (polygon, differenceBetweenNumberOfHoles) {
  return map(createHoleImploders(polygon, differenceBetweenNumberOfHoles), holeInterpolator => {
    return t => holeInterpolator(1 - t)
  })
}

function makeSmallRectangleAroundPoint ([x, y]) {
  const epsilon = 1e-6

  const x1 = x - epsilon
  const x2 = x + epsilon
  const y1 = y - epsilon
  const y2 = y + epsilon

  return [[x1, y1], [x1, y2], [x2, y2], [x2, y1], [x1, y1]]
}

function createInterpolatorWithHoles (
  from, to, fromOuterRingPrepared, toOuterRingPrepared, holeInterpolators
) {
  const outerRingInterpolator = interpolate(fromOuterRingPrepared, toOuterRingPrepared)

  return function interpolator (t) {
    if (t === 0) return from
    if (t === 1) return to

    const interpolatedLinearRing = outerRingInterpolator(t)

    return {
      type: 'Polygon',
      coordinates: [
        interpolatedLinearRing,
        ...map(holeInterpolators, holeInterpolator => holeInterpolator(t))
      ]
    }
  }
}
