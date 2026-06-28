<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CounselingSessionController;
use App\Http\Controllers\Api\PaymentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;

Broadcast::routes(['middleware' => ['auth:sanctum']]);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // Bookings
    Route::get('/bookings', [\App\Http\Controllers\Api\BookingController::class, 'index']);
    Route::get('/bookings/{id}', [\App\Http\Controllers\Api\BookingController::class, 'show']);
    Route::post('/bookings', [\App\Http\Controllers\Api\BookingController::class, 'store']);
    Route::get('/psychologists', [\App\Http\Controllers\Api\BookingController::class, 'getPsychologists']);

    // Payment
    Route::post('/payments/upload', [PaymentController::class, 'uploadProof']);

    Route::middleware('role:admin')->group(function () {
        Route::post('/admin/payments/{id}/verify', [PaymentController::class, 'verify']);
    });

    // Sessions
    Route::get('/sessions/{id}', [CounselingSessionController::class, 'show']);
    Route::post('/sessions/{id}/messages', [CounselingSessionController::class, 'sendMessage']);
    
    Route::middleware('role:psychologist')->group(function () {
        Route::post('/sessions/{id}/end', [CounselingSessionController::class, 'endSession']);
        Route::post('/sessions/{id}/notes', [CounselingSessionController::class, 'submitNotes']);
    });
});
