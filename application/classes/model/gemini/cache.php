<?php

class Model_Gemini_Cache implements Guzzle\Common\Cache\CacheAdapterInterface {

    private $_cache_path;

    function __construct($cache_path)
    {
        if (!is_dir($cache_path)) {
            mkdir($cache_path, 0777, true);
        }

        $this->_cache_path = realpath($cache_path);

        if (!is_writable($this->_cache_path)) {
            throw new Exception("$cache_path is not writable!");
        }
    }

    function contains($id, array $options = null)
    {
        return is_file($this->_cache_path . '/' . $id);
    }

    function delete($id, array $options = null)
    {
        return unlink($this->_cache_path . '/' . $id);
    }

    function fetch($id, array $options = null)
    {
        if ($this->contains($id)) {
            return file_get_contents($this->_cache_path . '/' . $id);
        }
    }

    function save($id, $data, $lifeTime = false, array $options = null)
    {
        return file_put_contents($this->_cache_path . '/' . $id, $data);
    }
}