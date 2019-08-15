import babel from "rollup-plugin-babel"
import { uglify } from "rollup-plugin-uglify"
import pkg from "./package.json"
const banner = `/*!
* matx.js - v${pkg.version}
* MIT License
* Copyright (c) 2019 Frenco W. Jobs
*/`

export default [
  {
    input: "src/index.js",
    external: ["ms"],
    output: [{ file: pkg.main, format: "umd", name: "Matx", banner }],
    plugins: [
      babel({
        exclude: "node_modules/**",
      }),
    ],
  },
  {
    input: "src/index.js",
    external: ["ms"],
    output: [{ file: "matx.min.js", format: "umd", name: "Matx", banner }],
    plugins: [
      babel({
        exclude: "node_modules/**",
      }),
      uglify(),
    ],
  },
]
