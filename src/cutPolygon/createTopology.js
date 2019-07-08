/*
  Taken from flubber:
  https://github.com/veltman/flubber
*/
import polygonArea from '../utils/polygonArea.js'

export default function createTopology (vertices, triangleIndices) {
  const arcIndices = {}
  const topology = createEmptyTopology()

  for (let i = 0; i < triangleIndices.length; i += 3) {
    const geometry = []

    let triangleIndexArcs = createTriangleIndexArcs(triangleIndices, i)

    triangleIndexArcs.forEach(arc => {
      const slug = createArcSlug(arc)

      const coordinates = arc.map(pointIndex => getPoint(vertices, pointIndex))

      if (slug in arcIndices) {
        geometry.push(~arcIndices[slug]) // Not sure what this is doing
      } else {
        geometry.push((arcIndices[slug] = topology.arcs.length))
        topology.arcs.push(coordinates)
      }
    })

    let area = getTriangleArea(vertices, triangleIndexArcs)
    let polygon = createTopoPolygon(area, geometry)

    topology.objects.triangles.geometries.push(polygon)
  }

  // Sort smallest first
  // TODO sorted insertion?
  topology.objects.triangles.geometries.sort((a, b) => a.area - b.area)

  return topology
}

function createEmptyTopology () {
  return {
    type: 'Topology',
    objects: {
      triangles: {
        type: 'GeometryCollection',
        geometries: []
      }
    },
    arcs: []
  }
}

export function createTriangleIndexArcs (triangleIndices, i) {
  let a = triangleIndices[i]
  let b = triangleIndices[i + 1]
  let c = triangleIndices[i + 2]

  return [[a, b], [b, c], [c, a]]
}

function createArcSlug (arc) {
  return arc[0] < arc[1] ? arc.join(',') : arc[1] + ',' + arc[0]
}

export function getPoint (vertices, i) {
  return [vertices[i * 2], vertices[(i * 2) + 1]]
}

function createTopoPolygon (area, geometry) {
  return {
    type: 'Polygon',
    area,
    arcs: [geometry]
  }
}

function getTriangleArea (vertices, triangleIndexArcs) {
  return Math.abs(
    polygonArea(triangleIndexArcs.map(arc => getPoint(vertices, arc[0])))
  )
}
