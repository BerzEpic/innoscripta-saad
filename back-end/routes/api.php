<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PreferenceController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('auth/signup', [AuthController::class, 'register']);
Route::post('auth/signin', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('/news', [NewsController::class, 'getNews']);
    Route::get('/sources', [PreferenceController::class, 'sources']);
    Route::get('/preferences/{id}', [PreferenceController::class, 'index']);
    Route::put('/preferences/{id}', [PreferenceController::class, 'update']);
});

