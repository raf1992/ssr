import RenderInfo from '@/components/RenderInfo';

// HALAMAN PERCOBAAN "Change -> Observe".
// Halaman ini sengaja dibuat sangat sederhana: tidak memakai cookies, headers, atau searchParams.
// Karena itu, TANPA baris di bawah ini, Next.js akan membuatnya statis saat "npm run build".
export const dynamic = 'force-dynamic';

export const metadata = { title: 'SSR | Jam Server' };

export default function SsrWaktuPage() {
  console.log('[SSR] /ssr-waktu dirender di SERVER');
  return (
    <>
      <h1>SSR | Jam Server</h1>
      <span className="tag">SSR</span>
      <RenderInfo rute="/ssr-waktu" metode="SSR" />
      <div className="alert">
        <strong>Percobaan:</strong> hapus baris <code>export const dynamic = &apos;force-dynamic&apos;;</code> pada
        file <code>src/app/ssr-waktu/page.js</code>, lalu jalankan <code>npm run build</code> dan{' '}
        <code>npm start</code>. Refresh halaman ini beberapa kali. Apa yang terjadi pada waktu render? Mengapa?
      </div>
    </>
  );
}
