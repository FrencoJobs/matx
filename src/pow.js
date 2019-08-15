import { multiply } from "./multiply"

export function pow(mat, exponent) {
  let res = 1
  for (let i = 0; i < exponent; i++) res = multiply(res, mat)
  return res
}
