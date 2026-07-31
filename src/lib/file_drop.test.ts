import { describe, expect, it } from 'vitest';

import { fileDropReducer, IDLE_FILE_DROP } from './file_drop';

import type { FileDropEvent, FileDropState } from './file_drop';

/** Replay a sequence of events from idle, the way the browser would fire them. */
function replay(...events: FileDropEvent[]): FileDropState {
  return events.reduce(fileDropReducer, IDLE_FILE_DROP);
}

describe('fileDropReducer', () => {
  it('starts dragging when a file enters', () => {
    expect(replay({ type: 'enter' })).toEqual({ depth: 1, dragging: true });
  });

  it('stops dragging when the file leaves again', () => {
    expect(replay({ type: 'enter' }, { type: 'leave' })).toEqual(IDLE_FILE_DROP);
  });

  it('keeps dragging while the cursor crosses a child element', () => {
    // This is the flicker: the browser fires enter(child) before leave(parent), so a naive boolean
    // drops to false and the highlight blinks off mid-drag.
    const state = replay(
      { type: 'enter' }, // the zone
      { type: 'enter' }, // a button inside it
      { type: 'leave' }, // the zone, now that the button owns the drag
    );

    expect(state.dragging).toBe(true);
  });

  it('only stops once the drag has left every nested element', () => {
    const state = replay(
      { type: 'enter' },
      { type: 'enter' },
      { type: 'leave' },
      { type: 'leave' },
    );

    expect(state).toEqual(IDLE_FILE_DROP);
  });

  it('cannot be driven into negative depth by an unmatched leave', () => {
    // A leave with no enter would otherwise leave depth at -1, and the next real enter would only
    // bring it back to 0 – swallowing the highlight entirely.
    const state = replay({ type: 'leave' }, { type: 'enter' });

    expect(state).toEqual({ depth: 1, dragging: true });
  });

  it('resets on drop, however deep the drag was', () => {
    expect(replay({ type: 'enter' }, { type: 'enter' }, { type: 'drop' })).toEqual(IDLE_FILE_DROP);
  });
});
