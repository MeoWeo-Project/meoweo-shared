import { color, font } from '../tokens';

type ErrorTextProps = {
  children: React.ReactNode;
  /** Spacing around the message, so callers do not restate the colour just to nudge a margin. */
  margin?: string;
  size?: number;
};

/** An inline error message. One colour, one voice – see `color.danger`. */
export function ErrorText({
  children,
  margin = '10px 0 0',
  size = 12,
}: ErrorTextProps): React.ReactElement {
  return (
    <p style={{ fontSize: size, color: color.danger, margin, fontFamily: font, lineHeight: 1.5 }}>
      {children}
    </p>
  );
}
