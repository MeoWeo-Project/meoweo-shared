/** Channels kept next to the colours they tint, so the two can never drift apart. */
const PRIMARY_RGB = '175, 16, 85';
const DANGER_RGB = '192, 22, 58';
const INK_RGB = '74, 56, 96';

export const color = {
  primary: '#af1055',
  primaryDark: '#9c0e4a',
  primaryLight: '#c41860',
  bgPage: '#f5f2fa',
  bgGlass: 'rgba(255,255,255,0.16)',
  bgGlassStrong: 'rgba(255,255,255,0.28)',
  textBase: '#160820',
  textSecondary: '#4a3860',
  textMuted: '#8878a0',
  borderGlass: 'rgba(255,255,255,0.55)',
  borderGlassTop: 'rgba(255,255,255,0.92)',
  borderSubtle: 'rgba(200,180,230,0.35)',
  /** Errors, failures, destructive actions. */
  danger: `rgb(${DANGER_RGB})`,
  success: '#1f8a4c',
} as const;

/** The brand pink at a given opacity – dashed borders, hover tints, soft fills. */
export function primaryAlpha(alpha: number): string {
  return `rgba(${PRIMARY_RGB}, ${String(alpha)})`;
}

/** The danger red at a given opacity – error borders, input tints, focus rings. */
export function dangerAlpha(alpha: number): string {
  return `rgba(${DANGER_RGB}, ${String(alpha)})`;
}

/**
 * The text ink at a given opacity – controls laid over the waveform.
 *
 * A cut marker has to be legible against pink bars, so it borrows the neutral of the type rather
 * than adding another accent competing with the brand.
 */
export function inkAlpha(alpha: number): string {
  return `rgba(${INK_RGB}, ${String(alpha)})`;
}

const input = {
  background: 'rgba(255,255,255,0.28)',
  border: '1px solid rgba(255,255,255,0.55)',
  borderTopColor: 'rgba(200,185,225,0.5)',
  borderRadius: 14,
  boxShadow: 'inset 4px 4px 14px rgba(130,100,170,0.11), inset -2px -2px 9px rgba(255,255,255,0.92)',
} as const;

export const glass = {
  card: {
    background: 'rgba(255,255,255,0.58)',
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.70)',
    borderTopColor: 'rgba(255,255,255,0.92)',
    borderRadius: 24,
    boxShadow: '0 20px 20px rgba(80,50,130,0.07), 0 4px 8px rgba(80,50,130,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
  },
  modal: {
    background: 'rgba(255,255,255,0.62)',
    backdropFilter: 'blur(16px) saturate(180%) brightness(1.02)',
    WebkitBackdropFilter: 'blur(16px) saturate(180%) brightness(1.02)',
    border: '1px solid rgba(255,255,255,0.72)',
    borderTopColor: 'rgba(255,255,255,0.94)',
    borderRadius: 32,
    boxShadow: '0 28px 28px rgba(80,50,140,0.09), 0 12px 12px rgba(80,50,140,0.06), inset 0 1.5px 0 rgba(255,255,255,0.9)',
  },
  input,
  /** An input that failed validation. Written out by hand in four files before this existed. */
  inputError: {
    ...input,
    border: `1.5px solid ${dangerAlpha(0.5)}`,
    borderTopColor: dangerAlpha(0.5),
    boxShadow: `inset 4px 4px 14px ${dangerAlpha(0.07)}, inset -2px -2px 9px rgba(255,255,255,0.92), 0 0 0 3px ${dangerAlpha(0.09)}`,
  },
  button: {
    background: 'rgba(255,255,255,0.32)',
    border: '1px solid rgba(255,255,255,0.68)',
    borderTopColor: 'rgba(255,255,255,0.94)',
    borderRadius: 10,
  },
} as const;

export const primaryButton = {
  background: 'linear-gradient(180deg, #c41860 0%, #af1055 55%, #9c0e4a 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 14,
} as const;

export const font = "'Inter', sans-serif";
