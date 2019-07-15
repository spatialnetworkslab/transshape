<script>
  import provinces from '../files/provinces.geojson'
  import PolygonToPolygonTransitioner from '../components/PolygonToPolygonTransitioner.svelte'
  import getBBox from '../utils/getBBox.js'
  import createGeoTransform from '../utils/createGeoTransform.js'

  const geometries = {}

  for (let i = 0; i < provinces.features; i++) {
    let geometry = provinces.features[i].geometry
    let bbox = getBBox(geometry)
    let transformToFitExample = createGeoTransform(bbox, { x: [0, 800], y: [0, 800] })

    geometries[i] = transformGeometry(geometry, transformToFitExample)
  }


</script>

<h1>Dutch provinces</h1>

<PolygonToPolygonTransitioner
  {geometries}
/>
