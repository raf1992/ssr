import Link from 'next/link';
import RenderInfo from '@/components/RenderInfo';
import { ambilSiswa } from '@/lib/api';
import { tunda } from '@/lib/utils';

// (1) Paksa halaman ini dirender pada SETIAP request (SSR).
// Catatan: halaman ini juga memakai searchParams, yang sendirinya sudah membuat halaman dinamis.
// Untuk percobaan menghapus force-dynamic, gunakan halaman /ssr-waktu.
export const dynamic = 'force-dynamic';

export const metadata = { title: 'SSR | Daftar Siswa' };

// (2) Komponen async: berjalan di SERVER, bukan di browser.
export default async function SsrSiswaPage({ searchParams }) {
  // searchParams adalah Promise di Next.js 15+, jadi harus di-await.
  const { q, lambat } = await searchParams;

  // (3) Log ini muncul di TERMINAL, bukan di console browser.
  console.log('[SSR] /ssr-siswa dirender di SERVER | q =', q ?? '(kosong)');

  // Simulasi API lambat: buka /ssr-siswa?lambat=1 untuk melihat loading.js
  if (lambat) await tunda(2500);

  // (4) Data diambil di server (cache: 'no-store' ada di dalam ambilSiswa).
  const { sumber, data } = await ambilSiswa();

  // (5) Pencarian memakai ?q= dari URL (hanya diketahui saat request).
  const kata = (q ?? '').toLowerCase().trim();
  const tampil = kata ? data.filter((s) => s.nama.toLowerCase().includes(kata)) : data;

  return (
    <>
      <h1>SSR | Daftar Siswa</h1>
      <span className="tag">SSR</span>
      <RenderInfo rute="/ssr-siswa" metode="SSR" />
      <p className="badge">Sumber data: {sumber}</p>

      <form action="/ssr-siswa" className="cari">
        <input type="text" name="q" placeholder="Cari nama siswa..." defaultValue={q ?? ''} />
        <button type="submit">Cari</button>
      </form>

      {tampil.length === 0 ? (
        <p className="alert">Tidak ada siswa yang cocok dengan &quot;{q}&quot;.</p>
      ) : (
        <ul className="list">
          {tampil.map((s) => (
            <li key={s.id}>
              <Link href={`/ssr-siswa/${s.id}`}>{s.nama}</Link>{' '}
              <span className="muted">({s.kelas}, {s.kota})</span>
            </li>
          ))}
        </ul>
      )}
      <p className="muted">
        Tekan Ctrl+U: nama-nama siswa sudah ada di HTML karena server yang membuatnya.
      </p>
    </>
  );
}
