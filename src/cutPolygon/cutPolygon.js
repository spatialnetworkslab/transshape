/*
  Inspired by flubber:
  https://github.com/veltman/flubber
*/

import earcut from 'earcut'

import createTopology from './createTopology.js'
import collapseTopology from './collapseTopology.js'

import createGeometries from './createGeometries.js'
import sliceUpTriangles from './sliceUpTriangles.js'

const dimensions = 2

export default function cutPolygon (polygon, numberOfPieces) {
  const flattenedPolygon = earcut.flatten(polygon.coordinates)
  const triangleIndices = earcut(flattenedPolygon.vertices, flattenedPolygon.holes, dimensions)

  const numberOfTriangles = getNumberOfTriangles(triangleIndices)

  if (numberOfTriangles >= numberOfPieces) {
    const topology = createTopology(flattenedPolygon.vertices, triangleIndices)
    return collapseTopology(topology, numberOfPieces)
  }

  if (numberOfTriangles < numberOfPieces) {
    const triangleGeometries = createGeometries(flattenedPolygon.vertices, triangleIndices)
    return sliceUpTriangles(triangleGeometries, numberOfPieces)
  }
}

function getNumberOfTriangles (triangleIndices) {
  return triangleIndices.length / 3
}
