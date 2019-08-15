import { nonZero, isObject, isSquare } from "./helpers"

export function trace(mat) {
  if (nonZero(mat.output, mat.size) && isObject(mat) && isSquare(mat)) {
    let res = []
    for (let i = 0; i < mat.size[0]; i++) res.push(mat.output[i][i])
    return res.splice(0, res.length).reduce((x, y) => x + y)
  }
  return false
}
