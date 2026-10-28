<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Payment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSubscriptionSeeder extends Seeder
{
    public function run(): void
    {
        // 1. User Belum Berlangganan (Free Tier)
        User::updateOrCreate(
            ['email' => 'user@neyla.id'],
            [
                'name' => 'Budi Santoso',
                'phone' => '08333333333',
                'password' => Hash::make('password'),
                'role' => 'patient',
                'is_pro' => false,
                'pro_expires_at' => null,
            ]
        );

        User::updateOrCreate(
            ['email' => 'rara@neyla.id'],
            [
                'name' => 'Rara Mahasiswa',
                'phone' => '08333333334',
                'password' => Hash::make('password'),
                'role' => 'patient',
                'is_pro' => false,
                'pro_expires_at' => null,
            ]
        );

        User::updateOrCreate(
            ['email' => 'dimas@neyla.id'],
            [
                'name' => 'Dimas Jobseeker',
                'phone' => '08333333335',
                'password' => Hash::make('password'),
                'role' => 'patient',
                'is_pro' => false,
                'pro_expires_at' => null,
            ]
        );

        // 2. User Sudah Berlangganan (PRO Member Aktif Bulanan)
        User::updateOrCreate(
            ['email' => 'sarah@neyla.id'],
            [
                'name' => 'Sarah Professional',
                'phone' => '08333333336',
                'password' => Hash::make('password'),
                'role' => 'patient',
                'is_pro' => true,
                'pro_expires_at' => now()->addDays(30),
            ]
        );

        User::updateOrCreate(
            ['email' => 'kevin@neyla.id'],
            [
                'name' => 'Kevin Pratama',
                'phone' => '08333333337',
                'password' => Hash::make('password'),
                'role' => 'patient',
                'is_pro' => true,
                'pro_expires_at' => now()->addDays(30),
            ]
        );
    }
}
