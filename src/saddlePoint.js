import { minMax } from "./minMax"
import { maxMin } from "./maxMin"

/**
 * find the saddle point of a matrix if it exists
 * @param {matrix} mat
 */
export function saddlePoint(mat) {
  if (minMax(mat) === maxMin(mat)) return minMax(mat)
  return false
}
