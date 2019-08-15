import { nonZero, isObject, isSquare, minof } from "./helpers"

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
