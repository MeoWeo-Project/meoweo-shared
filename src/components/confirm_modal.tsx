import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Spinner } from './spinner';
import { color, dangerAlpha, font, primaryAlpha, primaryButton } from '../tokens';

import type { LucideIcon } from 'lucide-react';

/** A destructive action is red; anything else wears the brand. */
export type ConfirmTone = 'danger' | 'primary';

type ConfirmModalProps = {
  icon: LucideIcon;
  title: string;
  description: React.ReactNode;
  /** Anything the caller needs between the description and the buttons, e.g. a typed confirmation. */
  children?: React.ReactNode;
  confirmLabel: string;
  tone?: ConfirmTone;
  confirmDisabled?: boolean;
  confirming?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const TITLE_ID = 'confirm-modal-title';

/**
 * The one confirmation dialog: portal, backdrop, Escape, focus semantics and glass panel.
 *
 * It was written three times over (log out, delete account, delete voice), and the copy that
 * hand-rolled its own `position: fixed` backdrop also quietly lost the dialog role and the
 * backdrop-dismiss. One implementation, so a11y cannot rot in one corner of the app.
 */
export function ConfirmModal({
  icon: Icon,
  title,
  description,
  children,
  confirmLabel,
  tone = 'danger',
  confirmDisabled = false,
  confirming = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps): React.ReactElement {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        onCancel();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('keydown', handleKeyDown); };
  }, [onCancel]);

  const accent = tone === 'danger' ? color.danger : color.primary;
  const tint = tone === 'danger' ? dangerAlpha(0.08) : primaryAlpha(0.08);
  const disabled = confirmDisabled || confirming;

  return createPortal(
    <div
      className="modal-backdrop"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="modal-panel" role="dialog" aria-modal="true" aria-labelledby={TITLE_ID}>
        <div className="modal-head">
          <div className="modal-icon" style={{ background: tint }}>
            <Icon size={22} color={accent} strokeWidth={1.5} />
          </div>
          <h2 id={TITLE_ID} className="modal-title">
            {title}
          </h2>
          <p className="modal-text">{description}</p>
        </div>

        {children}

        <div className="modal-actions">
          <button type="button" onClick={onCancel} className="btn-glass modal-btn">
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={disabled}
            className="modal-btn"
            style={{
              background: disabled
                ? 'rgba(200,180,220,0.4)'
                : tone === 'danger'
                  ? color.danger
                  : primaryButton.background,
              border: 'none',
              color: disabled ? color.textMuted : '#fff',
              fontWeight: 600,
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontFamily: font,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            {confirming && <Spinner size={13} color="#fff" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
