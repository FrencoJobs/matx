import { flatten } from "./helpers"

export function dot(x, y) {
  x = flatten(x)
  y = flatten(y)
  if (x.length == y.length) {
    let res = []
    for (let i = 0; i < x.length; i++) {
      res.push(x[i] * y[i])
    }
    return res.splice(0, res.length).reduce((x, y) => x + y)
  }
  return false
}
