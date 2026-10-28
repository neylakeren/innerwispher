<?php

namespace Database\Seeders;

use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reviews = [
            [
                'name' => 'Nadia Putri Rahmadani',
                'role' => 'Fresh Graduate UI/UX - Universitas Indonesia',
                'outcome' => 'Lolos Seleksi FinTech Terkemuka',
                'rating' => 5,
                'review' => 'Laporan diagnostik kariernya sangat akurat memetakan potensi saya ke bidang Product Design. Fitur audit CV ATS-nya ngebantu banget mendeteksi kata kunci industri yang sebelumnya kelewat. 2 minggu setelah revisi CV, langsung dipanggil interview HRD!',
                'avatar_path' => null,
                'is_active' => true,
                'order_index' => 1,
            ],
            [
                'name' => 'Dimas Arya Pratama',
                'role' => 'Teknik Informatika - Institut Teknologi Bandung',
                'outcome' => 'Diterima di Ekosistem Digital Nasional',
                'rating' => 5,
                'review' => 'Skema langganan Rp 35.000 / bulan sangat ramah buat kantong mahasiswa. Simulasi interview metode STAR bener-bener membuka mata cara menyusun jawaban behavioral HRD secara runut, terstruktur, dan meyakinkan.',
                'avatar_path' => null,
                'is_active' => true,
                'order_index' => 2,
            ],
            [
                'name' => 'Clara Anindita',
                'role' => 'Akuntansi & Keuangan - Universitas Airlangga',
                'outcome' => 'Lolos Seleksi Big 4 Assurance',
                'rating' => 5,
                'review' => 'Awalnya bingung kenapa CV saya sering di-reject tanpa kabar. Setelah pakai scanner CV Inner Whisper, baru sadar format tabel dan header saya bikin sistem ATS error. Begitu diperbaiki, score ATS tembus 92% dan lolos seleksi berkas!',
                'avatar_path' => null,
                'is_active' => true,
                'order_index' => 3,
            ],
            [
                'name' => 'Fajar Hidayat',
                'role' => 'Teknik Industri - Universitas Gadjah Mada',
                'outcome' => 'Diterima MT FMCG Multinasional',
                'rating' => 5,
                'review' => 'Analisis SWOT dan radar karier 4 dimensinya komprehensif banget. Nggak cuma ngasih tahu minat, tapi juga blind spot yang harus diperbaiki sebelum masuk ke tahap user interview. Rekomendasi wajib untuk lulusan baru!',
                'avatar_path' => null,
                'is_active' => true,
                'order_index' => 4,
            ],
            [
                'name' => 'Siti Sarah Maulida',
                'role' => 'Ilmu Komunikasi - Universitas Padjadjaran',
                'outcome' => 'Creative Agency Intern to Full-Time',
                'rating' => 5,
                'review' => 'Transfernya praktis via QRIS, BCA, SeaBank, GoPay, dan ShopeePay. Verifikasi struk oleh admin super cepat langsung kebuka semua fitur PRO. Downloadable PDF laporannya rapi dan bisa disimpan selamanya.',
                'avatar_path' => null,
                'is_active' => true,
                'order_index' => 5,
            ],
            [
                'name' => 'Reza Kurniawan',
                'role' => 'Career Switcher - Manajemen Bisnis',
                'outcome' => 'Junior Data Analyst di Retail Modern',
                'rating' => 5,
                'review' => 'Sebagai lulusan non-IT yang ingin banting setir ke data analyst, tes minat bakatnya memberi kepastian bahwa logika analitis saya kuat. Roadmap dan modul portofolionya terstruktur serta mudah dieksekusi secara mandiri.',
                'avatar_path' => null,
                'is_active' => true,
                'order_index' => 6,
            ],
        ];

        foreach ($reviews as $rev) {
            Review::updateOrCreate(
                ['name' => $rev['name']],
                $rev
            );
        }
    }
}
