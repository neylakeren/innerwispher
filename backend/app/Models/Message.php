<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'counseling_session_id',
        'sender_id',
        'content',
    ];

    public function session()
    {
        return $this->belongsTo(CounselingSession::class, 'counseling_session_id');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

}
