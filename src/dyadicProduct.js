import { isVector } from "./helpers"
import { dot } from "./dot"
import { transpose } from "./transpose"

export function dyadicProduct(x, y) {
  if (isVector(x) && isVector(y) && x.size[0] == y.size[0]) {
    return dot(x.output, transpose(y).output)
  }
  return false
}
