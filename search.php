<?php 
    require get_template_directory() . '/assets/php/navigations/socials.php';
    require get_template_directory() . '/assets/php/navigations/left_navigation.php';
?>
<?php get_header(); ?>
<?php get_template_part('template-parts/content', "mobile_bottom")?>
<div class="main_flow">
    <aside class="main_flow__aside">
        <nav class="menu" aria-label=<?php echo __("Основное меню", "kinder")?>>
            <div class="menu__sticky">
                <h3 class="menu__heading"><?php echo __("Навигация", "kinder")?></h3>   
                <?php get_left_top_menu(); ?>
                <?php echo get_left_middle_menu(); ?>
                <div class="menu__socials">
                    <?php echo get_left_socials(); ?>
                </div>
            </div>
        </nav>
    </aside>
    <main class="main_flow__main">
        <div class="main" >
            <div class="main__wrapper" style="display: flex; flex-direction: column; gap: 3rem;">
                    <?php get_template_part('/template-parts/content', 'breadcrumbs_single')?>
                    <?php get_search_form(); ?>

                    <?php if (have_posts()) : ?>
                        <header class="page-header">
                            <h1 class="page-title"><?php printf(__('Поисковые результаты: %s', 'kinder'), get_search_query()); ?></h1>
                        </header>
                        
                        
                        <?php while (have_posts()) : the_post(); ?>
                        <?php get_template_part('/template-parts/content', 'search-card');?>

                        <?php endwhile; ?>

                    <?php else : ?>
                        <p><?php _e(__('Ничего не найдено'), 'textdomain'); ?></p>
                    <?php endif; ?>
                
                
            </div>
        </div>
    </main>
</div>



<?php get_footer(); ?>