import { useEffect, useState } from 'react';

/** Whether a media query currently matches, kept current as the viewport changes. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const list = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent): void => {
      setMatches(e.matches);
    };
    setMatches(list.matches);
    list.addEventListener('change', handler);
    return () => {
      list.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}

/** The app's one breakpoint, matching the 768px in index.css. */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}
