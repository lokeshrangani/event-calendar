<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', function () {
    return "Hello !";
});

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::group([
    'middleware' => ['jwt.verify', 'cors'],
    'prefix' => 'v1'
], function () {
    Route::post('add-event', [EventController::class, 'addEvent']);
    Route::post('get-event', [EventController::class, 'getEvent']);
    Route::post('logout', [AuthController::class, 'logout']);
});
