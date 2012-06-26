<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Api extends Controller_Abstract {

    public $template = 'json';

    public function action_projects()
	{
		if(!$this->_isLoggedIn()) {
			return;
		}

        $this->template->success = true;

        $gemini_projects = $this->_getFactory()->getProjects();
        $projects = array();
        foreach($gemini_projects as $item) {
            if ($item['ProjectArchived']) {
                continue;
            }

            $projects[$item['ProjectID']] = array(
                'id' => $item['ProjectID'],
                'name' => $item['ProjectName'],
                'label' => $item['ProjectLabel'],

            );
        }

        $this->template->projects = $projects;
	}

//    public function action_test()
//    {
//        $this->template->issuetypes = $this->_getFactory()->sendRequest('projects.ashx/projects/839/components');
//        var_dump($this->template->issuetypes); die;
//    }
}
