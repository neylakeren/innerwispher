<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = [
        'psychologist_id',
        'day_of_week',
        'start_time',
        'end_time',
        'is_available',
    ];

    public function psychologist()
    {
        return $this->belongsTo(User::class, 'psychologist_id');
    }
}
