<script>
import Polygon from './Polygon.svelte'

export let geometries

let geometryNames = Object.keys(geometries)

let currentGeometry = geometryNames[0]

setInterval(() => {
  let newValue = currentGeometry === geometryNames[0] ? geometryNames[1] : geometryNames[0]
  currentGeometry = newValue
}, 3000)
</script>

<svg width={500} height={500}>

  <Polygon
    geometry={geometries[currentGeometry]}
    fill="blue"
  />

</svg>