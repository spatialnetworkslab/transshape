import { createTriangleIndexArcs, getPoint } from './createTopology.js'
import { linearRingIsClockwise } from '../utils/polygonArea.js'
import { map } from '../utils/array.js'

export default function createGeometries (vertices, triangleIndices) {
  const geometries = []

  for (let i = 0; i < triangleIndices.length; i += 3) {
    const triangleIndexArcs = createTriangleIndexArcs(triangleIndices, i)

    let outerRing = map(triangleIndexArcs, arc => getPoint(vertices, arc[0]))
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
