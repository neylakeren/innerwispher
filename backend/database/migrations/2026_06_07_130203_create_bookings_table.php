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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('psychologist_id')->constrained('users')->onDelete('cascade');
            $table->unsignedBigInteger('schedule_id')->nullable();
            $table->date('date');
            $table->enum('status', ['pending', 'confirmed', 'paid', 'cancelled', 'completed'])->default('pending');
            $table->json('triage_answers_json')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
