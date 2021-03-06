# Matx.js

Matx js is a javascript library that only can provide an easy way of dealing with matrical calcualtions, vector transformation and translation. As vectors are gigantic parts of transforming shapes (especially points), this library can provide an easy way to work with them.

## Getting Started
To get start using matx.js is very easy.
You can install it via npm,
```javascript
npm install matx.js
```
The way Matx.js works is the same as original Math object provided by pure javadcript.
```javascript
let A = Matx.create([1,2,3,4],[2,2]); // create a 2 by 2 matrix
let I = Matx.eye(3); // create an identity matrix of size 3 by 3

/** Please be aware that each matrix operation will result in an Object
 * with the properties - output and size
*/
Matx.multiply(A,I) // => A

```
Here is a list of available commands,
```javascript
  Matx.create(array,size) // create a matrix
  Matx.transpose(matrix) // transpose a matrix
  Matx.trace(matrix) // trace of matrix
  Matx.cofactor(matrix,coordinate) // cofactor of a coordiante in a matrix
  Matx.det(matrix) // determinant of a matrix
  Matx.minor(matrix) // minor; sub-matrix of a matrix
  Matx.inverse(matrix) // inverse of a matrix
  Matx.rowMinima(matrix) // an array of mininmum values in each row
  Matx.columnMaxima(matrix) // an array of maximum values in each column
  Matx.minMax(matrix) // minimum values of column maxima
  Matx.maxMin(matrix) // maximum values of row minima
  Matx.saddlePoint(matrix) // value if minMax is equal to maxMin
  Matx.eye(size) // create an Identity matrix
  Matx.Zero(size) // create a Zero matrix
  Matx.add(matrix,matrix) // add two matrix
  Matx.subtract(matrix,matrix) // substract second matrix from first matrix
  Matx.multiply(matrix,matrix) // multiply two matrix
  Matx.pow(matrix,exponent) // power of base matrix
  Matx.apply(matrix,()=>{}) // apply each element to given function
  Matx.rvec(array) // create a row vector
  Matx.cvec(array) // create a column vector
  Matx.dotProduct(vector,vector) // dot product for vectors
  Matx.dyadicProduct(vector,vector) // dyadic product for vectors
```
## License
This project is licensed under the MIT Liscense - see the [LICENSE.md](LICENSE.md) for more details.