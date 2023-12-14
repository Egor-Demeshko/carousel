<?php 
    require get_template_directory() . '/assets/php/navigations/socials.php';
    require get_template_directory() . '/assets/php/navigations/left_navigation.php';
?>

<?php get_header('workers'); ?>
    
<?php get_template_part('/template-parts/content', 'mobile_bottom')?>

<header class="header-post">
<?php 
        $locale = get_locale();
        $addition_to_link = null;
        if($locale !== "ru_RU"){
            $addition_to_link = $locale;
        } else {
            $addition_to_link = '';
        } 
    ?>
    <span>
        <a class="header-post__logo" href="/<?php echo $addition_to_link;?>" aria-label="Перейти на главную страницу">
            <?php echo !empty( get_field("kinder-logo-text")) ? get_field("kinder-logo-text") : (get_bloginfo('name')  ? get_bloginfo('name') : __("Логотип", "kinder"));?>
        </a>
    </span>    <div class="header-post__menu">
        <nav>
            <?php 
                if( has_nav_menu("top_menu") ){
                    wp_nav_menu(array(
                        'theme_location' => 'top_menu',
                        'container' => false,
                        'menu_class' => 'header-post__list',
                        'depth' => 1,
                        "items_wrap" => '<ul class="%2$s">%3$s</ul>',
                        'walker' => new Top_Menu()
                    ));     
                } else {
                    ?>
                    <ul class="header__list">
                        <li class="header-post__menu-item"><a aria-label = "Перейти на главную" href="/"><?php echo __("Главная", "kinder") ?></a></li>
                        <li class="header-post__menu-item"><a aria-label = "Перейти к всем записям" href="/posts"><?php echo __("Все записи", "kinder") ?></a></li>
                    </ul>
                    <?php
                }
            ?>
        </nav>
        <div class="header-post__icon_wrapper" aria-role="button" aria-label="включить/выключить режим высокого контраста">
            <svg class="header-post__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="cancel" class="header-post__icon_cancel" fill="currentColor" d="M21.7699 2.22988C21.4699 1.92988 20.9799 1.92988 20.6799 2.22988L2.22988 20.6899C1.92988 20.9899 1.92988 21.4799 2.22988 21.7799C2.37988 21.9199 2.56988 21.9999 2.76988 21.9999C2.96988 21.9999 3.15988 21.9199 3.30988 21.7699L21.7699 3.30988C22.0799 3.00988 22.0799 2.52988 21.7699 2.22988Z" />
            </svg>
        </div>
        
        <?php echo do_shortcode( '[bogo]' ); ?>
    </div>
</header>


<div class="banner">
    <?php 
    /**если есть изображение из ACF, то выводим его
     * иначе get_post_thumbnail_id
     * или BANNER_WORKERS_DEFAULT
     */
        $id = get_post_thumbnail_id();
        $url = null;
        if($id){
            $url = wp_get_attachment_image_src( $id, 'banner_background' )[0];
        }
    ?>
    <img class="banner__image" src="<?php 
        echo ($url) ? $url : esc_url( get_template_directory_uri() . BANNER_WORKERS_DEFAULT);
    ?>" alt="banner" role="presentation" width="1446" height="314" aria-hidden="true">
</div>

    <div class="main_flow">
        <aside class="main_flow__aside">
            <nav class="menu" aria-label=<?php echo __("Основное меню", "kinder")?>>
                <div class="menu__sticky">
                    <h3 class="menu__heading"><?php echo __("Навигация", "kinder")?></h3>   
                    <?php get_left_top_menu(); ?>
                    <?php echo get_left_middle_menu(); ?>
                    <div class="menu__socials">
                        <?php echo get_left_socials(); ?>
                    </div>
                </div>
            </nav>
        </aside>
        <main class="main_flow__main">
            <div class="main" >
                <div class="main__wrapper">
                    <header class="main__header main__header--relative">
                        <?php get_template_part('/template-parts/content', 'breadcrumbs_single')?>
                        <div class="main__author_info">
                            <div class="main__author--absolute">
                                <?php $fields = get_fields();
                                $title = array_key_exists('kinder_workers_title', $fields) ? $fields['kinder_workers_title'] : null;
                                $photo_id = array_key_exists('kinder_workers_fotografiya', $fields) ? $fields['kinder_workers_fotografiya'] : null;
                                $name = array_key_exists('kinder_workers_name', $fields) ? $fields['kinder_workers_name'] : null;
                                $short_text = array_key_exists('kinder_workers_short_text', $fields) ? $fields['kinder_workers_short_text'] : null;
        
                                ?>
                                <h1 class="banner__title banner__title--big-screen">
                                    <?php 
                                        if($title): echo $title;
                                        else: echo __("Сотрудник детского сада", "kinder");
                                        endif;
                                    ?>
                                </h1>

                                <?php 
                                    $photo_url = null;
                                    $photo_alt = null;
                                    if($photo_id) {
                                        $photo_url = wp_get_attachment_image_src($photo_id, 'greetings_portrait')[0];
                                        $photo_alt = get_post_meta($photo_id, '_wp_attachment_image_alt', TRUE);
                                    }
                                        ?>
                                        <img src=<?php echo ($photo_url) ? $photo_url : esc_url( get_template_directory_uri() . WORKERS_DEFAULT); ?> alt="<?php echo $photo_alt; ?>"/>
                                        
                                <p class="main__author_name"><?php 
                                    if($name): echo $name;
                                    else: echo __("Имя не указано", "kinder");
                                    endif;
                                ?></p>
                            </div>
                        </div>
                    </header>

                    <!-- BREAKER-->
                    <div style="height: 4px; background-color: var(--grey); margin: 2.5rem 0; border-radius: 2px;">
                    </div>
                    <!-- END OF BREAKER-->
                    <div class="main__precept_wrapper"> 
                    <?php 
                        if($short_text && $short_text !== ''){
                            echo $short_text;
                        } else {
                            ?>
                            <p></p>
                            <?php
                        }
                    ?>
                        <div class="main__placeholder"></div>
                    </div>

                    <article class="main__content main__content--margin-top--workers">
                        <?php the_content(); ?>
                    </article>
                </div>
            </div>

        </main>
    </div>

<?php get_footer()?>
</body>
</html>
