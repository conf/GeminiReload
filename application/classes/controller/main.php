<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Main extends Controller_Template {

    public $template = 'index';

	public function action_index()
	{
        $credentials = array(
            'login' => 'login',
            'apikey' => 'api'
        );
        $factory = new Model_Gemini_Factory('http://tickets.bluefountainmedia.com', $credentials);
//        var_dump($factory->getProjects());
	}

	public function action_logout()
	{
		Session::instance()->destroy();
		$this->request->redirect('/');
	}
}
