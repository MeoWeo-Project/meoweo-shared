/** Just enough of a DOMRect to place a menu against, so this stays testable without a DOM. */
export type AnchorRect = {
  left: number;
  top: number;
  bottom: number;
  width: number;
};

export type Viewport = {
  width: number;
  height: number;
};

/**
 * Where the menu goes, expressed the way CSS wants it.
 *
 * Opening upward is pinned by its `bottom` rather than its `top` on purpose: the menu then grows
 * away from the trigger as its content changes, and nothing has to measure its height first.
 */
export type PopoverPosition =
  | { above: false; left: number; width: number; top: number }
  | { above: true; left: number; width: number; bottom: number };

/** Breathing room between the trigger and the menu, and between the menu and the viewport edge. */
const GAP = 6;
const MARGIN = 8;

/** What a menu is assumed to need before it is drawn. Only used to decide which way to open. */
export const ASSUMED_MENU_HEIGHT = 280;

/**
 * Place a menu against the control that opened it.
 *
 * Below the trigger when there is room, above it when there is not: a control near the foot of the
 * page is exactly where a dropdown gets opened, and a menu that runs off the bottom of the window
 * is unusable. The arithmetic lives here, away from the component, so the flipping and the
 * clamping can actually be checked.
 */
export function anchorTo(
  rect: AnchorRect,
  viewport: Viewport,
  minWidth: number,
  assumedHeight: number = ASSUMED_MENU_HEIGHT,
): PopoverPosition {
  const width = Math.max(rect.width, minWidth);
  const maxLeft = Math.max(MARGIN, viewport.width - width - MARGIN);
  const left = Math.min(Math.max(MARGIN, rect.left), maxLeft);

  const roomBelow = viewport.height - rect.bottom;
  const roomAbove = rect.top;
  const flip = roomBelow < assumedHeight + GAP && roomAbove > roomBelow;

  if (flip) {
    return { above: true, left, width, bottom: viewport.height - rect.top + GAP };
  }
  return { above: false, left, width, top: rect.bottom + GAP };
}
