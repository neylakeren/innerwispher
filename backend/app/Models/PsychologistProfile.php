<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PsychologistProfile extends Model
{
    protected $fillable = [
        'user_id',
        'bio',
        'specialization',
        'license_no',
        'price_per_session',
        'is_verified',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
