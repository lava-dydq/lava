<?php
    //two  content
?>
<div class="cnc-box-material box-material" id="cnc-material-<?php echo $cncpost->ID; ?>" data-id="<?php echo $cncpost->ID; ?>"
     data-material="<?php echo $cncpost->post_title; ?>" data-lead_time_option="<?php echo $lead_time_option; ?>"
     data-density="<?php echo $density; ?>" data-surface_treatment="<?php echo $surface_treatment; ?>"
     data-finishingcoating="<?php echo $finishingcoating; ?>"
     data-logopartial_finishing="<?php echo $logopartial_finishing; ?>"
     data-protective_coating="<?php echo $protective_coating; ?>"
     data-color-options="<?php echo $color_options ?>" data-leadtime-options="<?php echo $lead_time_options ?>"
     data-material_process="<?php echo $material_process ?>"
     data-unit_price="<?php echo $Unit_price; ?>"
>
    <!-- <div class="cnc-material-box-desc-service">CNC Machining</div> -->


    <?php $thumb_id = get_post_thumbnail_id($cncpost->ID);
        $thumb_url = wp_get_attachment_image_src($thumb_id, "thumbnail-size", true); ?>
    <div class="cnc-box-material-materiallist">
        <div class="cnc-material-box-desc-thumbnail">
            <div class="two_zoom"></div>
            <input type="hidden" class="two_product" name="two_product" value="<?php echo $thumb_url[0]; ?>"/>
            <img src="<?php echo get_the_post_thumbnail_url($cncpost->ID, array(80, 80), array('alt' => '')); ?>" />
        </div>

        <div class="cnc-material-title material-part">
            <a href="<?php echo get_the_permalink($cncpost->ID); ?>"><?php echo $cncpost->post_title; ?></a>
            <input type="hidden" id="two_type" value="<?php echo $two_type; ?>"/>
            <div class="two_material"></div>
        </div>

        <!--        <div class="custom-cnc-column-width-2 cnc-material-box-desc-properties material-item-overflow">-->
        <!--            <div class="cnc-material-title material-part">-->
        <!--                <a href="--><?php //echo get_the_permalink($cncpost->ID); ?><!--">--><?php //echo $cncpost->post_title; ?><!--</a>-->
        <!--                <input type="hidden" id="two_type" value="--><?php //echo $two_type; ?><!--"/>-->
        <!--                <div class="two_material"></div>-->
        <!--            </div>-->
        <!--            <span class="cnc-material-file-options-qty-wrap"><span-->
        <!--                        class="select-finishing cnc-select-finishing-name"></span><span-->
        <!--                        class="cnc-file-quantity-wrap cnc-file-all-quantity cnc-column-qty"></span></span>-->
        <!-- <div class="cnc-material-fullname"><?php if ($full_name) {
            echo '(' . $full_name . ')';
        } ?></div> -->
        <!--        </div>-->
        <!-- <td class="fixed-table-1"><?php //echo $color; ?></td> -->
        <div class="cnc-material-box-desc-leadtime cnc-column-lead_time printing-select-lead-time"><?php echo $lead_time_text; ?></div>
        <div class="cnc-material-box-desc-price cnc-column-price">
            <div>$<span class="cnc-material-price material-price"><?php echo '0.00' ?></span></div>
        </div>
        <!--        <div class="cnc-material-box-desc-cart cnc-column-car">-->
        <div class="" title="Add to cart"><span class="cnc-add-to-cart-button"><svg
                        t="1655729930116" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="5304" width="25" height="25"><path
                            d="M358.4 921.6m-102.4 0a102.4 102.4 0 1 0 204.8 0 102.4 102.4 0 1 0-204.8 0Z"
                            fill="#2c2c2c" p-id="5305"></path><path
                            d="M802.133333 921.6m-102.4 0a102.4 102.4 0 1 0 204.8 0 102.4 102.4 0 1 0-204.8 0Z"
                            fill="#2c2c2c" p-id="5306"></path><path
                            d="M928.426667 443.733333c-37.546667 20.48-81.92 34.133333-126.293334 34.133334-129.706667 0-238.933333-95.573333-252.586666-225.28-3.413333-6.826667-10.24-13.653333-17.066667-13.653334H184.32l-23.893333-122.88c0-6.826667-6.826667-13.653333-13.653334-13.653333H17.066667c-10.24 0-17.066667 6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066666h112.64l23.893333 116.053334v6.826666l20.48 102.4 61.44 303.786667c13.653333 68.266667 71.68 119.466667 143.36 119.466667h491.52c10.24 0 17.066667-6.826667 17.066667-17.066667s-6.826667-17.066667-17.066667-17.066667H378.88c-44.373333 0-85.333333-27.306667-102.4-71.68l631.466667-78.506666c6.826667 0 13.653333-6.826667 13.653333-13.653334l34.133333-122.88c3.413333-6.826667 0-13.653333-6.826666-17.066666-6.826667-6.826667-13.653333-6.826667-20.48-3.413334z"
                            fill="#2c2c2c" p-id="5307"></path><path
                            d="M802.133333 0C679.253333 0 580.266667 98.986667 580.266667 221.866667s98.986667 221.866667 221.866666 221.866666S1024 344.746667 1024 221.866667 925.013333 0 802.133333 0z m68.266667 238.933333H819.2v51.2c0 10.24-6.826667 17.066667-17.066667 17.066667s-17.066667-6.826667-17.066666-17.066667V238.933333h-51.2c-10.24 0-17.066667-6.826667-17.066667-17.066666s6.826667-17.066667 17.066667-17.066667H785.066667V153.6c0-10.24 6.826667-17.066667 17.066666-17.066667s17.066667 6.826667 17.066667 17.066667V204.8h51.2c10.24 0 17.066667 6.826667 17.066667 17.066667s-6.826667 17.066667-17.066667 17.066666z"
                            fill="#2c2c2c" p-id="5308"></path></svg></span></div>
        <div class="show-files-arrow-wrap"><span class="show-files-arrow cnc-show-files-arrow"><i
                        class="fa-solid fa-angle-<?php if ($bcount == 0) {
                            echo 'up';
                        } else {
                            echo 'down';
                        } ?>"></i></span></div>
        <!--        </div>-->
    </div>
    <div class="cnc-files-container files-box cnc-material-<?php echo $cncpost->ID; ?>" style="<?php if ($bcount == 0) {
        echo 'display: block;';
    } else {
        echo 'display: none;';
    } ?>"></div>
</div>