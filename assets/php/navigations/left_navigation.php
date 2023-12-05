<?php
    function get_left_top_menu(){
        $left_top_menu = wp_nav_menu([
            "theme_location" => "left_navigation_main",
            'menu_class' => 'menu__main',
            'aria_label' => 'Главное меню',
            'container' => false,
            "fallback_cb" => "__return_false",
            'depth' => 2,
            'walker' => new Left_Top_Menu()
        ]);

        return $left_top_menu;
    }
?>