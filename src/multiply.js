import { flatten, equals, reverse, isNumber, isMatrix } from "./helpers"
import { create } from "./create"
import { dot } from "./dot"
import { transpose } from "./transpose"

/**
 * multiply the matrix y with the number x
 * @param {number} x
 * @param {matrix} y
 */
function scalarMultliply(x, y) {
  if (!isNaN(x)) {
    let maty = flatten(y.output)
    let res = []
    for (let i = 0; i < maty.length; i++) res.push(x * maty[i])
    return create(res, y.size)
  }
  return false
}
/**
 * multiply two matrices
 * @param {matrix} x
 * @param {matrix} y
 */
function vectorMultliply(x, y) {
  let nsize
  if (equals(x.size, reverse(y.size))) {
    nsize = [x.size[0], y.size[1]]
    let res = []
    for (let i = 0; i < y.size[1]; i++) {
      for (let j = 0; j < x.size[0]; j++) {
        res.push(dot(x.output[i], transpose(y).output[j]))
      }
    }
    return create(res.splice(0, res.length), nsize)
  }
  return false
}

export function multiply(x, y) {
  if (isNumber(x) && isMatrix(y)) {
    return scalarMultliply(x, y)
  } else if (isNumber(y) && isMatrix(x)) {
    return scalarMultliply(y, x)
  } else if (isMatrix(x) && isMatrix(y)) {
    return vectorMultliply(x, y)
  } else {
    return false
  }
}
