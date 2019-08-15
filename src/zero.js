import { create } from "./create"
import { fill } from "./fill"

export function zero(size) {
  return create(fill(0, size * size), [size, size])
}
