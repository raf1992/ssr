'use client';
// CSR: data diambil di BROWSER setelah JavaScript berjalan.
// Bandingkan dengan /ssr-siswa menggunakan View Page Source.
import { useEffect, useState } from 'react';

export default function CsrSiswaPage() {
  const [siswa, setSiswa] = useState(null);
  const [error, setError] = useState(null);
  const [waktu, setWaktu] = useState('');

  useEffect(() => {
    console.log('[CSR] useEffect berjalan di BROWSER (lihat console browser)');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((r) => {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then((data) => {
        setSiswa(data);
        setWaktu(new Date().toLocaleTimeString('id-ID'));
      })
      .catch((e) => setError(e.message));
  }, []);

  return (
    <>
      <h1>CSR | Daftar Siswa</h1>
      <span className="tag csr">CSR</span>
      <p className="muted">
        Coba View Page Source (Ctrl+U): daftar siswa tidak ada di HTML awal, karena baru diambil di browser.
      </p>
      {error && <p className="alert error">Gagal mengambil data: {error}</p>}
      {!siswa && !error && <p className="alert">Memuat data di browser...</p>}
      {siswa && (
        <>
          <p className="badge">Data tiba di browser pukul {waktu}</p>
          <ul className="list">
            {siswa.map((s) => (
              <li key={s.id}>{s.name} <span className="muted">({s.email})</span></li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
