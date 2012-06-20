<?php
if (!isset($kohana_view_data)) {
    $kohana_view_data = array();
}

if (!function_exists('array_to_xml')) {
    function array_to_xml($data, $xml) {
        foreach($data as $key => $value) {
            if(is_array($value)) {
                if (is_numeric($key)) {
                    $key = rtrim($xml->getName(), 's');
                }

                $subnode = $xml->addChild("$key");
                array_to_xml($value, $subnode);
            }
            else {
                $xml->addChild("$key", html::chars("$value"));
            }
        }
    }
}

$xml = new SimpleXMLElement('<response/>');
array_to_xml($kohana_view_data, $xml);
Request::current()->response()->headers('Content-type', 'text/xml; charset=UTF-8');
echo $xml->asXML();
