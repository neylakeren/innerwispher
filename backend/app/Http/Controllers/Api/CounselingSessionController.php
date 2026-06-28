<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CounselingSession;
use App\Models\CounselingSessionNote;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class CounselingSessionController extends Controller
{
    public function show($id, Request $request)
    {
        $session = CounselingSession::with(['messages.sender', 'booking.patient', 'booking.psychologist'])
            ->findOrFail($id);

        $user = $request->user();
        if ($user->role !== 'admin' && 
            $session->booking->patient_id !== $user->id && 
            $session->booking->psychologist_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        return response()->json($session);
    }

    public function sendMessage(Request $request, $id)
    {
        $session = CounselingSession::findOrFail($id);

        if ($session->status === 'closed') {
            return response()->json(['message' => 'Session is closed.'], 400);
        }

        $user = $request->user();
        if ($session->booking->patient_id !== $user->id && 
            $session->booking->psychologist_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $request->validate([
            'content' => 'required|string',
        ]);

        $message = $session->messages()->create([
            'sender_id' => $user->id,
            'content' => $request->content,
        ]);

        \Illuminate\Support\Facades\Log::info('Broadcasting message', ['session' => $id, 'sender' => $user->id]);
        broadcast(new \App\Events\MessageSent($message->load('sender')))->toOthers();

        if ($user->role === 'patient') {
            $booking = $session->booking;
            \App\Jobs\SendBotReplyJob::dispatch($session->id, $booking->psychologist_id);
        }

        return response()->json($message->load('sender'));
    }

    public function endSession(Request $request, $id)
    {
        $session = CounselingSession::findOrFail($id);

        $session->update([
            'status' => 'closed',
            'ended_at' => Carbon::now(),
        ]);

        return response()->json([
            'message' => 'Session closed successfully.',
            'session' => $session,
        ]);
    }

    public function submitNotes(Request $request, $id)
    {
        $session = CounselingSession::findOrFail($id);

        $request->validate([
            'content' => 'required|string',
        ]);

        $note = CounselingSessionNote::updateOrCreate(
            ['counseling_session_id' => $session->id],
            [
                'psychologist_id' => $request->user()->id,
                'content' => $request->content,
            ]
        );

        return response()->json([
            'message' => 'Session notes submitted successfully.',
            'note' => $note,
        ]);
    }
}
