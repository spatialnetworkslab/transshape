<script>
import Polygon from '../Polygon.svelte'

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

let geometries = { rectangle, star }

let currentGeometry = 'rectangle'

setInterval(() => {
  let newValue = currentGeometry === 'rectangle' ? 'star' : 'rectangle'
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