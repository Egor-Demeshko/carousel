<?php
    function get_left_top_menu(){
        $left_top_menu = wp_nav_menu([
            "theme_location" => "left_navigation_main",
            'menu_id' => 'left_top_menu',
            'menu_class' => 'menu__main',
            'container' => false,
            "fallback_cb" => "__return_false",
            'depth' => 2,
            'walker' => new Left_Top_Menu()
        ]);

        return $left_top_menu;
    }

    function get_left_middle_menu(){
        wp_nav_menu([
            "theme_location" => "left_navigation_secondary_menu",
            'menu_id' => 'left_secondary_menu',
            'menu_class' => 'side_menu',
            'container' => false,
            "fallback_cb" => "__return_false",
            'depth' => 1,
            'walker' => new Left_Secondary_Menu()
        ]);
    }

    function get_left_socials(){
        wp_nav_menu([
            "theme_location" => "left_socials",
            "container" => "div",
            "container_class" => "menu__socials_list",
            "depth" => 1,
            "items_wrap" => '%3$s',
            "walker" => new Socials_Top_Banner()
        ]);
    }
?>