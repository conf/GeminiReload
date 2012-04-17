<?php
    //header('Location: index.html');
	
	header('Content-type: text/css');
    require_once('../../../../lib/RecursiveTree/RecursiveTree.Class.php');

    $MINIFY_URL = 'http://sandbox.local/lib/min/f';
    $PROJECT_FOLDER = 'questex';

    $all_css = RecursiveTree::get('../blocks', '.css');
    $all_png = RecursiveTree::get('../blocks', '.png');
    $all_jpg = RecursiveTree::get('../blocks', '.jpg');
    $all_gif = RecursiveTree::get('../blocks', '.gif');
    $all_js = RecursiveTree::get('../blocks', '.js');

    $all_css_compiled = null;
    $all_js_compiled = null;
	$wp_replace_font_path = null;
	$wp_output = null;
	
	

    foreach($all_css as $key => $value) {
        $all_css_compiled .= '/* '.$value.' */'.
            PHP_EOL.file_get_contents($value, "r").
            PHP_EOL.PHP_EOL;
    }
	
	$final_output = str_replace("url('", "url(../images/", $all_css_compiled);
	
    $fp = fopen('../css/all.css', "w+");
    fwrite($fp, $final_output);
    fclose($fp);


    $compiled_css = file_get_contents($MINIFY_URL.'=projects/'.$PROJECT_FOLDER.'/html/css/all.css');

    $_fp = fopen('../css/all.min.css', "w+");

    fwrite($_fp, $compiled_css);
    fclose($_fp);
	
	$wp_replace_font_path = str_replace("url(../images/", "url(images/", $all_css_compiled);
	$wp_output = str_replace("../fonts/", "fonts/", $wp_replace_font_path);
	
    $_fpWP = fopen('../css/style.css', "w+");

    fwrite($_fpWP, $wp_output);
    fclose($_fpWP);	

    foreach($all_png as $key => $value) {
            copy($value, '../images/'.basename($value));
    }

    foreach($all_jpg as $key => $value) {
            copy($value, '../images/'.basename($value));
    }

    foreach($all_gif as $key => $value) {
            copy($value, '../images/'.basename($value));
    }

    foreach($all_js as $key => $value) {
            $all_js_compiled .= '/* '.$value.' */'.PHP_EOL.file_get_contents($value, "r").PHP_EOL.PHP_EOL;
    }

	
    echo '/* Compiled CSS */';
    echo ''.$final_output.'';
	//header('Location: index.htm');
?>