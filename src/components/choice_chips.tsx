import { color, font, primaryAlpha } from '../tokens.js';

export type ChipOption<T> = {
  value: T;
  label: string;
};

type ChoiceChipsProps<T> = {
  options: readonly ChipOption<T>[];
  /** The current value; a chip lights up when it matches. None may match, which is fine. */
  value: T;
  onSelect: (value: T) => void;
  ariaLabel: string;
};

/**
 * A row of preset chips: one press, one value.
 *
 * Not a replacement for the slider beside it - the chips are the common stops, the slider is the
 * whole range. Selection is by equality, so a slider dragged to exactly 1.5 lights the 1.5x chip
 * and a 1.48 lights nothing, which is the truth.
 */
export function ChoiceChips<T extends string | number>({
  options,
  value,
  onSelect,
  ariaLabel,
}: ChoiceChipsProps<T>): React.ReactElement {
  return (
    <div role="group" aria-label={ariaLabel} style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={String(option.value)}
            type="button"
            aria-pressed={isActive}
            onClick={() => {
              onSelect(option.value);
            }}
            style={{
              padding: '5px 12px',
              borderRadius: 999,
              border: `1px solid ${isActive ? color.primary : 'rgba(255,255,255,0.6)'}`,
              background: isActive ? primaryAlpha(0.1) : 'rgba(255,255,255,0.35)',
              color: isActive ? color.primary : color.textSecondary,
              fontFamily: font,
              fontSize: 12,
              fontWeight: isActive ? 600 : 400,
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
