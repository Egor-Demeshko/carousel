<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta <?php bloginfo('charset') ?> >
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @font-face {
            font-family: "SeoulHangangCondensed-Medium";
            src: url(<?php echo get_template_directory_uri() . "/assets/fonts/SeoulHangangCondensed-Medium.ttf"?>) format("truetype");
            font-display: swap;
        }

        @font-face{
            font-family: "Trykker-Regular";
            src: url(<?php echo get_template_directory_uri() . "/assets/fonts/Trykker-Regular.ttf"?>) format("truetype");
            font-display: swap;
        }
        :root {
            --background: <?php echo get_field("kinder_background") ?: "#F6F6F6"?>;
            --main-dark: <?php echo get_field("main-dark") ?: "#36AA00"?>;
            --main: <?php echo get_field("kinder_main") ?: "#97E572"?>;
            --semi-main: <?php echo get_field("kinder_semi-main") ?: "#99E675"?>;
            --second_menu_gradient: <?php echo get_field("kinder_second_menu_gradient") ?: '#73B156' ?>; 
            --light: <?php echo get_field("kinder_light") ?: "#E7FCDB" ?>;
            --grey: <?php echo get_field("kinder_grey") ?: "#D9D9D9"?>;
            --grey-dark: <?php echo get_field("kinder_grey_dark") ?: "#919191"?>;
            --accent: <?php echo get_field("kinder_accent") ?: "#77003e"?>;
            --black: <?php echo get_field("kinder_black") ?: "#000000"?>;
            --black-80: <?php echo get_field("kinder_black-80") ?: "#201F1FCC"?>;
            --white: <?php echo get_field("kinder_white") ?: "#FFFFFF"?>;
            --slide-background: <?php echo get_field("kinder_slide-background") ?: "#36AA0033"?>;
            --shadow: <?php echo get_field("kinder_shadow") ?: "#000000A1"?>;
            --active-menu: <?php echo get_field("kinder_active-menu") ?: "#CC8821"?>;

            
            --first-green-gradient: <?php echo get_field("kinder_first-green-gradient") ?: "#97E572B3"?>; /*70%*/
            --secondary-green-gradient: <?php echo get_field("kinder-secondary-green-gradient") ?: "#97E5724D"?>;
            
            
            --background-dark: #0D0D0D;
            /**Цвет  сообщения слайдера */
            --first-slide-background: <?php echo get_field("kinder_first-slide-background") ?: "#8F8F8FE6"?>;
            --second-slide-background: <?php echo get_field("kinder_second-slide-background") ?: "#DAD9D9CC"?>;
            /**два градиентных цвета, заднего фона сообщения, слайдера */
            --search-gradient-first: <?php echo get_field("kinder_search-gradient-first") ?: "#8F8F8F" ?>;
            --search-gradient-second: <?php echo get_field("kinder_search-gradient-second") ?: "#C1C1C173" ?>;
            
            --message-gradient: linear-gradient(-45deg, var(--first-slide-background), var(--second-slide-background));
            --main-green-gradient: linear-gradient(-90deg, var(--first-green-gradient), var(--secondary-green-gradient));
            --grey-gradient: linear-gradient(-90deg, var(--search-gradient-first), var(--search-gradient-second));
            --menu-gradient: linear-gradient(-90deg, var(--main), var(--second_menu_gradient));

            --step: clamp(3rem, 20vw, 6.26rem);
            --bottombar-height: 4.375rem;
        }

        *{
            box-sizing: border-box;
        }

        body{
            background-color: var(--background);
        }

        .header-post{
            display: flex;
            padding: clamp( 1.125rem, 1.7vw, 1.5rem);
            background-color: var(--black-80);
            width: clamp(min(100%, 56rem), 66vw, 66vw);
            color: var(--background);
            position: fixed;
            top: 0;
            left: 50%;
            transform: translate(-50%);
        }.header-post__menu{
            display: flex;
        }.header-post__list{
            display: flex;  
        }

        .header-post{
            /*часть записана в html*/
            align-items: center;
            justify-content: space-between;
            z-index: 110;
            border-radius: 0 0 10px 10px;
            transition: padding 400ms ease, border-radius 400ms ease, background-color 400ms ease;
            line-height: 100%;
        }

        .header--dark{
            padding: .5rem .875rem;
            border-radius: 0 0 10px 10px;
        }

        .header-post__logo{
            font-family: "SeoulHangangCondensed-Medium", sans-serif;
            font-size: clamp(1rem, 2.2vw, 2rem);
            text-decoration: none;
            color: inherit;
            transition: color 400ms ease;
        }
        .header-post__logo:hover{
            color: var(--accent);
        }

        .header-post__menu{
            align-items: center;
            justify-content: space-between;
            gap: 1.375rem;
        }

        .header-post__list{
            align-items: center;
            justify-content: space-between;
            list-style-type: none;
            gap: 1.375rem;
            flex-wrap: wrap;
        }

        .header-post__menu-item a{
            text-decoration: none;
            color: var(--background);
            transition: color 400ms ease, border 400ms ease;
            border: 4px solid transparent;
            font-size: 1.125rem;
        }.header-post__menu-item a:hover{
            color: var(--top-menu-accent);
            /*border-bottom: 4px solid var(--accent);*/
        }
        .header-post__menu-item--active a{
            color: var(--active-menu);
        }

        /* eye icon*/
        .header-post__icon_wrapper{
            width: 24px;
            height: 24px;
        }

        .header-post__icon{
            width: 100%;
            height: 100%;
            stroke: var(--background);
            transition: stroke 200ms ease;
            cursor: pointer;
        }

        .header-post__icon:hover{
            stroke: var(--top-menu-accent);
        }

        .header-post__icon_cancel{
            position: relative;
            transform: translate(200%, -100%);
        }
        /* eye icon*/

        .header-post__language{
            cursor: pointer;
        }

        .header-post__language a{
            transition: color 400ms ease;
        }

        .header-post__language:hover a{
            color: var(--top-menu-accent);
        }

        /* BOGO STYLES*/
        .bogo-language-switcher{
            display: flex;
            gap: 1.375rem;
            margin: 0;
            padding: 0;
        }


        .bogo-language-name{
            cursor: pointer;
        }
        .bogo-language-name a{
            text-decoration: none;
            transition: color 400ms ease;
            color: inherit;
        }
        .bogo-language-name:hover a{
            color: var(--accent);
        }
        .bogo-language-switcher>.current a{
            color: var(--active-menu);
        }
        /* -- END OF BOGO -- */

        @media screen and (max-width: 800px){
            header.header-post{
                background-color: var(--main-dark);
                left: 0;
                transform: translate(0);
                width: 100%;
                z-index: 100;
                border-radius: 0;
            }
            .header-post__menu nav{
                display: none;
            }
        }


        /*highcontrast*/
        html.highcontrast .header-post{
            border-bottom: 4px solid black;
        }

        html.highcontrast .header-post__menu-item a:hover{
            border-bottom: 4px solid transparent;
        }

        html.highcontrast .header-post__icon{
            stroke: black;
        }

        .heading{
            font-family: "Trykker-Regular", sans-serif;
            font-size: clamp(3rem, 27vw, 15rem) !important; 
        }

        .heading, p{
            margin: 0;
        }

        .container{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: absolute;
            left: 14vw;
            top: 50%;
            transform: translate(0, -50%);            
        }
        .container>p{
            font-size: 1.5rem;
            margin-top: 1.75rem;
            text-align: center;
        }

        .main__home{
            display: flex;
            justify-content: center;
            align-items: center;
            width: clamp(10rem, 16.9vw, 15.25rem);
            height: clamp(10rem, 16.9vw, 15.25rem);
            background-color: var(--main-dark);
            color: var(--background);
            border-radius: 30px;
            margin-top: 3.5rem;
        }
        .main__home svg{
            width: clamp(5.32rem, 9vw, 8.1rem);
            height: clamp(5.32rem, 9vw, 8.1rem);
        }

        @media screen and (max-width: 800px){
            .container{
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }

        .goUp{
            display: none;
            width: 70px;
            height: 70px;
            border-radius: 20px;
            box-shadow: 0 0 4px var(--shadow);
            padding: 24px 14px;
            justify-content: center;
            align-items: center;
            background-color: var(--main-dark);
            position: fixed;
            bottom: 110px;
            right: 16px;
            cursor: pointer;
            color: var(--background);
        }
        
        .stop-scroll{
            bottom: 300px;
        }
        
        @media (min-width: 32em){
            .goUp{
            bottom: 50px;
            right: 70px;
            }
        
            .stop-scroll{
            bottom: 140px;
            }
        }

        .highcontrast__control{
            padding: 1rem clamp(1rem, 2.2vw, 2rem);
            opacity: 0;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 0);
            border: 2px solid black;
            border-radius: 4px;
            display: none;
        }

        .highcontrast__buttons{
            display: flex;
            gap: clamp(.4rem, 1.1vw, 1rem);
            margin-top: clamp(.4rem, 1.1vw, 1rem);
            flex-wrap: wrap;
            justify-content: space-around;
        }

        .highcontrast__btn{
            border: 2px solid black;
            border-radius: 10px;
            padding: .2rem 1rem;
        }

        @media screen and (max-width: 800px){
            .highcontrast__control{
                width: 90%;
            }
        }


    </style>
    <?php wp_head();?>
