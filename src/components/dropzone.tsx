import { useReducer } from 'react';
import { Upload } from 'lucide-react';

import { fileDropReducer, IDLE_FILE_DROP } from '../lib/file_drop.js';
import { color, font, primaryAlpha } from '../tokens.js';

/** Keeps the box from collapsing when its content is swapped for the prompt. */
const MIN_HEIGHT = 96;

type DropzoneProps = {
  /** Every accepted file from the drop, in the order the browser reported them. */
  onFiles: (files: File[]) => void;
  /** Told why a drop was refused, so the screen can show it where its other errors live. */
  onReject: (message: string) => void;
  /** What to say while a file is hovering, e.g. "Drop to upload". */
  prompt: string;
  /**
   * Cheap, synchronous gate on a dropped file: return a message to refuse it, or null to accept.
   * Deliberately name/type-based – reading bytes belongs to whatever parses the file afterwards.
   */
  validate?: (file: File) => string | null;
  /** Refuse a multi-file drop; only the first file is taken. */
  single?: boolean;
  /** Makes the whole box a shortcut to the file picker. */
  onClick?: () => void;
  padding?: string | number;
  children: React.ReactNode;
};

/**
 * A drop target that *becomes* the prompt while a file is over it.
 *
 * Deliberately not an overlay. An absolutely-positioned layer sits on top of whatever is beneath
 * it, and unless it is fully opaque the two sets of text are simply painted over each other – which
 * is exactly the bug this replaces. Swapping the content instead means there is nothing stacked, so
 * nothing can collide.
 */
export function Dropzone({
  onFiles,
  onReject,
  prompt,
  validate,
  single = false,
  onClick,
  padding = 14,
  children,
}: DropzoneProps): React.ReactElement {
  const [state, dispatch] = useReducer(fileDropReducer, IDLE_FILE_DROP);

  function handleDrop(e: React.DragEvent): void {
    e.preventDefault();
    dispatch({ type: 'drop' });

    const dropped = Array.from(e.dataTransfer.files);
    const files = single ? dropped.slice(0, 1) : dropped;
    if (files.length === 0) {
      return;
    }

    for (const file of files) {
      const problem = validate?.(file) ?? null;
      if (problem !== null) {
        onReject(problem);
        return;
      }
    }
    onFiles(files);
  }

  return (
    <div
      onDragEnter={(e) => {
        e.preventDefault();
        dispatch({ type: 'enter' });
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        dispatch({ type: 'leave' });
      }}
      // Without preventDefault on every dragover the browser refuses the drop entirely.
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={handleDrop}
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: MIN_HEIGHT,
        padding,
        cursor: onClick === undefined ? 'default' : 'pointer',
        borderRadius: 16,
        border: `1.5px dashed ${state.dragging ? color.primary : primaryAlpha(0.28)}`,
        background: state.dragging ? primaryAlpha(0.06) : 'transparent',
        transition: 'border-color 0.15s, background 0.15s',
      }}
    >
      {state.dragging ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Upload size={22} color={color.primary} />
          <span style={{ fontSize: 14, fontWeight: 600, color: color.primary, fontFamily: font }}>
            {prompt}
          </span>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
