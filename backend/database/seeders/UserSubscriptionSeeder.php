<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Payment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserSubscriptionSeeder extends Seeder
{
    public function run(): void
    {
        // Pastikan dummy image struk transfer tersedia di public storage
        if (!Storage::disk('public')->exists('payment_proofs/dummy.jpg')) {
            Storage::disk('public')->makeDirectory('payment_proofs');
            $seedDummy = database_path('seeders/dummy.jpg');
            if (file_exists($seedDummy)) {
                Storage::disk('public')->put('payment_proofs/dummy.jpg', file_get_contents($seedDummy));
            }
        }

        // ==========================================
        // 1. USER BELUM BERLANGGANAN (FREE TIER)
        // ==========================================
        
        // User 1: Budi Santoso (user@neyla.id)
        $user1 = User::updateOrCreate(
            ['email' => 'user@neyla.id'],
            [
                'name' => 'Budi Santoso',
                'phone' => '08333333333',
                'password' => Hash::make('password'),
                'role' => 'patient',
                'is_pro' => false,
            ]
        );
        // Hapus payment pro_bundle jika ada agar benar-benar fresh free tier
        Payment::where('user_id', $user1->id)->where('payment_type', 'pro_bundle')->delete();

        // User 2: Rara Mahasiswa (rara@neyla.id)
        $user2 = User::updateOrCreate(
            ['email' => 'rara@neyla.id'],
            [
                'name' => 'Rara Mahasiswa',
                'phone' => '08333333334',
                'password' => Hash::make('password'),
                'role' => 'patient',
                'is_pro' => false,
            ]
        );
        Payment::where('user_id', $user2->id)->where('payment_type', 'pro_bundle')->delete();

        // ==========================================
        // 2. USER MENUNGGU VERIFIKASI ADMIN (PENDING)
        // ==========================================
        
        // User 3: Dimas Jobseeker (dimas@neyla.id)
        $user3 = User::updateOrCreate(
            ['email' => 'dimas@neyla.id'],
            [
                'name' => 'Dimas Jobseeker',
                'phone' => '08333333335',
                'password' => Hash::make('password'),
                'role' => 'patient',
                'is_pro' => false,
            ]
        );
        Payment::where('user_id', $user3->id)->where('payment_type', 'pro_bundle')->delete();
        Payment::create([
            'user_id' => $user3->id,
            'booking_id' => null,
            'amount' => 35000,
            'payment_type' => 'pro_bundle',
            'bank_destination' => 'BCA',
            'sender_name' => 'Dimas Prasetyo',
            'proof_image_path' => 'payment_proofs/dummy.jpg',
            'status' => 'pending',
            'created_at' => now()->subMinutes(15),
        ]);

        // ==========================================
        // 3. USER SUDAH BERLANGGANAN (PRO MEMBER AKTIF BULANAN)
        // ==========================================
        
        // User 4: Sarah Professional (sarah@neyla.id)
        $user4 = User::updateOrCreate(
            ['email' => 'sarah@neyla.id'],
            [
                'name' => 'Sarah Professional',
                'phone' => '08333333336',
                'password' => Hash::make('password'),
                'role' => 'patient',
                'is_pro' => true,
                'pro_expires_at' => now()->addDays(27),
            ]
        );
        Payment::where('user_id', $user4->id)->where('payment_type', 'pro_bundle')->delete();
        Payment::create([
            'user_id' => $user4->id,
            'booking_id' => null,
            'amount' => 35000,
            'payment_type' => 'pro_bundle',
            'bank_destination' => 'SeaBank',
            'sender_name' => 'Sarah Aulia',
            'proof_image_path' => 'payment_proofs/dummy.jpg',
            'status' => 'verified',
            'verified_at' => now()->subDays(3),
            'created_at' => now()->subDays(3),
        ]);

        // User 5: Kevin Pratama (kevin@neyla.id)
        $user5 = User::updateOrCreate(
            ['email' => 'kevin@neyla.id'],
            [
                'name' => 'Kevin Pratama',
                'phone' => '08333333337',
                'password' => Hash::make('password'),
                'role' => 'patient',
                'is_pro' => true,
                'pro_expires_at' => now()->addDays(29),
            ]
        );
        Payment::where('user_id', $user5->id)->where('payment_type', 'pro_bundle')->delete();
        Payment::create([
            'user_id' => $user5->id,
            'booking_id' => null,
            'amount' => 35000,
            'payment_type' => 'pro_bundle',
            'bank_destination' => 'BCA',
            'sender_name' => 'Kevin Pratama',
            'proof_image_path' => 'payment_proofs/dummy.jpg',
            'status' => 'verified',
            'verified_at' => now()->subDay(),
            'created_at' => now()->subDay(),
        ]);
    }
}
