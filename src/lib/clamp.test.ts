import { describe, expect, it } from 'vitest';

import { clamp } from './clamp';

describe('clamp', () => {
  it('passes a value inside the range through', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('pins a value to either bound', () => {
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(11, 0, 10)).toBe(10);
  });

  it('returns the bounds themselves unchanged', () => {
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });
});
