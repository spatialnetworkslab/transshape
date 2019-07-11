<script>
import Polygon from '../Polygon.svelte'

function generateCircle(x0, y0, radius, segments) {
  let step = 2 * Math.PI/segments
  let points = []
  for(let theta = 0; theta < 2 * Math.PI; theta+=step) {
    let x = x0 + radius * Math.cos(theta)
    let y = y0 - radius * Math.sin(theta)
    points.push([x, y])
  }
  points.push(points[0])
  return points.reverse()
}

let circle = {
  type: 'Polygon',
  coordinates: [generateCircle(250, 250, 150, 30)]
}

let rectangle = {
  type: 'Polygon',
  coordinates: [
    [[100, 100], [400, 100], [400, 400], [100, 400], [100, 100]]
  ]
}

let star = {
  type: 'Polygon',
  coordinates: [
    [[300, 300], [250, 500], [200, 300], [0, 250], [200, 200], [250, 0], [300, 200], [500, 250], [300, 300]]
  ]
}

let geometries = { star, circle }

let currentGeometry = 'star'

setInterval(() => {
  let newValue = currentGeometry === 'star' ? 'circle' : 'star'
  currentGeometry = newValue
}, 3000)
</script>

<h1>Polygon to polygon (no holes)</h1>

<svg width={500} height={500}>

  <Polygon
    geometry={geometries[currentGeometry]}
    fill="blue"
  />

</svg>