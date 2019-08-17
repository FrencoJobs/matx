/**
 * create a checkerboard matrix
 * @param {matrix} mat
 */

export function checkBoard(mat) {
  for (let i = 0; i < mat.size[0]; i++) {
    for (let j = 0; j < mat.size[1]; j++) {
      if ((i % 2 == 0 && j % 2 !== 0) || (i % 2 !== 0 && j % 2 == 0)) {
        mat.output[i][j] *= -1
      }
    }
  }
  return mat
}
