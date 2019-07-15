<script>
  import provinces from '../files/provinces.geojson'
  import PolygonToPolygonTransitioner from '../components/PolygonToPolygonTransitioner.svelte'

  const geometries = {}

  for (let i = 0; i < provinces.features; i++) {
    let geometry = provinces.features[i].geometry
    geometries[i] = provinces.features[i].geometry
  }


</script>

<h1>Dutch provinces</h1>

<PolygonToPolygonTransitioner
  {geometries}
/>
