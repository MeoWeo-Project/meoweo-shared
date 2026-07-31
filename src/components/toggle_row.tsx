import { color, font, inkAlpha, primaryAlpha } from '../tokens';

type ToggleRowProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  hint?: string;
  disabled?: boolean;
};

/**
 * An on/off switch with a label.
 *
 * Every effect that can be turned off needs one, so it exists once rather than being drawn again in
 * each panel. A real `<input type="checkbox">` underneath, so it is reachable by keyboard and by a
 * screen reader; the glass is only paint on top.
 */
export function ToggleRow({
  label,
  checked,
  onChange,
  hint,
  disabled = false,
}: ToggleRowProps): React.ReactElement {
  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: font,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
        style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }}
      />
      <span
        aria-hidden
        style={{
          position: 'relative',
          width: 38,
          height: 22,
          borderRadius: 11,
          flexShrink: 0,
          background: checked ? color.primary : inkAlpha(0.15),
          boxShadow: checked ? `0 0 0 3px ${primaryAlpha(0.15)}` : 'none',
          transition: 'background 0.15s, box-shadow 0.15s',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 3,
            left: checked ? 19 : 3,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 1px 3px rgba(80,50,130,0.35)',
            transition: 'left 0.15s',
          }}
        />
      </span>
      <span style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: color.textSecondary }}>{label}</span>
        {hint !== undefined && (
          <span style={{ fontSize: 11, color: color.textMuted }}>{hint}</span>
        )}
      </span>
    </label>
  );
}
