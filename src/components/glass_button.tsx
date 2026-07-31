import type { LucideIcon } from 'lucide-react';

import { color, font } from '../tokens.js';

type GlassButtonProps = {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

/**
 * A labelled glass button: icon plus text. An icon on its own says nothing to someone who has not
 * met it before, which is why the editor's actions all carry their word.
 *
 * Styling is the existing `.btn-glass` class rather than another inline copy of the same shadows.
 */
export function GlassButton({
  icon: Icon,
  label,
  onClick,
  disabled = false,
}: GlassButtonProps): React.ReactElement {
  return (
    <button
      type="button"
      className="btn-glass"
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: '8px 14px',
        borderRadius: 10,
        color: color.textSecondary,
        fontFamily: font,
        fontSize: 13,
        fontWeight: 500,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        whiteSpace: 'nowrap',
      }}
    >
      <Icon size={14} strokeWidth={1.5} />
      {label}
    </button>
  );
}
