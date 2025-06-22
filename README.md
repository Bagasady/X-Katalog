katalog# X-KATALOG - PANDUAN DEPLOYMENT KE WEB HOSTING CPANEL

## DESKRIPSI PROJECT

X-Katalog adalah aplikasi katalog digital untuk Toko XPTN yang dibangun dengan:

- Frontend: React + TypeScript + Vite
- Styling: Tailwind CSS
- Database: Supabase
- Icons: Lucide React
- Routing: React Router DOM

## PERSYARATAN HOSTING

1. Web hosting yang mendukung Node.js (minimal versi 18.x)
2. cPanel dengan fitur Node.js App
3. SSL Certificate (disarankan)
4. Domain/subdomain yang sudah dikonfigurasi

## LANGKAH-LANGKAH DEPLOYMENT

### PERSIAPAN SEBELUM UPLOAD

1. **Build Project untuk Production**

   - Buka terminal di folder project
   - Jalankan perintah: npm run build
   - Folder 'dist' akan terbuat berisi file production

2. **Siapkan File Environment**
   - Buat file .env.production di root project
   - Isi dengan konfigurasi Supabase:
     ```
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

### UPLOAD KE CPANEL

3. **Login ke cPanel**

   - Masuk ke cPanel hosting Anda
   - Cari menu "File Manager"

4. **Upload File Project**

   - Buka File Manager
   - Navigasi ke folder public_html (atau subdomain folder)
   - Upload semua file dari folder 'dist' hasil build
   - Extract jika dalam bentuk zip

5. **Setup Node.js Application**
   - Di cPanel, cari menu "Node.js App" atau "Node.js Selector"
   - Klik "Create Application"
   - Isi form:
     - Node.js Version: Pilih 18.x atau terbaru
     - Application Mode: Production
     - Application Root: public_html (atau folder domain Anda)
     - Application URL: domain Anda
     - Application Startup File: server.js (akan dibuat)

### KONFIGURASI SERVER

6. **Buat File Server.js**
   - Di File Manager, buat file baru: server.js
   - Isi dengan kode berikut:

```javascript
const express = require("express");
const path = require("path");
const app = express();

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, "dist")));

// Handle React Router (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

7. **Buat Package.json untuk Server**
   - Buat file package.json di root:

```json
{
  "name": "x-katalog-server",
  "version": "1.0.0",
  "description": "X-Katalog Production Server",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

### INSTALASI DEPENDENCIES

8. **Install Dependencies Server**
   - Di Node.js App, klik "Run NPM Install"
   - Atau gunakan Terminal di cPanel:
     ```
     cd public_html
     npm install
     ```

### KONFIGURASI SUPABASE

9. **Setup Environment Variables**

   - Di Node.js App settings, tambahkan Environment Variables:
     - VITE_SUPABASE_URL: URL project Supabase Anda
     - VITE_SUPABASE_ANON_KEY: Anon key dari Supabase

10. **Konfigurasi CORS di Supabase**
    - Login ke Supabase Dashboard
    - Masuk ke Settings > API
    - Di bagian "CORS origins", tambahkan domain hosting Anda
    - Contoh: https://yourdomain.com

### FINALISASI

11. **Start Application**

    - Di Node.js App, klik "Restart"
    - Atau gunakan tombol "Start" jika belum running

12. **Test Website**
    - Buka domain Anda di browser
    - Test semua fitur:
      - Loading halaman utama
      - Pencarian produk
      - Filter kategori
      - Detail produk
      - Admin login (admin/admin123)

### TROUBLESHOOTING UMUM

**Problem: Website tidak load**

- Cek apakah Node.js app sudah running
- Periksa error logs di cPanel
- Pastikan file server.js ada dan benar

**Problem: Database tidak connect**

- Cek environment variables Supabase
- Pastikan CORS sudah dikonfigurasi
- Verify Supabase URL dan keys

**Problem: Routing tidak bekerja**

- Pastikan server.js handle semua routes dengan '\*'
- Cek apakah React Router DOM sudah ter-build dengan benar

**Problem: CSS/Assets tidak load**

- Pastikan semua file dari folder 'dist' sudah terupload
- Cek path assets di index.html

### MAINTENANCE

**Update Aplikasi:**

1. Build ulang project: npm run build
2. Upload file baru dari folder 'dist'
3. Restart Node.js application

**Backup:**

- Backup folder public_html secara berkala
- Export data dari Supabase dashboard

**Monitoring:**

- Cek logs aplikasi di cPanel secara berkala
- Monitor usage database di Supabase

### OPTIMASI PERFORMANCE

1. **Enable Gzip Compression**

   - Tambahkan di .htaccess:
     ```
     <IfModule mod_deflate.c>
       AddOutputFilterByType DEFLATE text/plain
       AddOutputFilterByType DEFLATE text/html
       AddOutputFilterByType DEFLATE text/xml
       AddOutputFilterByType DEFLATE text/css
       AddOutputFilterByType DEFLATE application/xml
       AddOutputFilterByType DEFLATE application/xhtml+xml
       AddOutputFilterByType DEFLATE application/rss+xml
       AddOutputFilterByType DEFLATE application/javascript
       AddOutputFilterByType DEFLATE application/x-javascript
     </IfModule>
     ```

2. **Cache Headers**
   - Tambahkan cache headers untuk assets:
     ```
     <IfModule mod_expires.c>
       ExpiresActive on
       ExpiresByType text/css "access plus 1 year"
       ExpiresByType application/javascript "access plus 1 year"
       ExpiresByType image/png "access plus 1 year"
       ExpiresByType image/jpg "access plus 1 year"
       ExpiresByType image/jpeg "access plus 1 year"
     </IfModule>
     ```

### KEAMANAN

1. **Protect Admin Routes**

   - Pastikan credentials admin yang kuat
   - Monitor akses admin secara berkala

2. **Environment Variables**

   - Jangan expose Supabase service key
   - Gunakan hanya anon key untuk frontend

3. **HTTPS**
   - Pastikan SSL certificate aktif
   - Redirect HTTP ke HTTPS

### CONTACT SUPPORT

Jika mengalami masalah:

1. Cek dokumentasi hosting provider
2. Contact support hosting untuk masalah Node.js
3. Cek Supabase documentation untuk masalah database

### STRUKTUR FILE FINAL DI HOSTING

```
public_html/
├── server.js
├── package.json
├── node_modules/
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
├── index.html
└── vite.svg
```

### CHECKLIST DEPLOYMENT

□ Build project dengan npm run build
□ Upload semua file dari folder dist
□ Buat server.js dan package.json
□ Setup Node.js App di cPanel
□ Install dependencies (npm install)
□ Konfigurasi environment variables
□ Setup CORS di Supabase
□ Start Node.js application
□ Test semua fitur website
□ Setup SSL certificate
□ Konfigurasi .htaccess untuk optimasi

=== SELAMAT! X-KATALOG SUDAH ONLINE ===

Website Anda sekarang dapat diakses di domain yang sudah dikonfigurasi.
Pastikan untuk melakukan testing menyeluruh sebelum go-live.
