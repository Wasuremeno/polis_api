<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/articles', function () {
    return Inertia::render('Articles/Index');
})->name('articles.index');

Route::get('/articles/{id}', function ($id) {
    return Inertia::render('Articles/Show', ['id' => $id]);
})->name('articles.show');

Route::get('/articles/create', function () {
    return Inertia::render('Articles/Create');
})->name('articles.create');