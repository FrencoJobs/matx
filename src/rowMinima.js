import { nonZero, isObject, isSquare, minof } from "./helpers"

/**
 * find the row Minima of a matrix
 * @param {matrix} mat
 */
export function rowMinima(mat) {
  if (nonZero(mat.output, mat.size) && isObject(mat) && isSquare(mat)) {
    let res = []
    mat.output.forEach(x => {
      res.push(minof(x))
    })
    return res
  }
  return false
}
