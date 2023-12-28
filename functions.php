<?php 
$roots = [
    'main' => '/',
];
$main_script = 'main';

/** Requesting WALKERS */
require get_template_directory() . '/assets/php/walkers.php';
/** Загружаем настройки BOGO */
require get_template_directory() . '/assets/php/kinder_bogo_options.php';
/**константы*/
require get_template_directory() . '/assets/php/const.php';


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
    }
}); 

function custom_category_template($template) {
    if (is_single() && in_category(CKROR_PHOTOS)) {
        $new_template = locate_template(array(CKROR_PHOTOS . '.php'));
        if (!empty($new_template)) {
            return $new_template;
        }
    }
    return $template;
}
add_filter('template_include', 'custom_category_template');

/**так как для страницы и front-page стили сильно разные, делаем разделение загрузки стилей. */
function enqueue_styles_for_page_template($template) {
    //$template содержит полную строку до макета страницы
    if(basename($template) === CKROR_PHOTOS . '.php') {
        wp_enqueue_style('your-custom-style', get_template_directory_uri() . '/assets/css/post/post.css');
        wp_enqueue_style('gallery', get_template_directory_uri() . '/assets/css/gallery_cathegory/gallery.css');
    } else if (basename($template) === 'page.php' || basename($template) === 'single.php') {
        wp_enqueue_style('your-custom-style', get_template_directory_uri() . '/assets/css/post/post.css');
    } else if(basename($template) === 'front-page.php'){
        wp_enqueue_style('main_style', get_template_directory_uri() . '/assets/css/index.css', ['normolize'], null);
    } else if(basename($template) === "home.php" || basename($template) === "archive.php"){
        wp_enqueue_style('arcive_style', get_template_directory_uri() . '/assets/css/archive/archive.css', ['normolize'], null);
    } else if(basename($template) === "single-workers.php"){
        wp_enqueue_style('workers_style', get_template_directory_uri() . '/assets/css/post/post.css', ['normolize'], null);
    } else if(basename($template) === "category-workers.php"){
        wp_enqueue_style('workers_style', get_template_directory_uri() . '/assets/css/workers/workers.css', ['normolize'], null);
    } else if(basename($template) === "search.php"){
        wp_enqueue_style('workers_style', get_template_directory_uri() . '/assets/css/archive/archive.css', ['normolize'], null);
        wp_enqueue_style('search_style', get_template_directory_uri() . '/assets/css/widgets.css', ['normolize'], null);
    } else {
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

     add_theme_support('title-tag');

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
    add_image_size('post_preview', 252, 232, true);
    add_image_size('greetings_portrait', 212, 252, true);
    add_image_size('slider_image', 1440, 386, true);
    add_image_size('banner_background', 1446, 314, true);
}

add_action('after_setup_theme', 'add_custom_image_sizes');
add_action('after_setup_theme', function(){
    load_theme_textdomain( 'kinder', get_template_directory() . '/languages' );
});


/**изменяем шаблон пагинации */
add_filter( 'navigation_markup_template', 'navigation_markup_template_filter', 10, 2 );

function navigation_markup_template_filter( $template, $class ){

    return '
    <span class="previous" href="#"></span>
        <div class="pagination__pages">
            %2$s
        </div>
    ';
}

/** грузим отдельный шаблон для сотрудников, это рубрика в записях. slug = workers */
function custom_single_template($single_template) {
    if (in_category(WORKERS)) {
        $single_template = locate_template(array('single-workers.php'));
    }
    return $single_template;
}
add_filter('single_template', 'custom_single_template');


function my_localizable_post_types( $localizable ) {

    return array_merge( $localizable, ['kinder_infoblocks', 'kinder_slider', 'kinder_links_slider'] ); 
} 
add_filter( 'bogo_localizable_post_types', 'my_localizable_post_types', 10, 1 );


?>