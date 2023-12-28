<?php

$args = array(
    'post_type' => 'post',
    'category_name' => CKROR_PHOTOS,
    'posts_per_page' => -1,
);

$query = new WP_Query($args);
$fullImagesData = [];
$cat = get_category_by_slug(CKROR_PHOTOS); 
$category_id = $cat->term_id; 
$category_name = $cat->name;
$category_link = get_category_link($category_id);

if($query->have_posts()) :
    ?> <section class="photos" data-gallery="ckror">
            <header class="photos__row">
                <h3 class="no-margin page_block_title mb10"><?php echo $category_name?></h3>
                <a href="<?php echo $category_link ?>" class="eliminate-link photos__goto-link"><?php _e("Посмотреть все записи с фотографиями", "ckror") ?></a>
            </header>
            <div class="photos__gallery">
    <?php
    while($query->have_posts()) :
        $query->the_post();
        
        if (get_post_gallery()) {
            $gallery = get_post_gallery(get_the_ID(), false);
            $ids = $gallery["ids"];
            $ids_array = explode(",", $ids);
            $image_id = $ids_array[0];

            $full = wp_get_attachment_image_src($image_id, 'full')[0];
            $medium = wp_get_attachment_image_src($image_id, 'medium')[0];
            $fullImagesData[] = ['id' => $image_id, 'url' => $full];
            echo get_template_part("template-parts/blocks/gallery/gallery-item", "", ["image_id" => $image_id, "medium" => $medium]);
        }
        
    endwhile;
    wp_reset_postdata();
    ?>
        </div>
    </section>
    <?php
endif;