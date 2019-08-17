import { multiply } from "./multiply"

/**
 * add exponent to a matrix
 * @param {matrix} mat
 * @param {number} exponent
 */
export function pow(mat, exponent) {
  let res = 1
  for (let i = 0; i < exponent; i++) res = multiply(res, mat)
  return res
}
