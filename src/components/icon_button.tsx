import type { ReactNode } from 'react';

import { color, primaryButton } from '../tokens.js';

type IconBtnProps = {
  onClick: () => void;
  /** Names the action; also read to screen readers, since the icon says nothing to them. */
  title: string;
  disabled?: boolean;
  /** Fill it in the brand colour for a screen's primary action - the Cutter's Split - so it reads
   *  as the thing to press rather than one more glass control. */
  primary?: boolean;
  children: ReactNode;
};

const GLASS_STYLE = {
  background: 'rgba(255,255,255,0.32)',
  border: '1px solid rgba(255,255,255,0.68)',
  borderTopColor: 'rgba(255,255,255,0.94)',
  color: color.textSecondary,
  boxShadow: '4px 4px 10px rgba(130,100,180,0.1), -2px -2px 6px rgba(255,255,255,0.97)',
} as const;

const PRIMARY_STYLE = {
  background: primaryButton.background,
  border: `1px solid ${color.primary}`,
  borderTopColor: color.primaryLight,
  color: '#fff',
  boxShadow: '4px 4px 12px rgba(175,16,85,0.22), -2px -2px 6px rgba(255,255,255,0.6)',
} as const;

/**
 * The small button an icon sits in: play/pause, download, split, mute.
 *
 * It carries no label - the icon and the title are the label - which is what separates it from
 * `GlassButton`. One implementation for every screen, so the transport controls weigh the same
 * everywhere they appear. `primary` swaps the glass for the brand fill without changing anything
 * else, so a screen's main action can stand out while staying the same shape.
 */
export function IconBtn({
  onClick,
  title,
  disabled = false,
  primary = false,
  children,
}: IconBtnProps): React.ReactElement {
  return (
    <button
      title={title}
      aria-label={title}
      disabled={disabled}
      onClick={onClick}
      style={{
        ...(primary ? PRIMARY_STYLE : GLASS_STYLE),
        padding: '8px 10px',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}
