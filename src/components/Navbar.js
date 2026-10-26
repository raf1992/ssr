import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="nav">
      <Link href="/" className="brand">Demo SSR</Link>
      <Link href="/ssr-siswa">SSR Siswa</Link>
      <Link href="/ssr-profil">SSR Profil</Link>
      <Link href="/ssr-waktu">Jam Server</Link>
      <Link href="/csr-siswa">CSR Siswa</Link>
      <Link href="/ssg-siswa">SSG Siswa</Link>
    </nav>
  );
}
