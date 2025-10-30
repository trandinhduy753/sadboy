<?php

use Illuminate\Support\Facades\Route;
use Modules\Admin\Chat\src\Http\Controllers\MessageController;
Route::prefix('admin')->middleware('jwt.cookie.employee')->group(function() {
    Route::get('/messages', [MessageController::class, 'index']);

    Route::get('/messages_user', [MessageController::class, 'ListUser']);

    Route::post('/message', [MessageController::class, 'create']);
});
