/** Where a pointer landed across an element, as a 0..1 fraction of its width. */
export function fractionAt(clientX: number, rect: { left: number; width: number }): number {
  if (rect.width === 0) {
    return 0;
  }
  const fraction = (clientX - rect.left) / rect.width;
  return Math.min(1, Math.max(0, fraction));
}
