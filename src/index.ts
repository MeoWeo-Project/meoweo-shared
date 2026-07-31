/**
 * The MeoWeo shared surface: design tokens, generic UI, and browser primitives used by every tool
 * suite. Nothing here may know about a specific media type – no audio, no PDF.
 *
 * The stylesheet is a separate entry point: `import 'meoweo-shared/styles.css'`.
 */

// Design tokens
export { color, glass, primaryButton, font, primaryAlpha, dangerAlpha, inkAlpha } from './tokens.js';

// Layout and navigation
export { AppShell } from './components/app_shell.js';
export { SidebarNav } from './components/sidebar_nav.js';
export type { NavItem, NavSection } from './components/sidebar_nav.js';
export { ScreenHeader } from './components/screen_header.js';
export { Logo } from './components/logo.js';

// Surfaces
export { GlassCard } from './components/glass_card.js';
export { MenuSurface } from './components/menu_surface.js';
export { ConfirmModal } from './components/confirm_modal.js';
export type { ConfirmTone } from './components/confirm_modal.js';

// Controls
export { PrimaryButton } from './components/primary_button.js';
export { GlassButton } from './components/glass_button.js';
export { GlassInput } from './components/glass_input.js';
export { IconBtn } from './components/icon_button.js';
export { GlassDropdown } from './components/glass_dropdown.js';
export type { DropdownOption } from './components/glass_dropdown.js';
export { ChoiceChips } from './components/choice_chips.js';
export type { ChipOption } from './components/choice_chips.js';
export { ToggleRow } from './components/toggle_row.js';
export { SliderRow } from './components/slider_row.js';
export { VerticalSlider } from './components/vertical_slider.js';
export { ScrollRow } from './components/scroll_row.js';

// Feedback
export { Badge } from './components/badge.js';
export { ErrorText } from './components/error_text.js';
export { Spinner } from './components/spinner.js';
export { ProgressBar } from './components/progress_bar.js';

// Files
export { Dropzone } from './components/dropzone.js';

// Hooks
export { useDismiss } from './components/use_dismiss.js';
export { useElementWidth } from './components/use_element_width.js';
export { usePointerDrag } from './components/use_pointer_drag.js';
export type { PointerDrag } from './components/use_pointer_drag.js';
export { useMediaQuery, useIsMobile } from './lib/use_media_query.js';

// Pure helpers
export { clamp } from './lib/clamp.js';
export { downloadFile, downloadBlob } from './lib/download.js';
export { fractionAt } from './lib/pointer.js';
export { anchorTo, ASSUMED_MENU_HEIGHT } from './lib/popover_position.js';
export type { AnchorRect, Viewport, PopoverPosition } from './lib/popover_position.js';
export { fileDropReducer, IDLE_FILE_DROP } from './lib/file_drop.js';
export type { FileDropState, FileDropEvent } from './lib/file_drop.js';
export type { SliderConfig } from './lib/slider_config.js';
export {
  formatDuration,
  outputFileName,
  formatClockTime,
  formatSpeed,
  formatSemitones,
  formatDecibels,
  formatPercent,
  formatVolume,
  formatLufs,
  formatDbfs,
  formatRatio,
  formatMilliseconds,
  formatSeconds,
  percentOf,
  userInitials,
} from './lib/format.js';
