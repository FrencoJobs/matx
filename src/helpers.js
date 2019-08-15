export function equals(arr1, arr2) {
  if (isObject(arr1) && isObject(arr2) && arr1.length == arr2.length) {
    let res = []
    for (let i = 0; i < arr1.length; i++) {
      res.push(arr1[i] == arr2[i])
    }
    return res.reduce((x, y) => x == y)
  }
  return false
}
export function nonZero(x, y) {
  if (x !== null && y !== null) {
    return x !== 0 && y !== 0
  }
  return false
}
export function isObject(obj) {
  return obj !== null && typeof obj === "object"
}
export function isNumber(num) {
  return !isNaN(num) && typeof num === "number"
}
export function isMatrix(mat) {
  if (mat.hasOwnProperty("output") && mat.hasOwnProperty("size")) return true
  return false
}
export function isVector(mat) {
  if ((isMatrix(mat) && mat.size[0] == 1) || mat.size[1] == 1) return true
  return false
}
export function maxof(arr) {
  return Math.max.apply(null, arr)
}
export function minof(arr) {
  return Math.min.apply(null, arr)
}
export function flatten(arr) {
  return [].concat.apply([], arr)
}
export function reverse(arr) {
  return arr.reverse()
}
export function isSquare(mat) {
  return mat.size[0] === mat.size[1]
}
