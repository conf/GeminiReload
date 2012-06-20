<?php defined('SYSPATH') or die('No direct script access.');

abstract class Controller_Abstract extends Controller_Template {

    private $_factory;
    
    public function before()
    {
    	$this->session = Session::instance();

        $response_format = $this->request->param('format', 'html');

        if (in_array($response_format, array('json', 'xml'))) {
            $this->template = $response_format;
        }

        parent::before();
    }
	
    /**
     * @param bool $username
     * @param bool $apikey
     * @return Model_Gemini_Factory
     */
    protected function _getFactory($username = false, $apikey = false)
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
	
	protected function _isLoggedIn()
	{
		return $this->session->get('is_logged_in', false);
	}
}
