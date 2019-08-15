import { nonZero, isObject, isSquare } from "./helpers"
import { checkBoard } from "./checkBoard"
import { transpose } from "./transpose"
import { minor } from "./minor"
import { det } from "./det"
import { multiply } from "./multiply"

export function inverse(mat) {
  if (nonZero(mat.output, mat.size) && isObject(mat) && isSquare(mat)) {
    let adjugate = checkBoard(transpose(minor(mat)))
    let coefficient = 1 / det(mat)
    return multiply(coefficient, adjugate)
  }
  return false
}
