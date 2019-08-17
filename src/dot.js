import { flatten } from "./helpers"

/**
 * find the dot product between two arrays
 * not to get confused with `dotProduct` that works for matrices
 * this is just a helper
 * @param {array} x
 * @param {array} y
 */

export function dot(x, y) {
  x = flatten(x)
  y = flatten(y)
  if (x.length == y.length) {
    let res = []
    for (let i = 0; i < x.length; i++) {
      res.push(x[i] * y[i])
    }
    return res.splice(0, res.length).reduce((x, y) => x + y)
  }
  return false
}
