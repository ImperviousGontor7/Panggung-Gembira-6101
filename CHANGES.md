# Implementation notes — replace-all project

## Media and Performance pages

- Added `client/src/config/media.js` as the single source of truth for the YouTube video ID, watch URL, embed URL, and accessible title.
- Home uses one YouTube iframe behind the existing cinematic overlays. The infinite content carousel, slide timing, transitions, buttons, typography, and layout classes are retained.
- All 23 Performance detail routes use the shared embed URL in the main player. The player prefers a direct video file when a `video.src` is provided, then falls back to the shared YouTube iframe.
- Photo documentation, recommendation posters, and responsible-person photos remain images because they represent photographs, not video players.

## Stylesheets

- All application CSS is consolidated into `client/src/styles/globals.css`.
- Error/system-page styles were moved into the global stylesheet and the feature-specific CSS import/file was removed.
- The Performance iframe uses the existing 16:7.2 detail-player frame, with a full-frame responsive iframe rule.

## Local API and environment consistency

- Local defaults are aligned: frontend `5174`, backend `5001`.
- Vite proxies `/api` and `/socket.io` to Express at `localhost:5001`; the client default API base URL is `/api` to avoid unnecessary cross-origin requests during local development.
- Backend CORS defaults include both `localhost` and `127.0.0.1` on the configured local frontend ports.
- Replaced the undeclared `redis` package import with the already-declared `ioredis` dependency.
- Corrected the Home repository Prisma import and removed stale imports to socket handlers that are not present in this source archive; the available notification socket handler remains registered.

## Clean replace-all package

- Included `.env.example` and `client/.env.example`; actual environment files are excluded.
- Removed the platform-specific generated Prisma client that contained a macOS ARM64 binary. Run `npm ci` / `npm run prisma:generate` on the destination machine to generate the appropriate client.
- Excluded `node_modules`, generated build output, `.DS_Store`, `__MACOSX`, and npm's internal hidden lock cache.

## Verification

- 74 JavaScript/JSX source files parsed with zero TypeScript transpile/parser diagnostics.
- All relative imports in client and server source resolve to an existing file.
- All 23 Performance card slugs match the 23 Performance detail data slugs.
- PostCSS parsed `globals.css` successfully.
- A full Vite production build was not completed in this environment because `npm ci` timed out while attempting dependency installation. Run `npm ci` and `npm run build` locally before deployment.
