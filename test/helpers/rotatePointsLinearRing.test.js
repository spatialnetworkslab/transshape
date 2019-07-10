import { rotatePointsLinearRing } from '../../src'

describe('rotatePointsLinearRing', () => {
  test('rotates a linear ring as expected', () => {
    let fromLinearRing = [
      [10, 10], [0, 10], [0, 0], [10, 0], [10, 10]
    ]

    let toLinearRing = [
      [20, 20], [30, 20], [30, 30], [20, 30], [20, 20]
    ]

    let expectedOutputLinearRing = [
      [0, 0], [10, 0], [10, 10], [0, 10], [0, 0]
    ]

    expect(rotatePointsLinearRing(fromLinearRing, toLinearRing)).toEqual(expectedOutputLinearRing)
  })

  test('does not modify the input linear rings', () => {
    let fromLinearRing = [
      [10, 10], [0, 10], [0, 0], [10, 0], [10, 10]
    ]

    let toLinearRing = [
      [20, 20], [30, 20], [30, 30], [20, 30], [20, 20]
    ]

    let fromLinearRingClone = JSON.parse(JSON.stringify(fromLinearRing))
    let toLinearRingClone = JSON.parse(JSON.stringify(toLinearRing))

    rotatePointsLinearRing(fromLinearRing, toLinearRing)

    expect(fromLinearRing).toEqual(fromLinearRingClone)
    expect(toLinearRing).toEqual(toLinearRingClone)
  })
})
