/*!
* matx.js - v1.0.0-beta4
* MIT License
* Copyright (c) 2019 Frenco W. Jobs
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Matx = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function equals(arr1, arr2) {
    if (isObject(arr1) && isObject(arr2) && arr1.length == arr2.length) {
      var res = [];

      for (var i = 0; i < arr1.length; i++) {
        res.push(arr1[i] == arr2[i]);
      }

      return res.reduce(function (x, y) {
        return x == y;
      });
    }

    return false;
  }
  function nonZero(x, y) {
    if (x !== null && y !== null) {
      return x !== 0 && y !== 0;
    }

    return false;
  }
  function isObject(obj) {
    return obj !== null && _typeof(obj) === "object";
  }
  function isNumber(num) {
    return !isNaN(num) && typeof num === "number";
  }
  function isMatrix(mat) {
    if (mat.hasOwnProperty("output") && mat.hasOwnProperty("size")) return true;
    return false;
  }
  function isVector(mat) {
    if (isMatrix(mat) && mat.size[0] == 1 || mat.size[1] == 1) return true;
    return false;
  }
  function maxof(arr) {
    return Math.max.apply(null, arr);
  }
  function minof(arr) {
    return Math.min.apply(null, arr);
  }
  function flatten(arr) {
    return [].concat.apply([], arr);
  }
  function reverse(arr) {
    return arr.reverse();
  }
  function isSquare(mat) {
    return mat.size[0] === mat.size[1];
  }

  function create(arr, size) {
    if (nonZero(arr, size) && isObject(arr) && isObject(size) && arr.length == size.reduce(function (x, y) {
      return x * y;
    })) {
      var mat = [];

      for (var i = 0; i < size[0]; i++) {
        mat.push(arr.splice(0, size[1]));
      }

      return {
        output: mat.splice(0, mat.length),
        size: size
      };
    }

    return false;
  }

  function transpose(mat) {
    if (isObject(mat)) {
      var _ret = function () {
        var res = [];

        var _loop = function _loop(i) {
          mat.output.forEach(function (x) {
            res.push(x[i]);
          });
        };

        for (var i = 0; i < mat.size[1]; i++) {
          _loop(i);
        }

        return {
          v: create(res.splice(0, res.length), reverse(mat.size))
        };
      }();

      if (_typeof(_ret) === "object") return _ret.v;
    }

    return false;
  }

  function trace(mat) {
    if (nonZero(mat.output, mat.size) && isObject(mat) && isSquare(mat)) {
      var res = [];

      for (var i = 0; i < mat.size[0]; i++) {
        res.push(mat.output[i][i]);
      }

      return res.splice(0, res.length).reduce(function (x, y) {
        return x + y;
      });
    }

    return false;
  }

  function cofactor(mat, coordinate) {
    if (nonZero(mat.output, mat.size) && isObject(mat) && isSquare(mat) && isObject(coordinate)) {
      var o = JSON.parse(JSON.stringify(mat.output));
      o.splice(coordinate[0], 1);

      for (var i = 0; i < o.length; i++) {
        o[i].splice(coordinate[1], 1);
      }

      var nsize = [mat.size[0] - 1, mat.size[0] - 1];
      return create(flatten(o.splice(0, o.length)), nsize);
    }

    return false;
  }

  function det(mat) {
    if (nonZero(mat.output, mat.size) && isObject(mat) && isSquare(mat)) {
      var total = 0;
      if (mat.size[0] == 1) return flatten(mat.output)[0];

      for (var i = 0; i < mat.size[0]; i++) {
        total += mat.output[0][i] * det(cofactor(mat, [0, i])) * Math.pow(-1, i);
      }

      return total;
    }

    return false;
  }

  function minor(mat) {
    if (nonZero(mat.output, mat.size) && isObject(mat) && isSquare(mat)) {
      var res = [];

      for (var i = 0; i < mat.size[0]; i++) {
        for (var j = 0; j < mat.size[0]; j++) {
          res.push(det(cofactor(mat, [i, j])));
        }
      }

      return create(res, mat.size);
    }

    return false;
  }

  function checkBoard(mat) {
    for (var i = 0; i < mat.size[0]; i++) {
      for (var j = 0; j < mat.size[1]; j++) {
        if (i % 2 == 0 && j % 2 !== 0 || i % 2 !== 0 && j % 2 == 0) {
          mat.output[i][j] *= -1;
        }
      }
    }

    return mat;
  }

  function dot(x, y) {
    x = flatten(x);
    y = flatten(y);

    if (x.length == y.length) {
      var res = [];

      for (var i = 0; i < x.length; i++) {
        res.push(x[i] * y[i]);
      }

      return res.splice(0, res.length).reduce(function (x, y) {
        return x + y;
      });
    }

    return false;
  }

  function scalarMultliply(x, y) {
    if (!isNaN(x)) {
      var maty = flatten(y.output);
      var res = [];

      for (var i = 0; i < maty.length; i++) {
        res.push(x * maty[i]);
      }

      return create(res, y.size);
    }

    return false;
  }

  function vectorMultliply(x, y) {
    var nsize;

    if (equals(x.size, reverse(y.size))) {
      nsize = [x.size[0], y.size[1]];
      var res = [];

      for (var i = 0; i < y.size[1]; i++) {
        for (var j = 0; j < x.size[0]; j++) {
          res.push(dot(x.output[i], transpose(y).output[j]));
        }
      }

      return create(res.splice(0, res.length), nsize);
    }

    return false;
  }

  function multiply(x, y) {
    if (isNumber(x) && isMatrix(y)) {
      return scalarMultliply(x, y);
    } else if (isNumber(y) && isMatrix(x)) {
      return scalarMultliply(y, x);
    } else if (isMatrix(x) && isMatrix(y)) {
      return vectorMultliply(x, y);
    } else {
      return false;
    }
  }

  function inverse(mat) {
    if (nonZero(mat.output, mat.size) && isObject(mat) && isSquare(mat)) {
      var adjugate = checkBoard(transpose(minor(mat)));
      var coefficient = 1 / det(mat);
      return multiply(coefficient, adjugate);
    }

    return false;
  }

  function rowMinima(mat) {
    if (nonZero(mat.output, mat.size) && isObject(mat) && isSquare(mat)) {
      var res = [];
      mat.output.forEach(function (x) {
        res.push(minof(x));
      });
      return res;
    }

    return false;
  }

  function columnMaxima(mat) {
    if (nonZero(mat.output, mat.size) && isObject(mat) && isSquare(mat)) {
      var res = [];
      transpose(mat).output.forEach(function (x) {
        res.push(maxof(x));
      });
      return res;
    }

    return false;
  }

  function minMax(mat) {
    return minof(columnMaxima(mat));
  }

  function maxMin(mat) {
    return maxof(rowMinima(mat));
  }

  function saddlePoint(mat) {
    if (minMax(mat) === maxMin(mat)) return minMax(mat);
    return false;
  }

  function fill(val, len) {
    if (!nonZero(1, len)) return [];
    var ins = [val];

    while (ins.length * 2 <= len) {
      ins = ins.concat(ins);
    }

    if (ins.length < len) ins = ins.concat(ins.slice(0, len - ins.length));
    return ins;
  }

  function eye(size) {
    var mat = create(fill(0, size * size), [size, size]);

    for (var i = 0; i < size; i++) {
      mat.output[i][i] = 1;
    }

    return mat;
  }

  function zero(size) {
    return create(fill(0, size * size), [size, size]);
  }

  function add(x, y) {
    if (equals(x.size, y.size)) {
      var matx = flatten(x.output);
      var maty = flatten(y.output);
      var res = [];

      for (var i = 0; i < matx.length; i++) {
        res.push(matx[i] + maty[i]);
      }

      return create(res, y.size);
    }

    return false;
  }

  function subtract(x, y) {
    if (equals(x.size, y.size)) {
      var matx = flatten(x.output);
      var maty = flatten(y.output);
      var res = [];

      for (var i = 0; i < matx.length; i++) {
        res.push(matx[i] - maty[i]);
      }

      return create(res, y.size);
    }

    return false;
  }

  function pow(mat, exponent) {
    var res = 1;

    for (var i = 0; i < exponent; i++) {
      res = multiply(res, mat);
    }

    return res;
  }

  function apply(mat, callback) {
    if (isMatrix(mat)) {
      for (var i = 0; i < mat.size[0]; i++) {
        for (var j = 0; j < mat.size[1]; j++) {
          mat.output[i][j] = callback(mat.output[i][j]);
        }
      }

      return mat;
    }
  }

  function rvec(arr) {
    return {
      output: [arr],
      size: [1, arr.length]
    };
  }

  function cvec(arr) {
    return {
      output: arr.map(function (x) {
        return [x];
      }),
      size: [arr.length, 1]
    };
  }

  function dotProduct(x, y) {
    if (isVector(x) && isVector(y) && x.size[0] == y.size[0]) {
      return dot(transpose(x).output, y.output);
    }

    return false;
  }

  function dyadicProduct(x, y) {
    if (isVector(x) && isVector(y) && x.size[0] == y.size[0]) {
      return dot(x.output, transpose(y).output);
    }

    return false;
  }

  var index = {
    create: create,
    transpose: transpose,
    trace: trace,
    cofactor: cofactor,
    det: det,
    minor: minor,
    inverse: inverse,
    rowMinima: rowMinima,
    columnMaxima: columnMaxima,
    minMax: minMax,
    maxMin: maxMin,
    saddlePoint: saddlePoint,
    eye: eye,
    zero: zero,
    add: add,
    subtract: subtract,
    multiply: multiply,
    pow: pow,
    apply: apply,
    rvec: rvec,
    cvec: cvec,
    dotProduct: dotProduct,
    dyadicProduct: dyadicProduct
  };

  return index;

}));
