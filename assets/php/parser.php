<?php
require get_template_directory() . '/DiDom/Document.php';
require_once(ABSPATH . 'wp-config.php'); 
require_once(ABSPATH . 'wp-includes/class-wpdb.php'); 
require_once(ABSPATH . 'wp-admin/includes/taxonomy.php'); 

use DiDom\Document;

$nextDocument = new Document();


define("PHOTOS_SLUG", "ckror_photos");
define("IMG_EL", '.pv_next_nav>img');

function start_parser($request){
    $type = $request->get_param('type');
    $route = $request->get_param('route');
    $subroute = '';//strlen($request->get_param('subroute')) > 0 ? $request->get_param('subroute') : '';

    /** @var string url */
    define("MAIN_URL", $route . (strlen($subroute) > 0 ? $subroute : ''));
    if($type === "photo" && strlen($subroute) > 0){
        return null;
        //start_photo_parser(MAIN_URL);
    }

    if($type !== "post"){
        return false;
    }

    $document = new Document(MAIN_URL, true);
    $menu = null;
    $not_inclueded_posts = [];
    
    if($document->has(".sch_menu_box2")){
        $menu = $document->find(".sch_menu_box2 > li");
    }
    
    /* $item - li первого уровня */
    foreach ($menu as $item) {
        /**получаем из li название и ссылку */
        
        /**@description первая ссылка */
        $anchor = $item->find('div>a')[0]; 
        $title = $anchor->text();  

        $next_post_html = parser_get_post($anchor);
        // $collectedHtml[] = ;
        $cat = create_category($title);
        
        /** @var int $main_post_id */
        $main_post_id = create_post(['title' => $title, 'html' => $next_post_html], $cat);
        
        if($item->has("ul")){
            //если в <li> элементе меню есть внутренний список, то значит 
            //$title - это будет название раздела. создаем раздел. 
            //затем для этого раздела создаем посты
            
            $sub_menu = $item->find("ul");
            $sub_menu_items = $sub_menu[0]->find("li");
            $collectedHtml = [];
            
            /**@param $sub_item - li второго уровня */
            foreach ($sub_menu_items as $sub_item) {
                /**получаем из li название и ссылку */
                $anchor = $sub_item->find('a')[0];
                $title = $anchor->text();
                $next_post_html = parser_get_post($anchor);
                $collectedHtml[] = [ 'title' => $title, 'html' => $next_post_html ];
                usleep(200000);
            }
            
            if(is_numeric($main_post_id)){
                $not_inclueded_posts = create_posts($collectedHtml, $cat, $main_post_id);
            } else {
                $not_inclueded_posts = create_posts($collectedHtml, $cat);
            }
        }

        usleep(200000);
    }


    return ['not_inclueded_posts' => $not_inclueded_posts];
}
    
    
function parser_get_post($anchor){
    global $nextDocument;
    if(!isset($anchor)) return null;
    $href = $anchor->getAttribute('href');
    $link = MAIN_URL . substr($href, 1);
    
    $nextDocument->loadHtmlFile($link);
    if($nextDocument->has('article')){
        $article = $nextDocument->find('article')[0];
        $innerHtml = $article->innerHtml();
        return $innerHtml;
    }
}

/**
 * $collectedHtml is an array which contains a set of associative arrays.
 * Each associative array has two fields: $title and $html.
 * Both $title and $html are strings.
 * 
 * @var array<array{title: string, html: string}> $collectedHtml
 * @param $cat - id категории
 * @param $parent_id - id родительского поста
 * @return array<string>
 */
function create_posts($collectedHtml, $cat, $parent_id=null){
    $operationResult = [];
    foreach($collectedHtml as $post_data){
        $operationResult[] = create_post($post_data, $cat, $parent_id);
    }

    return $operationResult;
}


/**
 * Creates a post with the given data.
*  @param $cat - id категории
 * @throws WP_Error if the post insertion fails
 * @return int||array the ID of the newly created post or an errors array
 */
function create_post($post_data, $cat=null, $parent_id=null){
    $post_arr = array(
        'post_title'    => wp_strip_all_tags( $post_data['title'] ),
        'post_content'  => $post_data['html'],
        'post_status'   => 'publish',
        'post_author'   => 1,
        'post_type'     => 'post',
        'post_category' => ($cat) ? array($cat) : array(),
        'parent_id' => $parent_id
    );

    // Insert the post into the database
    $result = wp_insert_post( $post_arr );
    if ($result === 0 || $result instanceof WP_Error){
        $result = ['status' => 'error', 'not_inclueded_posts' => $post_data['title']];
    }

    return $result;
}


