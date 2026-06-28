<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class PaymentVerificationTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected User $patient;
    protected User $psychologist;
    protected Booking $booking;
    protected Payment $payment;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $this->patient = User::factory()->create([
            'role' => 'patient',
        ]);

        $this->psychologist = User::factory()->create([
            'role' => 'psychologist',
        ]);

        $this->booking = Booking::create([
            'patient_id' => $this->patient->id,
            'psychologist_id' => $this->psychologist->id,
            'date' => now()->addDays(2),
            'status' => 'confirmed',
        ]);

        $this->payment = Payment::create([
            'booking_id' => $this->booking->id,
            'amount' => 150000,
            'proof_image_path' => 'payment_proofs/dummy.jpg',
            'status' => 'pending',
        ]);
    }

    public function test_admin_can_verify_payment()
    {
        Sanctum::actingAs($this->admin);

        $response = $this->postJson("/api/admin/payments/{$this->payment->id}/verify", [
            'status' => 'verified',
        ]);

        $response->assertStatus(200);
        $response->assertJsonPath('payment.status', 'verified');

        $this->assertDatabaseHas('payments', [
            'id' => $this->payment->id,
            'status' => 'verified',
        ]);

        $this->assertDatabaseHas('bookings', [
            'id' => $this->booking->id,
            'status' => 'paid',
        ]);

        $this->assertDatabaseHas('counseling_sessions', [
            'booking_id' => $this->booking->id,
            'status' => 'active',
        ]);
    }

    public function test_admin_can_reject_payment()
    {
        Sanctum::actingAs($this->admin);

        $response = $this->postJson("/api/admin/payments/{$this->payment->id}/verify", [
            'status' => 'rejected',
        ]);

        $response->assertStatus(200);
        $response->assertJsonPath('payment.status', 'rejected');

        $this->assertDatabaseHas('payments', [
            'id' => $this->payment->id,
            'status' => 'rejected',
        ]);

        $this->assertDatabaseHas('bookings', [
            'id' => $this->booking->id,
            'status' => 'confirmed',
        ]);

        $this->assertDatabaseMissing('counseling_sessions', [
            'booking_id' => $this->booking->id,
        ]);
    }

    public function test_non_admin_cannot_verify_payment()
    {
        Sanctum::actingAs($this->patient);

        $response = $this->postJson("/api/admin/payments/{$this->payment->id}/verify", [
            'status' => 'verified',
        ]);

        $response->assertStatus(403);
    }

    public function test_patient_can_create_booking()
    {
        Sanctum::actingAs($this->patient);

        $response = $this->postJson("/api/bookings", [
            'psychologist_id' => $this->psychologist->id,
            'date' => now()->addDays(3)->format('Y-m-d'),
        ]);

        $response->assertStatus(201);
        $response->assertJsonPath('booking.status', 'confirmed');
        $this->assertDatabaseHas('bookings', [
            'patient_id' => $this->patient->id,
            'psychologist_id' => $this->psychologist->id,
            'status' => 'confirmed',
        ]);
    }

    public function test_non_patient_cannot_create_booking()
    {
        Sanctum::actingAs($this->psychologist);

        $response = $this->postJson("/api/bookings", [
            'psychologist_id' => $this->admin->id,
            'date' => now()->addDays(3)->format('Y-m-d'),
        ]);

        $response->assertStatus(403);
    }

    public function test_authenticated_user_can_fetch_psychologists()
    {
        Sanctum::actingAs($this->patient);

        // Create psychologist profile to assert structure
        \App\Models\PsychologistProfile::create([
            'user_id' => $this->psychologist->id,
            'bio' => 'Sample bio',
            'specialization' => 'Anxiety',
            'price_per_session' => 150000,
            'is_verified' => true,
        ]);

        $response = $this->getJson("/api/psychologists");

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'id' => $this->psychologist->id,
            'name' => $this->psychologist->name,
            'specialization' => 'Anxiety',
        ]);
    }

    public function test_patient_sending_message_dispatches_bot_job()
    {
        \Illuminate\Support\Facades\Queue::fake();

        Sanctum::actingAs($this->patient);

        $booking = Booking::create([
            'patient_id' => $this->patient->id,
            'psychologist_id' => $this->psychologist->id,
            'date' => now(),
            'status' => 'paid',
        ]);

        $session = $booking->counselingSession()->create([
            'status' => 'active',
            'started_at' => now(),
        ]);

        $response = $this->postJson("/api/sessions/{$session->id}/messages", [
            'content' => 'Hello Doc!',
        ]);

        $response->assertStatus(200);

        \Illuminate\Support\Facades\Queue::assertPushed(\App\Jobs\SendBotReplyJob::class);
    }
}
