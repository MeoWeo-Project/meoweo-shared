import { useEffect, useRef, useState } from 'react';

/** An element's width in pixels, kept current as it is resized – what a waveform needs to decide
 *  how many bars it has room for. */
export function useElementWidth<T extends HTMLElement>(): [React.RefObject<T | null>, number] {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (element === null) {
      return;
    }
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry?.contentRect.width ?? 0);
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, width];
}
