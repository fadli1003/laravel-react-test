<?php

use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EnrollmentController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('tenant', TenantController::class);
    Route::resource('course', CourseController::class);
    Route::resource('pengguna', UserController::class);
    Route::resource('teacher', TeacherController::class);
    Route::resource('student', StudentController::class);
    Route::resource('enrollment', EnrollmentController::class);
});

require __DIR__.'/settings.php';
