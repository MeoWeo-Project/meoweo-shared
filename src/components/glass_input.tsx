import type { InputHTMLAttributes, ReactNode } from 'react';

import { glass, color, dangerAlpha, font } from '../tokens.js';

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  rightElement?: ReactNode;
  error?: boolean;
}

export function GlassInput({ label, style, rightElement, error = false, ...props }: GlassInputProps) {
  const inputStyle = error ? glass.inputError : glass.input;

  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label
          style={{
            display: 'block',
            fontSize: 11,
            fontWeight: 700,
            color: error ? dangerAlpha(0.7) : color.textMuted,
            marginBottom: 7,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        <input
          {...props}
          style={{
            width: '100%',
            padding: rightElement ? '13px 44px 13px 16px' : '13px 16px',
            ...inputStyle,
            fontSize: 14,
            color: color.textBase,
            fontFamily: font,
            ...style,
          }}
        />
        {rightElement && (
          <div
            style={{
              position: 'absolute',
              right: 13,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}
