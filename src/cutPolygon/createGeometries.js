import { createTriangleIndexArcs, getPoint } from './createTopology.js'
import { linearRingIsClockwise } from '../utils/polygonArea.js'

export default function createGeometries (vertices, triangleIndices) {
  let geometries = []

  for (let i = 0; i < triangleIndices.length; i += 3) {
    let triangleIndexArcs = createTriangleIndexArcs(triangleIndices, i)

    let outerRing = triangleIndexArcs.map(arc => getPoint(vertices, arc[0]))
    outerRing.push(getPoint(vertices, triangleIndexArcs[0][0])) // close ring

    // earcut doesn't always give counterclockwise rings back
    if (linearRingIsClockwise(outerRing)) {
      outerRing = outerRing.reverse()
    }

    geometries.push({
      type: 'Polygon',
      coordinates: [outerRing]
    })
  }

  return geometries
}
