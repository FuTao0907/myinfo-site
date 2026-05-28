# Next.js 16 Project Standards — Core

> **Version**: 1.0 | **Updated**: 2026-05-15 | **Node**: >=20.9 | **Package Manager**: Yarn

---

## 1. Tech Stack

| Item            | Requirement                      |
| --------------- | -------------------------------- |
| Next.js         | ^16.0.0                          |
| React           | ^19.0.0                          |
| Node.js         | >=22.0.0 (LTS)                   |
| TypeScript      | >=5.1.0                          |
| Package Manager | yarn >=1.22.0                    |
| Language        | TypeScript (Strict Mode)         |
| Bundler         | Turbopack (default, zero-config) |

**Lock File**: `yarn.lock` must be committed.  
**Engine Enforcement**: `package.json` must include `engines` field with `node >=22.0.0` and `yarn >=1.22.0`.

**Note**: Next.js 16 makes Turbopack the default bundler. No `--turbopack` flag needed. Use `next build --webpack` only if custom webpack config is required.

---

## 2. Project Structure (App Router)

```
src/
├── app/                    # App Router — all routes live here
│   ├── (marketing)/        # Route group (no URL segment)
│   ├── (dashboard)/        # Route group
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── error.tsx
│   │   └── layout.tsx
│   ├── api/                # Route handlers (API endpoints)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page (/)
│   ├── loading.tsx         # Global loading UI
│   ├── error.tsx           # Global error boundary
│   └── not-found.tsx       # Global 404
├── components/
│   ├── ui/                 # Primitive UI (Button, Modal, Input)
│   ├── features/           # Domain-specific features
│   │   ├── auth/
│   │   ├── billing/
│   │   └── users/
│   └── layouts/            # Layout wrappers
├── lib/
│   ├── db/                 # Database queries & Prisma client
│   │   ├── prisma.ts       # Singleton Prisma instance
│   │   └── queries/
│   ├── auth/               # Auth config (next-auth v5)
│   ├── api/                # API client functions
│   ├── helpers/            # Helper utilities
│   └── constants/          # Constants
├── hooks/                  # Custom React hooks
├── types/                  # Global TypeScript types
├── styles/                 # Global styles
├── public/                 # Static assets
└── middleware.ts           # Route middleware (src root)
```

**Rules**:

- App Router only — Pages Router is fully deprecated. Delete `/pages` if migrating.
- Route groups `(folder)` for logical grouping without URL segments.
- Components organized by purpose: `ui/` (primitive), `features/` (domain), `layouts/` (wrappers).
- Database calls extracted to `lib/db/queries/` — never inline in page files.
- Each route self-contained: `page.tsx`, `loading.tsx`, `error.tsx`.
- Parallel route slots MUST include `default.js` — missing files cause build failure.

---

## 3. Server vs Client Components

**Server Components (default)**:

- Render on server, zero JS sent to client.
- Can access DB, filesystem, server-only env vars.
- No `useState`, `useEffect`, browser APIs.
- Fetch data directly with `await` — no `useEffect` data fetching.

**Client Components** (add `"use client"` at top):

- Required for: browser APIs (`window`, `document`, `localStorage`), React hooks, event handlers (`onClick`, `onChange`), real-time subscriptions.

**Boundary Rule**: Keep top of tree on server. Push Client Components to leaves where interactivity is needed. Never wrap entire tree in a single Client Component shell.

**Data Passing**: Pass server data as props to Client Components. Never pass non-serializable values (class instances, functions except Server Actions, Promises).

---

## 4. Code Style

| Tool        | Purpose           | Config          |
| ----------- | ----------------- | --------------- |
| ESLint      | Linting           | `.eslintrc.cjs` |
| Prettier    | Formatting        | `.prettierrc`   |
| Husky       | Git hooks         | `.husky/`       |
| lint-staged | Pre-commit checks | `package.json`  |

**Prettier**: `semi: false`, `singleQuote: true`, `tabWidth: 2`, `trailingComma: es5`, `endOfLine: lf`, `printWidth: 100`.

**ESLint Key Rules**:

- `no-console`: Warn (only `console.error` allowed)
- `@typescript-eslint/no-explicit-any`: **Error** (use `unknown`)
- `react-hooks/rules-of-hooks`: **Error**
- `react-hooks/exhaustive-deps`: Warn

**Note**: Next.js 16 removes `next lint` command. Use ESLint CLI directly or Biome. `next build` no longer runs linting automatically.

---

## 5. Data Fetching & Server Actions

**Server Components**: Fetch directly in component. No `useEffect`, no loading spinners, no API routes. Use `await` with DB queries.

**Server Actions**: Use for form submissions, mutations. Colocate with component. No separate API route needed. Mark with `"use server"`.

**API Routes**: Only for public-facing endpoints consumed by external clients.

**Caching (Next.js 16 changes)**:

- Next.js 16 uses **explicit Cache Components** programming model.
- `experimental.ppr` and `experimental_ppr` are removed. Use `experimental.cacheComponents` instead.
- `revalidateTag()` now requires `cacheLife` parameter: `revalidateTag('posts', 'max')`.
- Use `updateTag()` in Server Actions for immediate cache invalidation.
- Default caching: fetch and routes are NOT cached by default. Use explicit directives.

