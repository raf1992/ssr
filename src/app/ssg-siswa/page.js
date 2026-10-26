import RenderInfo from '@/components/RenderInfo';
import { ambilSiswa } from '@/lib/api';

// SSG: HTML dibuat SEKALI saat "npm run build", lalu dipakai ulang.
export const dynamic = 'force-static';
export const metadata = { title: 'SSG | Daftar Siswa' };

export default async function SsgSiswaPage() {
  const { sumber, data } = await ambilSiswa({ cache: 'force-cache' });
  console.log('[SSG] /ssg-siswa dirender (saat build, atau tiap request di mode dev)');
  return (
    <>
      <h1>SSG | Daftar Siswa</h1>
      <span className="tag ssg">SSG</span>
      <RenderInfo rute="/ssg-siswa" metode="SSG" />
      <p className="muted">
        Jalankan <code>npm run build</code> lalu <code>npm start</code>. Waktu render akan membeku
        karena HTML dibuat sekali saat build. (Di mode dev, halaman tetap dirender ulang.)
      </p>
      <p className="badge">Sumber data: {sumber}</p>
      <ul className="list">
        {data.map((s) => (
          <li key={s.id}>{s.nama} <span className="muted">({s.kelas})</span></li>
        ))}
      </ul>
    </>
  );
}
