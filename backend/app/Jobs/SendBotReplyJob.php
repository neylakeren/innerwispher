<?php

namespace App\Jobs;

use App\Models\CounselingSession;
use App\Events\MessageSent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class SendBotReplyJob implements ShouldQueue
{
    use Queueable;

    protected $sessionId;
    protected $psychologistId;

    /**
     * Create a new job instance.
     */
    public function __construct($sessionId, $psychologistId)
    {
        $this->sessionId = $sessionId;
        $this->psychologistId = $psychologistId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Delay simulation for typing
        sleep(2);

        $session = CounselingSession::find($this->sessionId);
        if (!$session || $session->status === 'closed') {
            return;
        }

        $responses = [
            "Terima kasih sudah berbagi. Bagaimana perasaan Anda saat ini?",
            "Saya sangat memahami situasi Anda. Mari kita bahas hal ini perlahan-lahan.",
            "Apa yang biasanya Anda lakukan saat merasa cemas seperti itu?",
            "Itu adalah langkah awal yang sangat baik dengan membicarakannya di sini.",
            "Apakah hal ini sering terjadi di saat-saat tertentu?",
            "Saya ada di sini untuk mendengarkan. Silakan ceritakan lebih detail jika Anda merasa nyaman.",
            "Bagaimana pengaruh kecemasan tersebut terhadap pekerjaan Anda sehari-hari?",
            "Apakah Anda sudah mencoba menceritakan hal ini kepada orang terdekat Anda?",
        ];
        
        $replyContent = $responses[array_rand($responses)];

        $message = $session->messages()->create([
            'sender_id' => $this->psychologistId,
            'content' => $replyContent,
        ]);

        Log::info('Broadcasting Bot Response', ['session' => $this->sessionId, 'message' => $message->id]);

        broadcast(new MessageSent($message->load('sender')));
    }
}
