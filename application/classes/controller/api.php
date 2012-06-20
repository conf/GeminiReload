<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Api extends Controller_Abstract {

    public $template = 'json';

    public function action_projects()
	{
		if(!$this->_isLoggedIn()) {
			return;
		}

        $this->template->success = true;
        $this->template->projects = $this->_getFactory()->getProjects();
	}
}