/**
 * @param string $title
 * @return int || null $id - айди категории
 */
function create_category($title){
    $id = null;
    //проверить в wp есть ли категория с таким названием $title
    $id = get_cat_ID($title);
    //если нет, то создать новую категорию
    if ($id == 0) {
        $insert_result = wp_create_category(substr($title, 0, 200));

        if((is_numeric($insert_result) && $insert_result > 0)){
            $id = $insert_result;
        } else {
            //если id не нашлось и не создалось - вернуть null
            $id = null;
        }
    }
    //возращаем id
    return $id;
}



/** ФОТО СОЗДАНИЕ */
function start_photo_parser($route){
    $albums = go_for_albums($route);
    return $albums;
}


/**
 * @return array<string>
 */
function go_for_albums($route){
    
    global $nextDocument;
    $origin = get_origin($route);
    if(empty($origin)) return [];
    $nextDocument->loadHtmlFile($route);
    /**@type array<string> */
    $albums = [];

    
    if($nextDocument->has('div.sch_ptbox_list')){
        $album_list = $nextDocument->find('div.sch_ptbox_list')[0]->find('.sch_ptbox_item');
        foreach($album_list as $album){
            $href = $album->find('div.photo_wrap>a')[0]->getAttribute('href');
            /**@type string
             * @description Название альбома*/
            $title = $album->find('div.name>a')[0]->text();
            $albums[] = ["link" => $href, "title" => $title];           
        }
    }
    $result = go_for_photos($origin, $albums);
    return $result;
}

/**
 * Get the origin of a given route.
 *
 * @param string $route The route for which to get the origin.
 * @return string|null The origin of the route, or null if the route is empty.
 */
function get_origin($route){
    if(empty($route)): return null; endif;
    
    $parsed_url = parse_url($route);
    $origin = $parsed_url['scheme'] . "://" . $parsed_url['host'];
    return $origin;
}


function go_for_photos($origin, $albums){
    global $headers;
    global $nextDocument;

    $galleries = [];

    foreach($albums as $album){
        
        //$link "https://ckroir-korelichi.schools.by/photoalbum/1092082"
        $link = $origin . $album['link'];
        $headers['Referer'] = $link;
        $headers['Host'] = $origin;
        $nextDocument->loadHtmlFile($link);
        $container = null;

        if($nextDocument->has('div.photos-container')){
            $container = $nextDocument->find('div.photos-container')[0];
        }

        if(!empty($container)){
            $photos_links = extract_photos($container, $origin);
            //TODO удалить return 
            return $galleries[] = ['title' => $album['title'], "photo_link" => $photos_links];
        }

        usleep(200000);
    }

    return $galleries;
}

/**
 * @param DiDom\Element $container
 * @return array<string>
 */
function extract_photos($container, $origin){

    $photos_links = [];

    if($container->has('div.photo-row')){
        $photo_link = $container->find('div.photo-row');

        foreach($photo_link as $link){
            $photo_id =$link->find('a')[0]->getAttribute('photoid');

            $photos_links[] = $origin . '/photo/' . $photo_id;;
        }

    }

    return open_photos($photos_links);
}
    
/**
 * Получаем ссылки, при вызове которых будет открыт контейнер отображения фотографии
 * там уже будет лежать фотография в оригинальном размере.
 * @param array<string> $photos_links
 * @return array<string>
 */
function open_photos($photos_links){
    global $nextDocument;
    global $headers;
    global $client;
    
    $fullsize_photos_links = [];
    foreach($photos_links as $link){
        $response = $client->request('GET', $link, $headers);
        return $response->getStatusCode();

        $nextDocument->loadHtmlFile($link);
        
        usleep(100000);
        return ['content'=>$nextDocument->html(), 'link' => $link];
        if($nextDocument->has(IMG_EL)){
            $img = $nextDocument->find(IMG_EL)[0];
            $fullsize_photos_links[] = $img->getAttribute('src');
        }
        return $fullsize_photos_links;
    }

    return $fullsize_photos_links;    
}