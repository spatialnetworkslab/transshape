<script>
import { geoPath } from 'd3-geo'
import { tweened } from 'svelte/motion'
import { cubicOut } from 'svelte/easing'

import { transshape } from '../../src/'

export let geometry
export let fill
export let opacity = 1
export let transition = 2000

const generatePath = geoPath()

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
    fill
    style={`opacity: ${opacity}`}
/>