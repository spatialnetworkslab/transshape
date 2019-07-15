<script>
  import provinces from '../files/provinces.json'
  import PolygonToPolygonTransitioner from '../components/PolygonToPolygonTransitioner.svelte'
  import getBBox from '../utils/getBBox.js'
  import createGeoTransform from '../utils/createGeoTransform.js'
  import transformGeometry from '../utils/transformGeometry.js'

  const geometries = {}

  // for (let i = 0; i < provinces.features.length; i++) {
  for (let i = 4; i < 7; i++) {
    let geometry = provinces.features[i].geometry
    let bbox = getBBox(geometry)
    let transformToFitExample = createGeoTransform(bbox, { x: [50, 450], y: [50, 450] })

    geometries[i.toString()] = transformGeometry(geometry, transformToFitExample)
  }
</script>

<h1>Dutch provinces</h1>

<PolygonToPolygonTransitioner
  {geometries}
/>
