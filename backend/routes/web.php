<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cache;
use Modules\Admin\Comment\src\Models\Comment;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-redis', function () {
    $dashboard_key = "dashboards";
        $dashboard = cache::get($dashboard_key);
    return $dashboard;

});

