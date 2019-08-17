import { create } from "./create"
import { fill } from "./fill"

/**
 * create a zero matrix with the given size
 * @param {array} size
 */
export function zero(size) {
  return create(fill(0, size * size), [size, size])
}
