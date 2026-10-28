<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\PsychologistProfile;
use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    public function getStats()
    {
        $totalPsychologists = User::where('role', 'psychologist')->count();
        $totalPatients = User::where('role', 'patient')->count();
        $totalProUsers = User::where('is_pro', true)->count();
        $pendingPayments = Payment::where('status', 'pending')->count();
        $pendingProPayments = Payment::where('payment_type', 'pro_bundle')->where('status', 'pending')->count();
        $pendingPayouts = Payment::where('status', 'verified')->where('counselor_payout_status', 'unpaid')->count();
        $totalBookings = Booking::count();

        return response()->json([
            'total_psychologists' => $totalPsychologists,
            'total_patients' => $totalPatients,
            'total_pro_users' => $totalProUsers,
            'pending_payments' => $pendingPayments,
            'pending_pro_payments' => $pendingProPayments,
            'pending_payouts' => $pendingPayouts,
            'total_bookings' => $totalBookings,
        ]);
    }

    public function getPsychologists()
    {
        $psychologists = User::where('role', 'psychologist')
            ->with('psychologistProfile')
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone ?? '-',
                    'specialization' => $user->psychologistProfile?->specialization ?? 'Umum',
                    'bio' => $user->psychologistProfile?->bio ?? '',
                    'price' => (float) ($user->psychologistProfile?->price_per_session ?? 150000),
                    'license_no' => $user->psychologistProfile?->license_no ?? '-',
                    'is_verified' => (bool) ($user->psychologistProfile?->is_verified ?? false),
                    'created_at' => $user->created_at?->format('Y-m-d') ?? '-',
                ];
            });

        return response()->json($psychologists);
    }

    public function storePsychologist(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'nullable|string|max:20',
            'password' => 'required|string|min:6',
            'specialization' => 'required|string|max:255',
            'price' => 'nullable|numeric|min:0',
            'bio' => 'nullable|string',
            'license_no' => 'nullable|string|max:100',
            'is_verified' => 'nullable|boolean',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'password' => Hash::make($validated['password']),
            'role' => 'psychologist',
        ]);

        PsychologistProfile::create([
            'user_id' => $user->id,
            'specialization' => $validated['specialization'],
            'price_per_session' => $validated['price'] ?? 150000,
            'bio' => $validated['bio'] ?? '',
            'license_no' => $validated['license_no'] ?? 'SIP-' . rand(10000, 99999),
            'is_verified' => $validated['is_verified'] ?? true,
        ]);

        return response()->json([
            'message' => 'Psikolog berhasil ditambahkan.',
            'psychologist' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone ?? '-',
                'specialization' => $validated['specialization'],
                'price' => $validated['price'] ?? 150000,
                'is_verified' => $validated['is_verified'] ?? true,
            ]
        ], 201);
    }

    public function updatePsychologist(Request $request, $id)
    {
        $user = User::where('role', 'psychologist')->findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
            'phone' => 'nullable|string|max:20',
            'specialization' => 'required|string|max:255',
            'price' => 'nullable|numeric|min:0',
            'bio' => 'nullable|string',
            'license_no' => 'nullable|string|max:100',
            'is_verified' => 'nullable|boolean',
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? $user->phone,
        ]);

        $profile = PsychologistProfile::firstOrCreate(['user_id' => $user->id]);
        $profile->update([
            'specialization' => $validated['specialization'],
            'price_per_session' => $validated['price'] ?? $profile->price_per_session,
            'bio' => $validated['bio'] ?? $profile->bio,
            'license_no' => $validated['license_no'] ?? $profile->license_no,
            'is_verified' => isset($validated['is_verified']) ? (bool) $validated['is_verified'] : $profile->is_verified,
        ]);

        return response()->json(['message' => 'Data psikolog berhasil diperbarui.']);
    }

    public function deletePsychologist($id)
    {
        $user = User::where('role', 'psychologist')->findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'Psikolog berhasil dihapus.']);
    }

    public function getPatients()
    {
        $patients = User::where('role', 'patient')
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone ?? '-',
                    'joined' => $user->created_at?->format('Y-m-d') ?? '-',
                ];
            });

        return response()->json($patients);
    }
}
