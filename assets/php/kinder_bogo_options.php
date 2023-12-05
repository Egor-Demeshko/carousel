<?php 
add_filter( 'bogo_use_flags', function() {
    return false;
});

add_filter( 'bogo_language_switcher','replace_bogo_text');
function replace_bogo_text($output){
		$output = str_replace('Русский','RU',$output);
		$output = str_replace('Беларуская мова','BY',$output);
		return $output;
}
