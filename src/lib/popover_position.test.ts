import { describe, expect, it } from 'vitest';

import { anchorTo } from './popover_position.js';

const VIEWPORT = { width: 1280, height: 800 };
const MIN_WIDTH = 180;

/** A trigger near the top of the page: plenty of room underneath. */
const HIGH = { left: 100, top: 100, bottom: 130, width: 120 };
/** A trigger near the foot of the page, like the user menu in the sidebar: none. */
const LOW = { left: 100, top: 740, bottom: 770, width: 120 };

describe('anchorTo', () => {
  it('opens below the trigger when there is room', () => {
    const position = anchorTo(HIGH, VIEWPORT, MIN_WIDTH);

    expect(position.above).toBe(false);
    if (!position.above) {
      expect(position.top).toBeGreaterThan(HIGH.bottom);
    }
  });

  it('flips above the trigger when the menu would run off the bottom', () => {
    // A control at the foot of the page is exactly where a menu gets opened.
    const position = anchorTo(LOW, VIEWPORT, MIN_WIDTH);

    expect(position.above).toBe(true);
  });

  it('pins a flipped menu by its bottom, so it grows away from the trigger', () => {
    // Anchoring by the top would need the height measured first, and the menu would jump
    // whenever its content changed size.
    const position = anchorTo(LOW, VIEWPORT, MIN_WIDTH);

    if (position.above) {
      expect(position.bottom).toBe(VIEWPORT.height - LOW.top + 6);
    }
  });

  it('stays below when the space above is no better', () => {
    const cramped = anchorTo({ left: 10, top: 10, bottom: 40, width: 100 }, { width: 400, height: 300 }, MIN_WIDTH);

    expect(cramped.above).toBe(false);
  });

  it('is never narrower than the minimum, however small the trigger', () => {
    expect(anchorTo({ ...HIGH, width: 40 }, VIEWPORT, MIN_WIDTH).width).toBe(MIN_WIDTH);
  });

  it('takes the trigger width when that is wider', () => {
    expect(anchorTo({ ...HIGH, width: 300 }, VIEWPORT, MIN_WIDTH).width).toBe(300);
  });

  it('keeps the menu inside the right edge', () => {
    const position = anchorTo({ ...HIGH, left: 1260 }, VIEWPORT, MIN_WIDTH);

    expect(position.left + position.width).toBeLessThanOrEqual(VIEWPORT.width);
  });

  it('keeps the menu inside the left edge', () => {
    expect(anchorTo({ ...HIGH, left: -50 }, VIEWPORT, MIN_WIDTH).left).toBeGreaterThanOrEqual(0);
  });
});
