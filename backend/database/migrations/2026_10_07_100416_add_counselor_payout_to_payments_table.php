<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->decimal('counselor_payout_amount', 12, 2)->nullable()->after('verified_at');
            $table->string('counselor_payout_proof')->nullable()->after('counselor_payout_amount');
            $table->enum('counselor_payout_status', ['unpaid', 'pending', 'received'])->default('unpaid')->after('counselor_payout_proof');
            $table->timestamp('counselor_payout_at')->nullable()->after('counselor_payout_status');
            $table->timestamp('counselor_received_at')->nullable()->after('counselor_payout_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropColumn([
                'counselor_payout_amount',
                'counselor_payout_proof',
                'counselor_payout_status',
                'counselor_payout_at',
                'counselor_received_at'
            ]);
        });
    }
};
