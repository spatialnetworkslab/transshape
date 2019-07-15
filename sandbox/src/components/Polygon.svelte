<script>
import { geoPath, geoIdentity } from 'd3-geo'
import { tweened } from 'svelte/motion'
import { cubicOut } from 'svelte/easing'

import { transshape } from '../../../src/'

export let geometry
export let fill
export let opacity = 1
export let transition = 2000

const projection = geoIdentity().reflectY(true).fitSize([500, 500], geometry)
const generatePath = geoPath().projection(projection)

let transitionableGeometry = tweened(geometry, {
  duration: transition,
  easing: cubicOut,
  interpolate: transshape
})

$: {
  transitionableGeometry.set(geometry)
}
</script>

<path 
  d={generatePath($transitionableGeometry)} 
  fill={fill}
  style={`opacity: ${opacity}`}
/>