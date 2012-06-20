<?php
if (!isset($kohana_view_data)) {
    $kohana_view_data = array();
}

Request::current()->response()->headers('Content-type', 'application/json; charset=UTF-8');
echo json_encode($kohana_view_data);