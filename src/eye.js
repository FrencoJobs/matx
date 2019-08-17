import { create } from "./create"
import { fill } from "./fill"

/**
 * create an Indentity matrix
 * @param {array} size
 */
export function eye(size) {
  let mat = create(fill(0, size * size), [size, size])
  for (let i = 0; i < size; i++) mat.output[i][i] = 1
  return mat
}
