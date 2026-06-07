<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CounselingSession;
use App\Models\CounselingSessionNote;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class CounselingSessionController extends Controller
{
    public function endSession(Request $request, $id)
    {
        $session = CounselingSession::findOrFail($id);

        // Authorization check should be here (Psychologist only)
        if ($request->user()->role !== 'psychologist') {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

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

        if ($request->user()->role !== 'psychologist') {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

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
