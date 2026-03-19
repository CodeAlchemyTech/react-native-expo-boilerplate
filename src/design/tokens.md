# Design Tokens

Design tokens are defined in two places:
1. `src/theme/` — TypeScript values for use in JS code
2. `tailwind.config.js` — Tailwind class names for use in JSX

Always update both when adding a new token.

## Color Tokens

| Token | Light | Dark | Usage |
|---|---|---|---|
| `primary-600` | `#2563eb` | `#3b82f6` | Main CTA buttons, links |
| `secondary-600` | `#7c3aed` | `#8b5cf6` | Secondary actions |
| `surface` | `#ffffff` | `#1e293b` | Card backgrounds |
| `muted` | `#6b7280` | `#9ca3af` | Secondary text |
| `danger` | `#ef4444` | `#f87171` | Errors, destructive |
| `success` | `#22c55e` | `#4ade80` | Confirmations |
| `warning` | `#f59e0b` | `#fbbf24` | Cautions |

## Border Radius Tokens

| Token | Value | Usage |
|---|---|---|
| `rounded-button` | `8px` | All buttons |
| `rounded-card` | `12px` | Cards |
| `rounded-input` | `8px` | Input fields |
| `rounded-pill` | `9999px` | Badges, tags |

## Overriding Tokens Per App

When whitelabeling, update `tailwind.config.js` → `theme.extend.colors.primary` to the new brand's palette. All components using `text-primary-*` and `bg-primary-*` will update automatically.
