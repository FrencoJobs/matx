import { isVector } from "./helpers"
import { dot } from "./dot"
import { transpose } from "./transpose"

/**
 * find the product of two matrix
 * @param {matrix} x
 * @param {matrix} y
 */
export function dotProduct(x, y) {
  if (isVector(x) && isVector(y) && x.size[0] == y.size[0]) {
    return dot(transpose(x).output, y.output)
  }
  return false
}
