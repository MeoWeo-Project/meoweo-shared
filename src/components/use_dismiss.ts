import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * Close an open overlay on Escape, or on a pointer landing outside it.
 *
 * The trigger has to be excluded as well as the menu: without that, clicking the button that
 * opened the menu would dismiss it here and immediately reopen it in the button's own handler,
 * and the menu would never close.
 */
export function useDismiss(
  open: boolean,
  onDismiss: () => void,
  ...ignored: readonly RefObject<HTMLElement | null>[]
): void {
  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(e: PointerEvent): void {
      const target = e.target as Node;
      if (ignored.some((ref) => ref.current?.contains(target))) {
        return;
      }
      onDismiss();
    }

    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        onDismiss();
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
    // The refs are stable objects; spreading them into the dep list would compare a fresh array
    // every render and re-bind the listeners each time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onDismiss]);
}
