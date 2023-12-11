<?php 
    $day = get_the_date('d');
    $month = get_the_date('F');
    $title = get_the_title();
    $excerpt = get_the_excerpt();
    $author = get_the_author();
    $author_link = get_author_posts_url(get_the_author_meta('ID'));
    $thumbnail = get_the_post_thumbnail_url("post_preview");
    $alt_text = get_post_meta(get_post_thumbnail_id(), '_wp_attachment_image_alt', true);
?>
<div class="list_card" aria-label="<?php __('одиночная карточка новости', 'kinder')?>">
    <div class="list_card__point"></div>
    <div class="list_card__date">
        <div class="list_card__date_background"></div>
        <span class="list_card__day" aria-label="день записи"><?php echo $day; ?></span>
        <span class="list_card__month" aria-label="месяц записи"><?php echo $month ?></span>
    </div>
    <div class="list_card__content_wrapper">
        <div class="list_card__content">
            <div class="list_card__heading_wrapper">
                <h4 class="list_card__heading" aria-label=<?php echo __("заголовок записи")?>><?php echo $title ?></h4>
                <div class="list_card__line" role="presentation"></div>
            </div>
            <p class="list_card__text" aria-label="<?php echo __("короткое содержание записи")?>">
                <?php echo $excerpt ?>
            </p>
            <div class="list_card__bottom">
                <span class="list_card__author"><?php echo __("автор:", "kinder")?><a 
                aria-label="<?php __("Посмотреть информацию об авторе")?>" href="<?php echo $author_link;?>"><?php echo $author ?></a></span>
                <a class="list_card__link" href="<?php the_permalink(); ?>" target="_blank"><?php echo __("Читать далее", "kinder")?></a>
            </div>
        </div>

            <div class="list_card__thumbnail_wrapper">
                <img class="list_card__thumbnail" 
                src="<?php echo $thumbnail ? $thumbnail : esc_url( get_template_directory_uri() . '/assets/images/mask_landscape.svg' ); ?>"
                alt="<?php echo $alt_text ? $alt_text : __("превью записи", "kinder") ?>"/>
            </div>
    </div>
</div>