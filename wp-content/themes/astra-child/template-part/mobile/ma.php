<?php
// one content
?>
<div class="box-material" id="material-<?php echo $post->ID; ?>" data-id="<?php echo $post->ID; ?>"
     data-price_item="<?php echo $price; ?>" data-is_painting="<?php echo $painting; ?>"
     data-price_painting="<?php echo $price_painting; ?>" data-is_screen="<?php echo $silk_screen; ?>"
     data-price_silk_screen="<?php echo $price_silk_screen; ?>"
     data-unit_price="<?php echo $Unit_price; ?>"
     data-color-options="<?php echo $color_options ?>" data-leadtime-options="<?php echo $lead_time_options ?>"
     data-density="<?php echo $density ?>" data-fixed_cofficient="<?php echo $fixed_cofficient ?>"
     data-weight_range_1="<?php echo $weight_range_1 ?>" data-weight_range_2="<?php echo $weight_range_2 ?>"
     data-cofficient_1_greater_weightrange="<?php echo $cofficient_1_greater_weightrange ?>"
     data-cofficient_weight_bw_range_1_and_2="<?php echo $cofficient_weight_bw_range_1_and_2 ?>"
     data-cofficient_2_smaller_weightrange="<?php echo $cofficient_2_smaller_weightrange ?>"
     data-usdrmb_exchange_rate="<?php echo $usdrmb_exchange_rate ?>" data-floor_price="<?php echo $floor_price ?>"
     data-material_process="<?php echo $material_process ?>">
    <div class="box-material-materiallist">
        <?php $thumb_id = get_post_thumbnail_id($post->ID);
        $thumb_url = wp_get_attachment_image_src($thumb_id, "thumbnail-size", true); ?>
        <div class=" ma-material-box-desc-thumbnail">
            <div class="one_zoom"></div>
            <input type="hidden" class="one_product" name="one_product" value="<?php echo $thumb_url[0]; ?>"/>
            <!-- <div class="material-box-desc-service"><?php echo $material_process; ?></div> -->
            <img src="<?php echo get_the_post_thumbnail_url($pipost->ID, array(80, 80), array('alt' => '')); ?>" />
        </div>

<!--        <div class=" printing-material-process material-file-options-qty-wrap printing-column-process">-->
            <?php // echo $material_process; ?>
<!--        </div>-->

        <div class="ma-material-title material-part printing-column-material">
            <a href="<?php echo get_the_permalink($post->ID); ?>">
                <span class="printing-abbreviated-title"><?php echo $abbreviated_title; ?></span>
                <span class="printing-full-title"><?php echo $title; ?></span>
            </a>
            <span data-toggle="tooltip" data-placement="auto"
                  title="<?php echo get_post_meta($post->ID, 'material_explain', 1); ?>" data-trigger="hover"><i
                        class="fa-solid fa-circle-question"></i></span>
            </span>
            <input type="hidden" id="one_type" value="<?php echo $one_type; ?>"/>
            <div class="one_material"></div>
        </div>
        <div>
            <span class="select-lead-time printing-select-lead-time printing-column-lead_time"></span>
        </div>

<!--        <div class="custom-column-width-2 material-box-desc-properties material-item-overflow">-->
<!--            <div class="custom-column-width-1 printing-material-process material-file-options-qty-wrap printing-column-process">--><?php //echo $material_process; ?><!--</div>-->
<!--            <div class="material-wrap-process">--><?php ////echo $material_process; ?><!--</div> -->
<!--            <div class="ma-material-title material-part printing-column-material">-->
<!--                <a href="--><?php //echo get_the_permalink($post->ID); ?><!--">-->
<!--                    <span class="printing-abbreviated-title">--><?php //echo $abbreviated_title; ?><!--</span>-->
<!--                    <span class="printing-full-title">--><?php //echo $title; ?><!--</span>-->
<!--                </a>-->
<!--                <span data-toggle="tooltip" data-placement="auto"-->
<!--                      title="--><?php //echo get_post_meta($post->ID, 'material_explain', 1); ?><!--" data-trigger="hover"><i-->
<!--                            class="fa-solid fa-circle-question"></i></span>-->
<!--                </span>-->
<!--                <input type="hidden" id="one_type" value="--><?php //echo $one_type; ?><!--"/>-->
<!--                <div class="one_material"></div>-->
<!--            </div>-->
<!--            <span class="material-file-options-qty-wrap">-->
<!--                <span class="select-color printing-select-color printing-column-color"></span>-->
<!--                <span class="select-lead-time printing-select-lead-time printing-column-lead_time"></span>-->
<!--            </span>-->
            <!-- <div><?php echo $properties_html; ?></div> -->
            <!-- <div>Colors: <?php echo $color; ?></div> -->
