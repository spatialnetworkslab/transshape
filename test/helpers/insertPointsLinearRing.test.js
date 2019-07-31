import { insertPointsLinearRing } from '../../src'

describe('insertPointsLinearRings', () => {
  test('adds the correct amount of points to a linear ring', () => {
    const inputLinearRing = [
      [0, 0], [5, 0], [5, 5], [0, 5], [0, 0]
    ]

    const inputLinearRingLength = inputLinearRing.length

    const extraPoints = 3

    const newLinearRing = insertPointsLinearRing(inputLinearRing, extraPoints)

    const expectedOutputLength = inputLinearRingLength + extraPoints

    expect(newLinearRing.length).toBe(expectedOutputLength)
  })

  test('adds the correct points to a square linear ring', () => {
    const inputLinearRing = [
      [0, 0], [6, 0], [6, 6], [0, 6], [0, 0]
    ]

    const extraPoints = 4

    const expectedOutputLinearRing = [
      [0, 0], [3, 0], [6, 0], [6, 3], [6, 6], [3, 6], [0, 6], [0, 3], [0, 0]
    ]

    expect(insertPointsLinearRing(inputLinearRing, extraPoints)).toEqual(expectedOutputLinearRing)
  })

  test('adds the correct points to an irregularly shaped linear ring', () => {
    const inputLinearRing = [
      [0, 0], [10, 0], [9, 1], [1, 1], [0, 0]
    ]

    const extraPoints = 4

    const expectedOutputLinearRing = [
      [0, 0], [2.5, 0], [5, 0], [7.5, 0], [10, 0], [9, 1], [5, 1], [1, 1], [0, 0]
    ]

    expect(insertPointsLinearRing(inputLinearRing, extraPoints)).toEqual(expectedOutputLinearRing)
  })

  test('does not modify the input linear ring', () => {
    const inputLinearRing = [
      [0, 0], [10, 0], [9, 1], [1, 1], [0, 0]
    ]

    const inputLinearRingClone = JSON.parse(JSON.stringify(inputLinearRing))

    const extraPoints = 4

    insertPointsLinearRing(inputLinearRing, extraPoints)

    expect(inputLinearRing).toEqual(inputLinearRingClone)
  })
})
