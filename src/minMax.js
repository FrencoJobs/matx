import { minof } from "./helpers"
import { columnMaxima } from "./columMaxima"

export function minMax(mat) {
  return minof(columnMaxima(mat))
}
