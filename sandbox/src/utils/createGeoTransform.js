import { scaleLinear } from 'd3-scale'

export default function (domains, ranges) {
  const domainX = domains.x
  const domainY = domains.y

  const rangeDeltaX = ranges.x[1] - ranges.x[0]
  const rangeDeltaY = ranges.y[1] - ranges.y[0]
  const midX = (ranges.x[0] + ranges.x[1]) / 2
  const midY = (ranges.y[0] + ranges.y[1]) / 2

  const scalingFactorX = rangeDeltaX / (domainX[1] - domainX[0])
  const scalingFactorY = rangeDeltaY / (domainY[1] - domainY[0])

  let scaleX
  let scaleY

  if (scalingFactorX < scalingFactorY) {
    const fromMidY = (domainY[1] - domainY[0]) / 2 * scalingFactorX
    const newRangeY = [midY - fromMidY, midY + fromMidY]

    scaleX = scaleLinear().domain(domainX).range(ranges.x)
    scaleY = scaleLinear().domain(domainY).range(newRangeY)
  }

  if (scalingFactorX >= scalingFactorY) {
    const fromMidX = (domainX[1] - domainX[0]) / 2 * scalingFactorY
    const newRangeX = [midX - fromMidX, midX + fromMidX]

    scaleX = scaleLinear().domain(domainX).range(newRangeX)
    scaleY = scaleLinear().domain(domainY).range(ranges.y)
  }

  return function (point) {
    return [scaleX(point[0]), scaleY(point[1])]
  }
}
