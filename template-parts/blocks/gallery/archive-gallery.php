
<?php
    $post_title = get_the_title();
    $post_link = get_permalink();
    $is_single = $args["single"] ?? false;
?>

<section class="photos" data-gallery="ckror">
    <header class="photos__row">
        <h3 class="no-margin page_block_title mb10"><?php echo $post_title?></h3>
    </header>
    <div class="photos__gallery">

    <?php
    if (get_post_gallery()) {
        $gallery = get_post_gallery(get_the_ID(), false);
        $ids = $gallery["ids"];
        $ids_array = explode(",", $ids);

        if(!$is_single){
            $ids_array = array_slice($ids_array, 0, 6);
        }

        foreach ($ids_array as $image_id) {
            $medium = wp_get_attachment_image_src($image_id, 'medium')[0];
            echo get_template_part("template-parts/blocks/gallery/gallery-item", "", ["image_id" => $image_id, "medium" => $medium]);    // your code here
        }
    }
    ?>
    </div>

    <?php
    if(!$is_single){
    ?>
        <div class="photos__button_wrapper">
            <a class="photos__button eliminate-link" aria-label="<?php _e("Посмотреть все фотографии", "ckror")?>" href="<?php echo $post_link?>"><?php _e("Подробнее", "ckror")?></a>
        </div>
    <?php
    }
    ?>
</section>