import type { LucideIcon } from 'lucide-react';
import type { ReactElement } from 'react';

import { Badge } from './badge.js';
import { color, font } from '../tokens.js';

/**
 * One sidebar entry. Generic over the screen identifier so each suite keeps its own screen union
 * and this component stays ignorant of which tools exist.
 */
export type NavItem<TScreen extends string> = {
  screen: TScreen;
  label: string;
  Icon: LucideIcon;
  badge?: string;
};

export type NavSection<TScreen extends string> = {
  label: string;
  items: NavItem<TScreen>[];
};

function SectionLabel({ text }: { text: string }): ReactElement {
  return (
    <p
      style={{
        fontSize: 10,
        fontWeight: 700,
        color: 'rgba(130,100,170,0.55)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        padding: '8px 10px 7px',
        margin: 0,
      }}
    >
      {text}
    </p>
  );
}

function NavButton<TScreen extends string>({
  item,
  active,
  onClick,
}: {
  item: NavItem<TScreen>;
  active: boolean;
  onClick: () => void;
}): ReactElement {
  const { Icon, label, badge } = item;
  return (
    <button
      onClick={onClick}
      className="btn-nav"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        padding: '8px 10px',
        borderRadius: 8,
        background: active ? 'rgba(175,16,85,0.08)' : 'transparent',
        color: active ? color.primary : color.textSecondary,
        border: 'none',
        fontFamily: font,
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        cursor: 'pointer',
        textAlign: 'left',
        marginBottom: 2,
        transition: 'background 0.15s, color 0.15s',
      }}
    >
      <Icon size={15} strokeWidth={1.5} />
      <span style={{ flex: 1 }}>{label}</span>
      {badge !== undefined && <Badge size="sm">{badge}</Badge>}
    </button>
  );
}

/**
 * The sidebar's navigation list: labelled sections of tool buttons.
 *
 * @param sections - Ordered sections to render.
 * @param activeScreen - The screen currently shown, highlighted.
 * @param onSelect - Called with the screen the user picked.
 * @returns The navigation list.
 */
export function SidebarNav<TScreen extends string>({
  sections,
  activeScreen,
  onSelect,
}: {
  sections: NavSection<TScreen>[];
  activeScreen: TScreen;
  onSelect: (screen: TScreen) => void;
}): ReactElement {
  return (
    <>
      {sections.map((section) => (
        <div key={section.label}>
          <SectionLabel text={section.label} />
          {section.items.map((item) => (
            <NavButton
              key={item.screen}
              item={item}
              active={activeScreen === item.screen}
              onClick={() => {
                onSelect(item.screen);
              }}
            />
          ))}
        </div>
      ))}
    </>
  );
}
