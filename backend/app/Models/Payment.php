<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'user_id',
        'booking_id',
        'amount',
        'payment_type',
        'bank_destination',
        'sender_name',
        'proof_image_path',
        'status',
        'verified_at',
        'counselor_payout_amount',
        'counselor_payout_proof',
        'counselor_payout_status',
        'counselor_payout_at',
        'counselor_received_at',
    ];

    protected $casts = [
        'verified_at' => 'datetime',
        'counselor_payout_at' => 'datetime',
        'counselor_received_at' => 'datetime',
        'counselor_payout_amount' => 'float',
        'amount' => 'float',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
