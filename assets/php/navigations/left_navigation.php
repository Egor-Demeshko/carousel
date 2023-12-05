<?php
    function get_left_top_menu(){
        $left_top_menu = wp_nav_menu([
            "theme_location" => "left_top",
        ]);

        return $left_top_menu;
    }
?>