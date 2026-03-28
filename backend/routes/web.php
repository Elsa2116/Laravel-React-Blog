<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome'); // optional, just a home page
});