</head>

<body <?php body_class(); ?> style="background-image: url( <?php echo esc_url( get_template_directory_uri() . "/assets/images/404.png")?>);">
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
    <span><a class="header-post__logo" href="/<?php echo $addition_to_link?>" 
    aria-label="<?php echo __("Перейти на главную страницу", "kinder")?>">
    <?php echo empty( get_field("kinder-logo-text")) ? __("На главную", "kinder") : get_field("kinder-logo-text");?></a></span>
    <div class="header-post__menu">
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
        <div class="header-post__icon_wrapper" aria-role="button" aria-label="<?php __("включить/выключить режим высокого контраста", "kinder")?>">
            <svg class="header-post__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="cancel" class="header-post__icon_cancel" fill="currentColor" d="M21.7699 2.22988C21.4699 1.92988 20.9799 1.92988 20.6799 2.22988L2.22988 20.6899C1.92988 20.9899 1.92988 21.4799 2.22988 21.7799C2.37988 21.9199 2.56988 21.9999 2.76988 21.9999C2.96988 21.9999 3.15988 21.9199 3.30988 21.7699L21.7699 3.30988C22.0799 3.00988 22.0799 2.52988 21.7699 2.22988Z" />
            </svg>
        </div>
        
        <?php echo do_shortcode( '[bogo]' ); ?>
    </div>
