import { minMax } from "./minMax"
import { maxMin } from "./maxMin"

export function saddlePoint(mat) {
  if (minMax(mat) === maxMin(mat)) return minMax(mat)
  return false
}
