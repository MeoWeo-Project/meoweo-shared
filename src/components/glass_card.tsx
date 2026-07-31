import type { CSSProperties, ReactNode } from 'react';

import { glass } from '../tokens.js';

interface GlassCardProps {
  children: ReactNode;
  padding?: number | string;
  style?: CSSProperties;
  className?: string;
}

export function GlassCard({ children, padding = '22px 26px', style, className }: GlassCardProps) {
  return (
    <div
      className={className}
      style={{
        ...glass.card,
        padding,
        marginBottom: 14,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
