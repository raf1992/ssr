import { cookies, headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import RenderInfo from '@/components/RenderInfo';

export const metadata = { title: 'SSR | Profil' };

// Server Action: berjalan di server. Menyimpan nama pengunjung ke cookie.
async function simpanNama(formData) {
  'use server';
  const nama = String(formData.get('nama') ?? '').trim().slice(0, 30);
  const jar = await cookies();
  if (nama) jar.set('nama', nama, { path: '/', maxAge: 60 * 60 * 24 * 7 });
  else jar.delete('nama');
  revalidatePath('/ssr-profil');
}

export default async function SsrProfilPage() {
  // cookies() dan headers() hanya diketahui saat REQUEST,
  // sehingga Next.js otomatis merender halaman ini secara dinamis (SSR).
  const jar = await cookies();
  const h = await headers();
  const nama = jar.get('nama')?.value;
  const userAgent = h.get('user-agent') ?? '(tidak ada)';
  const bahasa = h.get('accept-language') ?? '(tidak ada)';
  console.log('[SSR] /ssr-profil dirender di SERVER untuk pengunjung:', nama ?? '(anonim)');

  return (
    <>
      <h1>SSR | Profil Pengunjung</h1>
      <span className="tag">SSR</span>
      <RenderInfo rute="/ssr-profil" metode="SSR" />
      <h2>{nama ? `Halo, ${nama}!` : 'Halo, pengunjung anonim!'}</h2>
      <form action={simpanNama} className="nama">
        <input type="text" name="nama" placeholder="Tulis namamu" defaultValue={nama ?? ''} />
        <button type="submit">Simpan ke cookie</button>
      </form>
      <div className="alert">
        Nama di atas dibaca dari <strong>cookie</strong> milik browser Anda. Server membacanya
        saat request lalu menaruhnya di HTML. Halaman statis (SSG) tidak mungkin melakukan ini,
        karena isinya berbeda untuk setiap pengunjung.
      </div>
      <h3>Informasi dari header request</h3>
      <ul>
        <li>User-Agent: <code>{userAgent}</code></li>
        <li>Accept-Language: <code>{bahasa}</code></li>
      </ul>
    </>
  );
}
