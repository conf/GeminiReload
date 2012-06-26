<?php

class Model_Gemini_Factory extends Model
{
    private $_url;
    private $_credentials;

    /**
     * @var Guzzle\Service\Client
     */
    private $_client;

    public function __construct($url, $credentials)
    {
        $this->_url = $url;
        $this->_credentials = $credentials;
    }

    static function create($class)
    {
        $model_class = 'Model_Gemini_' . $class;
        return new $model_class;
    }

    public function createProject()
    {
        return new Model_Gemini_Project($this->_getGuzzleClient());
    }

	public function getProjects()
	{
		return $this->sendRequest('projects.ashx/projects');
	}

    public function getIssueTimeTypes()
    {
        return $this->sendRequest('admin.ashx/issuetimetype');
    }

    protected function _getGuzzleClient()
    {
        if (!$this->_client)
        {
            $this->_client = new Guzzle\Service\Client($this->_url . '/api');
            $this->_client->setDefaultHeaders(
                array(
                    'gemini-username-token' => base64_encode($this->_credentials['login']),
                    'gemini-api-token' => base64_encode($this->_credentials['apikey'])
                )
            );

            $cache_path = APPPATH . '/cache/response';
            $cache = new Guzzle\Http\Plugin\CachePlugin(new Model_Gemini_Cache($cache_path), true);
            $this->_client->getEventDispatcher()->addSubscriber($cache);
        }

        return $this->_client;

    }
    
    public function getUser()
	{
        $user = $this->sendRequest('users.ashx/users/username/' . $this->_credentials['login']);

		if(!$user)
		    throw new Exception('Undefined User');

		return (object) array(
			'user_id'	=> $user['UserID'],
			'firstname'	=> $user['Firstname'],
			'lastname'	=> $user['Surname'],
			'fullname'	=> $user['Fullname']
		);
	}

    public function sendRequest($path)
    {
        $request = $this->_getGuzzleClient()->get($path . '?format=json');
        $request->getParams()->set('cache.revalidate', 'skip');
        $responseBody = $request->send()->getBody();
        return json_decode($responseBody, true);
    }
}
