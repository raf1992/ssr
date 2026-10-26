// Ditampilkan sementara server menyelesaikan render halaman (streaming).
// Coba buka /ssr-siswa?lambat=1 lewat klik link dari halaman lain.
export default function Loading() {
  return <p className="alert">Server sedang menyiapkan daftar siswa...</p>;
}
