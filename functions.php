<?php 
$roots = [
    'main' => '/',
];
$main_script = 'main';

/** Requesting WALKERS */
require get_template_directory() . '/assets/php/walkers.php';
/** Загружаем настройки BOGO */
require get_template_directory() . '/assets/php/kinder_bogo_options.php';


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

       // wp_enqueue_style('page_style', get_template_directory_uri() . '/assets/css/post/post.css', ['normolize'], null);
       // wp_enqueue_style('main_style', get_template_directory_uri() . '/assets/css/index.css', ['normolize'], null);
    }
}); 

/**так как для страницы и front-page стили сильно разные, делаем разделение загрузки стилей. */
function enqueue_styles_for_page_template($template) {
    //$template содержит полную строку до макета страницы
    if (basename($template) === 'page.php') {
        wp_enqueue_style('your-custom-style', get_template_directory_uri() . '/assets/css/post/post.css');
    } else if(basename($template) === 'front-page.php'){
        wp_enqueue_style('main_style', get_template_directory_uri() . '/assets/css/index.css', ['normolize'], null);
    }
    return $template;
}
add_filter('template_include', 'enqueue_styles_for_page_template');


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
    register_nav_menus( array(
        'top_menu' => 'Верхнее меню',
        'socials' => 'Социальные сети',
        'left_navigation_main' => 'Главное. Левое верхнее навигационное меню',
        'left_navigation_secondary_menu' => 'Второстепенное. Левое среднее навигационное меню',
        'left_socials' => 'Социальные сети. Левая навигация, внизу',
        'footer_menu' => 'Меню в футере. Подвал сайта',
        'mobile_bottom_bar' => "Мобильное меню. внизу, где две кнопки"
     ) );

} );


/** регистрируем поле виджетов */
add_action( 'widgets_init', function(){
    register_sidebar( [
        'name' => __('Правое поле виджетов', "kinder"),
        'id' => 'right_sidebar',
        'description' => __('Правое поле виджетов, справа от блока новостей. Выводится на главной странице.', "kinder"),
        'before_widget' => '<div id="%1$s" class="widgets__box %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h4>',
        'after_title' => '</h4>',
    ]);

    register_sidebar( [
        'name' => __('Текст в футере, внизу', "kinder"),
        'id' => 'footer_sidebar',
        'description' => __('Правое поле виджетов, справа от блока новостей. Выводится на главной странице.', "kinder"),
        'before_widget' => '',
        'after_widget' => '',
        'before_title' => '<h4>',
        'after_title' => '</h4>',
        'before_sidebar' => '<div class="footer__info %2$s">',
        'after_sidebar' => '</div>'
    ]);
});


/** РЕГИСТРИРУЕМ КАСТОМНЫЕ ТИПЫ ЗАПИСИ. ДЛЯ СЛАЙДЕРА */
add_action( 'init', 'kinder_register_post_types' );

/**меня форматы изображение */
// Дерегистрируем существующие размеры
function remove_image_sizes() {
    remove_image_size('medium');
    remove_image_size('medium_large');
    remove_image_size('large');
    remove_image_size('2048x2048');
}

add_action('init', 'remove_image_sizes');

// Добавляем новые размеры
function add_custom_image_sizes() {
    add_image_size('post_preview', 232, 252, true);
    add_image_size('greetings_portrait', 252, 212, true);
    add_image_size('slider_image', 1440, 386, true);
    add_image_size('banner_background', 1446, 314, true);
}

add_action('after_setup_theme', 'add_custom_image_sizes');


?>
