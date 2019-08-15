export function cvec(arr) {
  return {
    output: arr.map(x => [x]),
    size: [arr.length, 1],
  }
}
