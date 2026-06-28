<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PaymentController extends Controller
{
    public function uploadProof(Request $request)
    {
        $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'proof_image' => 'required|image|max:2048', // 2MB max
            'amount' => 'required|numeric|min:0',
        ]);

        $booking = Booking::findOrFail($request->booking_id);

        if ($request->hasFile('proof_image')) {
            $path = $request->file('proof_image')->store('payment_proofs', 'public');

            $payment = Payment::updateOrCreate(
                ['booking_id' => $booking->id],
                [
                    'amount' => $request->amount,
                    'proof_image_path' => $path,
                    'status' => 'pending',
                ]
            );

            return response()->json([
                'message' => 'Proof of payment uploaded successfully.',
                'payment' => $payment,
            ]);
        }

        return response()->json(['message' => 'Upload failed.'], 400);
    }

    public function verify(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:verified,rejected',
        ]);

        $payment = Payment::with('booking')->findOrFail($id);
        $booking = $payment->booking;

        $payment->update([
            'status' => $request->status,
            'verified_at' => $request->status === 'verified' ? now() : null,
        ]);

        if ($request->status === 'verified') {
            $booking->update([
                'status' => 'paid',
            ]);

            // Automatically create a counseling session if it doesn't exist
            if (!$booking->counselingSession) {
                $booking->counselingSession()->create([
                    'status' => 'active',
                    'started_at' => now(),
                ]);
            }
        } else {
            $booking->update([
                'status' => 'confirmed', // revert to waiting payment
            ]);
        }

        return response()->json([
            'message' => 'Payment verification processed successfully.',
            'payment' => $payment->load('booking.counselingSession'),
        ]);
    }
}
