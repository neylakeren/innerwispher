<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('session.{sessionId}', function ($user, $sessionId) {
    $session = \App\Models\CounselingSession::find($sessionId);
    if (!$session) return false;
    
    return $user->id === $session->booking->patient_id || 
           $user->id === $session->booking->psychologist_id ||
           $user->role === 'admin';
});
