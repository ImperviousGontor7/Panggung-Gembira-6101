# Impervious Generation

Full-stack project for Impervious Generation: React 19 + Vite + Tailwind CSS v4 frontend and Express 5 + Prisma 6 + PostgreSQL backend.

## Prerequisites

- Node.js 22 or later
- npm 10 or later
- PostgreSQL available locally or through a database provider

## First-time setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL`.
2. Copy `client/.env.example` to `client/.env`. The default `/api` URL uses the Vite proxy.
3. Install packages with `npm ci`.
4. Generate Prisma Client (normally run automatically by the package `prepare` script): `npm run prisma:generate`.
5. Apply your existing Prisma migrations, or use `npm run prisma:push` only when you intentionally want Prisma to synchronize the schema directly.
6. Start frontend and backend together: `npm run dev`.

Frontend: `http://localhost:5174`  
Backend: `http://localhost:5001`  
API documentation: `http://localhost:5001/api-docs`

## Relevant media architecture

- `client/src/config/media.js` is the single source of truth for the shared YouTube video ID and embed URL.
- Home renders one persistent YouTube iframe behind the existing cinematic overlays and content carousel.
- All Performance detail routes use the shared embed URL in their main video player. Documentation photographs and recommendation posters remain image elements.
- Application styles are centralized in `client/src/styles/globals.css`.

## Replace-all deployment

This archive contains the complete project tree. Back up your current local `.env` files, replace the project folder with this archive, then restore your environment values into the new `.env` files. Do not publish real database credentials, JWT secrets, or other private values.