</header>


<section>
    <div class="container">
        <h1 class="heading">404</h1>
        <p><?php echo __("нет такой страницы  &#9786;", "kinder")?></p>
        <a class="main__home" href="/" aria-label=<?php echo __("Перейти на главную страницу", "kinder")?>>
            <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M18.49 26.6688V19.887C18.49 19.5872 18.3674 19.2997 18.1492 19.0878C17.931 18.8758 17.635 18.7567 17.3264 18.7567H12.6718C12.3632 18.7567 12.0672 18.8758 11.849 19.0878C11.6308 19.2997 11.5082 19.5872 11.5082 19.887V26.6688C11.5082 26.9685 11.3856 27.256 11.1674 27.468C10.9492 27.6799 10.6533 27.799 10.3447 27.7991L3.36373 27.7999C3.21091 27.8 3.05958 27.7707 2.91838 27.7139C2.77719 27.6572 2.64889 27.5739 2.54082 27.4689C2.43275 27.364 2.34703 27.2394 2.28854 27.1022C2.23005 26.9651 2.19995 26.8181 2.19995 26.6697V13.6065C2.19995 13.449 2.23383 13.2933 2.29941 13.1493C2.36498 13.0053 2.46082 12.8762 2.58077 12.7702L14.2163 2.49396C14.4305 2.30479 14.7096 2.19996 14.9991 2.19995C15.2886 2.19994 15.5677 2.30475 15.7819 2.4939L27.4191 12.7702C27.539 12.8762 27.6349 13.0053 27.7005 13.1493C27.7661 13.2933 27.8 13.4491 27.8 13.6065V26.6697C27.8 26.8181 27.7698 26.9651 27.7114 27.1022C27.6529 27.2394 27.5671 27.364 27.4591 27.469C27.351 27.5739 27.2227 27.6572 27.0815 27.714C26.9403 27.7707 26.789 27.8 26.6362 27.8L19.6535 27.7991C19.3449 27.799 19.049 27.6799 18.8308 27.468C18.6126 27.256 18.49 26.9685 18.49 26.6688Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </a>
    </div>
</section>

</body>

    <?php wp_footer(); ?>
</html>