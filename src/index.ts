/**
 * The MeoWeo shared surface: design tokens, generic UI, and browser primitives used by every tool
 * suite. Nothing here may know about a specific media type – no audio, no PDF.
 *
 * The stylesheet is a separate entry point: `import 'meoweo-shared/styles.css'`.
 */

// Design tokens
export { color, glass, primaryButton, font, primaryAlpha, dangerAlpha, inkAlpha } from './tokens';

// Layout and navigation
export { AppShell } from './components/app_shell';
export { SidebarNav } from './components/sidebar_nav';
export type { NavItem, NavSection } from './components/sidebar_nav';
export { ScreenHeader } from './components/screen_header';
export { Logo } from './components/logo';

// Surfaces
export { GlassCard } from './components/glass_card';
export { MenuSurface } from './components/menu_surface';
export { ConfirmModal } from './components/confirm_modal';
export type { ConfirmTone } from './components/confirm_modal';

// Controls
export { PrimaryButton } from './components/primary_button';
export { GlassButton } from './components/glass_button';
export { GlassInput } from './components/glass_input';
export { IconBtn } from './components/icon_button';
export { GlassDropdown } from './components/glass_dropdown';
export type { DropdownOption } from './components/glass_dropdown';
export { ChoiceChips } from './components/choice_chips';
export type { ChipOption } from './components/choice_chips';
export { ToggleRow } from './components/toggle_row';
export { SliderRow } from './components/slider_row';
export { VerticalSlider } from './components/vertical_slider';
export { ScrollRow } from './components/scroll_row';

// Feedback
export { Badge } from './components/badge';
export { ErrorText } from './components/error_text';
export { Spinner } from './components/spinner';
export { ProgressBar } from './components/progress_bar';

// Files
export { Dropzone } from './components/dropzone';

// Hooks
export { useDismiss } from './components/use_dismiss';
export { useElementWidth } from './components/use_element_width';
export { usePointerDrag } from './components/use_pointer_drag';
export type { PointerDrag } from './components/use_pointer_drag';
export { useMediaQuery, useIsMobile } from './lib/use_media_query';

// Pure helpers
export { clamp } from './lib/clamp';
export { downloadFile, downloadBlob } from './lib/download';
export { fractionAt } from './lib/pointer';
export { anchorTo, ASSUMED_MENU_HEIGHT } from './lib/popover_position';
export type { AnchorRect, Viewport, PopoverPosition } from './lib/popover_position';
export { fileDropReducer, IDLE_FILE_DROP } from './lib/file_drop';
export type { FileDropState, FileDropEvent } from './lib/file_drop';
export type { SliderConfig } from './lib/slider_config';
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
} from './lib/format';
