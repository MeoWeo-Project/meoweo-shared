import { useRef } from 'react';

/**
 * Dragging a handle along a surface: the cut markers on their rail, the EQ bands on their curve.
 *
 * Three rules, each of which was broken somewhere before this existed.
 *
 * **The surface captures the pointer, never the handle.** A handle is redrawn from the very value the
 * drag is changing, and a handle keyed by that value is a *different element* on the next frame -
 * React unmounts it, and the capture dies with it. What is left tracks the pointer with no button
 * held and stops only when a click happens to land on it, which is exactly how the cut markers used
 * to behave. The surface outlives every re-render, so it is the only safe thing to capture on - and
 * it is passed in rather than reached for through `parentElement`, so a handle can be wrapped
 * without silently breaking the gesture.
 *
 * **A cancelled pointer ends the drag.** Touch gestures get taken away mid-stroke - an edge swipe, a
 * call, the browser deciding it was a scroll after all - and `pointercancel` arrives instead of
 * `pointerup`. Ignore it and the handle stays glued to the finger.
 *
 * **The pointerdown is consumed.** Without `preventDefault`, the browser starts its own native
 * text-selection drag alongside this one: the text near the handle highlights as the pointer moves,
 * and when the browser decides the gesture was a selection after all it takes the pointer away and
 * the handle sticks. One gesture, one owner.
 *
 * **The key is whatever identifies the handle** - an index, a band id - so no caller has to widen its
 * own type to fit this one.
 *
 * The geometry is deliberately not here: `fractionAt` (lib/pointer.ts) is pure and tested, and this
 * is the event plumbing around it.
 */
export type PointerDrag<Key> = {
  /** Spread on the handle that starts the gesture. */
  start: (key: Key) => Pick<React.DOMAttributes<Element>, 'onPointerDown'>;
  /** Spread on the surface element - the one `surfaceRef` points at. */
  surface: Pick<React.DOMAttributes<Element>, 'onPointerMove' | 'onPointerUp' | 'onPointerCancel'>;
};

export function usePointerDrag<Key>(
  surfaceRef: React.RefObject<HTMLElement | null>,
  onDrag: (key: Key, event: React.PointerEvent) => void,
  onStart?: (key: Key, event: React.PointerEvent) => void,
): PointerDrag<Key> {
  const dragging = useRef<Key | null>(null);

  function end(event: React.PointerEvent): void {
    dragging.current = null;
    const surface = surfaceRef.current;
    if (surface !== null && surface.hasPointerCapture(event.pointerId)) {
      surface.releasePointerCapture(event.pointerId);
    }
  }

  return {
    start: (key) => ({
      onPointerDown: (event) => {
        event.preventDefault();
        dragging.current = key;
        surfaceRef.current?.setPointerCapture(event.pointerId);
        onStart?.(key, event);
      },
    }),
    surface: {
      onPointerMove: (event) => {
        if (dragging.current !== null) {
          onDrag(dragging.current, event);
        }
      },
      onPointerUp: end,
      onPointerCancel: end,
    },
  };
}
