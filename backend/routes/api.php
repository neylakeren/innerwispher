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
Route::get('/reviews', [\App\Http\Controllers\Api\ReviewController::class, 'index']);

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
    Route::post('/pro/upload-proof', [PaymentController::class, 'uploadProProof']);
    Route::get('/pro/status', [PaymentController::class, 'getProStatus']);

    Route::middleware('role:admin')->group(function () {
        Route::get('/admin/pro-payments', [PaymentController::class, 'getAdminProPayments']);
        Route::post('/admin/pro-payments/{id}/verify', [PaymentController::class, 'verifyProPayment']);
        Route::post('/admin/payments/{id}/verify', [PaymentController::class, 'verify']);
        Route::post('/admin/payments/{id}/payout', [PaymentController::class, 'payoutCounselor']);
        Route::get('/admin/stats', [\App\Http\Controllers\Api\AdminController::class, 'getStats']);
        Route::get('/admin/psychologists', [\App\Http\Controllers\Api\AdminController::class, 'getPsychologists']);
        Route::post('/admin/psychologists', [\App\Http\Controllers\Api\AdminController::class, 'storePsychologist']);
        Route::put('/admin/psychologists/{id}', [\App\Http\Controllers\Api\AdminController::class, 'updatePsychologist']);
        Route::delete('/admin/psychologists/{id}', [\App\Http\Controllers\Api\AdminController::class, 'deletePsychologist']);
        Route::get('/admin/patients', [\App\Http\Controllers\Api\AdminController::class, 'getPatients']);

        // Reviews Management
        Route::get('/admin/reviews', [\App\Http\Controllers\Api\ReviewController::class, 'adminIndex']);
        Route::post('/admin/reviews', [\App\Http\Controllers\Api\ReviewController::class, 'store']);
        Route::post('/admin/reviews/{id}', [\App\Http\Controllers\Api\ReviewController::class, 'update']);
        Route::patch('/admin/reviews/{id}/toggle', [\App\Http\Controllers\Api\ReviewController::class, 'toggle']);
        Route::delete('/admin/reviews/{id}', [\App\Http\Controllers\Api\ReviewController::class, 'destroy']);
    });

    // Sessions
    Route::get('/sessions/{id}', [CounselingSessionController::class, 'show']);
    Route::post('/sessions/{id}/messages', [CounselingSessionController::class, 'sendMessage']);
    
    Route::middleware('role:psychologist')->group(function () {
        Route::post('/sessions/{id}/end', [CounselingSessionController::class, 'endSession']);
        Route::post('/sessions/{id}/notes', [CounselingSessionController::class, 'submitNotes']);
        Route::post('/psychologist/payouts/{id}/confirm', [PaymentController::class, 'confirmPayoutReceived']);
    });
});
