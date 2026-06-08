<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CounselingSessionNote extends Model
{
    protected $fillable = [
        'counseling_session_id',
        'psychologist_id',
        'content',
    ];

    public function session()
    {
        return $this->belongsTo(CounselingSession::class, 'counseling_session_id');
    }

    public function psychologist()
    {
        return $this->belongsTo(User::class, 'psychologist_id');
    }

}
