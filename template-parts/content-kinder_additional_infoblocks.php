<section class="additional_info">
    <div class="additional__left">
        <h4><?php the_title();?></h4>
        <?php
            $short = get_field("kinder_infoblock_short");

            if($short){
            ?>
                <p><?php echo $short;?></p>
            <?php }?> 
    </div>
    <div class="additional__right">
        <?php 
            echo get_field("kinder_infoblock_content");

            $link = get_field("kinder_infoblock_link");
            if($link){
                ?>
                    <a class="additional__button" href="<?php echo $link;?>" target="_blank" 
                    aria-label="<?php echo __("Перейти на информацию об ", "kinder") . get_the_title(); ?>"><?php echo __('Перейти', 'kinder');?></a>
                <?php
            }
        ?>

        
    </div>
</section>