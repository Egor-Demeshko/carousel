<?php
    $id = $args["image_id"];
    $url = $args["medium"];
    $image_alt = get_post_meta($id, '_wp_attachment_image_alt', true);
?>

<div class="photos__img_wrapper" data-image_id="<?php echo $id?>">
    <img alt="<?php echo $image_alt?>" class="photos__img" src="<?php echo $url?>" />
</div>