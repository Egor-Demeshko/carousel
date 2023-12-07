<?php
/** в файле содержатся вся логика по созданию ссылок на социальные сети.
 * Они сделаны как меню.
 */

 /** @description код для создания списка ссылок на социальные сети
  * используется на главное странице вверху
  */
function create_socials_menu(){
    $item = wp_nav_menu([
        "theme_location" => "socials",
        "container" => "div",
        "container_class" => "header__background_socials",
        "depth" => 1,
        "items_wrap" => '%3$s',
        "walker" => new Socials_Top_Banner(),
    ]);

    return $item;
}
?>

