import { transshape } from '../../src'

describe('transshape: MultiLineString to LineString and vice versa', () => {
  test('mls -> ls: cut on center point', () => {
    const fromMultiLineString = {
      type: 'MultiLineString',
      coordinates: [
        [[0, 0], [1, 1], [2, 2]],
        [[2, 0], [3, 1], [4, 2]]
      ]
    }

    const toLineString = {
      type: 'LineString',
      coordinates: [
        [0, 4], [1, 5], [2, 4], [3, 5], [4, 4]
      ]
    }

    const interpolator = transshape(fromMultiLineString, toLineString)

    const expectedHalfWayMultiLineString = {
      type: 'MultiLineString',
      coordinates: [
        [[0, 2], [1, 3], [2, 3]],
        [[2, 2], [3, 3], [4, 3]]
      ]
    }

    expect(interpolator(0.5)).toEqual(expectedHalfWayMultiLineString)
  })

  test('mls -> ls: new cutting point', () => {
    const fromMultiLineString = {
      type: 'MultiLineString',
      coordinates: [
        [[0, 1], [2, 1]],
        [[2, 2], [4, 2]]
      ]
    }

    const toLineString = {
      type: 'LineString',
      coordinates: [
        [0, 4], [4, 4], [4, 3]
      ]
    }

    const interpolator = transshape(fromMultiLineString, toLineString)

    const expectedHalfWayMultiLineString = {
      type: 'MultiLineString',
      coordinates: [
        [[0, 2.5], [2.25, 2.5]],
        [[2.25, 3], [3.5, 3], [4, 2.5]]
      ]
    }

    expect(interpolator(0.5)).toEqual(expectedHalfWayMultiLineString)
  })

  test('ls -> mls: cut on center point', () => {
    const fromLineString = {
      type: 'LineString',
      coordinates: [
        [0, 4], [1, 5], [2, 4], [3, 5], [4, 4]
      ]
    }

    const toMultiLineString = {
      type: 'MultiLineString',
      coordinates: [
        [[0, 0], [1, 1], [2, 2]],
        [[2, 0], [3, 1], [4, 2]]
      ]
    }

    const interpolator = transshape(fromLineString, toMultiLineString)

    const expectedHalfWayMultiLineString = {
      type: 'MultiLineString',
      coordinates: [
        [[0, 2], [1, 3], [2, 3]],
        [[2, 2], [3, 3], [4, 3]]
      ]
    }

    expect(interpolator(0.5)).toEqual(expectedHalfWayMultiLineString)
  })

  test('ls -> mls: new cutting point', () => {
    const fromLineString = {
      type: 'LineString',
      coordinates: [
        [0, 4], [4, 4], [4, 3]
      ]
    }

    const toMultiLineString = {
      type: 'MultiLineString',
      coordinates: [
        [[0, 1], [2, 1]],
        [[2, 2], [4, 2]]
      ]
    }

    const interpolator = transshape(fromLineString, toMultiLineString)

    const expectedHalfWayMultiLineString = {
      type: 'MultiLineString',
      coordinates: [
        [[0, 2.5], [2.25, 2.5]],
        [[2.25, 3], [3.5, 3], [4, 2.5]]
      ]
    }

    expect(interpolator(0.5)).toEqual(expectedHalfWayMultiLineString)
  })
})
