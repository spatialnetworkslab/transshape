import transshape from './transshape.js'
import { implode, explode } from '../implodeExplode.js'
import { every } from '../utils/array.js'
import { isPolygonOrMultiPolygon } from '../utils/geometryDetectors.js'

export default function transshapeLayer (fromLayer, toLayer) {
  ensureValidInput(fromLayer, toLayer)

  const keyOverlap = getKeyOverlap(fromLayer, toLayer)
  const interpolatorObject = constructInterpolatorObject(fromLayer, toLayer, keyOverlap)

  return createLayerInterpolator(fromLayer, toLayer, interpolatorObject)
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

  for (const key in keyOverlap) {
    const overlap = keyOverlap[key]

    if (overlap === 'both') {
      interpolatorObject[key] = transshape(fromLayer[key], toLayer[key])
    }

    if (overlap === 'from') {
      interpolatorObject[key] = implode(fromLayer[key])
    }

    if (overlap === 'to') {
      interpolatorObject[key] = explode(toLayer[key])
    }
  }

  return interpolatorObject
}

function createLayerInterpolator (fromLayer, toLayer, interpolatorObject) {
  return function interpolator (t) {
    if (t === 0) return fromLayer
    if (t === 1) return toLayer

    const layerObject = {}

    for (const key in interpolatorObject) {
      layerObject[key] = interpolatorObject[key](t)
    }

    return layerObject
  }
}
