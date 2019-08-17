/**
 * create a column vector from the given array
 * @param {array} arr
 */
export function cvec(arr) {
  return {
    output: arr.map(x => [x]),
    size: [arr.length, 1],
  }
}
