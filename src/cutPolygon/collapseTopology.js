/*
  Taken from flubber:
  https://github.com/veltman/flubber
*/

import { neighbors, mergeArcs, feature } from 'topojson-client'
import { bisector } from 'd3-array'
import { map } from '../utils/array.js'

const bisect = bisector(d => d.area).left

export default function collapseTopology (topology, numberOfPieces) {
  const triangleGeometries = topology.objects.triangles.geometries

  while (triangleGeometries.length > numberOfPieces) {
    mergeSmallestFeature()
  }

  if (numberOfPieces > triangleGeometries.length) {
    throw new RangeError('Can\'t collapse topology into ' + numberOfPieces + ' pieces.')
  }

  const geojson = feature(topology, topology.objects.triangles)
  const geojsonTriangleGeometries = map(geojson.features, feature => feature.geometry)

  return geojsonTriangleGeometries

  function mergeSmallestFeature () {
    const smallest = triangleGeometries[0]
    const neighborIndex = neighbors(triangleGeometries)[0][0]
    const neighbor = triangleGeometries[neighborIndex]
    const merged = mergeArcs(topology, [smallest, neighbor])

    // MultiPolygon -> Polygon
    merged.area = smallest.area + neighbor.area
    merged.type = 'Polygon'
    merged.arcs = merged.arcs[0]

    // Delete smallest and its chosen neighbor
    triangleGeometries.splice(neighborIndex, 1)
    triangleGeometries.shift()

    // Add new merged shape in sorted order
    triangleGeometries.splice(bisect(triangleGeometries, merged.area), 0, merged)
  }
}
