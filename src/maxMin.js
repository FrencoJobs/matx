import { maxof } from "./helpers"
import { rowMinima } from "./rowMinima"

export function maxMin(mat) {
  return maxof(rowMinima(mat))
}
