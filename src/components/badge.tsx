import type { ReactNode } from 'react';

import { color } from '../tokens';

const SIZES = {
  sm: { fontSize: 9, padding: '1px 6px' },
  md: { fontSize: 11, padding: '3px 10px' },
} as const;

/**
 * Muted, non-interactive status tag (e.g. "Beta", "Soon").
 * Gray outline, no fill, no glow — it marks state, it is not a button.
 */
export function Badge({ children, size = 'sm' }: { children: ReactNode; size?: 'sm' | 'md' }) {
  return (
    <span
      style={{
        ...SIZES[size],
        display: 'inline-block',
        color: color.textMuted,
        background: 'transparent',
        border: '1px solid rgba(136,120,160,0.5)',
        borderRadius: 20,
        fontWeight: 600,
        letterSpacing: '0.06em',
        lineHeight: 1.5,
        flexShrink: 0,
      }}
    >
      {children}
    </span>
  );
}