<!--            <span class="col-quantity printing-files-all-qty printing-column-qty"></span>-->
<!--        </div>-->

        <!-- <td class="fixed-table-1"><?php //echo $color; ?></td> -->
        <!-- <div class="custom-column-width-3 material-box-desc-leadtime"><?php echo $leadtime_text ?></div> -->
        <!-- <td class="fixed-table-1 price">US$ <span class="material-price"><?php //echo '0.00' ?></span></td> -->
        <div class=" material-box-desc-price printing-column-price">
            <div>$<span class="material-price"><?php echo '0.00'; ?></span></div>

        </div>
<!--        <div class=" material-box-desc-cart printing-column-cart">-->
            <div class="" title="Add to cart"><span class="add-to-cart-button"><svg t="1655729930116"
                                                                                                    class="icon"
                                                                                                    viewBox="0 0 1024 1024"
                                                                                                    version="1.1"
                                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                                    p-id="5304"
                                                                                                    width="25"
                                                                                                    height="25"><path
                                d="M358.4 921.6m-102.4 0a102.4 102.4 0 1 0 204.8 0 102.4 102.4 0 1 0-204.8 0Z"
                                fill="#2c2c2c" p-id="5305"></path><path
                                d="M802.133333 921.6m-102.4 0a102.4 102.4 0 1 0 204.8 0 102.4 102.4 0 1 0-204.8 0Z"
                                fill="#2c2c2c" p-id="5306"></path><path
                                d="M928.426667 443.733333c-37.546667 20.48-81.92 34.133333-126.293334 34.133334-129.706667 0-238.933333-95.573333-252.586666-225.28-3.413333-6.826667-10.24-13.653333-17.066667-13.653334H184.32l-23.893333-122.88c0-6.826667-6.826667-13.653333-13.653334-13.653333H17.066667c-10.24 0-17.066667 6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066666h112.64l23.893333 116.053334v6.826666l20.48 102.4 61.44 303.786667c13.653333 68.266667 71.68 119.466667 143.36 119.466667h491.52c10.24 0 17.066667-6.826667 17.066667-17.066667s-6.826667-17.066667-17.066667-17.066667H378.88c-44.373333 0-85.333333-27.306667-102.4-71.68l631.466667-78.506666c6.826667 0 13.653333-6.826667 13.653333-13.653334l34.133333-122.88c3.413333-6.826667 0-13.653333-6.826666-17.066666-6.826667-6.826667-13.653333-6.826667-20.48-3.413334z"
                                fill="#2c2c2c" p-id="5307"></path><path
                                d="M802.133333 0C679.253333 0 580.266667 98.986667 580.266667 221.866667s98.986667 221.866667 221.866666 221.866666S1024 344.746667 1024 221.866667 925.013333 0 802.133333 0z m68.266667 238.933333H819.2v51.2c0 10.24-6.826667 17.066667-17.066667 17.066667s-17.066667-6.826667-17.066666-17.066667V238.933333h-51.2c-10.24 0-17.066667-6.826667-17.066667-17.066666s6.826667-17.066667 17.066667-17.066667H785.066667V153.6c0-10.24 6.826667-17.066667 17.066666-17.066667s17.066667 6.826667 17.066667 17.066667V204.8h51.2c10.24 0 17.066667 6.826667 17.066667 17.066667s-6.826667 17.066667-17.066667 17.066666z"
                                fill="#2c2c2c" p-id="5308"></path></svg></span></div>
            <div class="show-files-arrow-wrap">
                <span class="show-files-arrow printing-show-files-arrow">
                    <i class="fa-solid fa-angle-<?php if ($count == 0) {
                                echo 'up';
                            } else {
                                echo 'down';
                            } ?>"></i></span></div>
<!--        </div>-->
    </div>
    <div class="files-box material-<?php echo $post->ID; ?>" style="<?php if ($count == 0) {
        echo 'display: block;';
    } else {
        echo 'display: none;';
    } ?>"></div>
</div>