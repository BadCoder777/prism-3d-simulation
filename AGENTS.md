# AGENTS.md

## Project Overview

Prism 3D Simulation — interactive web-based 3D rigid-body rotation visualizer for the Tennis Racket Theorem (GYPT). Upload gyroscope CSV data, replay rotation on a 3D prism, compare against numerical Euler equation solvers.

## Commands

```bash
# Development server (http://localhost:5173)
bun dev

# Type-check + production build
bun run build

# Preview production build
bun run preview

# Lint
bun run lint
```

- **Package manager**: bun (also supports npm/yarn)
- **Testing**: No test framework is configured. There are no test files.

## Tech Stack

| Category | Technology |
|---|---|
| Language | TypeScript 5.9 |
| UI | React 19 + Tailwind CSS 3 |
| 3D | Three.js + @react-three/fiber + @react-three/drei |
| Charts | uPlot (react-uplot) |
| State | Jotai (atoms) |
| CSV parsing | PapaParse |
| Build | Vite 7 + @vitejs/plugin-react-swc |
| Icons | Lucide React |

## Architecture

```
src/
  main.tsx              # Entry point, mounts <App>
  App.tsx               # Root layout: 3D viewport (left) + sidebar (right) + charts (bottom)
  index.css             # Tailwind directives + Gruvbox dark theme + utility classes
  components/           # React components (PrismScene, PrismObject, Chart, CompareChart,
                        #   ControlPanel, FileMenu, FileUploader, InputData)
  providers/            # AnimationProvider (React context for AnimationMixer)
  state/state.ts        # All Jotai atoms + localStorage persistence
  types/                # TypeScript type definitions
  utils/
    converters/         # Data transformation (CSV->quaternion keyframes, CSV->uPlot data)
    physics-impl/       # Numerical solvers — forward Euler (eulerSolver.ts) and RK4 (rk4Solver.ts)
    tools/              # solve.ts (orchestration), addSource.ts/getData.ts (localStorage read/write)
```

### State Management

All global state is in `src/state/state.ts` as Jotai atoms. Many atoms sync to localStorage on write and hydrate from localStorage on init:

| Atom | Purpose |
|---|---|
| `currentPlayingFile` | Key of the active dataset in localStorage |
| `keyList` | List of available dataset keys |
| `isPlaying` | Playback running/paused |
| `speed` | Playback speed multiplier |
| `simTime` | Current simulation time position |
| `animationDuration` | Total animation duration |
| `chartArguments` | Computed chart data from solver |
| `compareArguments` | User-entered model parameters (a,b,c,m,wx,wy,wz,dt,time) |
| `isCompareChartOpen` | Toggle model comparison chart visibility |
| `solverMethod` | EULER or RK_4 |
| `isOpenDropZone` | File upload dropzone open/closed |
| `isComparePopupOpen` | Model parameter popup open/closed |

### Data Flow

1. User uploads CSV via `FileUploader` → parsed by PapaParse → stored in localStorage via `addSource.ts`
2. `PrismScene` reads `currentPlayingFile` → fetches data via `getData.ts` → converts to Three.js `QuaternionKeyframeTrack` via `wAngleConverter.ts` → drives `AnimationMixer` on the prism mesh
3. `Chart` component reads CSV data → converts to uPlot format via `dataForChartConverter.ts`
4. User enters physical params in `FileMenu` popup → `solve.ts` dispatches to Euler or RK4 solver → stores result in `chartArguments` atom → `CompareChart` plots the theoretical curve

### Numerical Solvers

Located in `src/utils/physics-impl/`. Both solve Euler's equations for torque-free rotation:
- `eulerSolver.ts` — Forward Euler method
- `rk4Solver.ts` — Runge-Kutta 4th order (default)
- Moment of inertia computed in `calcIMoments.ts` from rectangular prism dimensions

## Conventions

- **Styling**: Gruvbox dark theme palette defined in `src/constants/colors.ts` and `src/index.css`. Use Tailwind utility classes. Custom reusable classes: `.tech-panel`, `.tech-input`, `.comfortable-transition`.
- **TypeScript**: App code (`tsconfig.app.json`) has `strict: false` with `@ts-ignore` comments used where needed. Vite config (`tsconfig.node.json`) is strict.
- **File naming**: PascalCase for React components, camelCase for utilities. `.tsx` for files with JSX, `.ts` otherwise.
- **Imports**: Use `verbatimModuleSyntax` (type imports must use `import type`).
- **Module system**: ESM (`"type": "module"` in package.json).
- **Base path**: Vite configured with `base: './'` for relative asset URLs in production builds.
- **No routing**: Single-page app, no React Router. UI state toggles panels.

## LocalStorage Keys

Reserved localStorage keys (non-dataset entries):

| Key | Type | Purpose |
|---|---|---|
| `compare_args` | JSON | Model parameter form values |
| `chart_args` | JSON | Computed solver output |
| `is_compare_chart_open` | `"true"/"false"` | Compare chart toggle |
| `solver_method` | `"EULER"\|"RK_4"` | Selected solver method |
| `current_playing_file` | string | Active dataset key |

All other localStorage keys containing a `data` property are treated as datasets.
