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
}
