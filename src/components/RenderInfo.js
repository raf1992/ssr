// Server Component: kotak bukti. Semua nilai di sini dihitung di SERVER.
import { waktuSekarang, hitungRender } from '@/lib/utils';

export default function RenderInfo({ rute, metode }) {
  const waktu = waktuSekarang();
  const ke = hitungRender(rute);
  return (
    <div className="info">
      <strong>Bukti rendering ({metode})</strong>
      <ul>
        <li>Dirender pada: <code>{waktu}</code></li>
        <li>Render ke-<code>{ke}</code> sejak server menyala</li>
        <li>Dijalankan oleh Node.js <code>{process.version}</code> (browser tidak punya ini)</li>
      </ul>
    </div>
  );
}
