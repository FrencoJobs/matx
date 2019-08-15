import { nonZero, isObject } from "./helpers"

export function create(arr, size) {
  if (
    nonZero(arr, size) &&
    isObject(arr) &&
    isObject(size) &&
    arr.length == size.reduce((x, y) => x * y)
  ) {
    let mat = []
    for (let i = 0; i < size[0]; i++) {
      mat.push(arr.splice(0, size[1]))
    }
    return { output: mat.splice(0, mat.length), size: size }
  }
  return false
}
