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
}
