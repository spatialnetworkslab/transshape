import { transshape } from '../../src'

describe('transshape: LineString to LineString', () => {
  test('same number of points', () => {
    const fromLine = {
      type: 'LineString',
      coordinates: [
        [1, 4], [2, 5], [3, 4], [4, 5], [5, 4]
      ]
    }

    const toLine = {
      type: 'LineString',
      coordinates: [
        [1, 2], [2, 1], [3, 2], [4, 1], [5, 2]
      ]
    }

    const interpolator = transshape(fromLine, toLine)

    const expectedHalfWayLine = {
      type: 'LineString',
      coordinates: [
        [1, 3], [2, 3], [3, 3], [4, 3], [5, 3]
      ]
    }

    expect(interpolator(0.5)).toEqual(expectedHalfWayLine)
  })

  test('different number of points', () => {
    const fromLine = {
      type: 'LineString',
      coordinates: [
        [1, 4], [3, 4], [4, 5], [5, 4]
      ]
    }

    const toLine = {
      type: 'LineString',
      coordinates: [
        [1, 0], [2, 1], [3, 2], [4, 1], [5, 0]
      ]
    }

    const interpolator = transshape(fromLine, toLine)

    const expectedHalfWayLine = {
      type: 'LineString',
      coordinates: [
        [1, 2], [2, 2.5], [3, 3], [4, 3], [5, 2]
      ]
    }

    expect(interpolator(0.5)).toEqual(expectedHalfWayLine)
  })

  test('\'from\' LineString is reversed if that fits better', () => {
    const fromLine = {
      type: 'LineString',
      coordinates: [
        [5, 4], [4, 5], [3, 4], [1, 4]
      ]
    }

    const toLine = {
      type: 'LineString',
      coordinates: [
        [1, 0], [2, 1], [3, 2], [4, 1], [5, 0]
      ]
    }

    const interpolator = transshape(fromLine, toLine)

    const expectedHalfWayLine = {
      type: 'LineString',
      coordinates: [
        [1, 2], [2, 2.5], [3, 3], [4, 3], [5, 2]
      ]
    }

    expect(interpolator(0.5)).toEqual(expectedHalfWayLine)
  })
})
