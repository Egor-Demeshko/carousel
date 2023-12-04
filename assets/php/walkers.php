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

        if(!empty($item->current) && $item->current){
            $classes = array_merge($classes, ['header__menu-item--active']);
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