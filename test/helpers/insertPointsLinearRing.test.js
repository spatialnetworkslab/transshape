import { insertPointsLinearRing } from '../../src'

describe('insertPointsLinearRings', () => {
  test('adds the correct amount of points to a linear ring', () => {
    let inputLinearRing = [
      [0, 0], [5, 0], [5, 5], [0, 5], [0, 0]
    ]

    let inputLinearRingLength = inputLinearRing.length

    let extraPoints = 3

    let newLinearRing = insertPointsLinearRing(inputLinearRing, extraPoints)

    let expectedOutputLength = inputLinearRingLength + extraPoints

    expect(newLinearRing.length).toBe(expectedOutputLength)
  })

  test('adds the correct points to a square linear ring', () => {
    let inputLinearRing = [
      [0, 0], [6, 0], [6, 6], [0, 6], [0, 0]
    ]

    let extraPoints = 4

    let expectedOutputLinearRing = [
      [0, 0], [3, 0], [6, 0], [6, 3], [6, 6], [3, 6], [0, 6], [0, 3], [0, 0]
    ]

    expect(insertPointsLinearRing(inputLinearRing, extraPoints)).toEqual(expectedOutputLinearRing)
  })

  test('adds the correct points to an irregularly shaped linear ring', () => {
    let inputLinearRing = [
      [0, 0], [10, 0], [9, 1], [1, 1], [0, 0]
    ]

    let extraPoints = 4

    let expectedOutputLinearRing = [
      [0, 0], [2.5, 0], [5, 0], [7.5, 0], [10, 0], [9, 1], [5, 1], [1, 1], [0, 0]
    ]

    expect(insertPointsLinearRing(inputLinearRing, extraPoints)).toEqual(expectedOutputLinearRing)
  })

  test('does not modify the input linear ring', () => {
    let inputLinearRing = [
      [0, 0], [10, 0], [9, 1], [1, 1], [0, 0]
    ]

    let inputLinearRingClone = JSON.parse(JSON.stringify(inputLinearRing))

    let extraPoints = 4

    insertPointsLinearRing(inputLinearRing, extraPoints)

    expect(inputLinearRing).toEqual(inputLinearRingClone)
  })
})
