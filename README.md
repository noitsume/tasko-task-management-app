# Tasko – Task Management Web App
## Link Deploy: https://tasko-task-management-app-one.vercel.app/
![image](https://github.com/user-attachments/assets/3c47cd4b-4660-4476-9cf8-033726a8ceca)
![image](https://github.com/user-attachments/assets/87bb6216-2333-41bc-8a97-27b23530ffbe)

---

## Deskripsi
**Tasko** adalah aplikasi manajemen tugas berbasis web yang simpel dan elegan dikembangkan oleh 3 Mahasiswa Mikroskil hanya dalam waktu 1 minggu dan sudah mengikuti prinsip XP(Extereme Programming). Dibangun menggunakan Next.js, React, dan TypeScript, Tasko dirancang untuk membantu para pengguna mengatur dan memantau tugas harian secara efisien tanpa perlu login atau koneksi internet. Semua data disimpan langsung di browser dengan `localStorage`  dan `externalStorage`  jadi pengguna tidak perlu login untuk menggunakan.

---

## Fitur
- CRUD tugas (Create, Read, Update, Delete)
- Based real-time website
- Edit judul, deskripsi, tanggal, waktu, dan status tugas
- Sistem prioritas (Low, Medium, High)
- Status tugas: To-do, In-progress, Done
- Mode terang & gelap
- Dukungan multi-bahasa (Indonesia & Inggris)
- Deteksi zona waktu otomatis
- Tugas otomatis aktif pada jam tertentu
- Tugas harian berulang
- Deadline yang bisa diatur
- Notification Alert
- Export-Import Data Task

---

## Tim & Role

- **Havidz Andrian/231111899** – Lead Developer & UI/UX Master  
- **Howard Farrel Hura/231111644** – UI/UX Designer & Designated Customer  
- **Kevin Luther Kiyosaki Gultom/231111131** – Backend Engineer & Coach

---

## Teknologi Yang Digunakan

- **Frontend:** Next.js 14, React, TypeScript  
- **Styling:** Tailwind CSS, Lucide React Icons  
- **State Management:** React Context API & React Hooks  
- **Penyimpanan Data:** Browser `localStorage`  dan `externalStorage`
- **Notifikasi & Zona Waktu:** Notification API, Intl API  
- **Code Quality:** ESLint, PostCSS  
- **CI/CD & Deployment:** Git, Next.js build tools, Vercel  

##  Praktik XP Yang Diimplementasikan

- **Planning Game**: Menyusun user stories berbasis kebutuhan nyata para pengguna
- **Iteration & Release Planning**: Rilis bertahap berdasarkan prioritas nilai
- **Simple Design**: UI simpel dan modular
- **Small Releases**: Pengembangan fitur per iterasi
- **Manual Testing & UAT**: Validasi skenario nyata
- **Cross-browser Testing**: Kompatibilitas lintas peramban
- **Refactoring**: Optimalisasi kode rutin
- **Pair Programming**: Kolaborasi antar developer
- **Collective Code Ownership**: Tanggung jawab kode secara bersama
- **Continuous Integration**: Git + otomatisasi Next.js
- **40-Hour Week**: Ritme kerja berkelanjutan

---

## User Stories

| No | Epic | User Story | Task |
|----|------|------------|------|
| 1 | Manajemen Tugas Dasar | Sebagai pengguna, saya ingin dapat membuat tugas baru dengan judul, deskripsi, prioritas, dan status agar saya dapat mengorganisir pekerjaan saya. | - Merancang dan membuat komponen UI untuk form tambah tugas.<br>- Mengimplementasikan state management untuk input form.<br>- Membuat fungsi untuk menyimpan data tugas baru ke Local Storage. |
| 2 | Manajemen Tugas Dasar | Sebagai pengguna, saya ingin melihat semua tugas saya dalam bentuk kartu yang informatif agar saya dapat memantau progress pekerjaan. | - Merancang komponen UI "Task Card" yang responsif.<br>- Membuat fungsi untuk mengambil dan menampilkan daftar tugas dari Local Storage.<br>- Mengimplementasikan layout grid untuk menampilkan kartu tugas. |
| 3 | Manajemen Tugas Dasar | Sebagai pengguna, saya ingin dapat mengedit tugas yang sudah ada agar saya dapat memperbarui informasi sesuai kebutuhan. | - Membuat UI (modal/halaman) untuk form edit tugas.<br>- Mengisi form secara otomatis dengan data tugas yang dipilih.<br>- Mengimplementasikan fungsi untuk memperbarui data di Local Storage. |
| 4 | Manajemen Tugas Dasar | Sebagai pengguna, saya ingin dapat menghapus tugas yang tidak diperlukan lagi agar daftar tugas tetap bersih. | - Menambahkan tombol hapus pada setiap kartu tugas.<br>- Membuat fungsi untuk menghapus data tugas dari Local Storage.<br>- Memastikan UI diperbarui secara otomatis setelah penghapusan. |
| 5 | Fitur Lanjutan | Sebagai pengguna, saya ingin dapat memfilter tugas berdasarkan status agar saya dapat fokus pada tugas tertentu. | - Mendesain dan membuat komponen UI untuk tombol filter.<br>- Mengimplementasikan logika state untuk mengelola status filter aktif.<br>- Menyesuaikan tampilan daftar tugas berdasarkan filter yang dipilih. |
| 6 | Fitur Lanjutan | Sebagai pengguna, saya ingin dapat mengubah tema aplikasi agar nyaman digunakan dalam berbagai kondisi pencahayaan. | - Mengimplementasikan sistem tema menggunakan React Context API.<br>- Membuat tombol toggle untuk beralih antara mode gelap dan terang.<br>- Menyimpan preferensi tema pengguna di Local Storage. |
| 7 | Fitur Lanjutan | Sebagai pengguna, saya ingin dapat menggunakan aplikasi dalam bahasa Indonesia atau Inggris agar lebih mudah dipahami. | - Mengatur struktur file terjemahan (JSON) untuk dua bahasa.<br>- Membuat custom hook (useTranslation) untuk mengelola bahasa.<br>- Mengganti teks statis di UI dengan kunci terjemahan. |
| 8 | Fitur Otomatis & Notifikasi | Sebagai pengguna, saya ingin dapat mengatur tugas untuk dimulai secara otomatis pada waktu tertentu. | - Menambahkan input waktu pada form tugas.<br>- Menggunakan setInterval dalam useEffect untuk memeriksa waktu secara berkala.<br>- Mengimplementasikan logika untuk mengubah status tugas saat waktunya tiba. |
| 9 | Fitur Otomatis & Notifikasi | Sebagai pengguna, saya ingin dapat membuat tugas yang berulang setiap hari agar rutinitas harian saya terjaga. | - Menambahkan opsi "tugas harian" pada form.<br>- Membuat logika untuk secara otomatis membuat kembali tugas untuk hari berikutnya setelah selesai.<br>- Mengelola siklus tugas berulang. |
| 10 | Fitur Otomatis & Notifikasi | Sebagai pengguna, saya ingin mendapat notifikasi saat tugas otomatis dimulai agar saya tidak melewatkan jadwal. | - Mengimplementasikan fungsi untuk meminta izin notifikasi browser.<br>- Menggunakan Notification API untuk menampilkan notifikasi.<br>- Mengintegrasikan pemicu notifikasi dengan fitur tugas otomatis. |
| 11 | User Experience | Sebagai pengguna, saya ingin dapat memajukan status tugas dengan long press agar interaksi lebih intuitif. | - Mengimplementasikan deteksi event sentuhan (touch) dan klik mouse.<br>- Menggunakan timer untuk mendeteksi durasi long press.<br>- Memberikan umpan balik visual (progress bar) selama proses long press. |
| 12 | User Experience | Sebagai pengguna, saya ingin aplikasi mendeteksi timezone saya secara otomatis agar waktu yang ditampilkan akurat. | - Menggunakan `Intl.DateTimeFormat().resolvedOptions().timeZone` untuk mendeteksi zona waktu browser.<br>- Menyimpan zona waktu dalam state aplikasi.<br>- Memformat semua tampilan tanggal dan waktu sesuai zona waktu. |

## Log Standup Harian (7 Hari)

| Hari | Progress | Kendala | Solusi |
|------|----------|---------|--------|
| 1 | Setup project & rencana iterasi | Integrasi Tailwind dengan Next.js | Konsultasi dokumentasi resmi |
| 2 | Implementasi fitur CRUD dasar | Validasi form belum optimal | Tambahkan form validation manual |
| 3 | Penambahan fitur status & prioritas | Tombol filter tidak bekerja optimal | Uji state filter dan logic |
| 4 | Implementasi dark/light mode | Warna tidak sinkron antar halaman | Pakai Context API global |
| 6 | Penerapan notifikasi otomatis | Notifikasi tidak muncul di beberapa browser | Tambahkan in-app fallback |
| 6 | Multi-language support & timezone | Key translation tidak terbaca | Refactor struktur file JSON |
| 7 | Implementasi Import/Export | Kurangnya Kefleksibilitasan Penyimpanan Localstorage | Tambahkan Import/Export File agar bisa dijalankan di device mana saja |
| 8 | Refactor akhir & testing | Long press kurang responsive | Tambahkan event touch khusus |

## Deliverables

- ✅ Aplikasi web Tasko yang fungsional dan responsif
- ✅ Dokumentasi lengkap user stories dan log harian
- ✅ Kode modular dengan integrasi ESLint & TypeScript
- ✅ Deployment ke platform **Vercel**
- ✅ Laporan akhir proyek dalam format PDF
- ✅ Video demo proyek Tasko
