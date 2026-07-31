/** Pin a value inside a range. Its own module: the edit state, the peaks, the segments and the
 *  export progress all need it, and none of them should have to import each other for it. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
