<?php
        // Получаем родительскую страницу
        $categories = get_the_category();

        $category_link = null;
        $category_name ;

        if ($categories) {
            foreach ($categories as $category) {
                $category_link = get_category_link($category->cat_ID);
                $category_name = $category->name;
                
            }
        }
        
    ?>
        <header class="main__header">
            <div class="main__breadcrumbs">
            <?php
                $locale = get_locale();
                $addition_to_link = null;
                if($locale !== "ru_RU"){
                    $addition_to_link = $locale;
                } else {
                    $addition_to_link = '';
                } 
            ?>
                <a class="main__home" href="/<?php echo $addition_to_link ?>" aria-label=<?php echo __("Перейти на главную страницу", "kinder")?>>
                    <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M18.49 26.6688V19.887C18.49 19.5872 18.3674 19.2997 18.1492 19.0878C17.931 18.8758 17.635 18.7567 17.3264 18.7567H12.6718C12.3632 18.7567 12.0672 18.8758 11.849 19.0878C11.6308 19.2997 11.5082 19.5872 11.5082 19.887V26.6688C11.5082 26.9685 11.3856 27.256 11.1674 27.468C10.9492 27.6799 10.6533 27.799 10.3447 27.7991L3.36373 27.7999C3.21091 27.8 3.05958 27.7707 2.91838 27.7139C2.77719 27.6572 2.64889 27.5739 2.54082 27.4689C2.43275 27.364 2.34703 27.2394 2.28854 27.1022C2.23005 26.9651 2.19995 26.8181 2.19995 26.6697V13.6065C2.19995 13.449 2.23383 13.2933 2.29941 13.1493C2.36498 13.0053 2.46082 12.8762 2.58077 12.7702L14.2163 2.49396C14.4305 2.30479 14.7096 2.19996 14.9991 2.19995C15.2886 2.19994 15.5677 2.30475 15.7819 2.4939L27.4191 12.7702C27.539 12.8762 27.6349 13.0053 27.7005 13.1493C27.7661 13.2933 27.8 13.4491 27.8 13.6065V26.6697C27.8 26.8181 27.7698 26.9651 27.7114 27.1022C27.6529 27.2394 27.5671 27.364 27.4591 27.469C27.351 27.5739 27.2227 27.6572 27.0815 27.714C26.9403 27.7707 26.789 27.8 26.6362 27.8L19.6535 27.7991C19.3449 27.799 19.049 27.6799 18.8308 27.468C18.6126 27.256 18.49 26.9685 18.49 26.6688Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
                <?php if($category_link) { ?>
                    <a class="main__rubrics" href="<?php echo $category_link ?>" 
                    aria-label="<?php echo __("перейти в раздел", "kinder") ?> <?php echo $category_name ?>"><?php echo $category_name ?></a>
                <?php } ?>
            </div>
            <?php 

                $post_date = get_the_date('d-m-y \г.');
                $author_id = get_the_author_meta('ID');
                $author_name = get_the_author();
                $author_link = get_author_posts_url($author_id);
                ?>
                    <div class="main__author_info">
                        <span><?php $post_date ?></span>
                        <span><a href="<?php echo $author_link?>"><?php echo $author_name?></a></span>
                    </div>  
        </header>