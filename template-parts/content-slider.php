<li class="glide__slide" style="background-image: url('<?php the_post_thumbnail_url("slider_image"); ?>');">
    <div class="glide__slide_background"></div>
    <div class="glide__message_wrapper">
        <h4 class="glide__header"><?php the_title(); ?></h4>
        <?php the_excerpt(); ?>
        <?php $custom_link = get_field('kinder_slider_link');
        $link = get_permalink();
        if($custom_link){?>
            <a class="glide__button" href="<?php echo $custom_link?>" rel="nofollow" target="_blank">Подробнее</a>
        <?php } else if ($link){?>
            <a class="glide__button" href="<?php echo $link?>">Подробнее</a>
        <?php }?>
    </div>
</li>