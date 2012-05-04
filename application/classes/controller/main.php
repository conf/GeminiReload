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
		if($this->_isLogin())
		{
			$this->template->user = $this->_getFactory()->getUser();
		}
	}
	
	public function action_login()
	{
		if(!$this->_isLogin() && $this->request->post('username') && $this->request->post('apikey'))
		{
			try {
				$credentials = array(
		            'login'		=> $this->request->post('username'),
		            'apikey'	=> $this->request->post('apikey')
		        );
		        
		        $factory = new Model_Gemini_Factory('http://tickets.bluefountainmedia.com', $credentials);
		        if(!$factory->getUser())
		        {
		        	throw new Exception('Wrong Username or ApiKey');
		        }
			}
			catch (Exception $e)
			{
				$this->request->redirect('/');
			}
			
			$this->session->set('username', $this->request->post('username'));
			$this->session->set('apikey', $this->request->post('apikey'));
			$this->session->set('is_login', true);
		}
		
		$this->request->redirect('/');
	}

	public function action_logout()
	{
		$this->session->destroy();
		$this->request->redirect('/');
	}
	
	private function _getFactory()
	{
		if($this->_factory)
			return $this->_factory;
			
		$credentials = array(
            'login'		=> $this->session->get('username'),
            'apikey'	=> $this->session->get('apikey')
        );
        
		$this->_factory = new Model_Gemini_Factory('http://tickets.bluefountainmedia.com', $credentials);
		return $this->_factory;
	}
	
	private function _isLogin()
	{
		return $this->session->get('is_login', false);
	}
}
