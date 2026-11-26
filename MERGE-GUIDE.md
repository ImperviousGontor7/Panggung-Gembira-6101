# Merge guide — Impervious Generation

## Hasil perbandingan arsip sumber

`Archive.zip` dan `Archive(1).zip` memiliki file proyek yang sama persis, kecuali `Archive(1).zip` menambahkan `.github/workflows/deploy-pages.yml`. Arsip hasil merge menggunakan `Archive(1).zip` sebagai baseline dan mempertahankan workflow tersebut.

## Perbaikan integrasi yang diterapkan

1. Vite tetap berjalan pada port `5174`; proxy `/api` dan `/socket.io` sekarang mengarah ke backend `localhost:5001`.
2. Axios memakai `/api` sebagai fallback, bukan URL absolut `localhost:5001`, supaya request lokal melewati Vite proxy. `VITE_API_URL` tetap dapat meng-override ini untuk production.
3. Socket.IO memakai `VITE_SOCKET_URL`, lalu origin dari `VITE_API_URL`, kemudian origin halaman saat ini sebagai fallback. Ini cocok dengan proxy lokal.
4. Default `CLIENT_URL` dan `CORS_ORIGIN` backend diselaraskan ke `http://localhost:5174`.
5. `README.md`, `.env.example`, dan panduan merge ditambahkan/diperbarui.
6. `.env`, `client/.env`, `.prisma` hasil generate, `.package-lock.json`, `node_modules`, `.DS_Store`, dan metadata `__MACOSX` tidak disertakan. `package-lock.json` resmi tetap dipertahankan.

## Cara merge ke repository yang sudah ada

1. Buat backup atau commit kondisi repository saat ini.
2. Extract ZIP hasil merge ke **root** folder repository, lalu izinkan file project ditimpa.
3. Jangan menimpa `.env` lokal. File `.env` sengaja tidak ada dalam ZIP karena dapat berisi kredensial.
4. Hapus file `client/.env` lama bila masih ada. Pada arsip sumber, file itu menetapkan `VITE_API_URL=http://localhost:5001/api`, yang melewati proxy Vite dan dapat memicu CORS.
5. Pastikan `.env` root memiliki nilai lokal ini (pertahankan `DATABASE_URL` milikmu):

   ```env
   PORT=5001
   CLIENT_URL=http://localhost:5174
   CORS_ORIGIN=http://localhost:5174
   API_URL=http://localhost:5001/api
   ```

   Gunakan `JWT_ACCESS_SECRET` dan `JWT_REFRESH_SECRET` terpisah; variabel lama `JWT_SECRET` bukan nama yang dibaca oleh `server/config/env.js`.

6. Dari root repository, jalankan:

   ```bash
   npm ci --include=dev
   npm run prisma:generate
   ```

7. Pastikan PostgreSQL berjalan dan `DATABASE_URL` benar. Untuk database lokal yang masih kosong, jalankan `npm run prisma:push`.
8. Jalankan `npm run dev`. Frontend: `http://localhost:5174`; backend: `http://localhost:5001`.

## Catatan pengujian

Dependency installation pada lingkungan pembuatan ZIP tidak selesai dalam batas waktu yang tersedia. Karena itu, `npm run build`, ESLint, dan tes browser belum dapat dinyatakan lulus. Pemeriksaan file, import relatif, konfigurasi port, struktur ZIP, serta sintaks file JavaScript backend dijalankan terpisah; lihat `VALIDATION-REPORT.md`.
