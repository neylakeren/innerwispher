<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CounselingSession extends Model
{
    protected $fillable = [
        'booking_id',
        'started_at',
        'ended_at',
        'status',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function notes()
    {
        return $this->hasOne(CounselingSessionNote::class);
    }
