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
        <div class="header__background_image" style="background-image: url(<?php echo get_main_top_background();?>">
        </div>

        <?php echo create_socials_menu(); ?>
    </div>
    <div class="mobile_bottom">
        <a class="mobile_bottom__item" href="#"><span>Контакты</span></a>
        <a class="mobile_bottom__item" href="#"><span>Новости</span></a>
        <button class="mobile_bottom__button">
            <svg viewBox="0 0 48 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 16.5H45.5" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 2H45.5" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.25 31.5H45.75" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
        </button>
    </div>

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
                        <li class="header__menu-item"><a href="/">Главная</a></li>
                        <li class="header__menu-item"><a href="/posts">Все записи</a></li>
                    </ul>
                    <?php
                }
                ?>
            </nav>
            
            <div class="header__icon_wrapper" aria-role="button" aria-label="включить/выключить режим высокого контраста">
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
        <!-- SIDE MENU -->
        <nav class="menu">
            <div class="menu__sticky">
                <h3 class="menu__heading">Навигация</h3>
                <?php echo get_left_top_menu(); ?>
                <ul class="menu__main">
                    <li><a href="#" class="menu__main-item">Пункт 1</a></li>
                    <li><a href="#" class="menu__main-item">Пункт 1</a></li>
                    <li><a href="#" class="menu__main-item">Пункт 1</a></li>
                    <li><a href="#" class="menu__main-item">Пункт 1</a></li>
                    <li><a href="#" class="menu__main-item">Пункт 1</a></li>
                    <li><a href="#" class="menu__main-item">Пункт 1</a></li>
                </ul>
                <ul class="side_menu">
                    <li><a href="#" class="side_menu__item">Второстепенный пункт</a></li>
                    <li><a href="#" class="side_menu__item">Второстепенный пункт</a></li>
                    <li><a href="#" class="side_menu__item">Второстепенный пункт</a></li>
                    <li><a href="#" class="side_menu__item">Второстепенный пункт</a></li>
                    <li><a href="#" class="side_menu__item">Второстепенный пункт</a></li>
                    <li><a href="#" class="side_menu__item">Второстепенный пункт</a></li>
                    <li><a href="#" class="side_menu__item">Второстепенный пункт</a></li>
                    <li><a href="#" class="side_menu__item">Второстепенный пункт</a></li>
                    <li><a href="#" class="side_menu__item">Второстепенный пункт</a></li>
                    <li><a href="#" class="side_menu__item">Второстепенный пункт</a></li>
                </ul>
                <div class="menu__socials">
                    <div class="menu__socials_list">
                        <a href="#"><img src="/assets/icons/Instagram_green.svg"/></a>
                        <a href="#"><img src="/assets/icons/youtube_green.svg"/></a>
                    </div>
                </div>
            </div>
        </nav>
        <!-- END OF SIDE MENU -->
        
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
                    
                    ?>" width="210px" height="240px"/>
                    <!--<img src="/assets/images/mask_portrait.svg" width="210px" height="240px"/>-->
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
            
            
            <!-- News -->
            <div class="news">
                <h2 class="news__heading">Последние новости</h2>
                
                <div class="news__block-wrapper">
                    <!-- News card -->
                    <div class="news_card">
                        <div class="news_card__point"></div>
                        <div class="news_card__date">
                            <div class="news_card__date_background"></div>
                            <span class="news_card__day">05</span>
                            <span class="news_card__month">августа</span>
                        </div>
                        <div class="news_card__content">
                            <h4 class="news_card__heading">Событие первое</h4>
                            <p class="news_card__text">
                                Lorem ipsum dolor sit amet consectetur. Faucibus accumsan dui sem sit enim imperdiet. Nibh sed in orci sed venenatis tortor in risus. Aenean imperdiet ac amet aliquam urna nunc iaculis. Semper facilisi duis ultricies malesuada. Senectus purus adipiscing eleifend posuere neque parturient. Sed sem semper orci enim.
                            </p>
                            <div class="news_card__bottom">
                                <span class="news_card__author">автор: <a href="#">Автор Новости</a></span>
                                <a class="news_card__link" href="#">Прочитать</a>
                            </div>
                        </div>
                    </div>
                    <!-- END OF News card -->
                    <!-- News card -->
                    <div class="news_card">
                        <div class="news_card__point"></div>
                        <div class="news_card__date">
                            <div class="news_card__date_background"></div>
                            <span class="news_card__day">05</span>
                            <span class="news_card__month">августа</span>
                        </div>
                        <div class="news_card__content">
                            <h4 class="news_card__heading">Событие первое</h4>
                            <p class="news_card__text">
                                Lorem ipsum dolor sit amet consectetur. Faucibus accumsan dui sem sit enim imperdiet. Nibh sed in orci sed venenatis tortor in risus. Aenean imperdiet ac amet aliquam urna nunc iaculis. Semper facilisi duis ultricies malesuada. Senectus purus adipiscing eleifend posuere neque parturient. Sed sem semper orci enim.
                            </p>
                            <div class="news_card__bottom">
                                <span class="news_card__author">автор: <a href="#">Автор Новости</a></span>
                                <a class="news_card__link" href="#">Прочитать</a>
                            </div>
                        </div>
                    </div>
                    <!-- END OF News card -->
                    <!-- News card -->
                    <div class="news_card">
                        <div class="news_card__point"></div>
                        <div class="news_card__date">
                            <div class="news_card__date_background"></div>
                            <span class="news_card__day">05</span>
                            <span class="news_card__month">августа</span>
                        </div>
                        <div class="news_card__content">
                            <h4 class="news_card__heading">Событие первое</h4>
                            <p class="news_card__text">
                                Lorem ipsum dolor sit amet consectetur. Faucibus accumsan dui sem sit enim imperdiet. Nibh sed in orci sed venenatis tortor in risus. Aenean imperdiet ac amet aliquam urna nunc iaculis. Semper facilisi duis ultricies malesuada. Senectus purus adipiscing eleifend posuere neque parturient. Sed sem semper orci enim.
                            </p>
                            <div class="news_card__bottom">
                                <span class="news_card__author">автор: <a href="#">Автор Новости</a></span>
                                <a class="news_card__link" href="#">Прочитать</a>
                            </div>
                        </div>
                    </div>
                    <!-- END OF News card -->
                    
                    <div class="news__wrapper">
                        <a class="news__read_all" href="#">ЧИТАТЬ ВСЕ НОВОСТИ</a>
                    </div>
                </div>

            
            </div>
            <!-- END OF NEWS -->
        
        
        <aside class="widgets">
            <div class="widgets--sticky">
                <div class="widgets__box">
                    <h4>Режим работы</h4>
                    <p>Понедельник - пятница: 7.30 - 18.00</p>
                    <p>Суббота - Воскресенье: Выходной</p>
                    <p>Праздничные и нерабочие дни: Выходной</p>
                </div>
                <form class="widgets__search">
                    <div class="widgets__search_wrapper">
                        <input class="widgets__search_input">
                        <svg class="widgets__search_icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.06429 17C13.3803 17 16.8792 13.4183 16.8792 9C16.8792 4.58172 13.3803 1 9.06429 1C4.74824 1 1.24939 4.58172 1.24939 9C1.24939 13.4183 4.74824 17 9.06429 17Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18.833 19L14.5836 14.65" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </form>
            </div>
        </aside>
    </main>


    <section class="glide">
        <div class="glide__bullets" data-glide-el="controls[nav]">
        </div>
        <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__button_arrow" data-glide-dir="<">
                <svg width="28" height="53" viewBox="0 0 28 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 49.8073L3 26.4036L25 3" stroke-width="6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button class="glide__button_arrow" data-glide-dir=">">
                <svg width="28" height="53" viewBox="0 0 28 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3.00008L25 26.4037L3 49.8074" stroke-width="6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
        <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                <li class="glide__slide" style="background-image: url('/assets/images/slider 1.jpg');">
                    <div class="glide__slide_background"></div>
                    <div class="glide__message_wrapper">
                        <h4 class="glide__header">Важное сообщение</h4>
                        <p class="glide__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at mauris nec justo consequat vestibulum. Nulla facilisi. Fusce vel ex sed libero interdum lacinia. Aenean vel semper felis, sed commodo elit. Quisque nec semper urna. Cras eget urna vitae ligula tincidunt convallis.

                            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec [...]</p>
                            <a class="glide__button" href="#">Подробнее</a>
                    </div>
                </li>
                <li class="glide__slide" style="background-image: url('/assets/images/slider 1.jpg');">
                    <div class="glide__slide_background"></div>
                    <div class="glide__message_wrapper">
                        <h4 class="glide__header">Важное сообщение</h4>
                        <p class="glide__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at mauris nec justo consequat vestibulum. Nulla facilisi. Fusce vel ex sed libero interdum lacinia. Aenean vel semper felis, sed commodo elit. Quisque nec semper urna. Cras eget urna vitae ligula tincidunt convallis.

                            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec [...]</p>
                            <a class="glide__button" href="#">Подробнее</a>
                    </div>
                </li>
            </ul>
        </div>
    </section>

    <section class="additional_info">
        <div class="additional__left">
            <h4>Свободные места</h4>
            <p>В 2023/2024 учебном году функционируют <b>6</b> возрастных групп</p>
        </div>
        <div class="additional__right">
            <p>первая младшая №1 - 0 (Свобдных мест нет)</p>
            <p>вторая младшая №2 - 7 ( 7 Свобдных мест )</p>
            <p>средняя группа №4 - 0 (Свобдных мест нет)</p>
            <p>группа интегрированного обучения и воспитания 5-6 лет №5 - 0 (Свобдных мест нет)</p>
            <p>группа интегрированного обучения и воспитания 5-6 лет №6 ( свободных мест нет)</p>
        </div>
    </section>

    <div class="map">
        <h3 class="map__heading">Интерактивные карты свободных мест</h3>
        <a class="map__button" href="#">Интерактивные карты свободных мест</a>
        <iframe class="map__embeded" src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab3fd6a48253fddfc0938315bacb4c649e707f7933cfbd555fa59d58475448637&source=constructor"
        width="720" height="532"></iframe>
    </div>

    <section class="additional_info">
        <div class="additional__left">
            <h4>Заголовок</h4>
            <p>Инфомарция</p>
        </div>
        <div class="additional__right">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at mauris nec justo consequat vestibulum. Nulla facilisi. Fusce vel ex sed libero interdum lacinia. Aenean vel semper felis, sed commodo elit. Quisque nec semper urna. Cras eget urna vitae ligula tincidunt convallis.</p>
            <a class="additional__button" href="#">Перейти</a>
        </div>
    </section>

    <!-- Additional links-->
    <div class="links links__track">
       <!-- <div class="">-->

            <a class="links__item" href="#">
                <div class="links__image">
                    <img src="/assets/images/links_logo.png" width="89px" height="89px" alt=""/>
                </div>
                <div class="links__title_wrapper">
                    <span class="links__title">Министерство образования Республики Беларусь</span>
                </div>
            </a>
            <a class="links__item" href="#">
                <div class="links__image">
                    <img src="/assets/images/links_logo.png" width="89px" height="89px" alt=""/>
                </div>
                <div class="links__title_wrapper">
                    <span class="links__title">Министерство образования Республики Беларусь</span>
                </div>
            </a>
            <a class="links__item" href="#">
                <div class="links__image">
                    <img src="/assets/images/links_logo.png" width="89px" height="89px" alt=""/>
                </div>
                <div class="links__title_wrapper">
                    <span class="links__title">Министерство образования Республики Беларусь</span>
                </div>
            </a>
            <a class="links__item" href="#">
                <div class="links__image">
                    <img src="/assets/images/links_logo.png" width="89px" height="89px" alt=""/>
                </div>
                <div class="links__title_wrapper">
                    <span class="links__title">Министерство образования Республики Беларусь</span>
                </div>
            </a>
            <a class="links__item" href="#">
                <div class="links__image">
                    <img src="/assets/images/links_logo.png" width="89px" height="89px" alt=""/>
                </div>
                <div class="links__title_wrapper">
                    <span class="links__title">Министерство образования Республики Беларусь</span>
                </div>
            </a>
            <a class="links__item" href="#">
                <div class="links__image">
                    <img src="/assets/images/links_logo.png" width="89px" height="89px" alt=""/>
                </div>
                <div class="links__title_wrapper">
                    <span class="links__title">Министерство образования Республики Беларусь</span>
                </div>
            </a>
            <a class="links__item" href="#">
                <div class="links__image">
                    <img src="/assets/images/links_logo.png" width="89px" height="89px" alt=""/>
                </div>
                <div class="links__title_wrapper">
                    <span class="links__title">Министерство образования Республики Беларусь</span>
                </div>
            </a>
            <a class="links__item" href="#">
                <div class="links__image">
                    <img src="/assets/images/links_logo.png" width="89px" height="89px" alt=""/>
                </div>
                <div class="links__title_wrapper">
                    <span class="links__title">Министерство образования Республики Беларусь</span>
                </div>
            </a>
            <a class="links__item" href="#">
                <div class="links__image">
                    <img src="/assets/images/links_logo.png" width="89px" height="89px" alt=""/>
                </div>
                <div class="links__title_wrapper">
                    <span class="links__title">Министерство образования Республики Беларусь</span>
                </div>
            </a>
       <!-- </div>-->
    </div>
        <!-- END OF Additional links-->
        
        <content class="content">

        </content>


    <footer class="footer">
        <div class="footer__info">
            <p class="footer__name">Детский сад №1 г.п. Кореличи</p>
            <p class="footer__text">Наш адрес: г.п.Кореличи, ул.Парковая. 1а
                тел.8 01596 749 91
                расчетный счет
                BY92 AKBB 3642 5180 0005 5420 0000 BYN
                ЦБУ № 411 ОАО «АСБ Беларусбанк» г.п. Кореличи BIC AKBBBY2Х
            </p>
            <p>Свидетельство о гос. регистрации: 1956535188</p>
        </div>
        <div class="footer__menu_wrapper">
            <ul class="footer__menu">
                <li class="footer__menu_item"><a href="#">пункт меню</a></li>
                <li class="footer__menu_item"><a href="#">пункт меню</a></li>
                <li class="footer__menu_item"><a href="#">пункт меню</a></li>
                <li class="footer__menu_item"><a href="#">пункт меню</a></li>
                <li class="footer__menu_item"><a href="#">пункт меню</a></li>
                <li class="footer__menu_item"><a href="#">пункт меню</a></li>
            </ul>
        </div>

        <svg class="footer__icon" width="100" height="63" viewBox="0 0 100 63" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M86.8323 11.3292C83.4534 17.3913 79.4534 26.6584 77.6646 38.3851C76.7453 35.2795 75.6522 31.9255 74.4348 28.4969C78.2857 21.0683 82.4348 15.3292 86.8323 11.3292ZM73.3168 1.91304C71.7516 5.11801 70.0124 9.19255 68.3975 14.0373C67.8261 12.8696 67.2547 11.7516 66.6584 10.6832C68.795 7.22981 71.0311 4.29814 73.3168 1.91304ZM32.5963 1.86335C34.2112 3.52795 35.7764 5.46584 37.3168 7.65217C36.795 8.09938 36.2733 8.57143 35.7516 9.06832C34.6832 6.3354 33.6149 3.92547 32.5963 1.86335ZM13.1429 11.3043C16.9193 14.7081 20.4969 19.4286 23.8509 25.3665C22.8075 27.3292 21.8137 29.3168 20.8944 31.3043C18.8323 22.9068 15.7764 16.0994 13.1429 11.3043ZM8.64596 62.087C11.528 44.5466 5.26708 30.8075 0 22.7826C7.13043 28.1988 12.4472 36.4224 16.0248 43.4037C13.0683 51.8012 11.3292 58.9814 10.6335 62.087H8.64596ZM26.1366 62.087H20.1739H14.7081C16.7205 53.6149 24.4472 24.6708 39.0807 11.3789C33.6646 21.118 26.559 38.9814 29.7888 62.087H26.1366ZM33.8137 62.087C33.0186 56.6211 32.8447 51.4286 33.118 46.5839C35.3789 53.2671 36.8447 59.0062 37.5652 62.087H33.8137ZM39.1056 52.323C37.8634 48.0994 36.2236 43.0559 34.1118 37.7391C34.8075 33.7143 35.7764 30.0124 36.8696 26.6335C38.6584 35.0807 39.4286 43.6522 39.1056 52.323ZM42.3354 62.087C44.0745 47.8012 43.0807 33.6894 39.3789 20.0497C40.1739 18.1863 40.9938 16.472 41.7888 14.9565C45.0683 20.9938 48.1242 28.323 50.9068 36.7453C47.2547 48.0994 45.1429 58.236 44.3975 62.087H42.3354ZM60.9689 52.2981C60.8447 55.5031 60.5466 58.7826 60.1491 62.087H59.9255H48.4224C49.2671 57.7888 51.3789 48.0745 54.8571 37.3416C56.1242 33.441 57.4658 29.764 58.882 26.2857C59.2547 28.1491 59.5776 30.0373 59.8509 31.9255C60.8447 38.559 61.2174 45.4161 60.9689 52.2981ZM65.8882 62.087H64.1739C64.5714 58.8323 64.8199 55.6025 64.9441 52.4472C65.2174 45.3168 64.8199 38.2112 63.8012 31.354C63.2298 27.354 62.4099 23.3789 61.4161 19.5279C61.4161 19.4783 61.3913 19.4286 61.3913 19.3789C59.3043 11.2547 56.646 4.7205 54.4099 0C57.2422 3.00621 59.9752 6.85714 62.6087 11.5776C64.0745 14.1863 65.5155 17.0932 66.882 20.2236C66.9068 20.2733 66.9068 20.323 66.9317 20.3727V20.3975C68.1491 23.1304 69.3168 26.0373 70.4099 29.0435C73.2671 36.9938 75.3789 44.5714 76.646 49.7143C74.3851 55.2298 72.9689 59.8012 72.323 62.087H65.8882ZM91.3292 62.087H81.7888H79.8012H76.4721C78.6832 54.7826 86.1615 33.2174 100 22.7578C94.7081 30.7578 88.4472 44.5217 91.3292 62.087Z"/>
        </svg>

    </footer>


<?php get_footer(); ?>