// Fungsi bantu kecil. Dipakai di Server Component.

// Waktu sekarang (zona WIB), untuk membuktikan KAPAN halaman dirender.
export function waktuSekarang() {
  return new Date().toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    dateStyle: 'medium',
    timeStyle: 'medium',
  });
}

// Menghitung sudah berapa kali sebuah rute dirender sejak server menyala.
// globalThis dipakai supaya hitungan tidak hilang saat modul dimuat ulang (mode dev).
export function hitungRender(kunci) {
  globalThis.__hitunganRender ??= {};
  globalThis.__hitunganRender[kunci] = (globalThis.__hitunganRender[kunci] ?? 0) + 1;
  return globalThis.__hitunganRender[kunci];
}

// Menunda eksekusi (untuk mensimulasikan API yang lambat).
export function tunda(ms) {
  return new Promise((selesai) => setTimeout(selesai, ms));
}
