import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>Demo Server-Side Rendering (SSR)</h1>
      <p>
        Proyek ini menunjukkan bagaimana Next.js membuat HTML di <strong>server</strong>.
        Buka tiap halaman, lalu buktikan sendiri dengan <em>View Page Source</em> (Ctrl+U).
      </p>
      <div className="grid">
        <Link href="/ssr-siswa" className="card">
          <span className="tag">SSR</span>
          <h3>Daftar Siswa</h3>
          <p className="muted">Data diambil dan HTML dibuat di server pada setiap request. Coba juga pencarian ?q=</p>
        </Link>
        <Link href="/ssr-profil" className="card">
          <span className="tag">SSR</span>
          <h3>Profil (cookie dan header)</h3>
          <p className="muted">Isi halaman bergantung pada pengunjung, jadi hanya bisa dibuat saat request.</p>
        </Link>
        <Link href="/ssr-waktu" className="card">
          <span className="tag">SSR</span>
          <h3>Jam Server (percobaan)</h3>
          <p className="muted">Halaman paling sederhana untuk percobaan: hapus force-dynamic, build, lalu amati waktunya.</p>
        </Link>
        <Link href="/csr-siswa" className="card">
          <span className="tag csr">CSR</span>
          <h3>Daftar Siswa (pembanding)</h3>
          <p className="muted">Data diambil di browser setelah JavaScript berjalan.</p>
        </Link>
        <Link href="/ssg-siswa" className="card">
          <span className="tag ssg">SSG</span>
          <h3>Daftar Siswa (pembanding)</h3>
          <p className="muted">HTML dibuat sekali saat build. Bandingkan waktu renderingnya.</p>
        </Link>
      </div>
      <h2>Cara membuktikan</h2>
      <ol>
        <li>Ctrl+U (View Page Source): apakah data siswa sudah ada di HTML?</li>
        <li>Lihat terminal tempat <code>npm run dev</code> berjalan: pesan log muncul di sana, bukan di browser.</li>
        <li>DevTools: matikan JavaScript, lalu muat ulang halaman.</li>
        <li>Jalankan <code>npm run build</code> dan perhatikan simbol tiap rute.</li>
      </ol>
    </>
  );
}
