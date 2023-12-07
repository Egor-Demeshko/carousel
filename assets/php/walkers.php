<?php
/**Кастомный walker для меню */
// свой класс построения меню:
class Top_Menu extends Walker_Nav_Menu {
    //container_class
	// add main/sub classes to li's and links
	function start_el( &$output, $data_object, $depth = 0, $args = null, $current_object_id = 0 ) {

		// Restores the more descriptive, specific name for use within this method.
		$item = $data_object;
		//create classes
        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
		$classes[] = 'header__menu-item';
		$classes[] = 'header-post__menu-item';

        if(!empty($item->current) && $item->current){
            $classes = array_merge($classes, ['header__menu-item--active', 'header-post__menu-item--active']);	
        }

		$class_names = esc_attr( implode( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item ) ) );

		// build html
		$output .= '<li id="nav-menu-item-'. $item->ID . '" class="' . ' ' . $class_names . '">';

		// link attributes
		$attributes  = ! empty( $item->attr_title ) ? ' title="'  . esc_attr( $item->attr_title ) .'"' : '';
		$attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
		$attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';
		$attributes .= ! empty( $item->url )        ? ' href="'   . esc_attr( $item->url        ) .'"' : '';

		$item_output = sprintf( '<a%1$s>%2$s%3$s</a>',
			$attributes,
			apply_filters( 'the_title', $item->title, $item->ID ),
            $args->link_after
		);

        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	}

}


/**Кастомный walker для списка иконок социальных сетей. убираем <li> */
class Socials_Top_Banner extends Walker_Nav_Menu{
	const LINK = 'link';
	function start_el( &$output, $data_object, $depth = 0, $args = null, $current_object_id = 0 ) {

		// Restores the more descriptive, specific name for use within this method.
		$item = $data_object;

		// link attributes
		$attributes  = ! empty( $item->attr_title ) ? ' title="'  . esc_attr( $item->attr_title ) .'"' : '';
		$attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
		$attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';
		$attributes .= ! empty( $item->url )        ? ' href="'   . esc_attr( $item->url        ) .'"' : '';

		/**название пункта меню используем как slug иконки */
		$title = strtolower($item->title);
		$icon = $title;

		if($title !== "youtube" AND $title !== "instagram"){
			$icon = self::LINK;
		}

		$item_output = sprintf( '<a%1$s>%2$s</a>',
			$attributes,
            '<img aria-label="перейти на страницу социальной сети '. $title  . '" src="' . get_template_directory_uri() . '/assets/icons/' . $icon . '.svg"/>'
		);

        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	}
}

/**Кастомный walker для левого верхнего меню, в левой навигационной секции, а также
 * мобильное выезжающее меню. верхний главный(светлый) сектор
 */
class Left_Top_Menu extends Walker_Nav_Menu{

	function start_el( &$output, $data_object, $depth = 0, $args = null, $current_object_id = 0 ) {
		$link_classes = [];
		// Restores the more descriptive, specific name for use within this method.
		$item = $data_object;
		//create <li> classes
        $classes = [];

		if($depth >= 1){
			$classes[] = "";
		} else if($depth === 0) {
			$classes[] = "menu__main-item-wrapper";
		} 


		/** Если wordpress назначает активный элемент, то 
		 * так как в разметке стили примененны к <a>, то добавляем активный класс
		 * к $link_classes
		 */
		if(!empty($item->current) && $item->current){
            $link_classes = array_merge($link_classes, ['menu__main-item--active']);
        }
		// build html
		$output .= '<li class="' . implode(' ', $classes) . '">';

		// link attributes
		$attributes = (($depth === 0) ? ' class="menu__main-item ' : ' class="sub-menu__item ') . implode(' ', $link_classes) . '"';
		$attributes .= ! empty( $item->attr_title ) ? ' title="'  . esc_attr( $item->attr_title ) .'"' : '';
		$attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
		$attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';
		$attributes .= ! empty( $item->url )        ? ' href="'   . esc_attr( $item->url        ) .'"' : '';

		$item_output = sprintf( '<a%1$s>%2$s%3$s</a>',
			$attributes,
			apply_filters( 'the_title', $item->title, $item->ID ),
            $args->link_after
		);

        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	}
}


class Left_Secondary_Menu extends Walker_Nav_Menu{


	function start_el( &$output, $data_object, $depth = 0, $args = null, $current_object_id = 0 ) {
		$item = $data_object;
		/**Классы ссылки <a> */
		$link_classes = [];
		//классы <li> 
        $classes = [];


		/** Если wordpress назначает активный элемент, то 
		 * так как в разметке стили примененны к <a>, то добавляем активный класс
		 * к $link_classes
		 */
		if(!empty($item->current) && $item->current){
            $link_classes = array_merge($link_classes, ['side_menu__item--active']);
        }
		// создаем <li>, если к классам ничего не добавили, то создаем <li> без атрибутов
		if(empty($classes)){
			$output .= '<li>';
		} else {
			$output .= '<li class="' . implode(' ', $classes) . '">';
		}

		// link attributes
		$attributes = ' class="side_menu__item ' . implode(' ', $link_classes) . '"';
		$attributes .= ! empty( $item->attr_title ) ? ' title="'  . esc_attr( $item->attr_title ) .'"' : '';
		$attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
		$attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';
		$attributes .= ! empty( $item->url )        ? ' href="'   . esc_attr( $item->url        ) .'"' : '';

		$item_output = sprintf( '<a%1$s>%2$s%3$s</a>',
			$attributes,
			apply_filters( 'the_title', $item->title, $item->ID ),
            $args->link_after
		);

        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	}
}


class Footer_Menu extends Walker_Nav_Menu{


	function start_el( &$output, $data_object, $depth = 0, $args = null, $current_object_id = 0 ) {
		$item = $data_object;
		/**Классы ссылки <a> */
		$link_classes = [];
		//классы <li> 
        $classes = ['footer__menu_item'];


		// создаем <li>, если к классам ничего не добавили, то создаем <li> без атрибутов
		$output .= '<li class="' . implode(' ', $classes) . '">';


		// link attributes
		$attributes = ! empty( $item->attr_title ) ? ' title="'  . esc_attr( $item->attr_title ) .'"' : '';
		$attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
		$attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';
		$attributes .= ! empty( $item->url )        ? ' href="'   . esc_attr( $item->url        ) .'"' : '';

		$item_output = sprintf( '<a%1$s>%2$s%3$s</a>',
			$attributes,
			apply_filters( 'the_title', $item->title, $item->ID ),
            $args->link_after
		);

        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	}
}

class WP_Mobile_Menu extends Walker_Nav_Menu{
	
	function start_el( &$output, $data_object, $depth = 0, $args = null, $current_object_id = 0 ) {
		$item = $data_object;
		/**Классы ссылки <a> */
		$link_classes = ['mobile_bottom__item'];
		
		// link attributes
		$attributes = ' class="' . implode(' ', $link_classes) . '"';
		$attributes .= ! empty( $item->attr_title ) ? ' title="'  . esc_attr( $item->attr_title ) .'"' : '';
		$attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
		$attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';
		$attributes .= ! empty( $item->url )        ? ' href="'   . esc_attr( $item->url        ) .'"' : '';

		$item_output = sprintf( '<a%1$s>%2$s%3$s</a>',
			$attributes,
			apply_filters( 'the_title', $item->title, $item->ID ),
			$args->link_after
		);

        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	}
}