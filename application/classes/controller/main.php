<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Main extends Controller_Template {

    public $template = 'index';
    
    private $_factory;
    
    public function before()
    {
    	parent::before();
    	$this->session = Session::instance();
    }
	
    public function action_index()
	{
		if($this->_isLoggedIn())
		{
			$this->template->user = $this->_getFactory()->getUser();
		}
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
	
	private function _getFactory($username = false, $apikey = false)
	{
		if($this->_factory)
			return $this->_factory;
			
		$credentials = array(
            'login'		=> $username ? $username : $this->session->get('username'),
            'apikey'	=> $apikey ? $apikey : $this->session->get('apikey')
        );
        
		$this->_factory = new Model_Gemini_Factory('http://tickets.bluefountainmedia.com', $credentials);
		return $this->_factory;
	}
	
	private function _isLoggedIn()
	{
		return $this->session->get('is_logged_in', false);
	}
}
