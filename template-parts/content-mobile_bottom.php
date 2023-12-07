<div class="mobile_bottom">
    <?php 
        wp_nav_menu([
            'theme_location' => 'mobile_bottom_bar',
            'container' => false,
            'items_wrap' => '%3$s',
            'depth' => 1,
            'walker' => new WP_Mobile_Menu()
        ])
    ?>
    <!-- <a class="mobile_bottom__item" href="#"><span>Контакты</span></a>
    <a class="mobile_bottom__item" href="#"><span>Новости</span></a>-->
    <button class="mobile_bottom__button">
        <svg viewBox="0 0 48 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 16.5H45.5" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 2H45.5" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2.25 31.5H45.75" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
    </button>
</div>