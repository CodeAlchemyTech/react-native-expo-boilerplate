# Architecture

## Philosophy

This boilerplate follows three core principles:

1. **Separation of concerns** — UI knows nothing about where data comes from. Services know nothing about UI. State stores hold minimal, normalized data.
2. **Feature-first organization** — Code is grouped by feature (auth, home, paywall), not by type (all hooks in one folder, all components in one folder). This makes features portable and deletable.
3. **Explicit over implicit** — Auth guards are visible in layout files, not hidden in middleware. Environment variables flow through one typed object. Monetization logic lives in dedicated hooks, not scattered across components.

## Layer Descriptions

### `src/app/` — Route Layer
Thin files that compose feature components. They handle navigation, URL params, and screen-level layout only. No business logic lives here.

### `src/features/` — Feature Layer
Self-contained modules. Each feature owns its components, hooks, and types. Features never import from each other — only from the shared layers below.

### `src/components/` — Shared UI Layer
Atomic design: atoms → molecules → organisms.
- **Atoms**: No state, no side effects, fully controlled by props
- **Molecules**: Compose atoms, may have local UI state (e.g., modal open/closed)
- **Organisms**: Screen-level layout wrappers (ScreenContainer, Header)

### `src/hooks/` — Shared Logic Layer
Hooks used across multiple features. Not a dumping ground — a hook goes here only if it's genuinely reusable across 2+ features.

### `src/services/` — Integration Layer
Third-party integrations (API, RevenueCat, AdMob, analytics, storage). All external system calls go through here. Never call Axios or RevenueCat's SDK directly from components.

### `src/store/` — State Layer
Zustand stores for global client state. Three stores:
- `auth.store` — persisted, owns session
- `theme.store` — persisted, owns color scheme preference
- `premium.store` — not persisted, owns entitlements (reverified on launch)

### `src/config/` — Configuration Layer
`env.ts` is the single entry point for all environment variables. `app.config.ts` holds feature flags.

## Query Key Convention

React Query query keys follow a hierarchical pattern:

```
['resource', 'sub-resource', identifier, filters]

Examples:
['user', 'profile']
['home', 'items']
['revenuecat', 'offerings']
['products', productId, { page, limit }]
```

This makes invalidation predictable:
```typescript
// Invalidate all user queries
queryClient.invalidateQueries({ queryKey: ['user'] });
// Invalidate specific profile
queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
```
