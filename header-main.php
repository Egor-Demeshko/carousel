<?php 
    /**
     * Retrieves the background image URL for the Kinder theme.
     *
     * This function checks if the "kinder_background_image" custom field is set using the
     * `get_field` function. If it is not set, the function falls back to the default
     * background image URL using the `get_template_directory_uri` function.
     *
     * @return string The URL of the background image.
     */
    function kinder_get_background_image(){
        $url = get_field("kinder_background_image") ?: esc_url( get_template_directory_uri() . '/assets/images/main_bg.svg' );
        return $url;
    }
?>


<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head >
    <meta <?php bloginfo('charset') ?> >
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
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
        
        .sun_icon{
            position: absolute;
            top: 182px;
            left: 17.7vw;
        }
        
        .header{
            position: fixed;
            top: 0;
            left: 50%;
            transform: translate(-50%);
        }
        
        .main{
            display: grid;
            max-width: 1440px;
            grid-template-columns: clamp(15rem, 15.56vw, 18rem) auto clamp(18rem, 18.5vw, 21.875rem);
            grid-template-rows: 25.375rem auto;
            column-gap: clamp(2rem, 3.9vw, 4.68rem);
            row-gap: 8.9rem;
            margin: 0 auto;
            margin-top: 4.1rem;
        }
        
        .greerings{
            padding-left: 9.375rem;
        }

        .content{
            background-color: transparent;
            max-width: 63rem;
            margin: var(--step) auto 0;
            text-align: center;
        }

        @media screen and (max-width: 800px){
            body{
                padding-bottom: calc(var(--bottombar-height) + 1rem);
            }

            .header__background{
                display: none;
            }

            .sun_icon{
                display: none;
            }

            header.header{
                background-color: var(--main-dark);
                left: 0;
                transform: translate(0);
                width: 100%;
                z-index: 100;
            }

            .header__menu nav{
                display: none;
            }

            main.main{
                display: flex;
                flex-direction: column;
                margin: 5.5rem 1.5rem 0;
                align-items: center;
                column-gap: 0;
                row-gap: 3rem;
            }

            .menu{
                position: fixed;
                top: 0;
                left: 50%;
                width: 100%;
                z-index: 101;
                transform: translateX(-150%);
                grid: none;
            }

            .content{
                margin: var(--step) 1.5rem 0;
            }
        }
        </style>
        <?php wp_head();?>
</head>
<body <?php body_class(); ?> style="background-image: url( <?php echo kinder_get_background_image(); ?>);">