---

## 6. State Management

| Scenario        | Recommended       | Forbidden                  |
| --------------- | ----------------- | -------------------------- |
| Global UI state | Zustand / Jotai   | Redux without Toolkit      |
| Server state    | React Query / SWR | Manual `useEffect` caching |
| Form state      | React Hook Form   | Manual `onChange` binding  |
| Cross-component | Zustand           | Global variables           |

**Note**: Never use Zustand/Jotai for server state. Use React Query for DB data. Use Zustand only for client UI state (modal open, selected tab).

---

## 7. API & Network Layer

**Route Handlers** (App Router API): All API endpoints in `app/api/[route]/route.ts`. Use `NextResponse` for responses.

**API Constants**: All endpoint paths in `lib/constants/api.ts` with `as const` assertion.

---

## 8. Prohibited APIs & Practices

| Forbidden                                     | Reason                      | Alternative                               |
| --------------------------------------------- | --------------------------- | ----------------------------------------- |
| `eval()`, `new Function()`                    | Injection risk              | `JSON.parse()`, template literals         |
| `document.write()`, `innerHTML`               | XSS                         | React rendering; DOMPurify if unavoidable |
| Direct DB calls in page files                 | Untestable, non-reusable    | Extract to `lib/db/queries/`              |
| `any` type (no comment)                       | Loses type safety           | `unknown` + type guards                   |
| Modifying props directly                      | Anti-pattern                | State lift or callbacks                   |
| Mutating state directly                       | Breaks reactivity           | Immutable updates                         |
| `getServerSideProps` / `getStaticProps`       | Pages Router legacy         | Server Components / `unstable_cache`      |
| Wrapping entire tree in `"use client"`        | Negates Server Components   | Push to leaves only                       |
| Non-serializable props to Client Components   | Runtime errors              | Plan data contracts                       |
| `serverRuntimeConfig` / `publicRuntimeConfig` | Removed in Next.js 16       | Environment variables (`.env`)            |
| `next lint` command                           | Removed in Next.js 16       | ESLint CLI or Biome                       |
| AMP support                                   | Removed in Next.js 16       | None — feature retired                    |
| Sync `params`, `cookies()`, `headers()`       | Must be async in Next.js 16 | `await params`, `await cookies()`         |

---

## 9. Git Standards

**Branch Naming**: `feature/<scope>-<desc>`, `fix/<scope>-<desc>`, `hotfix/<desc>`, `refactor/<scope>-<desc>`, `docs/<desc>`.

**Commit Format** (Conventional Commits): `<type>(<scope>): <subject>` with optional body and footer.

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

**Workflow**:

1. No direct push to `main` — all via PR
2. Minimum 1 approval for Code Review
3. `lint-staged` runs `eslint --fix` + `prettier --write` pre-commit
4. CI: `lint` → `type-check` → `test` → `build` — any failure blocks merge

---

## 10. Testing Standards

| Item      | Standard                                                        |
| --------- | --------------------------------------------------------------- |
| Framework | Vitest + React Testing Library                                  |
| Coverage  | Business logic >=60%; Utils/Hooks >=80%                         |
| Required  | All `lib/` utilities, all `hooks/`, core page interactions      |
| Forbidden | Meaningless coverage-only tests; testing implementation details |

**Test files**: Co-located with source: `formatDate.ts` + `formatDate.test.ts`

---

## 11. Environment Variables

All env values use `NEXT_PUBLIC_` prefix for client-exposed vars. Server-only vars have no prefix.

**Rules**:

- `NEXT_PUBLIC_*` — only for non-sensitive config (analytics IDs, public URLs). Embedded in client bundle.
- Never prefix secrets with `NEXT_PUBLIC_`.
- Validate env vars at startup using `@t3-oss/env-nextjs` (Zod validation).
- Document required vars in `.env.example` (committed).
- **Removed**: `serverRuntimeConfig` and `publicRuntimeConfig` — use `.env` files instead.

---

## 12. Performance Rules

- **Code Splitting**: Automatic via App Router. Use `dynamic()` for heavy components.
- **Streaming**: Use `loading.tsx` + Suspense boundaries for progressive loading.
- **Cache Components**: Use `experimental.cacheComponents` for explicit component-level caching.
- **Edge Runtime**: Add `export const runtime = "edge"` for latency-sensitive routes (<1ms cold start).
- **React Cache**: Wrap expensive fetches with `cache()` for request-level deduplication.
- **Images**: Use Next.js `<Image>` component with WebP/AVIF. Lazy load below-fold.
- **Bundle**: Monitor with Turbopack built-in analyzer; alert if initial JS >200KB.
- **Turbopack Caching**: Enable filesystem cache for faster restarts via `experimental.turbopackFileSystemCacheForDev: true` in `next.config.ts`.

---

## 13. Quick Reference Checklist

| Check             | Pass Criteria          |
| ----------------- | ---------------------- |
| `yarn lint`       | Zero errors            |
| `yarn type-check` | Zero TS errors         |
| `yarn test`       | All pass, coverage met |
| `yarn build`      | Build succeeds         |
| Commit message    | Conventional Commits   |
| PR review         | >=1 approval           |

> **Enforcement**: ESLint + Prettier + Husky + CI/CD. Violations blocked at commit/PR level.
