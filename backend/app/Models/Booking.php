<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'patient_id',
        'psychologist_id',
        'schedule_id',
        'date',
        'status',
        'triage_answers_json',
    ];

    protected $casts = [
        'triage_answers_json' => 'array',
        'date' => 'date',
    ];

    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function psychologist()
    {
        return $this->belongsTo(User::class, 'psychologist_id');
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function counselingSession()
    {
        return $this->hasOne(CounselingSession::class);
    }

}
