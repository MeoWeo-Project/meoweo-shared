/**
 * The drag state of a drop target.
 *
 * `dragenter` and `dragleave` fire for every element the cursor crosses, children included, so a
 * plain boolean flickers off the moment the pointer passes over a button inside the zone. Counting
 * how deep we are is what holds the highlight steady.
 */
export type FileDropState = {
  /** How many nested elements the drag is currently inside. */
  depth: number;
  dragging: boolean;
};

export type FileDropEvent = { type: 'enter' } | { type: 'leave' } | { type: 'drop' };

export const IDLE_FILE_DROP: FileDropState = { depth: 0, dragging: false };

export function fileDropReducer(state: FileDropState, event: FileDropEvent): FileDropState {
  switch (event.type) {
    case 'enter': {
      return { depth: state.depth + 1, dragging: true };
    }
    case 'leave': {
      // Never below zero: a stray leave without its enter must not put us in debt, or the next
      // real enter would be swallowed.
      const depth = Math.max(state.depth - 1, 0);
      return { depth, dragging: depth > 0 };
    }
    case 'drop': {
      return IDLE_FILE_DROP;
    }
  }
}
