export default function generateCircle (x0, y0, radius, segments) {
  const step = 2 * Math.PI / segments
  const points = []

  for (let theta = 0; theta < 2 * Math.PI; theta += step) {
    const x = x0 + radius * Math.cos(theta)
    const y = y0 - radius * Math.sin(theta)
    points.push([x, y])
  }

  points.push(points[0])
  return points.reverse()
}
