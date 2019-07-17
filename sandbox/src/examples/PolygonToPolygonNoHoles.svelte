<script>
  import generateCircle from '../utils/generateCircle.js'
  import PolygonToPolygonTransitioner from '../components/PolygonToPolygonTransitioner.svelte'

  let circle = {
    type: 'Polygon',
    coordinates: [generateCircle(250, 250, 150, 30)]
  }

  let star = {
    type: 'Polygon',
    coordinates: [
      [[300, 300], [250, 500], [200, 300], [0, 250], [200, 200], [250, 0], [300, 200], [500, 250], [300, 300]]
    ]
  }
</script>

<h1>Polygon to polygon (no holes)</h1>

<PolygonToPolygonTransitioner
  geometries={{ circle, star }}
/>