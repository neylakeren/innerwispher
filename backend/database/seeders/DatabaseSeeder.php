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
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Ensure dummy payment proof asset exists in public storage
        if (!Storage::disk('public')->exists('payment_proofs/dummy.jpg')) {
            Storage::disk('public')->makeDirectory('payment_proofs');
            $seedDummy = database_path('seeders/dummy.jpg');
            if (file_exists($seedDummy)) {
                Storage::disk('public')->put('payment_proofs/dummy.jpg', file_get_contents($seedDummy));
            }
        }
        // 1. Create Admin
        User::create([
            'name' => 'Super Admin Neyla',
            'email' => 'admin@neyla.id',
            'phone' => '08111111111',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // 2. Create Psychologists (Multiple Doctors)
        
        // Psychologist 1: Dian Sastro, M.Psi
        $psy1 = User::create([
            'name' => 'Dian Sastro, M.Psi., Psikolog',
            'email' => 'dian@neyla.id',
            'phone' => '08222222221',
            'password' => Hash::make('password'),
            'role' => 'psychologist',
        ]);

        PsychologistProfile::create([
            'user_id' => $psy1->id,
            'bio' => 'Fokus pada manajemen stress, depresi ringan hingga berat, serta konflik karir dan kecemasan kerja.',
            'specialization' => 'Depresi & Karir',
            'license_no' => 'SIP-22345-2026',
            'price_per_session' => 160000,
            'is_verified' => true,
        ]);

        // Psychologist 2: Rian Adi, M.Psi
        $psy2 = User::create([
            'name' => 'Rian Adi, M.Psi., Psikolog',
            'email' => 'rian@neyla.id',
            'phone' => '08222222222',
            'password' => Hash::make('password'),
            'role' => 'psychologist',
        ]);

        PsychologistProfile::create([
            'user_id' => $psy2->id,
            'bio' => 'Membantu menyelesaikan konflik pasangan, masalah komunikasi keluarga, pranikah, dan bimbingan hubungan.',
            'specialization' => 'Hubungan & Keluarga',
            'license_no' => 'SIP-32345-2026',
            'price_per_session' => 145000,
            'is_verified' => true,
        ]);

        // Psychologist 3: Siti Aminah, M.Psi
        $psy3 = User::create([
            'name' => 'Siti Aminah, M.Psi., Psikolog',
            'email' => 'siti@neyla.id',
            'phone' => '08222222223',
            'password' => Hash::make('password'),
            'role' => 'psychologist',
        ]);

        PsychologistProfile::create([
            'user_id' => $psy3->id,
            'bio' => 'Pendekatan kognitif perilaku untuk mengatasi trauma masa lalu, kedukaan (grief), dan pengembangan rasa percaya diri.',
            'specialization' => 'Trauma & Kedukaan',
            'license_no' => 'SIP-42345-2026',
            'price_per_session' => 170000,
            'is_verified' => true,
        ]);

        // Create Schedules for all Psychologists
        $psychologists = [$psy1, $psy2, $psy3];
        $days = [1, 3, 5]; // Mon, Wed, Fri
        foreach ($psychologists as $psy) {
            foreach ($days as $day) {
                Schedule::create([
                    'psychologist_id' => $psy->id,
                    'day_of_week' => $day,
                    'start_time' => '09:00:00',
                    'end_time' => '12:00:00',
                ]);
            }
        }

        // 3. Create Patient / User
        $patient = User::updateOrCreate(
            ['email' => 'user@neyla.id'],
            [
                'name' => 'Budi User',
                'phone' => '08333333333',
                'password' => Hash::make('password'),
                'role' => 'patient',
                'is_pro' => false,
            ]
        );

        // 4. Seed PRO and Free Subscription Demo Users (Clean without dummy transactions)
        $this->call(UserSubscriptionSeeder::class);

        // 5. Seed Customer Reviews / Testimonials
        $this->call(ReviewSeeder::class);
    }
}
