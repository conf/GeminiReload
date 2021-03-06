<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Main extends Controller_Abstract {

    public $template = 'index';
    
    public function action_index()
	{
		if(!$this->_isLoggedIn()) {
			return;
		}

        $this->template->user = $this->_getFactory()->getUser();
	}
	
	public function action_login()
	{
		if(!$this->_isLoggedIn() && $this->request->post('username') && $this->request->post('apikey'))
		{
			if(!$this->_getFactory($this->request->post('username'), $this->request->post('apikey'))->getUser())
				$this->request->redirect('/');
			
			$this->session->set('username', $this->request->post('username'));
			$this->session->set('apikey', $this->request->post('apikey'));
			$this->session->set('is_logged_in', true);
		}
		
		$this->request->redirect('/');
	}

	public function action_logout()
	{
		$this->session->destroy();
		$this->request->redirect('/');
	}
}
