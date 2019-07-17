export default function (geometry) {
  let bbox

  if (geometry.type === 'Polygon') {
    bbox = getBBoxLinearRing(geometry.coordinates[0])
  }

  if (geometry.type === 'MultiPolygon') {
    bbox = getBBoxLinearRing(geometry.coordinates[0][0])

    for (let i = 1; i < geometry.coordinates.length; i++) {
      const newBBox = getBBoxLinearRing(geometry.coordinates[i][0])
      bbox = updateBBox(bbox, newBBox)
    }
  }

  return asDomainFormat(bbox)
}

function getBBoxLinearRing (coordinates) {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  for (let i = 0; i < coordinates.length; i++) {
    const pair = coordinates[i]

    if (pair[0] < minX) { minX = pair[0] }
    if (pair[1] < minY) { minY = pair[1] }
    if (pair[0] > maxX) { maxX = pair[0] }
    if (pair[1] > maxY) { maxY = pair[1] }
  }
  
  return { minX, minY, maxX, maxY }
}

function updateBBox (o, n) {
  return {
    minX: o.minX < n.minX ? o.minX : n.minX,
    minY: o.minY < n.minY ? o.minY : n.minY,
    maxX: o.maxX > n.maxX ? o.maxX : n.maxX,
    maxY: o.maxY > n.maxY ? o.maxY : n.maxY
  }
}

function asDomainFormat ({ minX, minY, maxX, maxY }) {
  return {
    x: [minX, maxX],
    y: [minY, maxY]
  }
}
