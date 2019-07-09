import { interpolate } from 'd3-interpolate'
import { pointDistance } from './utils/distance.js'
import { getOrderDescending } from './utils/sort.js'

export default function insertPointsLinearRing (inputLinearRing, numberOfAdditionalPoints) {
  let linearRing = cloneLinearRing(inputLinearRing)
  let edgeLengths = getEdgeLengths(linearRing)
  let orderedEdgeIds = getOrderDescending(edgeLengths)

  for (let i = 0; i < numberOfAdditionalPoints; i++) {
    let longestEdgeId = orderedEdgeIds[0]

    let edge = getEdge(linearRing, longestEdgeId)
    let edgeLength = edgeLengths[longestEdgeId]

    let newEdges = splitEdge(edge)
    let newEdgesLength = edgeLength / 2

    // Remove old edge
    orderedEdgeIds.shift()
    linearRing.splice(longestEdgeId, 1)
    edgeLengths.splice(longestEdgeId, 1)

    // Insert new edges
    orderedEdgeIds = insertOrderedId(orderedEdgeIds, edgeLengths, longestEdgeId, newEdgesLength)

    linearRing.splice(longestEdgeId, 0, newEdges[0][0])
    linearRing.splice(longestEdgeId + 1, 0, newEdges[1][0])
    edgeLengths.splice(longestEdgeId, 0, newEdgesLength)
    edgeLengths.splice(longestEdgeId + 1, 0, newEdgesLength)
  }

  return linearRing
}

function cloneLinearRing (linearRing) {
  let clonedLinearRing = []

  for (let i = 0; i < linearRing.length; i++) {
    clonedLinearRing.push(linearRing[i].slice(0))
  }

  return clonedLinearRing
}

function getEdgeLengths (linearRing) {
  let edgeLengths = []

  for (let i = 0; i < linearRing.length; i++) {
    let edge = getEdge(linearRing, i)

    edgeLengths.push(pointDistance(edge[0], edge[1]))
  }

  return edgeLengths
}

function getEdge (linearRing, index) {
  return [
    linearRing[index], linearRing[(index + 1) % linearRing.length]
  ]
}

function splitEdge (edge) {
  let pointInBetween = interpolate(edge[0], edge[1])(0.5)

  return [
    [edge[0], pointInBetween],
    [pointInBetween, edge[1]]
  ]
}

function insertOrderedId (orderedIds, edgeLengths, valueIndex, newValue) {
  // Insert new Ids right place
  let idsWereInserted = false

  for (let i = 0; i < orderedIds.length; i++) {
    let index = orderedIds[i]

    // Increase all indices after the valueIndex with 1
    if (index > valueIndex) orderedIds[i] = orderedIds[i] + 1

    let currentArrayValue = edgeLengths[index]

    if (newValue >= currentArrayValue) {
      orderedIds.splice(i + 1, 0, valueIndex)
      orderedIds.splice(i + 2, 0, valueIndex + 1)

      idsWereInserted = true
      break
    }
  }

  if (!idsWereInserted) {
    orderedIds.unshift(valueIndex + 1)
    orderedIds.unshift(valueIndex)
  }

  return orderedIds
}
