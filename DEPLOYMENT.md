# Impervious Generation — deployment

## 1. Frontend on GitHub Pages

This repository contains a React/Vite frontend and an Express backend. GitHub Pages can publish the built frontend only; it does not run Express, PostgreSQL, Redis, or Socket.IO.

1. Commit and push the files in this repair to the `main` branch.
2. Open **Repository → Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Under **Custom domain**, enter `www.imperviousgontor7.my.id` and save.
5. Open **Actions** and confirm that **Deploy Impervious frontend to GitHub Pages** completes successfully.

The workflow builds `client/` through the existing root `npm run build` script. The generated site is published from `dist/client/`. It also copies `index.html` to `404.html` so direct links such as `/about`, `/memories`, `/login`, and `/register` can load the React application.

### DNS for the `www` hostname

At the provider that manages `imperviousgontor7.my.id`, set:

| Type | Host / Name | Target |
|---|---|---|
| CNAME | `www` | `imperviousgontor7.github.io` |

The GitHub Pages **Custom domain** field must also be set to `www.imperviousgontor7.my.id`. A CNAME file in the repository alone does not configure the custom domain when publishing through a GitHub Actions workflow.

If you also want the bare domain `imperviousgontor7.my.id` to work, configure it in GitHub Pages as appropriate and add GitHub's four apex A records at your DNS provider:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

Do not delete other DNS records until you have checked whether they are used by email or other services.

## 2. Frontend environment variables

The public homepage content in the current source is bundled locally. Authentication/API-driven features need the Express backend to be deployed separately.

When the backend is live, open **Repository → Settings → Secrets and variables → Actions → Variables** and add:

- `VITE_API_URL` = the full API base URL, including `/api`, for example `https://api.example.com/api`.
- `VITE_SOCKET_URL` = optional; the backend origin, for example `https://api.example.com`. If omitted, the frontend derives it from `VITE_API_URL`.

These values are inserted at build time. After changing them, rerun the Pages workflow. Do not put private keys, database credentials, or JWT secrets in `VITE_*` variables; frontend variables are public in the generated JavaScript.

If `VITE_API_URL` is left blank, the frontend uses `/api` on the website's own domain. That keeps local development working through the Vite proxy, but production API requests will not work until an API server is available at that same origin or `VITE_API_URL` is set to the real backend URL.

## 3. Backend hosting (separate from GitHub Pages)

Deploy the Node.js service from this repository to a Node-capable host or VPS. Use Node.js 22 or later, install with `npm ci`, and start with `npm run start:prod`. The host must provide a PostgreSQL database and the service's environment variables.

At minimum, configure:

- `NODE_ENV=production`
- `DATABASE_URL` = the PostgreSQL connection string
- `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` = separate, long, random secrets
- `CLIENT_URL=https://www.imperviousgontor7.my.id`
- `CORS_ORIGIN=https://www.imperviousgontor7.my.id,https://imperviousgontor7.my.id`
- `CLIENT_URLS=https://imperviousgontor7.my.id` (only needed if the bare domain is also used)
- `API_URL` = the public backend API base URL, including `/api`

The service uses `PORT` supplied by the host. Configure the frontend's `VITE_API_URL` to that backend's public `/api` URL. `VITE_SOCKET_URL` should be the backend origin (without `/api`) if you want to set it explicitly.

Do not assume local disk uploads will persist on a host with an ephemeral filesystem. Before relying on avatar/gallery uploads in production, configure durable object storage supported by the application or a persistent volume.

## 4. Local development

1. Copy `.env.example` to `.env` and fill in a local PostgreSQL connection string and development secrets.
2. Copy `client/.env.example` to `client/.env`. Its `/api` value uses the Vite same-origin proxy, which forwards `/api` and `/socket.io` to Express on port `5001`.
3. Run `npm ci`, then `npm run dev`.

The Vite dev server runs on port `5174`; the backend defaults to port `5001`.
