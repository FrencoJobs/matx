import { nonZero } from "./helpers"

export function fill(val, len) {
  if (!nonZero(1, len)) return []
  let ins = [val]
  while (ins.length * 2 <= len) ins = ins.concat(ins)
  if (ins.length < len) ins = ins.concat(ins.slice(0, len - ins.length))
  return ins
}
