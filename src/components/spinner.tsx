import { Loader2 } from 'lucide-react';

/** The `spin` keyframes live in index.css. */
const SPIN = 'spin 0.75s linear infinite';

type SpinnerProps = {
  size?: number;
  color?: string;
};

/** The one spinning loader. Inlining the animation is how it ended up in eleven places. */
export function Spinner({ size = 14, color }: SpinnerProps): React.ReactElement {
  return <Loader2 size={size} color={color} style={{ animation: SPIN }} />;
}
