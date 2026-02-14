<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\CommentController;

Route::apiResource('articles', ArticleController::class)->only(['index', 'show', 'store']);
Route::post('/articles/{article}/comments', [CommentController::class, 'store']);