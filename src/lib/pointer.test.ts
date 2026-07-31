import { describe, expect, it } from 'vitest';

import { fractionAt } from './pointer.js';

const RECT = { left: 100, width: 200 };

describe('fractionAt', () => {
  it('maps the middle of the element to a half', () => {
    expect(fractionAt(200, RECT)).toBe(0.5);
  });

  it('maps the edges to nothing and everything', () => {
    expect(fractionAt(100, RECT)).toBe(0);
    expect(fractionAt(300, RECT)).toBe(1);
  });

  it('clamps a pointer dragged past either edge', () => {
    // Pointer capture keeps reporting moves once the cursor leaves the element.
    expect(fractionAt(-50, RECT)).toBe(0);
    expect(fractionAt(9999, RECT)).toBe(1);
  });

  it('survives an element that has not been laid out yet', () => {
    expect(fractionAt(50, { left: 0, width: 0 })).toBe(0);
  });
});
