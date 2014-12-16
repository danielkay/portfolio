<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('index');
});

Route::group(['prefix' => 'service'], function($router) {
	Route::resource('authenticate', 'AuthController');
});

Route::group(['prefix' => 'api'], function($router)
{
    Route::resource('blog', 'BlogController',
    	array('only' => array('index','store','show','destroy')));
    Route::resource('project', 'ProjectController',
    	array('only' => array('index','store','show','destroy')));
});