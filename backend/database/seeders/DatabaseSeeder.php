<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\PsychologistProfile;
use App\Models\Schedule;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\CounselingSession;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Admin
        User::create([
            'name' => 'Super Admin Neyla',
            'email' => 'admin@neyla.id',
            'phone' => '08111111111',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // 2. Create Psychologist
        $psy = User::create([
            'name' => 'Dr. Stevano, M.Psi',
            'email' => 'psikolog@neyla.id',
            'phone' => '08222222222',
            'password' => Hash::make('password'),
            'role' => 'psychologist',
        ]);

        PsychologistProfile::create([
            'user_id' => $psy->id,
            'bio' => 'Spesialis kecemasan dan pengembangan diri dengan pengalaman lebih dari 10 tahun.',
            'specialization' => 'Anxiety & Self-Growth',
            'license_no' => 'SIP-12345-2026',
            'price_per_session' => 150000,
            'is_verified' => true,
        ]);

        // Create Schedules for Psychologist
        $days = [1, 3, 5]; // Mon, Wed, Fri
        foreach ($days as $day) {
            Schedule::create([
                'psychologist_id' => $psy->id,
                'day_of_week' => $day,
                'start_time' => '09:00:00',
                'end_time' => '12:00:00',
            ]);
        }

        // 3. Create Patient
        $patient = User::create([
            'name' => 'Budi Pasien',
            'email' => 'pasien@neyla.id',
            'phone' => '08333333333',
            'password' => Hash::make('password'),
            'role' => 'patient',
        ]);

        // 4. Create Sample Bookings
        
        // Booking 1: Pending Payment (Patient needs to upload proof)
        Booking::create([
            'patient_id' => $patient->id,
            'psychologist_id' => $psy->id,
            'date' => now()->addDays(2),
            'status' => 'confirmed', // Confirmed by WA, waiting payment
        ]);

        // Booking 2: Pending Verification (Admin needs to verify)
        $booking2 = Booking::create([
            'patient_id' => $patient->id,
            'psychologist_id' => $psy->id,
            'date' => now()->addDays(1),
            'status' => 'confirmed',
        ]);

        Payment::create([
            'booking_id' => $booking2->id,
            'amount' => 150000,
            'proof_image_path' => 'payment_proofs/dummy.jpg', // Placeholder
            'status' => 'pending',
        ]);

        // Booking 3: Paid & Active Session (Ready for Chat)
        $booking3 = Booking::create([
            'patient_id' => $patient->id,
            'psychologist_id' => $psy->id,
            'date' => now(),
            'status' => 'paid',
        ]);

        Payment::create([
            'booking_id' => $booking3->id,
            'amount' => 150000,
            'proof_image_path' => 'payment_proofs/dummy.jpg',
            'status' => 'verified',
            'verified_at' => now(),
        ]);

        $session = CounselingSession::create([
            'booking_id' => $booking3->id,
            'status' => 'active',
            'started_at' => now(),
        ]);

        // Add dummy messages
        $session->messages()->create([
            'sender_id' => $psy->id,
            'content' => 'Halo Budi, selamat datang di sesi konseling hari ini. Apa yang ingin Anda ceritakan?',
        ]);

        $session->messages()->create([
            'sender_id' => $patient->id,
            'content' => 'Halo Dokter, saya merasa sangat cemas belakangan ini karena pekerjaan.',
        ]);
    }
}
