import Link from 'next/link';
import { notFound } from 'next/navigation';
import RenderInfo from '@/components/RenderInfo';
import { ambilSiswaById } from '@/lib/api';

export const dynamic = 'force-dynamic';

// Judul halaman (<title>) juga dibuat di server, bagus untuk SEO dan pratinjau link.
export async function generateMetadata({ params }) {
  const { id } = await params;
  const siswa = await ambilSiswaById(id);
  return { title: siswa ? `Profil ${siswa.nama}` : 'Siswa tidak ditemukan' };
}

export default async function DetailSiswaPage({ params }) {
  // params adalah Promise di Next.js 15+, jadi harus di-await.
  const { id } = await params;
  console.log('[SSR] /ssr-siswa/[id] dirender di SERVER | id =', id);

  const siswa = await ambilSiswaById(id);
  if (!siswa) notFound();

  return (
    <>
      <h1>{siswa.nama}</h1>
      <span className="tag">SSR</span>
      <RenderInfo rute={`/ssr-siswa/${id}`} metode="SSR" />
      <ul>
        <li>ID: {siswa.id}</li>
        <li>Email: {siswa.email}</li>
        <li>Kota: {siswa.kota}</li>
        <li>Kelas: {siswa.kelas}</li>
      </ul>
      <p className="badge">Sumber data: {siswa.sumber}</p>
      <p><Link href="/ssr-siswa">Kembali ke daftar</Link></p>
    </>
  );
}
