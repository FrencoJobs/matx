import { nonZero, isObject, isSquare } from "./helpers"
import { create } from "./create"
import { det } from "./det"
import { cofactor } from "./cofactor"

/**
 * create minor matrix of a matrix
 * @param {matrix} mat
 */
export function minor(mat) {
  if (nonZero(mat.output, mat.size) && isObject(mat) && isSquare(mat)) {
    let res = []
    for (let i = 0; i < mat.size[0]; i++) {
      for (let j = 0; j < mat.size[0]; j++) {
        res.push(det(cofactor(mat, [i, j])))
      }
    }
    return create(res, mat.size)
  }
  return false
}
