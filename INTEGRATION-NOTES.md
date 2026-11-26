# Integrasi fitur Archive(2) ke Archive streaming

File ini menggunakan `Archive.zip` sebagai baseline. Beberapa pola dari `Archive(2).zip` dipindahkan dan diadaptasi agar sesuai dengan katalog penampilan Impervious Generation.

## Fitur yang ditambahkan

1. **Search & Explore**
   - Route `/search` untuk pencarian dari navbar.
   - Route `/explore` untuk membuka katalog secara langsung.
   - Pencarian nama penampilan, judul tampilan, koleksi, kategori, deskripsi, dan tags.
   - Filter koleksi, filter kategori jika metadata kategori tersedia, pengurutan A–Z/Z–A, dan pagination.
   - Data diambil dari `PERFORMANCES`; tidak dibuat katalog duplikat.

2. **System / Error Pages**
   - 404 dengan identitas visual Impervious.
   - Halaman pemberitahuan lisensi belum aktif di `/license-required`.
   - Animasi orbit dan latar grid dari sistem error Archive(2), dengan pengurangan animasi untuk `prefers-reduced-motion`.

## Tidak dipindahkan

- Forum, kalender agenda, panitia, dan halaman berita: konteksnya adalah website profil generasi, bukan platform streaming.
- ContactPage mentah: memuat data kontak contoh dan form yang belum tersambung ke backend.
- FAQ dan Support Center mentah: pada arsip kedua keduanya masih berupa placeholder.
- Gallery pagination mentah: Archive sebelumnya sudah memiliki collection, filter, grid/list, sorting, dan infinite loading; menggantinya tidak memberi keuntungan yang cukup.
- Admin CMS dan API website kedua: tidak diperlukan untuk integrasi fitur streaming ini.

## Catatan data

Pada `PERFORMANCES`, sebagian besar nilai `category` dan `time` masih kosong. Filter kategori otomatis muncul setelah data kategori diisi. Pencarian dan filter koleksi tetap berfungsi sekarang.

`/license-required` saat ini adalah halaman UI. Proteksi akses tetap harus diterapkan di backend sebelum dianggap sebagai sistem lisensi yang aktif.
