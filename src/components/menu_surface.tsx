import { useRef } from 'react';
import { createPortal } from 'react-dom';
import type { CSSProperties, ReactNode, RefObject } from 'react';

import { useDismiss } from './use_dismiss';
import { anchorTo } from '../lib/popover_position';
import { useIsMobile } from '../lib/use_media_query';

/** Narrowest a menu may be, however small the control that opened it. */
const MIN_MENU_WIDTH = 180;

type MenuSurfaceProps = {
  open: boolean;
  /** The control the menu belongs to: it anchors the popover and is exempt from outside-dismiss. */
  anchorRef: RefObject<HTMLElement | null>;
  onClose: () => void;
  children: ReactNode;
  role?: 'menu' | 'listbox';
};

/** Read the trigger's position now – during render, while it is the thing the user just clicked. */
function popoverStyle(anchor: HTMLElement | null): CSSProperties {
  if (anchor === null) {
    return {};
  }
  const position = anchorTo(anchor.getBoundingClientRect(), {
    width: window.innerWidth,
    height: window.innerHeight,
  }, MIN_MENU_WIDTH);

  return {
    position: 'fixed',
    zIndex: 600,
    left: position.left,
    width: position.width,
    ...(position.above ? { bottom: position.bottom } : { top: position.top }),
  };
}

/**
 * How a floating menu is presented: a popover anchored to its trigger on a desktop, a bottom sheet
 * on a phone, dismissed by Escape or by a pointer outside it.
 *
 * It knows nothing about what it contains, which is what lets the user menu and the dropdowns share
 * one implementation rather than each keeping its own copy of the portal, the placement and the
 * dismissal.
 */
export function MenuSurface({
  open,
  anchorRef,
  onClose,
  children,
  role = 'menu',
}: MenuSurfaceProps): React.ReactElement | null {
  const menuRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useDismiss(open, onClose, menuRef, anchorRef);

  if (!open) {
    return null;
  }

  if (isMobile) {
    return createPortal(
      <div
        className="bottom-sheet-backdrop"
        onPointerDown={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div ref={menuRef} className="bottom-sheet" role={role}>
          <div className="bottom-sheet-handle" />
          {children}
        </div>
      </div>,
      document.body,
    );
  }

  return createPortal(
    <div ref={menuRef} className="user-menu-popover" role={role} style={popoverStyle(anchorRef.current)}>
      {children}
    </div>,
    document.body,
  );
}
