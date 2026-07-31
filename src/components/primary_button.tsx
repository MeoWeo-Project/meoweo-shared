import { useState } from 'react';
import type { ButtonHTMLAttributes } from 'react';

import { primaryButton, font } from '../tokens.js';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export function PrimaryButton({ fullWidth, style, disabled, children, ...props }: PrimaryButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const interactive = !disabled;

  const hoverStyle =
    pressed && interactive
      ? {
          filter: 'brightness(0.94)',
          transform: 'scale(0.983)',
          transitionDuration: '0.05s',
        }
      : hovered && interactive
        ? {
            filter: 'brightness(1.09)',
          }
        : {};

  return (
    <button
      {...props}
      disabled={disabled}
      onMouseEnter={() => { setHovered(true); }}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => { setPressed(true); }}
      onMouseUp={() => { setPressed(false); }}
      style={{
        ...primaryButton,
        width: fullWidth ? '100%' : undefined,
        padding: '14px 24px',
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: '0.02em',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        // A disabled <button> swallows pointer events and they do not bubble, so a wrapping
        // Tooltip would never see the hover. Letting them through is what makes the "why is
        // this disabled?" hint reachable.
        pointerEvents: disabled ? 'none' : undefined,
        fontFamily: font,
        transition: 'filter 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease',
        ...hoverStyle,
        ...style,
      }}
    >
      {children}
    </button>
  );
}
