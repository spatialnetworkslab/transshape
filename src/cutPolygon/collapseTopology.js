/*
  Taken from flubber:
  https://github.com/veltman/flubber
*/

import { mergeArcs, feature } from 'topojson-client'
import { bisector } from 'd3-array'
import { map } from '../utils/array.js'

const bisect = bisector(d => d.area).left

function findNeighbor (geoms) {
  // we assume the first geom is the candidate for which
  // we want to find a neighbor
  const sourceArcs = geoms[0].arcs[0].map(arc => arc < 0 ? ~arc : arc)

  let neighbor

  // start loop at index 1, first possible neighbor
  for (let index = 1; index < geoms.length; index++) {
    const targetArcs = geoms[index].arcs[0].map(arc => arc < 0 ? ~arc : arc)
    if (sourceArcs.some(arc => targetArcs.includes(arc))) {
      neighbor = index
      break
    }
  }
  return neighbor
}

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
    const neighborIndex = findNeighbor(triangleGeometries)
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
