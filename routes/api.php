<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeacherController;

Route::apiResource('teachers', TeacherController::class); //api untuk resource controller
