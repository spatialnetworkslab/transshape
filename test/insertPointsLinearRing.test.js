import { insertPointsLinearRing } from '../src/'

describe('insertPointsLinearRings', () => {
  test('adds the correct amount of points to a linear ring', () => {
    let inputLinearRing = [
      [0, 0], [5, 0], [5, 5], [0, 5], [0, 0]
    ]

    let extraPoints = 3

    let newLinearRing = insertPointsLinearRing(inputLinearRing, extraPoints)

    let expectedOutputLength = inputLinearRing.length + extraPoints

    expect(newLinearRing.length).toBe(expectedOutputLength)
  })

  test('adds the correct points to a linear ring', () => {
    let inputLinearRing = [
      [0, 0], [6, 0], [6, 6], [0, 6], [0, 0]
    ]

    let extraPoints = 3

    let expectedOutputLinearRing = [
      [0, 0], [4, 0], [6, 0], [6, 6], [6, 6], [0, 6], [0, 4], [[0, 0]]
    ]

    expect(insertPointsLinearRing(inputLinearRing, extraPoints)).toEqual(expectedOutputLinearRing)
  })
})
