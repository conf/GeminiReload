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
		$gemini_projects = json_decode($this->_getGuzzleClient()->get('projects.ashx/projects?format=json')->send()->getBody(), true);
		$projects = array();
		foreach ($gemini_projects as $item) {
			$projects[$item['ProjectID']] = $item;
		}

		return $projects;
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
        }

        return $this->_client;

    }
}
