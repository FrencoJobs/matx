import { equals, flatten } from "./helpers"
import { create } from "./create"

/**
 * add two matrices
 * return a new matrix with added properties
 * @param {matrix} x
 * @param {matrix} y
 */
export function add(x, y) {
  if (equals(x.size, y.size)) {
    let matx = flatten(x.output) // flatten two matrices
    let maty = flatten(y.output) // then re-create it into the shape
    let res = []
    for (let i = 0; i < matx.length; i++) res.push(matx[i] + maty[i])
    return create(res, y.size)
  }
  return false
}
