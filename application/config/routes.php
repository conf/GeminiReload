<?php
Route::set('auth', '<action>',
	array(
		'action' => '(login|logout)'
	)

)->defaults(array(
	'controller' => 'main',
));

return array();