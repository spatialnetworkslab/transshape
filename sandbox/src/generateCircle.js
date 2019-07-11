export default function generateCircle (x0, y0, radius, segments) {
  let step = 2 * Math.PI / segments
  let points = []

  for (let theta = 0; theta < 2 * Math.PI; theta += step) {
    let x = x0 + radius * Math.cos(theta)
    let y = y0 - radius * Math.sin(theta)
    points.push([x, y])
  }

  points.push(points[0])
  return points.reverse()
}
