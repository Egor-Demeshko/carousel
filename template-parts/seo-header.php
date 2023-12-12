<?php
    /**
     * @include $page_description
     * @include $page_title
     * @include $url
     
     */
    $page_description = isset($args['page_description']) ? $args['page_description'] : '';
    $page_title = isset($args['page_title']) ? $args['page_title'] : '';
    $url = isset($args['url']) ? $args['url'] : '';

?>


<link rel="icon" type="image/png" href="<?php echo get_stylesheet_directory_uri(); ?>/logo.png" sizes="any">
<link rel="icon" type="image/x-icon" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon.ico">
<meta property="og:title" content="<?php echo $page_title ?>" />
<meta property="og:description" content="<?php echo $page_description ?>" />
<meta property="og:url" content="<?php echo $url ?>" />
<?php 
    $thumbnail = get_the_post_thumbnail_url();
?>
<meta property="og:image" content="<?php echo ($thumbnail && $thumbnail != "") ? $thumbnail : get_template_directory_uri() . '/assets/images/sun.svg' ?>" />


<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<?php echo $page_title ?>">
<meta name="twitter:description" content="<?php echo $page_description ?>">
<meta name="twitter:url" content="<?php echo $url ?>">