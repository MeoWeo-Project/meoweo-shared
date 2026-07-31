import { useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

import { MenuSurface } from './menu_surface.js';
import { color, font } from '../tokens.js';

export type DropdownOption = {
  value: string;
  label: string;
};

type GlassDropdownProps = {
  value: string;
  options: readonly DropdownOption[];
  onChange: (value: string) => void;
  /** What the control is, for a screen reader – the visible label is optional. */
  ariaLabel: string;
  label?: string;
  disabled?: boolean;
};

/**
 * A dropdown wearing the app's glass.
 *
 * A native `<select>` cannot be styled past its closed state: the list it opens is drawn by the
 * operating system, so it arrives as a grey Windows menu in the middle of a pink glass app. This
 * is a real listbox instead, and it presents itself through the same MenuSurface as the user menu
 * – a popover on a desktop, a bottom sheet on a phone.
 */
export function GlassDropdown({
  value,
  options,
  onChange,
  ariaLabel,
  label,
  disabled = false,
}: GlassDropdownProps): React.ReactElement {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const selected = options.find((option) => option.value === value);

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      {label !== undefined && (
        <span style={{ fontSize: 13, fontWeight: 500, color: color.textSecondary, fontFamily: font }}>
          {label}
        </span>
      )}
      <button
        ref={triggerRef}
        type="button"
        className="dropdown-trigger"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => {
          setOpen((isOpen) => !isOpen);
        }}
      >
        <span>{selected?.label ?? value}</span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`dropdown-chevron${open ? ' dropdown-chevron--open' : ''}`}
        />
      </button>

      <MenuSurface
        open={open}
        anchorRef={triggerRef}
        role="listbox"
        onClose={() => {
          setOpen(false);
        }}
      >
        <div style={{ padding: 6 }}>
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                className="menu-item"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <span style={{ flex: 1, textAlign: 'left' }}>{option.label}</span>
                {isSelected && <Check size={14} strokeWidth={2} color={color.primary} />}
              </button>
            );
          })}
        </div>
      </MenuSurface>
    </div>
  );
}
