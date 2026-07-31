# meoweo-shared

Design tokens, generic UI, and browser primitives shared by the MeoWeo tool suites
([meoweo-audio](https://github.com/MeoWeo-Project/meoweo-audio),
[meoweo-pdf](https://github.com/MeoWeo-Project/meoweo-pdf)).

**Rule: nothing here may know about a specific media type.** No audio, no PDF, no routing, no store.
Every component takes its state as props so each suite keeps its own screen union and its own
navigation. That rule is what lets one design system serve suites that share no workflow.

## Install

Consumed as a git dependency pinned to a tag — there is no registry:

```json
"dependencies": {
  "meoweo-shared": "github:MeoWeo-Project/meoweo-shared#v0.1.0"
}
```

`prepare` builds `dist/` on install, so consumers need no extra step.

## Use

```ts
import { AppShell, GlassCard, SliderRow, usePointerDrag, clamp } from 'meoweo-shared';
import 'meoweo-shared/styles.css'; // required — components rely on these classes
```

**The stylesheet is not optional.** Components reference classes it defines (`.glass-slider`,
`.app-sidebar`, `.screen-header`, `.btn-nav`); without the import they render unstyled and nothing
warns you.

## Contents

| Area | Exports |
|---|---|
| Layout | `AppShell`, `SidebarNav`, `ScreenHeader`, `Logo` |
| Surfaces | `GlassCard`, `MenuSurface`, `ConfirmModal` |
| Controls | `PrimaryButton`, `GlassButton`, `GlassInput`, `IconBtn`, `GlassDropdown`, `ChoiceChips`, `ToggleRow`, `SliderRow`, `VerticalSlider`, `ScrollRow` |
| Feedback | `Badge`, `ErrorText`, `Spinner`, `ProgressBar` |
| Files | `Dropzone` |
| Hooks | `useDismiss`, `useElementWidth`, `usePointerDrag`, `useMediaQuery`, `useIsMobile` |
| Helpers | `clamp`, `downloadFile`/`downloadBlob`, `fractionAt`, `anchorTo`, `fileDropReducer`, `format*` |

### Two components worth knowing

- **`AppShell`** — generic over the screen id (`AppShell<TScreen extends string>`). It owns no store:
  pass `activeScreen`, `onNavigate`, `sidebarOpen`, `onSidebarOpenChange`. The `dock` slot is for a
  suite-specific global overlay (the audio suite puts its volume dock there).
- **`usePointerDrag`** — captures on the *surface*, not the handle, and releases on `pointercancel`.
  **Never key a drag handle by the value it drags:** a handle keyed by its own position is a new
  element on every pointermove and the capture dies with the old one. That bug is why this exists.

## Develop

```sh
npm install
npm run typecheck && npm run lint && npm test
npm run build          # tsc -> dist + copies index.css
```

## Releasing

Consumers pin a tag, so a change is only visible once tagged:

```sh
npm version patch      # or minor / major
git push && git push --tags
```

Then bump the `#vX.Y.Z` ref in each consuming repo.
