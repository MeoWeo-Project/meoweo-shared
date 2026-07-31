import { color, font } from '../tokens';

const TRACK_HEIGHT = 8;

/**
 * Determinate progress bar in the app's glass/pink theme.
 * `value` is a 0..1 fraction; pass `null` for an indeterminate (pulsing) state.
 */
export function ProgressBar({ value, label }: { value: number | null; label?: string }) {
  const pct = value === null ? null : Math.round(Math.min(Math.max(value, 0), 1) * 100);

  return (
    <div style={{ width: '100%' }}>
      {(label || pct !== null) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
            fontSize: 13,
            color: color.textSecondary,
            fontFamily: font,
          }}
        >
          {label && <span>{label}</span>}
          {pct !== null && (
            <span style={{ fontWeight: 600, color: color.primary, fontVariantNumeric: 'tabular-nums' }}>
              {pct}%
            </span>
          )}
        </div>
      )}
      <div
        style={{
          height: TRACK_HEIGHT,
          borderRadius: TRACK_HEIGHT,
          background: 'rgba(175,16,85,0.1)',
          boxShadow: 'inset 1px 1px 3px rgba(130,100,170,0.14)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            borderRadius: TRACK_HEIGHT,
            background: `linear-gradient(90deg, ${color.primaryLight}, ${color.primary})`,
            width: pct === null ? '35%' : `${String(pct)}%`,
            transition: pct === null ? undefined : 'width 0.3s ease',
            animation: pct === null ? 'progressIndeterminate 1.2s ease-in-out infinite' : undefined,
          }}
        />
      </div>
      <style>{`
        @keyframes progressIndeterminate {
          0% { margin-left: -35%; }
          100% { margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
