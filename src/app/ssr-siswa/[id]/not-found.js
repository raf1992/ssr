import Link from 'next/link';

export default function SiswaTidakDitemukan() {
  return (
    <>
      <h1>Siswa tidak ditemukan</h1>
      <p className="alert error">Tidak ada siswa dengan ID tersebut.</p>
      <Link href="/ssr-siswa">Kembali ke daftar siswa</Link>
    </>
  );
}
