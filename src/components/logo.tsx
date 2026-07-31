interface LogoProps {
  size?: number;
  iconOnly?: boolean;
}

export function Logo({ size = 32, iconOnly = false }: LogoProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: iconOnly ? 0 : 10 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.28,
          overflow: 'hidden',
          flexShrink: 0,
          }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width={size} height={size}>
          <rect width="500" height="500" fill="#AF1055" />
          <g fill="none" stroke="#fff" strokeWidth="26.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 139.05,223.30 L 219.05,223.30 L 259.05,154.01" />
            <path d="M 295.94,196.84 L 320.66,154.01 L 360.66,223.30" />
            <path d="M 139.05,276.70 L 179.05,345.99 L 203.77,303.16" />
            <path d="M 240.95,345.99 L 280.95,276.70 L 360.66,276.70" />
          </g>
        </svg>
      </div>
      {!iconOnly && (
        <span
          style={{
            fontFamily: "'Tilt Neon', sans-serif",
            fontWeight: 700,
            fontSize: size * 0.52,
            color: '#160820',
            letterSpacing: '0.02em',
          }}
        >
          MeoWeo
        </span>
      )}
    </div>
  );
}
