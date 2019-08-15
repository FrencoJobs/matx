import { nonZero, isObject, isSquare, maxof } from "./helpers"
import { transpose } from "./transpose"

export function columnMaxima(mat) {
  if (nonZero(mat.output, mat.size) && isObject(mat) && isSquare(mat)) {
    let res = []
    transpose(mat).output.forEach(x => {
      res.push(maxof(x))
    })
    return res
  }
  return false
}
