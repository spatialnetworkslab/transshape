/*
  Taken from flubber:
  https://github.com/veltman/flubber
*/

import earcut from 'earcut'
import createTopology from './createTopology.js'
import collapseTopolgoy from './collapseTopology.js'

const dimensions = 2

export default function (polygon, numberOfPieces) {
  let flattenedPolygon = earcut.flatten(polygon)
  
  let triangleIndices = earcut(flattenedPolygon.vertices, flattenedPolygon.holes, dimensions)

  let topology = createTopology(flattenedPolygon.vertices, triangleIndices)

  return collapseTopology(topology, numberOfPieces)
}
