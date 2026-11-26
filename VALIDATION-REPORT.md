# Validation report

## Passed checks

- Compared every non-macOS file in both source ZIPs: no changed files; `Archive(1).zip` adds only `.github/workflows/deploy-pages.yml`.
- Verified 150 relative JavaScript/JSX import references; 0 unresolved relative paths after repair.
- Ran `node --check` on JavaScript files under `server/` and `prisma/`; all passed.
- Confirmed `package.json` and the root package-lock manifest have matching dependency and devDependency maps.
- Confirmed `concurrently` is declared in `devDependencies` (`^9.2.5`).
- Verified the local port/proxy configuration: Vite `5174`, Express `5001`, Axios `/api`, and matching CORS/client defaults.
- Confirmed the distributable contains no `.env`, `client/.env`, `.DS_Store`, `__MACOSX`, root `.prisma` generated client, or hidden `.package-lock.json`.

## Not verified in this environment

- `npm ci --ignore-scripts --no-audit --no-fund` did not complete within the 120-second execution limit, so dependencies were not available for a full build check.
- Therefore `npm run build`, ESLint, Vitest, Prisma CLI validation, and browser-level interaction tests have not been marked as passed.
- Database connectivity and real account/license behavior require the user's PostgreSQL environment and were not tested.

## Recommended post-merge verification

```bash
npm ci --include=dev
npm run prisma:generate
npm run prisma:validate
npm run build
npm run lint
npm run test:unit
```

For a new empty local PostgreSQL database, run `npm run prisma:push` before starting backend features that query database tables.
