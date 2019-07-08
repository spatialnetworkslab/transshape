/*
  Taken from flubber:
  https://github.com/veltman/flubber
*/

import earcut from 'earcut'
import createTopology from './createTopology.js'
import collapseTopology from './collapseTopology.js'
import combineIntoMultiPolygon from './combineIntoMultiPolygon.js'

const dimensions = 2

export default function cutPolygon (polygon, numberOfPieces) {
  let flattenedPolygon = earcut.flatten(polygon)
  let triangleIndices = earcut(flattenedPolygon.vertices, flattenedPolygon.holes, dimensions)
  let topology = createTopology(flattenedPolygon.vertices, triangleIndices)
  let cutPolygons = collapseTopology(topology, numberOfPieces)

  return combineIntoMultiPolygon(cutPolygons)
}
