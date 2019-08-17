import { equals, flatten } from "./helpers"
import { create } from "./create"

/**
 * subtract matrix y from matrix x
 * @param {matrix} x
 * @param {matrix} y
 */
export function subtract(x, y) {
  if (equals(x.size, y.size)) {
    let matx = flatten(x.output)
    let maty = flatten(y.output)
    let res = []
    for (let i = 0; i < matx.length; i++) res.push(matx[i] - maty[i])
    return create(res, y.size)
  }
  return false
}
