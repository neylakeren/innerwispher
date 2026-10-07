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
            'proof_image' => 'required|image|max:5120', // 5MB max
            'amount' => 'required|numeric|min:0',
        ]);

        $booking = Booking::with('psychologist.psychologistProfile')->findOrFail($request->booking_id);

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
                'message' => 'Foto invoice / bukti pembayaran berhasil dikirim. Menunggu verifikasi admin.',
                'payment' => $payment->load('booking'),
            ]);
        }

        return response()->json(['message' => 'Gagal mengunggah foto invoice.'], 400);
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

            // Automatically create active counseling session so chat opens
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
            'message' => $request->status === 'verified' 
                ? 'Pembayaran berhasil diverifikasi. Sesi chat konsultasi telah dibuka.' 
                : 'Pembayaran ditolak. Pasien diminta mengunggah ulang bukti pembayaran.',
            'payment' => $payment->load('booking.counselingSession'),
        ]);
    }

    /**
     * Admin pays the counselor and uploads payout proof/invoice.
     */
    public function payoutCounselor(Request $request, $id)
    {
        $request->validate([
            'proof_image' => 'required|image|max:5120', // 5MB max
            'amount' => 'nullable|numeric|min:0',
        ]);

        $payment = Payment::with('booking.psychologist.psychologistProfile')->findOrFail($id);

        if ($payment->status !== 'verified') {
            return response()->json([
                'message' => 'Pembayaran pasien belum diverifikasi. Verifikasi pembayaran pasien terlebih dahulu.',
            ], 422);
        }

        if ($request->hasFile('proof_image')) {
            $path = $request->file('proof_image')->store('counselor_payout_proofs', 'public');

            $payoutAmount = $request->filled('amount') 
                ? (float) $request->amount 
                : (float) ($payment->booking->psychologist?->psychologistProfile?->price_per_session ?? $payment->amount);

            $payment->update([
                'counselor_payout_proof' => $path,
                'counselor_payout_amount' => $payoutAmount,
                'counselor_payout_status' => 'pending', // Pending confirmation by counselor
                'counselor_payout_at' => now(),
            ]);

            return response()->json([
                'message' => 'Bukti pembayaran honor berhasil dikirim ke konselor. Menunggu konfirmasi penerimaan dari konselor.',
                'payment' => $payment->load('booking.psychologist'),
            ]);
        }

        return response()->json(['message' => 'Gagal mengunggah bukti invoice honor.'], 400);
    }

    /**
     * Counselor confirms receipt of honor ("Diterima").
     */
    public function confirmPayoutReceived(Request $request, $id)
    {
        $payment = Payment::with('booking')->findOrFail($id);
        $user = $request->user();

        // Check if user is the assigned psychologist
        if ($payment->booking->psychologist_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        if ($payment->counselor_payout_status !== 'pending') {
            return response()->json([
                'message' => 'Status pembayaran honor tidak dalam antrean konfirmasi penerimaan.',
            ], 422);
        }

        $payment->update([
            'counselor_payout_status' => 'received',
            'counselor_received_at' => now(),
        ]);

        return response()->json([
            'message' => 'Honor konsultasi berhasil dikonfirmasi diterima.',
            'payment' => $payment->load('booking'),
        ]);
    }
}
