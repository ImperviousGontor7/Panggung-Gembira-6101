# Changelog — merged project

## Source comparison

- `Archive.zip` and `Archive(1).zip` contain the same source and project files.
- `Archive(1).zip` adds `.github/workflows/deploy-pages.yml`; that workflow is retained in this merged archive.

## Integration and repairs

- Preserved the existing Impervious Generation layout, Home, About, Memories, Authentication, and Performance Detail structure.
- Preserved Search/Explore, collection/category filtering, pagination, the custom 404 page, and the License Required UI already present in the supplied project.
- Standardized local development around frontend `localhost:5174` and backend `localhost:5001`.
- Changed the Axios default API URL to same-origin `/api`, with Vite proxying to Express. Explicit `VITE_API_URL` remains supported for a separately hosted API.
- Aligned Socket.IO fallback URLs with the frontend origin and local Vite proxy.
- Added per-performance iframe embed support. The previous single sample YouTube URL is no longer assigned to every performance; each performance must provide its own `embedUrl` or `src`.
- Fixed the Home repository import to use the existing Prisma config module.
- Reconciled the Redis helper with the existing `ioredis` dependency.
- Repaired the Socket.IO initializer to use the actual notification socket module rather than missing agenda/forum modules.
- Added `README.md`, `.env.example`, `client/.env.example`, `MERGE-GUIDE.md`, and this changelog.
- Removed local environment files and platform-generated metadata from the distributable archive.
