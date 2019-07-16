<script>
import { geoPath } from 'd3-geo'
import { tweened } from 'svelte/motion'
import { cubicOut } from 'svelte/easing'

import { transshape } from '../../../src/'

export let geometry
export let fill
export let opacity = 1
export let transition = 2000

const generatePath = geoPath()

let transitionableGeometry = tweened(geometry, {
  duration: transition,
  easing: cubicOut,
  interpolate: () => getInterpolator()
})

function getInterpolator () {
  return interpolator
}

let previousGeometry = geometry
let interpolator

function createInterpolator () {
  interpolator = transshape(previousGeometry, geometry)
}

$: {
  createInterpolator()
  transitionableGeometry.set(geometry)
  previousGeometry = geometry
}
</script>

<path 
  d={generatePath($transitionableGeometry)} 
  fill={fill}
  style={`opacity: ${opacity}`}
/>