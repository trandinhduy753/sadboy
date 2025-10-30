<?php

use Illuminate\Support\Facades\Route;
use Modules\Client\Chat\src\Http\Controllers\MessageController;

Route::get('/messages', [MessageController::class, 'index'])->middleware('jwt.cookie.user');

Route::post('/message', [MessageController::class, 'create'])->middleware('jwt.cookie.user');
