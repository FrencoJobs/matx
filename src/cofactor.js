import { nonZero, isObject, isSquare, flatten } from "./helpers"
import { create } from "./create"

export function cofactor(mat, coordinate) {
  if (
    nonZero(mat.output, mat.size) &&
    isObject(mat) &&
    isSquare(mat) &&
    isObject(coordinate)
  ) {
    let o = JSON.parse(JSON.stringify(mat.output))
    o.splice(coordinate[0], 1)
    for (let i = 0; i < o.length; i++) o[i].splice(coordinate[1], 1)
    let nsize = [mat.size[0] - 1, mat.size[0] - 1]
    return create(flatten(o.splice(0, o.length)), nsize)
  }
  return false
}
