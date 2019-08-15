import { nonZero, isObject, isSquare, flatten } from "./helpers"
import { cofactor } from "./cofactor"

export function det(mat) {
  if (nonZero(mat.output, mat.size) && isObject(mat) && isSquare(mat)) {
    let total = 0
    if (mat.size[0] == 1) return flatten(mat.output)[0]
    for (let i = 0; i < mat.size[0]; i++)
      total += mat.output[0][i] * det(cofactor(mat, [0, i])) * Math.pow(-1, i)
    return total
  }
  return false
}
