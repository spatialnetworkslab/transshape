<script>
  import generateCircle from '../generateCircle.js'
  import PolygonToPolygonTransitioner from '../PolygonToPolygonTransitioner.svelte'

  let circleWithHoles = {
    type: 'Polygon',
    coordinates: [
      generateCircle(250, 250, 150, 30),
      generateCircle(350, 280, 40, 30).reverse(),
      generateCircle(150, 250, 20, 30).reverse(),
      generateCircle(250, 250, 30, 30).reverse()
    ]
  }

  let starWithHoles = {
    type: 'Polygon',
    coordinates: [
      [[300, 300], [250, 500], [200, 300], [0, 250], [200, 200], [250, 0], [300, 200], [500, 250], [300, 300]],
      [[225, 350], [237.5, 400], [262.5, 400], [275, 350], [225, 350]],
      [[237.5, 100], [225, 150], [275, 150], [262.5, 100], [237.5, 100]]
      // [[225, 225], [225, 275], [275, 275], [275, 225], [225, 225]]
    ]
  }
</script>

<h1>Polygon to polygon (with holes)</h1>

<PolygonToPolygonTransitioner
  geometries={{ circleWithHoles, starWithHoles }}
/>
