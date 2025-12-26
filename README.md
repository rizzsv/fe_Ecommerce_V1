# 🛍️ E-Commerce Frontend (Next.js)

Ini adalah project frontend untuk aplikasi e-commerce berbasis Next.js dan TypeScript, dengan fitur lengkap seperti autentikasi, tampilan produk, keranjang belanja, dan checkout.

---

## 🧱 Tech Stack

- ⚙️ **Next.js 14 (App Router)**
- 🛠️ **TypeScript**
- 💨 **Tailwind CSS**
- 🧩 **shadcn/ui**
- 🔁 **TanStack React Query**
- 📡 **Axios**
- 🍪 **js-cookie**

---

## 📁 Struktur Folder

```

project\_ecommerce/
├── app/               # Routing halaman (berbasis App Router)
├── components/        # Komponen UI global (Header, Footer, dsb)
├── constants/         # Nilai tetap (misalnya: site title)
├── features/          # Modularisasi per fitur (auth, product, cart, dsb)
├── hooks/             # Custom React Hooks
├── lib/               # Utils seperti axios, cookies, dsb
├── public/            # File statis (logo, gambar, dll)
├── types/             # Deklarasi tipe global (NextAuth, dsb)
├── middleware.ts      # Middleware untuk proteksi route
├── .env.local         # Variabel lingkungan (environment)
├── README.md          # Dokumentasi proyek ini

```

---

## ⚙️ Instalasi & Setup

### 1. Clone Repo

```bash
git clone https://github.com/[organisasi-atau-username]/[repo].git
cd project_ecommerce
```

### 2. Install Dependensi

```bash
npm install
```

### 3. Konfigurasi Environment

Buat file `.env.local` dan isi:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3001
```

> 💡 Ganti nilai-nilai di atas sesuai kredensial dari Google Cloud Console & NextAuth.

### 4. Jalankan Project

```bash
npm run dev
```

---

## 🔐 Middleware Proteksi

`middleware.ts` digunakan untuk melindungi route tertentu seperti `/dashboard` dari akses tanpa login.

Autentikasi pengguna disimpan dalam cookie bernama `access_token`.

---

## 🚧 Fitur

### ✅ Selesai

- Sign In / Sign Up (via Google OAuth)
- Validasi form (dengan zod)
- Proteksi halaman via middleware
- Fetching API authentication

### 🔄 Sedang/Tahap Selanjutnya

- [x] Integrasi API backend
- [ ] Responsive mobile
- [ ] Halaman dashboard pengguna
- [ ] Katalog produk & kategori
- [ ] Keranjang belanja
- [ ] Wishlist produk
- [ ] Riwayat pemesanan
- [ ] Dashboard Admin

---

## 👥 Tim Pengembang

| Nama          | Peran              |
| ------------- | ------------------ |
| Almas Rizaldi | Frontend Developer |
| Valen         | Backend Developer  |

---

## 📜 Lisensi

Lisensi: **MIT**
