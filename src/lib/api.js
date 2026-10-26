// Sumber data: API publik JSONPlaceholder (anggap "users" = daftar siswa).
// Jika internet mati, otomatis memakai data cadangan lokal supaya demo tetap berjalan.

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const CADANGAN = [
  { id: 1, nama: 'Aisyah Putri', email: 'aisyah@sekolah.sch.id', kota: 'Bogor', kelas: 'XI RPL 1' },
  { id: 2, nama: 'Bagas Pratama', email: 'bagas@sekolah.sch.id', kota: 'Depok', kelas: 'XI RPL 1' },
  { id: 3, nama: 'Citra Lestari', email: 'citra@sekolah.sch.id', kota: 'Bogor', kelas: 'XI RPL 2' },
  { id: 4, nama: 'Dimas Saputra', email: 'dimas@sekolah.sch.id', kota: 'Cibinong', kelas: 'XI RPL 2' },
  { id: 5, nama: 'Eka Wulandari', email: 'eka@sekolah.sch.id', kota: 'Bogor', kelas: 'XI TKJ 1' },
  { id: 6, nama: 'Fajar Nugroho', email: 'fajar@sekolah.sch.id', kota: 'Depok', kelas: 'XI TKJ 1' },
];

function petakan(u) {
  return {
    id: u.id,
    nama: u.name,
    email: u.email,
    kota: u.address?.city ?? '-',
    kelas: u.company?.name ?? '-',
  };
}

// opsi.cache: 'no-store' (default, selalu ambil baru) atau 'force-cache' (disimpan).
export async function ambilSiswa(opsi = {}) {
  try {
    const res = await fetch(API_URL, {
      cache: opsi.cache ?? 'no-store',
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    return { sumber: 'jsonplaceholder.typicode.com', data: data.map(petakan) };
  } catch (err) {
    console.log('[api] gagal mengambil data, memakai data cadangan:', err.message);
    return { sumber: 'data cadangan lokal (offline)', data: CADANGAN };
  }
}

export async function ambilSiswaById(id) {
  const nomor = Number(id);
  if (!Number.isInteger(nomor) || nomor < 1) return null;
  try {
    const res = await fetch(`${API_URL}/${nomor}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    if (!data || !data.id) return null;
    return { ...petakan(data), sumber: 'jsonplaceholder.typicode.com' };
  } catch (err) {
    console.log('[api] gagal mengambil data, memakai data cadangan:', err.message);
    const c = CADANGAN.find((s) => s.id === nomor);
    return c ? { ...c, sumber: 'data cadangan lokal (offline)' } : null;
  }
}
