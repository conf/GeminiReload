<?php

class Model_Gemini_Project extends Model
{
    /**
     * @var Guzzle\Service\ClientInterface
     */
    private $_client;

    public function __construct(Guzzle\Service\ClientInterface $client)
    {
        $this->_client = $client;
    }

    public function getAll()
    {
        $gemini_projects = json_decode($this->_client->get('projects.ashx/projects?format=json')->send()->getBody(), true);
        $projects = array();
        foreach ($gemini_projects as $item) {
            $projects[$item['ProjectID']] = $item;
        }

        return $projects;
    }
}
