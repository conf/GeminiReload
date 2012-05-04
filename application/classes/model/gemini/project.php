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
}
