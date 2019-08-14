;(function(global, undefined) {
  "use strict"

  function equals(arr1, arr2) {
    if (isObject(arr1) && isObject(arr2) && arr1.length == arr2.length) {
      let res = new Array()
      for (let i = 0; i < arr1.length; i++) {
        res.push(arr1[i] == arr2[i])
      }
      return res.reduce(function(x, y) {
        return x == y
      })
    }
    return false
  }
  function nonZero(x, y) {
    if (x !== null && y !== null) {
      return x !== 0 && y !== 0
    }
    return false
  }
  function isObject(obj) {
    return obj !== null && typeof obj === "object"
  }
  function isNumber(num) {
    return !isNaN(num) && typeof num === "number"
  }
  function isMatrix(mat) {
    if (mat.hasOwnProperty("output") && mat.hasOwnProperty("size")) return true
    return false
  }
  function isVector(mat) {
    if ((isMatrix(mat) && mat.size[0] == 1) || mat.size[1] == 1) return true
    return false
  }
  function maxof(arr) {
    return Math.max.apply(null, arr)
  }
  function minof(arr) {
    return Math.min.apply(null, arr)
  }
  function flatten(arr) {
    return [].concat.apply([], arr)
  }
  function reverse(arr) {
    let mat = new Array()
    for (let i = arr.length - 1; i >= 0; i--) {
      mat.push(arr[i])
    }
    return mat.splice(0, mat.length)
  }
  function dot(x, y) {
    x = flatten(x)
    y = flatten(y)
    if (x.length == y.length) {
      let res = new Array()
      for (let i = 0; i < x.length; i++) {
        res.push(x[i] * y[i])
      }
      return res.splice(0, res.length).reduce(function(x, y) {
        return x + y
      })
    }
    return false
  }
  function isSquare(mat) {
    return mat.size[0] === mat.size[1]
  }
  function fill(val, len) {
    if (!nonZero(1, len)) return []
    let ins = [val]
    while (ins.length * 2 <= len) ins = ins.concat(ins)
    if (ins.length < len) ins = ins.concat(ins.slice(0, len - ins.length))
    return ins
  }
  function checkBoard(mat) {
    for (let i = 0; i < mat.size[0]; i++) {
      for (let j = 0; j < mat.size[1]; j++) {
        if ((i % 2 == 0 && j % 2 !== 0) || (i % 2 !== 0 && j % 2 == 0)) {
          mat.output[i][j] *= -1
        }
      }
    }
    return mat
  }
  function create(arr, size) {
    if (
      nonZero(arr, size) &&
      isObject(arr) &&
      isObject(size) &&
      arr.length ==
        size.reduce(function(x, y) {
          return x * y
        })
    ) {
      let mat = new Array()
      for (let i = 0; i < size[0]; i++) {
        mat.push(arr.splice(0, size[1]))
      }
      return { output: mat.splice(0, mat.length), size: size }
    }
    return false
  }
  function apply(mat, callback) {
    if (isMatrix(mat)) {
      for (let i = 0; i < mat.size[0]; i++) {
        for (let j = 0; j < mat.size[1]; j++) {
          mat.output[i][j] = callback(mat.output[i][j])
        }
      }
      return mat
    }
  }
  function transpose(mat) {
    if (isObject(mat)) {
      let res = new Array()
      for (let i = 0; i < mat.size[1]; i++) {
        mat.output.forEach(function(x) {
          res.push(x[i])
        })
      }
      return create(res.splice(0, res.length), reverse(mat.size))
    }
    return false
  }
  function trace(mat) {
    if (nonZero(mat.output, mat.size) && isObject(mat) && isSquare(mat)) {
      let res = new Array()
      for (let i = 0; i < mat.size[0]; i++) {
        res.push(mat.output[i][i])
      }
      return res.splice(0, res.length).reduce(function(x, y) {
        return x + y
      })
    }
    return false
  }
  function cofactor(mat, coordinate) {
    if (
      nonZero(mat.output, mat.size) &&
      isObject(mat) &&
      isSquare(mat) &&
      isObject(coordinate)
    ) {
      let o = JSON.parse(JSON.stringify(mat.output))
      o.splice(coordinate[0], 1)
      for (let i = 0; i < o.length; i++) {
        o[i].splice(coordinate[1], 1)
      }
      let nsize = [mat.size[0] - 1, mat.size[0] - 1]
      return create(flatten(o.splice(0, o.length)), nsize)
    }
    return false
  }
  function det(mat) {
    if (nonZero(mat.output, mat.size) && isObject(mat) && isSquare(mat)) {
      let total = 0
      if (mat.size[0] == 1) return flatten(mat.output)[0]
      for (let i = 0; i < mat.size[0]; i++) {
        total += mat.output[0][i] * det(cofactor(mat, [0, i])) * Math.pow(-1, i)
      }
      return total
    }
    return false
  }
  function minor(mat) {
    if (nonZero(mat.output, mat.size) && isObject(mat) && isSquare(mat)) {
      let res = new Array()
      for (let i = 0; i < mat.size[0]; i++) {
        for (let j = 0; j < mat.size[0]; j++) {
          res.push(det(cofactor(mat, [i, j])))
        }
      }
      return create(res, mat.size)
    }
    return false
  }
  function inverse(mat) {
    if (nonZero(mat.output, mat.size) && isObject(mat) && isSquare(mat)) {
      let adjugate = checkBoard(transpose(minor(mat)))
      let coef = 1 / det(mat)
      return multiply(coef, adjugate)
    }
    return false
  }
  function rowMinima(mat) {
    if (nonZero(mat.output, mat.size) && isObject(mat) && isSquare(mat)) {
      let res = new Array()
      mat.output.forEach(function(x) {
        res.push(minof(x))
      })
      return res
    }
    return false
  }
  function columnMaxima(mat) {
    if (nonZero(mat.output, mat.size) && isObject(mat) && isSquare(mat)) {
      let res = new Array()
      transpose(mat).output.forEach(function(x) {
        res.push(maxof(x))
      })
      return res
    }
    return false
  }
  function minMax(mat) {
    return minof(columnMaxima(mat))
  }
  function maxMin(mat) {
    return maxof(rowMinima(mat))
  }
  function saddlePoint(mat) {
    if (minMax(mat) === maxMin(mat)) {
      return minMax(mat)
    }
    return false
  }
  function eye(size) {
    let mat = create(fill(0, size * size), [size, size])
    for (let i = 0; i < size; i++) {
      mat.output[i][i] = 1
    }
    return mat
  }
  function Zero(size) {
    return create(fill(0, size * size), [size, size])
  }
  function add(x, y) {
    if (equals(x.size, y.size)) {
      let matx = flatten(x.output)
      let maty = flatten(y.output)
      let res = new Array()
      for (let i = 0; i < matx.length; i++) {
        res.push(matx[i] + maty[i])
      }
      return create(res, y.size)
    }
    return false
  }
  function subtract(x, y) {
    if (equals(x.size, y.size)) {
      let matx = flatten(x.output)
      let maty = flatten(y.output)
      let res = new Array()
      for (let i = 0; i < matx.length; i++) {
        res.push(matx[i] - maty[i])
      }
      return create(res, y.size)
    }
    return false
  }
  function scalarMultliply(x, y) {
    if (!isNaN(x)) {
      let maty = flatten(y.output)
      let res = new Array()
      for (let i = 0; i < maty.length; i++) {
        res.push(x * maty[i])
      }
      return create(res, y.size)
    }
    return false
  }
  function vectorMultliply(x, y) {
    let nsize
    if (equals(x.size, reverse(y.size))) {
      nsize = [x.size[0], y.size[1]]
      let res = new Array()
      for (let i = 0; i < y.size[1]; i++) {
        for (let j = 0; j < x.size[0]; j++) {
          res.push(dot(x.output[i], transpose(y).output[j]))
        }
      }
      return create(res.splice(0, res.length), nsize)
    }
    return false
  }
  function multiply(x, y) {
    if (isNumber(x) && isMatrix(y)) {
      return scalarMultliply(x, y)
    } else if (isNumber(y) && isMatrix(x)) {
      return scalarMultliply(y, x)
    } else if (isMatrix(x) && isMatrix(y)) {
      return vectorMultliply(x, y)
    } else {
      return false
    }
  }
  function pow(mat, exponent) {
    let res = 1
    for (let i = 0; i < exponent; i++) {
      res = multiply(res, mat)
    }
    return res
  }
  function rvec(arr) {
    return { output: [arr], size: [1, arr.length] }
  }
  function cvec(arr) {
    return {
      output: arr.map(function(x) {
        return [x]
      }),
      size: [arr.length, 1],
    }
  }
  function dotProduct(x, y) {
    if (isVector(x) && isVector(y) && x.size[0] == y.size[0]) {
      return dot(transpose(x).output, y.output)
    }
  }
  function dyadicProduct(x, y) {
    if (isVector(x) && isVector(y) && x.size[0] == y.size[0]) {
      return dot(x.output, transpose(y).output)
    }
  }
  let Matx = {
    create,
    transpose,
    trace,
    cofactor,
    det,
    minor,
    inverse,
    rowMinima,
    columnMaxima,
    minMax,
    maxMin,
    saddlePoint,
    eye,
    Zero,
    add,
    subtract,
    multiply,
    pow,
    apply,
    rvec,
    cvec,
    dotProduct,
    dyadicProduct,
  }

  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = Matx
  } else if (typeof define === "function" && define.amd) {
    define(Matx)
  } else {
    global.Matx = Matx
  }
})(this)
