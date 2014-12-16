<?php

class Blog extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'blog';

	protected $guarded = array('id');

}
