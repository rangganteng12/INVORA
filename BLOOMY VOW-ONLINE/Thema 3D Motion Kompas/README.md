# Wedding Passport — VS Code Project

Proyek ini adalah versi terpisah dari `wedding-passport.html` yang kamu berikan.

## Struktur

- `index.html` — struktur dan konten halaman undangan.
- `style.css` — desain, layout, animasi, dan background.
- `script.js` — data acara, interaksi, galeri, countdown, dan musik.
- `assets/passport-emblem.webp` — ornamen/watermark paspor yang sebelumnya tertanam dalam HTML.
- `assets/passport-security-pattern.webp` — pola keamanan paspor yang sebelumnya tertanam dalam CSS.
- `assets/map-light.svg` dan `assets/map-dark.svg` — pola peta dekoratif yang sebelumnya tertanam dalam CSS.

## Menjalankan di VS Code

1. Ekstrak ZIP.
2. Buka folder `Wedding-Passport-VSCode` dari VS Code (**File → Open Folder**).
3. Buka `index.html`.
4. Jalankan dengan ekstensi **Live Server** (klik kanan `index.html` → **Open with Live Server**).

Google Fonts memakai internet untuk memuat font. Gambar yang sebelumnya tertanam pada HTML sudah diekstrak ke folder `assets`.

## Mengubah konten

Di awal `script.js`, cari objek `C`. Di situlah data utama acara, nama pasangan, tanggal, lokasi, cerita, dan data lain ditetapkan. Foto galeri dapat diatur melalui data foto pada objek tersebut.

File asli `wedding-passport(1).html` tidak diubah.
