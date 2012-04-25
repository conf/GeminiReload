<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Welcome extends Controller_Template {

    public $template = 'index';

	public function action_index()
	{
        $credentials = array(
            'login' => 'login',
            'apikey' => 'api'
        );
        $factory = new Model_Gemini_Factory('http://tickets.bluefountainmedia.com', $credentials);
//        $factory->createProject()->getAll();
	}

} // End Welcome
