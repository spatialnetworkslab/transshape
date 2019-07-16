<script>
import Polygon from './Polygon.svelte'

export let geometries

let geometryNames = Object.keys(geometries)

let currentIndex = 0
let numberOfGeometries = geometryNames.length
$: currentGeometry = geometryNames[currentIndex]

function nextGeometry () {
  currentIndex = (currentIndex + 1) % numberOfGeometries
}

setInterval(nextGeometry, 3000)
</script>

<svg width={500} height={500}>

  <Polygon
    geometry={geometries[currentGeometry]}
    fill="blue"
  />

</svg>