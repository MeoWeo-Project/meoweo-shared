import { Menu, X, ChevronsLeft, ChevronsRight } from 'lucide-react';
import type { ReactElement, ReactNode } from 'react';

import { Logo } from './logo.js';
import { SidebarNav } from './sidebar_nav.js';
import type { NavSection } from './sidebar_nav.js';
import { color } from '../tokens.js';

/** Below this width the sidebar is a drawer, so navigating should close it. */
const MOBILE_BREAKPOINT_PX = 768;

type AppShellProps<TScreen extends string> = {
  sections: NavSection<TScreen>[];
  activeScreen: TScreen;
  onNavigate: (screen: TScreen) => void;
  sidebarOpen: boolean;
  onSidebarOpenChange: (open: boolean) => void;
  /** Rendered under the nav, e.g. a licences link or a user menu. */
  footer?: ReactNode;
  /** Fixed over the app on every screen, e.g. a global volume dock. */
  dock?: ReactNode;
  children: ReactNode;
};

/**
 * The chrome every suite shares: sidebar (logo, nav, footer), the mobile top bar, the desktop
 * sidebar toggle, and the scrollable content.
 *
 * All state is passed in – this component owns no store, so each suite keeps its own screen union
 * and its own routing.
 *
 * @param sections - Sidebar navigation sections.
 * @param activeScreen - The screen currently shown.
 * @param onNavigate - Called with the screen the user picked.
 * @param sidebarOpen - Whether the sidebar/drawer is open.
 * @param onSidebarOpenChange - Called to open or close the sidebar.
 * @param footer - Rendered under the nav.
 * @param dock - Rendered fixed above everything.
 * @param children - The active screen.
 * @returns The application chrome around `children`.
 */
export function AppShell<TScreen extends string>({
  sections,
  activeScreen,
  onNavigate,
  sidebarOpen,
  onSidebarOpenChange,
  footer,
  dock,
  children,
}: AppShellProps<TScreen>): ReactElement {
  function handleNav(next: TScreen): void {
    onNavigate(next);
    // Close the drawer after navigating on mobile.
    if (window.innerWidth < MOBILE_BREAKPOINT_PX) {
      onSidebarOpenChange(false);
    }
  }

  return (
    <div className="app-layout">
      {/* Dim overlay — only rendered (and visible) on mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => {
            onSidebarOpenChange(false);
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`app-sidebar${sidebarOpen ? ' sidebar-open' : ''}`}
        style={{
          background: 'rgba(255,255,255,0.50)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          borderRight: '1px solid rgba(255,255,255,0.42)',
          boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.28)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Close button — visible only on mobile */}
        <button
          className="sidebar-mobile-close"
          onClick={() => {
            onSidebarOpenChange(false);
          }}
          aria-label="Close menu"
        >
          <X size={14} strokeWidth={2} />
        </button>

        <div style={{ padding: '20px 18px 16px' }}>
          <Logo size={30} />
        </div>

        <div style={{ padding: '2px 10px', flex: 1 }}>
          <SidebarNav sections={sections} activeScreen={activeScreen} onSelect={handleNav} />
        </div>

        {footer !== undefined && (
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.38)' }}>{footer}</div>
        )}
      </aside>

      {/* Right panel */}
      <div className="app-right">
        {/* Mobile top bar */}
        <header className="app-topbar">
          <button
            onClick={() => {
              onSidebarOpenChange(true);
            }}
            aria-label="Open menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'rgba(255,255,255,0.35)',
              border: '1px solid rgba(200,185,225,0.35)',
              color: color.textSecondary,
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <Menu size={18} strokeWidth={1.5} />
          </button>
          <Logo size={22} />
        </header>

        {/* Desktop sidebar toggle row */}
        <div className="sidebar-toggle-row">
          <button
            className="sidebar-toggle-btn"
            onClick={() => {
              onSidebarOpenChange(!sidebarOpen);
            }}
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {sidebarOpen ? (
              <ChevronsLeft size={14} strokeWidth={2} />
            ) : (
              <ChevronsRight size={14} strokeWidth={2} />
            )}
          </button>
        </div>

        {/* Scrollable content */}
        <main className="app-main">
          <div className="app-content-inner">{children}</div>
        </main>
      </div>

      {dock}
    </div>
  );
}
