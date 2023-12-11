<?php 
    /** Загружаем меню социальных сетей */
    require get_template_directory() . '/assets/php/navigations/socials.php';
    require get_template_directory() . '/assets/php/navigations/left_navigation.php';
    function get_main_top_background(){
        $url = get_field("kinder_main_top_background_image") ?: esc_url( get_template_directory_uri() . '/assets/images/background.png' );
        return $url;
    }
?>

<?php get_header('main') ?>


    <div class="header__background">
        <div class="header__background_image" style="background-image: url(<?php echo get_main_top_background();?>" role="presentation">
        </div>

        <?php echo create_socials_menu(); ?>
    </div>
    <?php get_template_part('template-parts/content', "mobile_bottom")?>

    <img class="sun_icon" alt="Картинка солнца" role="presentation" src="<?php echo get_template_directory_uri() . "/assets/images/sun.svg"; ?>"/>
    <header class="header">
        <span><a class="header__logo" href="/"><?php the_title();?></a></span>
        <div class="header__menu">
            <nav>
                <?php 
                if( has_nav_menu("top_menu") ){
                    wp_nav_menu(array(
                        'theme_location' => 'top_menu',
                        'container' => false,
                        'menu_class' => 'header__list',
                        'depth' => 1,
                        "items_wrap" => '<ul class="%2$s">%3$s</ul>',
                        'walker' => new Top_Menu()
                    ));     
                } else {
                    ?>
                    <ul class="header__list">
                        <li class="header__menu-item"><a href="/"><?php echo __("Главная", "kinder") ?></a></li>
                        <li class="header__menu-item"><a href="/posts"><?php echo __("Все записи", "kinder") ?></a></li>
                    </ul>
                    <?php
                }
                ?>
            </nav>
            
            <div class="header__icon_wrapper" role="button" aria-label="включить/выключить режим высокого контраста">
                <svg class="header__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path id="cancel" class="header__icon_cancel" fill="currentColor" d="M21.7699 2.22988C21.4699 1.92988 20.9799 1.92988 20.6799 2.22988L2.22988 20.6899C1.92988 20.9899 1.92988 21.4799 2.22988 21.7799C2.37988 21.9199 2.56988 21.9999 2.76988 21.9999C2.96988 21.9999 3.15988 21.9199 3.30988 21.7699L21.7699 3.30988C22.0799 3.00988 22.0799 2.52988 21.7699 2.22988Z" />
                </svg>
            </div>
            <?php echo do_shortcode( '[bogo]' ); ?>
        </div>
    </header>
    
    
    <main class="main">
        <!-- Greetings -->
        <div class="greetings">
            
            <div class="greetings__text-wrapper">
                <!-- Greetings__image -->
                <div class="greetings__image">
                    <img src="<?php 
                    $url = get_field("kinder_greetings_image");
                    if($url){
                        echo $url;
                    } else {
                        echo get_template_directory_uri() . '/assets/images/mask_portrait.svg';
                    }
                    
                    ?>" width="210px" height="240px" alt="<?php echo __("Изображение работника организации", "kinder")?>"/>

                    <?php
                        $titul = get_field("kinder_greetings_titul");
                        $name = get_field("kinder_greetings_name");
                        if($titul || $name){
                            ?>
                            <div class="greerings__sign">
                                <?php
                                if($titul){
                                    ?> 
                                    <h4><?php echo $titul ?></h4>
                                    <?php
                                }
                                if($name){
                                    ?>
                                <p><?php echo $name ?></p>
                                <?php
                                }                        
                                ?>
                            </div>
                            <?php
                        }
                        ?>
                </div>
                <!-- END OF Greetings__image -->
                <?php
                    $heading = get_field("kinder_greetings_heading");
                    if($heading){
                ?>
                <h3 class="greetings__heading">
                    <?php  
                        echo get_field("kinder_greetings_heading"); ?>
                </h3>
                    <?php
                        }
                    ?>
                <div class="greetings__text">
                    <?php  echo get_field("kinder_greetings_text"); ?>
                </div>
            </div>
                
                
                <!-- Quote -->
                <svg class="quote__bottom" width="42" height="32" viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27 20.1951H29.9781C28.5851 24.3732 27.3955 26.3741 23.4375 28.0823C22.7769 28.3675 22.4032 29.0956 22.5439 29.8223C22.6845 30.5476 23.2998 31.0695 24.0147 31.0695H24.0177C32.275 31.0542 37.0182 27.6257 40.3815 19.2455C41.455 16.6133 42 13.7962 42 10.8743C42 6.3807 40.6875 3.93367 38.6865 0.713001C38.4111 0.268553 37.935 -4.19617e-05 37.4253 -4.19617e-05L27 -4.19617e-05C24.5186 -4.19617e-05 22.5 2.09047 22.5 4.66038V15.5347C22.5 18.1046 24.5186 20.1951 27 20.1951ZM4.5 20.1951L7.4781 20.1951C6.08505 24.3732 4.89555 26.3741 0.9375 28.0823C0.276901 28.3675 -0.0967484 29.0956 0.0439529 29.8223C0.184502 30.5476 0.799801 31.0695 1.5147 31.0695H1.5177C9.77505 31.0542 14.5182 27.6257 17.8815 19.2455C18.955 16.6133 19.5 13.7962 19.5 10.8743C19.5 6.3807 18.1875 3.93367 16.1865 0.713001C15.9111 0.268553 15.435 -4.19617e-05 14.9253 -4.19617e-05H4.5C2.01855 -4.19617e-05 0 2.09047 0 4.66038V15.5347C0 18.1046 2.01855 20.1951 4.5 20.1951Z"/>
                </svg>
                <svg class="quote__top" width="42" height="32" viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27 20.1951H29.9781C28.5851 24.3732 27.3955 26.3741 23.4375 28.0823C22.7769 28.3675 22.4032 29.0956 22.5439 29.8223C22.6845 30.5476 23.2998 31.0695 24.0147 31.0695H24.0177C32.275 31.0542 37.0182 27.6257 40.3815 19.2455C41.455 16.6133 42 13.7962 42 10.8743C42 6.3807 40.6875 3.93367 38.6865 0.713001C38.4111 0.268553 37.935 -4.19617e-05 37.4253 -4.19617e-05L27 -4.19617e-05C24.5186 -4.19617e-05 22.5 2.09047 22.5 4.66038V15.5347C22.5 18.1046 24.5186 20.1951 27 20.1951ZM4.5 20.1951L7.4781 20.1951C6.08505 24.3732 4.89555 26.3741 0.9375 28.0823C0.276901 28.3675 -0.0967484 29.0956 0.0439529 29.8223C0.184502 30.5476 0.799801 31.0695 1.5147 31.0695H1.5177C9.77505 31.0542 14.5182 27.6257 17.8815 19.2455C18.955 16.6133 19.5 13.7962 19.5 10.8743C19.5 6.3807 18.1875 3.93367 16.1865 0.713001C15.9111 0.268553 15.435 -4.19617e-05 14.9253 -4.19617e-05H4.5C2.01855 -4.19617e-05 0 2.09047 0 4.66038V15.5347C0 18.1046 2.01855 20.1951 4.5 20.1951Z"/>
                </svg>
                <!-- END of Quote -->
        </div>
        <!-- END OF Greetings -->
        <!-- SIDE MENU -->
        <nav class="menu">
            <div class="menu__sticky">
                <h3 class="menu__heading">Навигация</h3>

                <?php echo get_left_top_menu(); ?>

                <?php echo get_left_middle_menu(); ?>

                <div class="menu__socials">
                    <?php echo get_left_socials(); ?>
                    <!--<div class="menu__socials_list">
                        <a href="#"><img src="/assets/icons/Instagram_green.svg"/></a>
                        <a href="#"><img src="/assets/icons/youtube_green.svg"/></a>
                    </div>-->
                </div>
            </div>
        </nav>
        <!-- END OF SIDE MENU -->
        

            
            <?php 
                $query = new WP_Query([
                    'post_type' => 'any',
                    'posts_per_page' => 3,
                    'post__not_in' => get_posts([
                        'post_type' => 'kinder_slider', 
                        'post_type' => 'kinder_additional_infoblocks', 
                        'post_type' => 'kinder_links_slider',
                        'fields' => 'ids'])
                ]);

                
            ?>
            <!-- News -->
            <div class="news">
                <h2 class="news__heading"><?php echo __("Последние записи", "kinder")?></h2>
                
                <div class="news__block-wrapper">
                    <!-- News card -->
                    <?php
                        while($query->have_posts()){
                            $query->the_post();
                            $day = get_the_date('d');
                            $month = get_the_date('F');
                            $title = get_the_title();
                            $excerpt = get_the_excerpt();
                            $author = get_the_author();
                            $author_link = get_author_posts_url(get_the_author_meta('ID'));
                        
                    ?>
                    <div class="news_card">
                        <div class="news_card__point"></div>
                        <div class="news_card__date" aria-label="<?php echo __("Дата публикации", "kinder")?>">
                            <div class="news_card__date_background"></div>
                            <span class="news_card__day"><?php echo $day; ?></span>
                            <span class="news_card__month"><?php echo $month; ?></span>
                        </div>
                        <div class="news_card__content">
                            <h4 class="news_card__heading"><?php echo $title; ?></h4>
                            <p class="news_card__text">
                                <?php echo $excerpt; ?>
                            </p>
                            <div class="news_card__bottom">
                                <span class="news_card__author"><?php echo __("автор:", "kinder")?> <a href="<?php echo $author_link; ?>"><?php echo ($author) ? $author : 'Автор статьи'; ?></a></span>
                                <a class="news_card__link" href="<?php the_permalink(); ?>"><?php echo __("Прочитать", "kinder")?></a>
                            </div>
                        </div>
                    </div>
                    <!-- END OF News card -->
                    <?php } ?>
                    <?php wp_reset_postdata(); ?>
                    
                    <?php $all_posts_link = get_post_type_archive_link('post'); ?>
                    <div class="news__wrapper">
                        <a class="news__read_all" href="<?php echo $all_posts_link; ?>"><?php echo __("ЧИТАТЬ ВСЕ НОВОСТИ", "kinder") ?></a>
                    </div>
                </div>

            
            </div>
            <!-- END OF NEWS -->
        
        
        <aside class="widgets">
            <div class="widgets--sticky">
                <?php get_search_form(); ?>

                <?php 
                if(is_dynamic_sidebar()) {
                    dynamic_sidebar('right_sidebar');
                }
                ?>
            </div>
        </aside>
    </main>


    <section class="glide">
        <div class="glide__bullets" data-glide-el="controls[nav]" aria-label="<?php echo __("Индексы и переключения слайдера", "kinder")?>">
        </div>
        <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__button_arrow" data-glide-dir="<" aria-label="<?php echo __("Листать слайды в начало", "kinder") ?> ">
                <svg width="28" height="53" viewBox="0 0 28 53" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M25 49.8073L3 26.4036L25 3" stroke-width="6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button class="glide__button_arrow" data-glide-dir=">" aria-label="<?php echo __("Листать слайды в конец", "kinder") ?> ">
                <svg width="28" height="53" viewBox="0 0 28 53" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M3 3.00008L25 26.4037L3 49.8074" stroke-width="6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
        <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                <?php
                // Запрос кастомного типа записи kinder_slider
                $args = array(
                    'post_type' => 'kinder_slider',
                );

                $query = new WP_Query($args);

                // Цикл для кастомного типа записи kinder_slider
                if ($query->have_posts()) {
                    while ($query->have_posts()) {
                        $query->the_post();

                        get_template_part("template-parts/content", "slider"); 
                    }
                    
                    wp_reset_postdata();
                }
                ?>
            </ul>
        </div>
    </section>


    

    <?php

        $query = new WP_Query([
            'post_type' => 'kinder_infoblocks',
        ]);

        // Цикл для кастомного типа записи kinder_slider
        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();

                get_template_part("template-parts/content", "kinder_additional_infoblocks"); 
            }
            
            wp_reset_postdata();
        }
    ?>

   <!-- <div class="map">
        <h3 class="map__heading">Интерактивные карты свободных мест</h3>
        <a class="map__button" href="#">Интерактивные карты свободных мест</a>
        <iframe class="map__embeded" src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab3fd6a48253fddfc0938315bacb4c649e707f7933cfbd555fa59d58475448637&source=constructor"
        width="720" height="532"></iframe>
    </div>-->

    <section class="content">
        <?php the_content(); ?>
    </section>


    
    <!-- Additional links-->
    <?php
        $query = new WP_Query([
            'post_type' => 'kinder_links_slider',
        ]);

        // Цикл для кастомного типа записи kinder_slider
        if ($query->have_posts()) {
            ?>
            <div class="links links__track">
                <?php 
                while ($query->have_posts()) {
                    $query->the_post();

                    get_template_part("template-parts/content", "kinder_links_slider"); 
                }
                
                wp_reset_postdata();
                ?>
            </div>
            <?php
        }
    ?>
    <!-- END OF Additional links-->
    


<?php get_footer('main'); ?>