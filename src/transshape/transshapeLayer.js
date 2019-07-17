import transshape, { isPolygonOrMultiPolygon } from './transshape.js'
import { every } from '../utils/array.js'

export default function transshapeLayer (fromLayer, toLayer) {
  ensureValidInput(fromLayer, toLayer)

  const keyOverlap = getKeyOverlap(fromLayer, toLayer)
  const interpolatorObject = constructInterpolatorObject(fromLayer, toLayer, keyOverlap)
}

function ensureValidInput (fromLayer, toLayer) {
  return every(Object.values(fromLayer), isPolygonOrMultiPolygon) &&
    every(Object.values(fromLayer), isPolygonOrMultiPolygon)
}

function getKeyOverlap (fromLayer, toLayer) {
  const keyOverlap = {}

  for (const key in fromLayer) {
    keyOverlap[key] = 'from'
  }

  for (const key in toLayer) {
    if (keyOverlap[key]) {
      keyOverlap[key] = 'both'
    } else {
      keyOverlap[key] = 'to'
    }
  }

  return keyOverlap
}

function constructInterpolatorObject (fromLayer, toLayer, keyOverlap) {
  const interpolatorObject = {}

  for (let key in keyOverlap) {
    let overlap = keyOverlap[key]

    if (overlap === 'both') {

    }

    if (overlap === 'from') {}

    if (overlap === 'to') {}
  }
}