# Demo SSR Next.js (Versi Lengkap) | Kelompok 2

Proyek demo untuk presentasi **Server-Side Rendering (SSR)**. Dipakai oleh Demo Leader.

## Menjalankan

```bash
npm install
npm run dev        # buka http://localhost:3000
```

Mode production (wajib untuk bagian Change dan Observe pada demo):

```bash
npm run build
npm start
```

## Halaman

| Rute | Metode | Yang dibuktikan |
|------|--------|-----------------|
| `/ssr-siswa` | SSR | Data diambil dan HTML dibuat di server pada setiap request. Coba `?q=` dan `?lambat=1` |
| `/ssr-siswa/[id]` | SSR | Rute dinamis, `await params`, `notFound()`, `generateMetadata` |
| `/ssr-profil` | SSR | `cookies()` dan `headers()`: isi tergantung pengunjung |
| `/ssr-waktu` | SSR | Halaman percobaan paling sederhana untuk Change dan Observe |
| `/csr-siswa` | CSR | Pembanding: data diambil di browser |
| `/ssg-siswa` | SSG | Pembanding: HTML dibuat sekali saat build |

## Skenario demo (Show, Explain, Change, Observe)

1. **Show**: buka `/ssr-siswa`, refresh beberapa kali. "Render ke-N" dan waktu berubah.
2. **Explain**: Ctrl+U (data ada di HTML). Lihat terminal (log `[SSR]`). Matikan JavaScript di DevTools: halaman tetap tampil. Bandingkan dengan `/csr-siswa`.
3. **Change**: di `src/app/ssr-waktu/page.js`, hapus baris `export const dynamic = 'force-dynamic';`. Hentikan dev server, lalu jalankan `npm run build` dan `npm start`.
4. **Observe**: pada output build, rute `/ssr-waktu` menjadi `○ (Static)`. Buka `/ssr-waktu` dan refresh berkali-kali: waktu render membeku (HTML dibuat sekali saat build). Kembalikan baris tadi, build ulang: rute kembali `ƒ (Dynamic)` dan waktu berubah pada setiap refresh.

Mengapa tidak memakai `/ssr-siswa` untuk percobaan ini? Karena halaman itu memakai `searchParams`, yang membuatnya otomatis dinamis walaupun `force-dynamic` dihapus. Halaman `/ssr-waktu` sengaja tidak memakai API dinamis apa pun.

Catatan: mode `npm run dev` selalu merender ulang halaman, sehingga perbedaan statis dan dinamis hanya terlihat jelas pada mode production.

## Tanpa internet

Jika API publik tidak dapat diakses, `src/lib/api.js` otomatis memakai data cadangan lokal. Badge "Sumber data" menunjukkan sumber yang dipakai.

## Persyaratan

Node.js 20 LTS atau lebih baru. Proyek ditulis untuk Next.js 15 (App Router). Di Next.js 15+, `params` dan `searchParams` adalah Promise dan harus di-await.
