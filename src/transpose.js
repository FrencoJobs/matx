import { isObject, reverse } from "./helpers"
import { create } from "./create"

export function transpose(mat) {
  if (isObject(mat)) {
    let res = []
    for (let i = 0; i < mat.size[1]; i++) {
      mat.output.forEach(x => {
        res.push(x[i])
      })
    }
    return create(res.splice(0, res.length), reverse(mat.size))
  }
  return false
}
