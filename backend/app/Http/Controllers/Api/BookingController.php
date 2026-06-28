<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        $query = Booking::with(['psychologist', 'patient', 'payment', 'counselingSession']);

        if ($user->role === 'patient') {
            $query->where('patient_id', $user->id);
        } elseif ($user->role === 'psychologist') {
            $query->where('psychologist_id', $user->id);
        }
        // Admins can see all

        $bookings = $query->latest()->get();

        return response()->json($bookings);
    }

    public function show($id, Request $request)
    {
        $booking = Booking::with(['psychologist', 'patient', 'payment', 'counselingSession'])
            ->findOrFail($id);

        $user = $request->user();
        if ($user->role !== 'admin' && $booking->patient_id !== $user->id && $booking->psychologist_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        return response()->json($booking);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'patient') {
            return response()->json(['message' => 'Only patients can make bookings.'], 403);
        }

        $request->validate([
            'psychologist_id' => 'required|exists:users,id',
            'date' => 'required|date|after_or_equal:today',
            'schedule_id' => 'nullable|exists:schedules,id',
        ]);

        // Verify the psychologist indeed has the psychologist role
        $psychologist = \App\Models\User::where('id', $request->psychologist_id)
            ->where('role', 'psychologist')
            ->firstOrFail();

        $booking = Booking::create([
            'patient_id' => $user->id,
            'psychologist_id' => $request->psychologist_id,
            'schedule_id' => $request->schedule_id,
            'date' => $request->date,
            'status' => 'confirmed', // immediately set to confirmed so patient can pay
            'triage_answers_json' => $request->triage_answers_json,
        ]);

        return response()->json([
            'message' => 'Booking created successfully.',
            'booking' => $booking->load(['psychologist', 'patient']),
        ], 201);
    }

    public function getPsychologists()
    {
        $psychologists = \App\Models\User::where('role', 'psychologist')
            ->with('psychologistProfile')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'specialization' => $user->psychologistProfile?->specialization ?? 'Umum',
                    'bio' => $user->psychologistProfile?->bio ?? '',
                    'price' => $user->psychologistProfile?->price_per_session ?? 150000,
                    'rating' => 4.9,
                    'reviews' => 124,
                    'is_verified' => $user->psychologistProfile?->is_verified ?? true,
                ];
            });

        return response()->json($psychologists);
    }
}
