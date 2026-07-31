import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { color, inkAlpha } from '../tokens';

/**
 * `scrollWidth` is fractional and `scrollLeft` is rounded, so an exact comparison leaves a phantom
 * arrow at the far end of a row that is already fully scrolled. A pixel of slack settles it.
 */
const EDGE_EPSILON = 1;
/** A press moves most of a screenful, keeping a little of it for context. */
const PAGE_FRACTION = 0.8;
const ARROW_SIZE = 26;

type ScrollRowProps = {
  children: React.ReactNode;
  /** Names the scrolled region for a screen reader – "Edit tools", not "region". */
  label: string;
};

type Edges = { atStart: boolean; atEnd: boolean };

function edgesOf(element: HTMLElement): Edges {
  const maxScroll = element.scrollWidth - element.clientWidth;
  return {
    atStart: element.scrollLeft <= EDGE_EPSILON,
    atEnd: element.scrollLeft >= maxScroll - EDGE_EPSILON,
  };
}

function ArrowButton({
  side,
  onClick,
}: {
  side: 'left' | 'right';
  onClick: () => void;
}): React.ReactElement {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={side === 'left' ? 'Scroll left' : 'Scroll right'}
      onClick={onClick}
      style={{
        position: 'absolute',
        [side]: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        width: ARROW_SIZE,
        height: ARROW_SIZE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        border: `1px solid ${inkAlpha(0.1)}`,
        background: 'rgba(255,255,255,0.92)',
        boxShadow: '0 2px 8px rgba(80,50,130,0.14)',
        color: color.textSecondary,
        cursor: 'pointer',
      }}
    >
      <Icon size={15} strokeWidth={1.8} />
    </button>
  );
}

/**
 * A row that scrolls sideways when it does not fit, and says so.
 *
 * The row already scrolled; what it lacked was any sign that it did. On a phone the tools past the
 * fourth were simply invisible. The arrows appear only where there is something to reach: at the left
 * edge, only the right one; at the right edge, only the left; in between, both; and when everything
 * fits, neither.
 *
 * Native scrolling is left completely intact underneath - a swipe, a trackpad, a shift-wheel all still
 * work, and the arrows are an addition to that rather than a replacement for it.
 */
export function ScrollRow({ children, label }: ScrollRowProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState<Edges>({ atStart: true, atEnd: true });

  const measure = useCallback(() => {
    const element = ref.current;
    if (element !== null) {
      setEdges(edgesOf(element));
    }
  }, []);

  // Re-measured on resize as well as on scroll: a row that fits at 1200 px does not at 375 px, and
  // nothing scrolls in between to say so.
  useEffect(() => {
    const element = ref.current;
    if (element === null) {
      return;
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [measure]);

  function page(direction: -1 | 1): void {
    const element = ref.current;
    if (element !== null) {
      element.scrollBy({ left: direction * element.clientWidth * PAGE_FRACTION, behavior: 'smooth' });
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      {!edges.atStart && (
        <ArrowButton
          side="left"
          onClick={() => {
            page(-1);
          }}
        />
      )}

      <div ref={ref} className="scroll-row" role="group" aria-label={label} onScroll={measure}>
        {children}
      </div>

      {!edges.atEnd && (
        <ArrowButton
          side="right"
          onClick={() => {
            page(1);
          }}
        />
      )}
    </div>
  );
}
