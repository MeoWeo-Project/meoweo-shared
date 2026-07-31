import type { CSSProperties } from 'react';
import type { LucideIcon } from 'lucide-react';

import type { SliderConfig } from '../lib/slider_config';
import { color, font } from '../tokens';

type SliderRowProps = {
  label: string;
  value: number;
  config: SliderConfig;
  onChange: (value: number) => void;
  /** Meaning at the low end of the range, e.g. a turtle for slow. */
  LeftIcon?: LucideIcon;
  /** Meaning at the high end, e.g. a rabbit for fast. */
  RightIcon?: LucideIcon;
  disabled?: boolean;
};

/**
 * The one slider: label and formatted value above, icons flanking a native range input.
 * Track and thumb styling is the `.glass-slider` class – range pseudo-elements are out of
 * reach for inline styles – with the filled portion driven by a CSS custom property.
 */
export function SliderRow({
  label,
  value,
  config,
  onChange,
  LeftIcon,
  RightIcon,
  disabled = false,
}: SliderRowProps): React.ReactElement {
  const fillPct = ((value - config.min) / (config.max - config.min)) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: color.textSecondary, fontFamily: font }}>
          {label}
        </span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: color.primary,
            fontFamily: font,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {config.format(value)}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {LeftIcon !== undefined && <LeftIcon size={16} color={color.textMuted} strokeWidth={1.5} />}
        <input
          type="range"
          className="glass-slider"
          aria-label={label}
          min={config.min}
          max={config.max}
          step={config.step}
          value={value}
          disabled={disabled}
          onChange={(e) => {
            onChange(Number(e.target.value));
          }}
          style={{ '--fill-pct': `${String(fillPct)}%` } as CSSProperties}
        />
        {RightIcon !== undefined && <RightIcon size={16} color={color.textMuted} strokeWidth={1.5} />}
      </div>
    </div>
  );
}
