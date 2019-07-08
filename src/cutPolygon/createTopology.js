/*
  Taken from flubber:
  https://github.com/veltman/flubber
*/

import polygonArea from './polygonArea.js/index.js'

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
    type: "Topology",
    objects: {
      triangles: {
        type: "GeometryCollection",
        geometries: []
      }
    },
    arcs: []
  }
}

function createTriangleIndexArcs (triangleIndices, i) {
  let a = triangleIndices[i]
  let b = triangleIndices[i + 1]
  let c = triangleIndices[i + 2]

  return [[a, b], [b, c], [c, a]]
}

function createArcSlug (arc) {
  return arc[0] < arc[1] ? arc.join(',') : arc[1] + ',' + arc[0]
}

function getPoint (vertices, i) {
  return [vertices[i], vertices[i + 1]]
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

/*
  Taken from: https://stackoverflow.com/a/33670691/7237112
*/
function polygonArea (vertices) {
  let total = 0

  for (let i = 0, l = vertices.length; i < l; i++) {
    let addX = vertices[i][0]
    let addY = vertices[i == vertices.length - 1 ? 0 : i + 1][1]
    let subX = vertices[i == vertices.length - 1 ? 0 : i + 1][0]
    let subY = vertices[i][1]

    total += (addX * addY * 0.5)
    total -= (subX * subY * 0.5)
  }

  return Math.abs(total)
}
