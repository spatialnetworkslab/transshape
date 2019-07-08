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
  let flattenedPolygon = earcut.flatten(polygon.coordinates)
  let triangleIndices = earcut(flattenedPolygon.vertices, flattenedPolygon.holes, dimensions)

  let numberOfTriangles = getNumberOfTriangles(triangleIndices)

  if (numberOfTriangles >= numberOfPieces) {
    let topology = createTopology(flattenedPolygon.vertices, triangleIndices)
    return collapseTopology(topology, numberOfPieces)
  }

  if (numberOfTriangles < numberOfPieces) {
    let triangleGeometries = createGeometries(flattenedPolygon.vertices, triangleIndices)
    return sliceUpTriangles(triangleGeometries, numberOfPieces)
  }
}

function getNumberOfTriangles (triangleIndices) {
  return triangleIndices.length / 3
}
