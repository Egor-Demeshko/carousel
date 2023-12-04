<?php 
$roots = [
    'main' => '/',
];
$main_script = 'main';

/** ДОБАВЛЯЕМ СКРИПТЫ И СТИЛИ. СТИЛИ отличаются у второстепенных от главной, поэтому используется
 * еще функция $enqueue_script_add_type_attribute
 */
add_action("wp_enqueue_scripts", function(){
    global $roots;
    global $main_script;
    $URI = $_SERVER['REQUEST_URI'];

    /**загрузим скприты и стили для главной */
    if(str_contains($URI, $roots['main'])){
        wp_enqueue_style('normolize', get_template_directory_uri() . '/assets/css/normolize.css', [], null);
        wp_enqueue_script($main_script, get_template_directory_uri() . '/assets/js/index.js', [], null);
        wp_enqueue_style('main_style', get_template_directory_uri() . '/assets/css/index.css', ['normolize'], null);
    }
}); 

/** Функция для добавления атрибута type=module к элементу скрипта */
$enqueue_script_add_type_attribute = static function( $tag, $handle ) use ( $main_script ) {
    // if not your script, do nothing and return original $tag
    if ( $main_script === $handle ) {
        // remove the current type if there is one
        $tag = preg_replace( '/ type=([\'"])[^\'"]+\1/', '', $tag ); 
    
        // add type
        $tag = str_replace( 'src=', 'type="module" src=', $tag );
        return $tag;
    }


    return $tag;
};

add_filter( 'script_loader_tag', $enqueue_script_add_type_attribute , 10, 3 );



/**РЕГИСТРАЦИЯ МЕНЮ */

add_action( 'after_setup_theme', function (){
    register_nav_menus( [
        `top_menu` => 'Верхнее меню',
    ] );
} );
?>