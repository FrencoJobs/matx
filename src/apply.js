import { isMatrix } from "./helpers"

export function apply(mat, callback) {
  if (isMatrix(mat)) {
    for (let i = 0; i < mat.size[0]; i++) {
      for (let j = 0; j < mat.size[1]; j++) {
        mat.output[i][j] = callback(mat.output[i][j])
      }
    }
    return mat
  }
}
