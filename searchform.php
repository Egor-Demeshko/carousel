<!--  ДОБАВИТЬ БЕЗОПАСТНУЮ ОБРАБОТКУ ПОИСКА -->

<form class="widgets__search" role="search" method="get" id="searchform" action="<?php echo home_url( '/' ) ?>"
aria-label="__<?php echo __("Форма поиска по сайту", "kinder") ?>">
    <div class="widgets__search_wrapper">
        <input class="widgets__search_input" value="<?php echo get_search_query() ?>" name="s" id="s" type="text"
        aria-label="<?php echo __("Поле для ввода запроса", "kinder") ?>" placeholder="<?php echo __("Поле для поискового запроса", "kinder") ?>">
        <button class="widgets__search_icon" type="submit" aria-label="<?php echo __("Начать поиск", "kinder") ?>">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="presentation">
                <path d="M9.06429 17C13.3803 17 16.8792 13.4183 16.8792 9C16.8792 4.58172 13.3803 1 9.06429 1C4.74824 1 1.24939 4.58172 1.24939 9C1.24939 13.4183 4.74824 17 9.06429 17Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.833 19L14.5836 14.65" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    </div>
</form>