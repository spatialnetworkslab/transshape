import { isPolygonOrMultiPolygon } from './transshape/transshape.js'

export function implode (geometry) {
  ensureValidInput(geometry)
  
}

export function explode (geometry) {
  ensureValidInput(geometry)
}

function ensureValidInput (geometry) {
  if (!isPolygonOrMultiPolygon(geometry)) {
    throw new Error('Invalid input')
  }
}
