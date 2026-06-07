<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CounselingSessionController;
use App\Http\Controllers\Api\PaymentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // Payment
    Route::post('/payments/upload', [PaymentController::class, 'uploadProof']);

    // Sessions
    Route::post('/sessions/{id}/end', [CounselingSessionController::class, 'endSession']);
    Route::post('/sessions/{id}/notes', [CounselingSessionController::class, 'submitNotes']);
});
