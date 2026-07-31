import type { CSSProperties } from 'react';

import type { SliderConfig } from '../lib/slider_config';
import { color, font } from '../tokens';

/** Travel of the fader, in pixels. The rotated input is laid out as a track of this length. */
const FADER_LENGTH = 120;

type VerticalSliderProps = {
  label: string;
  value: number;
  config: SliderConfig;
  onChange: (value: number) => void;
  /** Double-click, the desk gesture for "back to rest". What rest means is the caller's to say. */
  onReset?: () => void;
};

/**
 * A vertical fader: value on top, travel in the middle, band at the foot.
 *
 * It is the ordinary `.glass-slider` turned on its side, not a second slider that happens to be
 * vertical. `appearance: slider-vertical` – the obvious way to do this – silently discards
 * `::-webkit-slider-thumb`, which is why the faders came out in Chrome's default blue; rotating
 * the horizontal control keeps every custom style, and keeps a fader from ever drifting away from
 * the sliders it sits next to.
 */
export function VerticalSlider({
  label,
  value,
  config,
  onChange,
  onReset,
}: VerticalSliderProps): React.ReactElement {
  const fillPct = ((value - config.min) / (config.max - config.min)) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flexShrink: 0 }}>
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: value === 0 ? color.textMuted : color.primary,
          fontFamily: font,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {config.format(value)}
      </span>

      <div className="fader" style={{ height: FADER_LENGTH }}>
        <input
          type="range"
          className="glass-slider"
          aria-label={label}
          aria-orientation="vertical"
          min={config.min}
          max={config.max}
          step={config.step}
          value={value}
          onChange={(e) => {
            onChange(Number(e.target.value));
          }}
          onDoubleClick={onReset}
          style={{ width: FADER_LENGTH, '--fill-pct': `${String(fillPct)}%` } as CSSProperties}
        />
      </div>

      <span style={{ fontSize: 11, color: color.textSecondary, fontFamily: font }}>{label}</span>
    </div>
  );
}
