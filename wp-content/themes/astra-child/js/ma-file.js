// 分离ma
var price_unit;

function  add_file_ma_main(filesData,leadtime_val){
     // console.log(filesData)
    // Add Files in Table
 
    jQuery('.box-material').each(function (i) {
        var price_calc = [];
        var price = jQuery(this).attr('data-price_item');
        var is_painting = jQuery(this).attr('data-is_painting');
        var is_screen = jQuery(this).attr('data-is_screen');
        var box = jQuery(this).find('.files-box');
        var Unitprice = jQuery(this).attr('data-unit_price');
        var ProductID = jQuery(this).attr('data-id');
		var ProductID_tag = jQuery(this).attr('id');
        var density_val = jQuery(this).attr('data-density');

        // Price formula fields
        price_calc['material_id'] = jQuery(this).attr('data-id');
        price_calc['fixed_cofficient'] = jQuery(this).attr('data-fixed_cofficient');
        price_calc['weight_range_1'] = jQuery(this).attr('data-weight_range_1');
        price_calc['weight_range_2'] = jQuery(this).attr('data-weight_range_2');
        price_calc['cofficient_1_greater_weightrange'] = jQuery(this).attr('data-cofficient_1_greater_weightrange');
        price_calc['cofficient_weight_bw_range_1_and_2'] = jQuery(this).attr('data-cofficient_weight_bw_range_1_and_2');
        price_calc['cofficient_2_smaller_weightrange'] = jQuery(this).attr('data-cofficient_2_smaller_weightrange');
        price_calc['usdrmb_exchange_rate'] = jQuery(this).attr('data-usdrmb_exchange_rate');
        price_calc['material_process'] = jQuery(this).attr('data-material_process');
        price_calc['floor_price'] = jQuery(this).attr('data-floor_price') ? jQuery(this).attr('data-floor_price') : 0;
        // price_calc['volume'] = total_volume;
        price_calc['density'] = density_val;
        price_calc['quantity'] = 1;
        price_calc['unit_price'] = Unitprice;
        price_calc['lead_time'] = leadtime_val;

        box.empty();

        var color_options = jQuery(this).attr('data-color-options');
        var color_option_html = '';
        if (color_options != '') {
            var color_options_arr = color_options.split(',');
            color_option_html += '<form class="options-form">';
            for (var i = 0; i < color_options_arr.length; i++) {
                var coption = color_options_arr[i].replace(/(^\s*)|(\s*$)/g, ""); // 去掉两边空格符
                if (i == 0) {
                    var default_color = coption;
                    color_option_html += '<label class="option-check"><input type="radio" hidden="true" name="printing-color-option" checked="checked" value="' + coption + '">' + coption + '</label>';
                } else {
                    color_option_html += '<label><input type="radio" hidden="true" name="printing-color-option" value="' + coption + '">' + coption + '</label>';
                }
            }
            color_option_html += '</form>';
        }

        var leadtime_options = jQuery(this).attr('data-leadtime-options');
        var lead_time_option_html = '';
        if (leadtime_options != '') {
            var lead_options_arr = leadtime_options.split(';');
            lead_time_option_html += '<form class="options-form">';
            for (var i = 0; i < lead_options_arr.length; i++) {
                var ltoption = lead_options_arr[i].replace(/(^\s*)|(\s*$)/g, ""); // 去掉两边空格符
                var lead_opt = ltoption.split(':');
                if (i == 0) {
                    var default_leadtime = lead_opt[0];
                    lead_time_option_html += '<label class="option-check"><input type="radio" hidden="true" name="printing-lead-time-option" checked="checked" value="' + lead_opt[1] + '">' + lead_opt[0] + '</label>';
                } else {
                    lead_time_option_html += '<label><input type="radio" hidden="true" name="printing-lead-time-option" value="' + lead_opt[1] + '">' + lead_opt[0] + '</label>';
                }
            }
            lead_time_option_html += '</form>';
        }

        var html = '';
        var cnt = 0;
        var mytotal = 0;
       
        var totalprice = 0;
        var price_unit_array = new Array();
        jQuery.each(filesData, function (i, file) {
            var volume = file['volume'];
            if (file_unit == "inch") { // inch change to mm
                volume = parseFloat(volume) / 25.4;
            }
            price_calc['volume'] = volume;
            // price_calc['volume'] = file['volume'];
            price_calculation = calculate_price_with_formula(price_calc);
            price_unit = price_calculation.toFixed(2);
            mytotal = mytotal + Number(price_unit);
            price_unit_array.push(price_unit);
        });
        jQuery.each(filesData, function (i, file) {
            if (mytotal < price_calc['floor_price']) {
                totalprice = Number(price_calc['floor_price']);
                price_unit = Number(totalprice / mytotal * price_unit_array[i]).toFixed(2);
            } else {
                totalprice = mytotal;
                price_unit = price_unit_array[i];
            }

            file_unit = 'mm'
            //console.log(file_unit);

            ma_show_unit_price(ProductID_tag, price_calculation, file['box_xyz'].x, file['box_xyz'].y, file['box_xyz'].z) //单价计算
            sku = GenNonDuplicateID();//唯一sku
            // htmlold = '<div class="file-box price-father duplicate_cols_outer" id="' + ProductID_tag + '-' + i + '" key="' + i + '" column="ma" sku="' + sku +
            //     '" data-file="' + file['filename'] + '" data-file_unit="' + file_unit + '" quantity-item="' + price_calc['quantity'] +
            //     '" price-item="' + price_unit_array[i] + '" data-volume="' + parseFloat(file['volume']) +
            //     '" data-surface_area="' + parseFloat(file['surface_area']) + '" data-box_volume="' + parseFloat(file['box_volume']) +
            //     '" data-box_x="' + parseFloat(file['box_xyz'].x) + '" data-box_y="' + parseFloat(file['box_xyz'].y) +
            //     '" data-box_z="' + parseFloat(file['box_xyz'].z) +
            //     '" data-one_price="' + parseFloat(price_unit) + '">'
            //     + '<div class="file-box-filelist">' +
            //     '<div class="material-file-img custom-column-width-1"><img src="/wp-content/uploads/woocommerce-placeholder-300x300.png" alt="default img"></div>' + '<div class="material-file-name custom-column-width-2 material-item-overflow">' +
            //     '<div class="material-file-process custom-column-width-1 ma-width"></div>' +
            //     '<div class="preview-link" data-link="' + file['url'] + '">' + file['filename'] + '</div>' +
            //     '<div class="material-file-options-qty-wrap">' + '<div class="material-file-select-wrap">' +
            //     '<div class="select-options select-color">' + '<div><div class="printing-color">' + default_color +
            //     '</div><span class="color-down"><i class="fa-solid fa-angle-down"></i></span></span></div>' +
            //     '<div class="option-wrap color-option-wrap" style="display: none;">' + color_option_html + '</div>' +
            //     '</div>' + '<div class="select-options select-lead-time">' + '<div><div class="printing-leadtime">' +
            //     default_leadtime + '</div><span class="lead-time-down"><i class="fa-solid fa-angle-down"></i></span></span></div>' + '<div class="option-wrap lead-time-option-wrap" style="display: none;">' +
            //     lead_time_option_html + '</div>' + '</div>' + '</div>' + '<div class="col-quantity col_float_left">' +
            //     '<div class="bt-minus"><i class="fa-solid fa-circle-minus"></i></div>' +
            //     '<input type="text" class="plus-minus input-text qty text" name="quantity" value="1" maxlength="10">' +
            //     '<div class="bt-plus"><i class="fa-solid fa-circle-plus"></i></div>' + '</div>' + '</div>' + '</div>' +
            //     '<div class="one-price col_float_left custom-column-width-3">US$ <span >' + parseFloat(price_unit).toFixed(2) + '</span></div>' +
            //     '<div class="col-price col_float_left custom-column-width-3">US$ <span >' + parseFloat(price_unit).toFixed(2) + '</span></div>' +
            //     '<div class="file-ation-wrap">' + '<div class="printing-abnormal-list base-price-list" mid="' + ProductID_tag + '-' + i + '">' +
            //     '<div class="click-price" title="click to check bulk prices">bulk price</div>' +
            //     '<div id="mask" class="mask" >' + '<div class="abnormal-show-list">' +
            //     '<div class="bulk-top"><div class="title">Bulk Price</div><div class="hide-close">x</div></div>' +
            //     '<div class="bklist"></div>' +
            //     '<div class="bulk-bottom">For more than 1000 please send us mail through:<a href="mailto:kevin@lava.limited">kevin@lava.limited</a></div>' + '</div>' + '</div>' + '</div>' + '<div class="add-to-cart-sub" >' +
            //     '<span class="add-to-cart-sub-button" title="Add to cart" cart-id="' + ProductID + '-' + i + '">' + '<svg t="1655729930116" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5304" width="16" height="16">' + '<path d="M358.4 921.6m-102.4 0a102.4 102.4 0 1 0 204.8 0 102.4 102.4 0 1 0-204.8 0Z" fill="#2c2c2c" p-id="5305"></path><path d="M802.133333 921.6m-102.4 0a102.4 102.4 0 1 0 204.8 0 102.4 102.4 0 1 0-204.8 0Z" fill="#2c2c2c" p-id="5306"></path><path d="M928.426667 443.733333c-37.546667 20.48-81.92 34.133333-126.293334 34.133334-129.706667 0-238.933333-95.573333-252.586666-225.28-3.413333-6.826667-10.24-13.653333-17.066667-13.653334H184.32l-23.893333-122.88c0-6.826667-6.826667-13.653333-13.653334-13.653333H17.066667c-10.24 0-17.066667 6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066666h112.64l23.893333 116.053334v6.826666l20.48 102.4 61.44 303.786667c13.653333 68.266667 71.68 119.466667 143.36 119.466667h491.52c10.24 0 17.066667-6.826667 17.066667-17.066667s-6.826667-17.066667-17.066667-17.066667H378.88c-44.373333 0-85.333333-27.306667-102.4-71.68l631.466667-78.506666c6.826667 0 13.653333-6.826667 13.653333-13.653334l34.133333-122.88c3.413333-6.826667 0-13.653333-6.826666-17.066666-6.826667-6.826667-13.653333-6.826667-20.48-3.413334z" fill="#2c2c2c" p-id="5307"></path><path d="M802.133333 0C679.253333 0 580.266667 98.986667 580.266667 221.866667s98.986667 221.866667 221.866666 221.866666S1024 344.746667 1024 221.866667 925.013333 0 802.133333 0z m68.266667 238.933333H819.2v51.2c0 10.24-6.826667 17.066667-17.066667 17.066667s-17.066667-6.826667-17.066666-17.066667V238.933333h-51.2c-10.24 0-17.066667-6.826667-17.066667-17.066666s6.826667-17.066667 17.066667-17.066667H785.066667V153.6c0-10.24 6.826667-17.066667 17.066666-17.066667s17.066667 6.826667 17.066667 17.066667V204.8h51.2c10.24 0 17.066667 6.826667 17.066667 17.066667s-6.826667 17.066667-17.066667 17.066666z" fill="#2c2c2c" p-id="5308"></path>' + '</svg></span>' + '</div>' + '<div class="printing-abnormal-alert">' + '<i class="fa-solid fa-bell"></i>' + '<div class="abnormal-alert-tips">Click to ring the bell if you find the price too high, too low, looks strange. Or any other questions! We will get back to you ASAP!</div>' + '</div>' +
            //     '<div class="dublicate-delete-wrap">' + '<div class="dublicateclick" title="Click To Duplicate" data-click-id="' + ProductID_tag + '"><i class="fa-solid fa-copy"></i></div>' +
            //     '<div class="remove_form remove_icon" title="Click To Remove"><i class="fa-solid fa-trash-can"></i></div>' +
            //     '</div>' +
            //     '</div>' +
            //     '</div>' +
            //     '</div>';
            // cnt++;
            html=`
<div class="file-box price-father duplicate_cols_outer" 
    id="${ProductID_tag}-${i}" 
    key="${i}" 
    column="ma" 
    sku="${sku}"
     data-file="${file['filename']}" 
     data-file_unit="${file_unit}"
     quantity-item="${price_calc['quantity']}"
     price-item="${price_unit_array[i]}" 
     data-volume="${parseFloat(file['volume'])}"
     data-surface_area="${parseFloat(file['surface_area'])}" 
     data-box_volume="${parseFloat(file['box_volume'])}" 
     data-box_x="${parseFloat(file['box_xyz'].x)}"
     data-box_y="${parseFloat(file['box_xyz'].y)}" 
     data-box_z="${parseFloat(file['box_xyz'].z)}" 
     data-one_price="${parseFloat(price_unit)}">
    <div class="file-box-filelist">
        <div class="material-file-img printing-column-swatch">
            <img src="/wp-content/uploads/woocommerce-placeholder-300x300.png" alt="default img">
        </div>
<!--        <div class="material-file-name custom-column-width-2 material-item-overflow">-->
<!--            <div class="material-file-process custom-column-width-1 ma-width"></div>-->
            <div class="preview-link printing-column-process" data-link="${file['url']}">${file['filename']}
            </div>
            <div class="printing-column-material"></div>
<!--            <div class="material-file-options-qty-wrap">-->
<!--                <div class="material-file-select-wrap">-->
                    <div class="select-options select-color printing-column-color">
                        <div>
                            <div class="printing-color">${default_color}</div>
                            <span class="color-down"><i class="fa-solid fa-angle-down"></i></span></span></div>
                        <div class="option-wrap color-option-wrap" style="display: none;">
                            ${color_option_html}
                        </div>
                    </div>
                    <div class="select-options select-lead-time printing-column-lead_time">
                        <div>
                            <div class="printing-leadtime">${default_leadtime}</div>
                            <span class="lead-time-down"><i class="fa-solid fa-angle-down"></i></span></span></div>
                        <div class="option-wrap lead-time-option-wrap" style="display: none;">
                            ${lead_time_option_html}
                        </div>
                    </div>
<!--                </div>-->
                <div class="col-quantity col_float_left printing-column-qty">
                    <div class="bt-minus"><i class="fa-solid fa-circle-minus"></i></div>
                    <input type="text" class="plus-minus input-text qty text" name="quantity" value="1" maxlength="10">
                    <div class="bt-plus"><i class="fa-solid fa-circle-plus"></i></div>
                </div>
<!--            </div>-->
<!--        </div>-->
        <div class="printing-column-unit">US$ <span>${parseFloat(price_unit).toFixed(2)}</span></div>
        <div class="col-price col_float_left custom-column-width-3 printing-column-price">US$ <span>${parseFloat(price_unit).toFixed(2)}</span></div>
        <div class="file-ation-wrap printing-column-cart">
            <div class="printing-abnormal-list base-price-list" mid="${ProductID_tag}">
                <div class="click-price" title="click to check bulk prices">bulk price</div>
                <div id="mask" class="mask">
                    <div class="abnormal-show-list">
                        <div class="bulk-top">
                            <div class="title">Bulk Price</div>
                            <div class="hide-close">x</div>
                        </div>
                        <div class="bklist"></div>
                        <div class="bulk-bottom">For more than 1000 please send us mail through:<a
                                href="mailto:kevin@lava.limited">kevin@lava.limited</a></div>
                    </div>
                </div>
            </div>
            <div class="add-to-cart-sub"><span class="add-to-cart-sub-button" title="Add to cart" cart-id="${ProductID + '-' + i}">
            <svg
                    t="1655729930116" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="5304" width="16" height="16"><path
                    d="M358.4 921.6m-102.4 0a102.4 102.4 0 1 0 204.8 0 102.4 102.4 0 1 0-204.8 0Z" fill="#2c2c2c"
                    p-id="5305"></path><path
                    d="M802.133333 921.6m-102.4 0a102.4 102.4 0 1 0 204.8 0 102.4 102.4 0 1 0-204.8 0Z" fill="#2c2c2c"
                    p-id="5306"></path><path
                    d="M928.426667 443.733333c-37.546667 20.48-81.92 34.133333-126.293334 34.133334-129.706667 0-238.933333-95.573333-252.586666-225.28-3.413333-6.826667-10.24-13.653333-17.066667-13.653334H184.32l-23.893333-122.88c0-6.826667-6.826667-13.653333-13.653334-13.653333H17.066667c-10.24 0-17.066667 6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066666h112.64l23.893333 116.053334v6.826666l20.48 102.4 61.44 303.786667c13.653333 68.266667 71.68 119.466667 143.36 119.466667h491.52c10.24 0 17.066667-6.826667 17.066667-17.066667s-6.826667-17.066667-17.066667-17.066667H378.88c-44.373333 0-85.333333-27.306667-102.4-71.68l631.466667-78.506666c6.826667 0 13.653333-6.826667 13.653333-13.653334l34.133333-122.88c3.413333-6.826667 0-13.653333-6.826666-17.066666-6.826667-6.826667-13.653333-6.826667-20.48-3.413334z"
                    fill="#2c2c2c" p-id="5307"></path><path
                    d="M802.133333 0C679.253333 0 580.266667 98.986667 580.266667 221.866667s98.986667 221.866667 221.866666 221.866666S1024 344.746667 1024 221.866667 925.013333 0 802.133333 0z m68.266667 238.933333H819.2v51.2c0 10.24-6.826667 17.066667-17.066667 17.066667s-17.066667-6.826667-17.066666-17.066667V238.933333h-51.2c-10.24 0-17.066667-6.826667-17.066667-17.066666s6.826667-17.066667 17.066667-17.066667H785.066667V153.6c0-10.24 6.826667-17.066667 17.066666-17.066667s17.066667 6.826667 17.066667 17.066667V204.8h51.2c10.24 0 17.066667 6.826667 17.066667 17.066667s-6.826667 17.066667-17.066667 17.066666z"
                    fill="#2c2c2c" p-id="5308"></path></svg>
                    </span></div>
            <div class="printing-abnormal-alert"><i class="fa-solid fa-bell"></i>
                <div class="abnormal-alert-tips">Click to ring the bell if you find the price too high, too low, looks
                    strange. Or any other questions! We will get back to you ASAP!
                </div>
            </div>
            <div class="dublicate-delete-wrap">
                <div class="dublicateclick" title="Click To Duplicate" data-click-id="${ProductID_tag}"><i
                        class="fa-solid fa-copy"></i></div>
                <div class="remove_form remove_icon" title="Click To Remove"><i class="fa-solid fa-trash-can"></i></div>
            </div>
        </div>
        <div class="show-files-arrow-close-all"></div>
    </div>
</div>`

            box.append(html);

        });


        jQuery(this).find('.material-price').html(totalprice.toFixed(2));
        // jQuery(this).removeClass('disabled');
        // jQuery(this).find('.addtocart .button').prop('disabled', false);
        if (i == 0) {
            jQuery(this).find('.files-box').show();
        }

        // 更新每个 3d printing 材料的颜色名称，交期时间名称
        // 如果下面零件的选项都一致，是同样的，就显示那个同样的内容；
        // 如果不一致，则显示"see details below"
        var jquery = jQuery(this);
        update_printing_color_name(jquery);
        update_printing_leadtime_name(jquery);
        // 更新每个 3d printing 材料的总数量
        var jquery = jQuery(this);
        // console.log(price_unit)
        update_printing_files_all_qty(jquery);
    });

    let data ='MA已加载完成';
    return data;
}

// 更新 3D printing 每种材料的颜色名称
function update_printing_color_name(jquery) {
    var printing_color_arr = [];
    jquery.find(".files-box").find('.file-box').each(function () {
        var printing_color = jQuery(this).find('.printing-color').text();
        printing_color_arr.push(printing_color);
    });
    // console.log('printing_color_arr',printing_color_arr);
    var result = removeDuplicate(printing_color_arr);
    if (result.length == 0) {
        var printing_color_name = '';
    } else if (result.length == 1) {
        var printing_color_name = result[0];
    } else {
        var printing_color_name = "see details below";
    } jquery.find('.printing-select-color').html(printing_color_name);
}


// 更新 3D printing 每种材料的交货期名称
function update_printing_leadtime_name(jquery) {
    var printing_leadtime_arr = [];
    jquery.find(".files-box").find('.file-box').each(function () {
        var printing_leadtime = jQuery(this).find('.printing-leadtime').text();
        printing_leadtime_arr.push(printing_leadtime);
    });
    // console.log('printing_leadtime_arr',printing_leadtime_arr);
    var result = removeDuplicate(printing_leadtime_arr);
    if (result.length == 0) {
        var printing_leadtime_name = '';
    } else if (result.length == 1) {
        var printing_leadtime_name = result[0];
    } else {
        var printing_leadtime_name = "see details below";
    } jquery.find('.printing-select-lead-time').html(printing_leadtime_name);
}

// 更新 3D printing 每种材料的所有数量
function update_printing_files_all_qty(jquery) {
    var qty = 0;
    jquery.find(".files-box").find('.file-box').each(function () {
        var one_qty = jQuery(this).find('.plus-minus').val();
        qty += parseInt(one_qty);
    });
    jquery.find('.printing-files-all-qty').html(qty);
    // 单价赋值1218
    //console.log('111.11')
    //console.log(price_unit)
    jquery.find('.ma-unit-material-price').html(price_unit);
}


// 3d 打印价格异常提示
jQuery('body').on('click', '.printing-abnormal-alert', function() {
	jQuery('#exception-prompt').show();
	var filename = jQuery(this).closest('.file-box').attr('data-file');
	var file_unit = jQuery(this).closest('.file-box').attr('data-file_unit');
	var material_id = jQuery(this).closest('.box-material').attr('data-id');
	var quantity = jQuery(this).closest('.file-box').find('input[name="quantity"]').val();
	var price = jQuery(this).closest('.file-box').find('.col-price').text();
	var manual = '3D PRINTING';
	jQuery('.prompt-confirm-btn').attr({
		'data-filename': filename,
		'data-file_unit': file_unit,
		'data-material_id': material_id,
		'data-quantity': quantity,
		'data-price': price,
		'data-manual': manual
	});
});



// // 点击左移右移图标
// jQuery(document).on('click', '.printing-fa-angles-wrap', function() {
// 	var display = jQuery(this).find(".close").css('display');
// 	if (display == "flex") {
// 		jQuery('.printing-materials-select-outer-container').css('minWidth', '0px');
// 		jQuery('.material-file-options-qty-wrap').css('display', 'none');
// 		jQuery('.ma-unit').css('display', 'none');
// 		jQuery('.printing-full-title').css('display', 'none');
// 		jQuery('.printing-abbreviated-title').css('display', 'block');
// 		jQuery('.custom-column-width-2').css({
// 			width: '130px',
// 			minWidth: '130px'
// 		});
// 		jQuery(this).find(".open").css('display', 'flex');
// 		jQuery(this).find(".close").css('display', 'none');
//         jQuery('.one-price').css('display','none');
// 	} else {
// 		jQuery('.printing-materials-select-outer-container').css('minWidth', '865px');
// 		jQuery('.material-file-options-qty-wrap').css('display', 'flex');
// 		jQuery('.ma-unit').css('display', 'flex');
// 		jQuery('.printing-full-title').css('display', 'block');
// 		jQuery('.printing-abbreviated-title').css('display', 'none');
// 		jQuery('.custom-column-width-2').css({
// 			width: '560px',
// 			minWidth: '560px'
// 		});
// 		jQuery(this).find(".close").css('display', 'flex');
// 		jQuery(this).find(".open").css('display', 'none');
//         jQuery('.one-price').css('display','flex');
// 	}
	
// });

//点击减号更新价格
jQuery('body').on('click', '.bt-minus', function(e) {
	e.preventDefault();
	var update_val = false;
	var input = jQuery(this).parent().find('input');
	var value = parseInt(input.val());
    if (value > 1) {
        value = value - 1;
        update_val = true;
    }else if(value ==1){
        value =1
        update_val = false;
        return false;
    }

    if (update_val == true) {
		input.val(value);
		//触发update cart按钮，更新购物车
		if (jQuery('input[name="update_cart"]').length > 0){
			jQuery('input[name="update_cart"]').prop('disabled', false).trigger("click");
		}
	}


	var box = jQuery(this).closest('.box-material');
	var box_id = box.attr('id');

	if (box_id != 'undefined') {
		// New Code for calculated price update 
		var $this = jQuery(this);
		var leadtime = $this.closest('.file-box').find('input[name="printing-lead-time-option"]:checked').val();
		var parent = jQuery(this).parents('.file-box');

		// start 若产品已加入购物车，点击后从购物车移除，并购物车改成绿色。20230104  更新
		let sub =parent.find('.add-to-cart-sub-button');
        var sku =parent.attr('sku');
		// console.log(sub);
		if (jQuery(sub).hasClass('cart')) {
			Reduce_files_cart(sku)
			jQuery(sub).removeClass('cart');
			// console.log('delete cart')
		}
		//end 若产品已加入购物车，点击后从购物车移除，并购物车改成绿色。

        
         // 当前产品是否是最后一个，是大购物车变黑
         setTimeout(() => {
          last_small_cart(parent,box_id,box)
        }, 300);
		var get_file = parent.attr('data-file');
		var volume = parent.attr('data-volume');
		var file_unit = parent.attr('data-file_unit');
		if (file_unit == "inch") {
			// inch change to mm
			volume =parseFloat(volume)/25.4;
		}

		var density = $this.parents('div.box-material').attr('data-density');
		var quantity = value;
		var unit_price = $this.parents('div.box-material').attr('data-unit_price');
		var price_calc = [];

		// New Array 
		price_calc['fixed_cofficient'] = $this.parents('div.box-material').attr('data-fixed_cofficient');
		price_calc['weight_range_1'] = $this.parents('div.box-material').attr('data-weight_range_1');
		price_calc['weight_range_2'] = $this.parents('div.box-material').attr('data-weight_range_2');
		price_calc['cofficient_1_greater_weightrange'] = $this.parents('div.box-material').attr('data-cofficient_1_greater_weightrange');
		price_calc['cofficient_weight_bw_range_1_and_2'] = $this.parents('div.box-material').attr('data-cofficient_weight_bw_range_1_and_2');
		price_calc['cofficient_2_smaller_weightrange'] = $this.parents('div.box-material').attr('data-cofficient_2_smaller_weightrange');
		price_calc['usdrmb_exchange_rate'] = $this.parents('div.box-material').attr('data-usdrmb_exchange_rate');
		price_calc['material_process'] = $this.parents('div.box-material').attr('data-material_process');
		price_calc['floor_price'] = $this.parents('div.box-material').attr('data-floor_price') ? $this.parents('div.box-material').attr('data-floor_price') : 0;
		price_calc['volume'] = volume;
		price_calc['density'] = density;
		price_calc['quantity'] = quantity;
		price_calc['unit_price'] = unit_price;
		price_calc['lead_time'] = leadtime;
		// New Array

		var calculated_price = calculate_price_with_formula(price_calc);
		//console.log(calculated_price);
		//var price_file_html = $this.closest('.file-box').find('.col-price span');
		$this.closest('.file-box').attr('price-item', calculated_price.toFixed(2));
		$this.closest('.file-box').attr('quantity-item', quantity);
		//price_file_html.html( (calculated_price).toFixed(2) );
		update_newprice_box_material(box_id);
	}
	let  ma_box = jQuery(this).closest('.box-material');
	update_printing_files_all_qty(ma_box);



});

// 最后一个文件点击减购，大购物车变黑
function  last_small_cart(last,box_id,box){
    // 获取当前是第几个 2023 1月11日
    let cartid = last.find('.add-to-cart-sub-button').attr('cart-id');
    // console.log(cartid);
    // 获取购物车序号
    let index = cartid.lastIndexOf("-");
    let cid = cartid.substring(index + 1, cartid.length)
    // console.log(cid);
    // 获取当前产品的数量之和
    let number= jQuery('#' + box_id + ' .file-box').length
    // console.log('cid'+cid);
    // console.log('number'+number);
    // 当序号= 总数减一，确定为最后一个减购物车,然后触发，把大购物车变黑，并去除所有购物车数量。
    if(Number(cid) ==number-1 ){
    // console.log(box)
    setTimeout(() => {
        clear_my_cart()
        jQuery(box).find('.add-to-cart-button').removeClass('cart')
    }, 300);
   }else if(Number(cid)==number){
    // console.log('last'+number)
    setTimeout(() => {
        clear_my_cart()
       jQuery(box).find('.add-to-cart-button').removeClass('cart')
    }, 300);
   }
}



//点击加号更新价格
jQuery('body').on('click', '.bt-plus', function(e) {
	e.preventDefault();
	var update_val = false;
	var input = jQuery(this).parent().find('input');
	var value = parseInt(input.val());
	// console.log(value)
	value = value + 1;
	update_val = true;


	if (update_val == true) {
		input.val(value);
		//触发update cart按钮，更新购物车
		if (jQuery('input[name="update_cart"]').length > 0){
			jQuery('input[name="update_cart"]').prop('disabled', false).trigger("click");
		}
	}

	var box = jQuery(this).closest('.box-material');
	var box_id = box.attr('id');

	if (box_id != 'undefined') {
		// New Code for calculated price update 
		var $this = jQuery(this);
		var leadtime = $this.closest('.file-box').find('input[name="printing-lead-time-option"]:checked').val();
        var parent = jQuery(this).parents('.file-box');
        //点击+号增加购物车
        ma_plus_cart(parent); 
		var get_file = parent.attr('data-file');
		var volume = parent.attr('data-volume');
		var file_unit = parent.attr('data-file_unit');
		if (file_unit == "inch") {
			// inch change to mm
			volume =parseFloat(volume)/25.4;
		}

		var density = $this.parents('div.box-material').attr('data-density');
		var quantity = value;
		var unit_price = $this.parents('div.box-material').attr('data-unit_price');
		var price_calc = [];

		// New Array 
		price_calc['fixed_cofficient'] = $this.parents('div.box-material').attr('data-fixed_cofficient');
		price_calc['weight_range_1'] = $this.parents('div.box-material').attr('data-weight_range_1');
		price_calc['weight_range_2'] = $this.parents('div.box-material').attr('data-weight_range_2');
		price_calc['cofficient_1_greater_weightrange'] = $this.parents('div.box-material').attr('data-cofficient_1_greater_weightrange');
		price_calc['cofficient_weight_bw_range_1_and_2'] = $this.parents('div.box-material').attr('data-cofficient_weight_bw_range_1_and_2');
		price_calc['cofficient_2_smaller_weightrange'] = $this.parents('div.box-material').attr('data-cofficient_2_smaller_weightrange');
		price_calc['usdrmb_exchange_rate'] = $this.parents('div.box-material').attr('data-usdrmb_exchange_rate');
		price_calc['material_process'] = $this.parents('div.box-material').attr('data-material_process');
		price_calc['floor_price'] = $this.parents('div.box-material').attr('data-floor_price') ? $this.parents('div.box-material').attr('data-floor_price') : 0;
		price_calc['volume'] = volume;
		price_calc['density'] = density;
		price_calc['quantity'] = quantity;
		price_calc['unit_price'] = unit_price;
		price_calc['lead_time'] = leadtime;
		// New Array

		var calculated_price = calculate_price_with_formula(price_calc);
		//console.log(calculated_price);
		//var price_file_html = $this.closest('.file-box').find('.col-price span');
		$this.closest('.file-box').attr('price-item', calculated_price.toFixed(2));
		$this.closest('.file-box').attr('quantity-item', quantity);
		//price_file_html.html( (calculated_price).toFixed(2) );
		update_newprice_box_material(box_id);
	}
	var jquery = jQuery(this).closest('.box-material');
	update_printing_files_all_qty(jquery);
    
});

function ma_plus_cart(parent){
    // console.log(parent.attr('sku'));
    var files = [];
            var file_item = {
                sku: parent.attr('sku'),
                col: parent.attr('column'),
                volume: parent.attr('data-volume'),
                surface_area: parent.attr('data-surface_area'),
                box_volume: parent.attr('data-box_volume'),
                file_unit: parent.attr('data-file_unit'),
                material_id: parent.closest('.box-material').attr('data-id'),
                file_name: parent.find('.preview-link').text(),
                quantity: parent.find('input.plus-minus').val()-1,
                price_unit: parent.find('.col-price span').text(),
                leadtime: parent.find('input[name="printing-lead-time-option"]:checked').val(),
                leadtime_selected: parent.find('input[name="printing-lead-time-option"]:checked').closest('.option-check').text(),
                color_selected: parent.find('input[name="printing-color-option"]:checked').val(),
                density: parent.closest('.box-material').attr('data-density'),
                fixed_cofficient: parent.closest('.box-material').attr('data-fixed_cofficient'),
                weight_range_1: parent.closest('.box-material').attr('data-weight_range_1'),
                weight_range_2: parent.closest('.box-material').attr('data-weight_range_2'),
                cofficient_1_greater_weightrange: parent.closest('.box-material').attr('data-cofficient_1_greater_weightrange'),
                cofficient_weight_bw_range_1_and_2: parent.closest('.box-material').attr('data-cofficient_weight_bw_range_1_and_2'),
                cofficient_2_smaller_weightrange: parent.closest('.box-material').attr('data-cofficient_2_smaller_weightrange'),
                usdrmb_exchange_rate: parent.closest('.box-material').attr('data-usdrmb_exchange_rate')

                // is_painting : parent.find('input[name="painting"]').prop('checked'),
                // is_screen   : parent.find('input[name="screen"]').prop('checked'),
           }
        files.push(file_item);
        //console.log(files)
   
    let sku_list=[];
    //console.log(files);
    for(var i=0;i<files.length;i++){
                sku_list[i] = files[i]['sku']
    }
    
    let material_id =files[0]['material_id']
    let cartid =''
    cartid =jQuery(parent).find('.add-to-cart-sub-button').attr('cart-id');
    console.log(cartid)
    save_id_sku('material','material-'+material_id+',',sku_list,cartid)
    add_files_cart(files);
    jQuery(parent).addClass('cart');

}

// AJAX - button "Add to cart" BIG异步批量添加购物车
jQuery('body').on('click', '.add-to-cart-button', function () { 
	// 公共部分
    var box_material = jQuery(this).closest('.box-material');
    var files = [];
    var box_id = jQuery(this).closest('.box-material').attr('id');
    // console.log(box_id);
    // 调度处理购物车增减START
    if (jQuery(this).hasClass('cart')) {
        let sku = [];
        jQuery('#' + box_id + ' .file-box').each(function (i) {
            if (jQuery(this).find('input.plus-minus').val() * 1 > 0) {
                sku[i] = jQuery(this).attr('sku')
            }
        });
        // console.log(sku)
        Reduce_files_cart(sku)
        //移除大购物车绿色
        jQuery(this).removeClass('cart');
        //移除小购物车绿色
        // console.log('delete cart')
        jQuery(box_material).find('.add-to-cart-sub-button').removeClass('cart');

    // 调度处理购物车增减end
    } else {
        if (jQuery(".file_name").length == 0) {
            jQuery('#alertToUploadFile').show();
            jQuery(this).prop('disabled', false);
            return;
        } else {
            jQuery('#' + box_id + ' .file-box').each(function (i) {
                if (jQuery(this).find('input.plus-minus').val() * 1 > 0) {
                    var file_item = {
                        sku: jQuery(this).attr('sku'),
                        col: jQuery(this).attr('column'),
                        volume: jQuery(this).attr('data-volume'),
                        surface_area: jQuery(this).attr('data-surface_area'),
                        box_volume: jQuery(this).attr('data-box_volume'),
                        file_unit: jQuery(this).attr('data-file_unit'),
                        material_id: jQuery(this).closest('.box-material').attr('data-id'),
                        file_name: jQuery(this).find('.preview-link').text(),
                        quantity: jQuery(this).find('input.plus-minus').val(),
                        price_unit: jQuery(this).find('.col-price span').text(),
                        leadtime: jQuery(this).find('input[name="printing-lead-time-option"]:checked').val(),
                        leadtime_selected: jQuery(this).find('input[name="printing-lead-time-option"]:checked').closest('.option-check').text(),
                        color_selected: jQuery(this).find('input[name="printing-color-option"]:checked').val(),
                        density: jQuery(this).closest('.box-material').attr('data-density'),
                        fixed_cofficient: jQuery(this).closest('.box-material').attr('data-fixed_cofficient'),
                        weight_range_1: jQuery(this).closest('.box-material').attr('data-weight_range_1'),
                        weight_range_2: jQuery(this).closest('.box-material').attr('data-weight_range_2'),
                        cofficient_1_greater_weightrange: jQuery(this).closest('.box-material').attr('data-cofficient_1_greater_weightrange'),
                        cofficient_weight_bw_range_1_and_2: jQuery(this).closest('.box-material').attr('data-cofficient_weight_bw_range_1_and_2'),
                        cofficient_2_smaller_weightrange: jQuery(this).closest('.box-material').attr('data-cofficient_2_smaller_weightrange'),
                        usdrmb_exchange_rate: jQuery(this).closest('.box-material').attr('data-usdrmb_exchange_rate')

                        // is_painting : jQuery(this).find('input[name="painting"]').prop('checked'),
                        // is_screen   : jQuery(this).find('input[name="screen"]').prop('checked'),
                    };

                    files.push(file_item);

                }
            });
            let sku_list=[];
            //console.log(files);
            for(var i=0;i<files.length;i++){
                sku_list[i] = files[i]['sku']
            }
            save_id_sku('material',box_id,sku_list,null)
            add_files_cart(files);

            jQuery(this).addClass('cart');
            jQuery(box_material).find('.add-to-cart-sub-button').addClass('cart');
            // console.log('add cart')
        }
        // 调度处理购物车增减END
    }
});




// AJAX - button "sub Add to cart" Smail异步one添加购物车
jQuery('body').on('click', '.add-to-cart-sub-button', function () { 
	// 公共部分
    let cartid = jQuery(this).attr('cart-id');
    var box_material = jQuery(this).closest('.box-material');
    var files = [];
    var box_id = jQuery(this).closest('.box-material').attr('id');
        
    //console.log(cartid);
    let index = cartid.lastIndexOf("-");
    let cid = cartid.substring(index + 1, cartid.length)
    let sub = jQuery('#' + box_id + ' .file-box')[cid];
    // 调度处理购物车增减START
    if (jQuery(this).hasClass('cart')) {
        let sku = jQuery(sub).attr('sku')
        // console.log(sku)
        Reduce_files_cart(sku)
        jQuery(this).removeClass('cart');
        // console.log('delete cart')
        // 若小购物车是最后一个是绿色,点击后小购物车变黑,那大购物车也变黑
        let number= (document.getElementById(box_id).getElementsByClassName('cart').length);
        //console.log(number)
        
        if(number==1){
            Reduce_files_cart(sku)
             clear_my_cart()
             jQuery(box_material).find('.add-to-cart-button').removeClass('cart')
             jQuery(box_material).find('.add-to-cart-sub-button').removeClass('cart')
             // console.log(number)
        }
       
    } else {
        if (jQuery(".file_name").length == 0) {
            jQuery('#alertToUploadFile').show();
            jQuery(this).prop('disabled', false);
            return;
        } else {
            if (jQuery(sub).find('input.plus-minus').val() * 1 > 0) {
                var file_item = {
                    sku: jQuery(sub).attr('sku'),
                    col: jQuery(sub).attr('column'),
                    volume: jQuery(sub).attr('data-volume'),
                    surface_area: jQuery(sub).attr('data-surface_area'),
                    box_volume: jQuery(sub).attr('data-box_volume'),
                    file_unit: jQuery(sub).attr('data-file_unit'),
                    material_id: jQuery(sub).closest('.box-material').attr('data-id'),
                    file_name: jQuery(sub).find('.preview-link').text(),
                    quantity: jQuery(sub).find('input.plus-minus').val(),
                    price_unit: jQuery(sub).find('.col-price span').text(),
                    leadtime: jQuery(sub).find('input[name="printing-lead-time-option"]:checked').val(),
                    leadtime_selected: jQuery(sub).find('input[name="printing-lead-time-option"]:checked').closest('.option-check').text(),
                    color_selected: jQuery(sub).find('input[name="printing-color-option"]:checked').val(),
                    density: jQuery(sub).closest('.box-material').attr('data-density'),
                    fixed_cofficient: jQuery(sub).closest('.box-material').attr('data-fixed_cofficient'),
                    weight_range_1: jQuery(sub).closest('.box-material').attr('data-weight_range_1'),
                    weight_range_2: jQuery(sub).closest('.box-material').attr('data-weight_range_2'),
                    cofficient_1_greater_weightrange: jQuery(sub).closest('.box-material').attr('data-cofficient_1_greater_weightrange'),
                    cofficient_weight_bw_range_1_and_2: jQuery(sub).closest('.box-material').attr('data-cofficient_weight_bw_range_1_and_2'),
                    cofficient_2_smaller_weightrange: jQuery(sub).closest('.box-material').attr('data-cofficient_2_smaller_weightrange'),
                    usdrmb_exchange_rate: jQuery(sub).closest('.box-material').attr('data-usdrmb_exchange_rate')
                };

                files.push(file_item);
            }
            let sku_list=[];
            //console.log(files);
            for(var i=0;i<files.length;i++){
                sku_list[i] = files[i]['sku']
            }
            let cartid =''
            cartid =jQuery('#' + box_id + ' .file-box').find('.add-to-cart-sub-button').eq(cid).attr('cart-id');
            // console.log(cid,cartid)
            save_id_sku('material',box_id,sku_list,cartid)
		    add_files_cart(files);
			jQuery(this).addClass('cart');
			// console.log(cid)
			if(cid==0){
				// 若是第一个小购物车变绿，那大购物车也变绿
				 jQuery(box_material).find('.add-to-cart-button').addClass('cart');
				//
			}
			// console.log('add cart')
			// 调度处理购物车增减END
        }
    }
});


function Reduce_files_cart(products) {
    jQuery.post(myajax.url, {
        'action': 'Reduce_product_cart',
        'products': products
    }, function (data) { // console.log('addtocartdata', data);
        if (data != 0) {
            var jsondata = JSON.parse(data);
            // console.log('addtocartdata', jsondata );
            if (jsondata.error) {
                alert(jsondata.error);
            } else {
                jQuery('.material-bottom-info-total-price-value').html(jsondata.total_price);
                // Trigger event so themes can refresh other areas. 更新头部的购物车信息 参考add-to-cart.js
                jQuery(document.body).trigger('added_to_cart', [jsondata.fragment.fragments, jsondata.fragment.cart_hash]);
            }
        }
    });

}

function add_files_cart(files) {
	if (files.length > 0) {
    jQuery.post(myajax.url, {
        'action': 'prints_create_product',
        'files': files
    },function (data) { 
          if (data != 0) {
            var jsondata = JSON.parse(data);
            // console.log('addtocartdata', jsondata);
            if (jsondata.error) {
                alert(jsondata.error);
            } else {
                if (jsondata.products.length > 0) {
                    // 更新材料选择部分的购物车信息
                    // console.log(jsondata.total_price)

                    jQuery('.material-bottom-info-total-price-value').html(jsondata.total_price);

                    // Trigger event so themes can refresh other areas. 更新头部的购物车信息 参考add-to-cart.js
                    jQuery(document.body).trigger('added_to_cart', [jsondata.fragment.fragments, jsondata.fragment.cart_hash]);

                }
            }
        }
        });
    }
}


// 修改文件的加号之间的数量的价格更新
jQuery('body').on('change', '.plus-minus', function() {
	value = jQuery(this).val();
	value = parseInt(value);
	if (isNaN(value)) {
		value = 1;
	}
	if (value < 0) {
		value = 1;
	}
	jQuery(this).val(value);

	var box = jQuery(this).closest('.box-material');
	var box_id = box.attr('id');
	var price_item = box.attr('data-price_item');

	if (box_id != 'undefined') {
		// New Code for calculated price update 
		var $this = jQuery(this);
		var leadtime = $this.closest('.file-box').find('input[name="printing-lead-time-option"]:checked').val();
		var parent = jQuery(this).parents('.file-box');
		var get_file = parent.attr('data-file');
		var volume = parent.attr('data-volume');
		var file_unit = parent.attr('data-file_unit');
		if (file_unit == "inch") {
			// inch change to mm
			volume = parseFloat(volume)/25.4;
		}

		var density = $this.parents('div.box-material').attr('data-density');
		var quantity = value;
		var unit_price = $this.parents('div.box-material').attr('data-unit_price');
		var price_calc = [];

		// New Array 
		price_calc['fixed_cofficient'] = $this.parents('div.box-material').attr('data-fixed_cofficient');
		price_calc['weight_range_1'] = $this.parents('div.box-material').attr('data-weight_range_1');
		price_calc['weight_range_2'] = $this.parents('div.box-material').attr('data-weight_range_2');
		price_calc['cofficient_1_greater_weightrange'] = $this.parents('div.box-material').attr('data-cofficient_1_greater_weightrange');
		price_calc['cofficient_weight_bw_range_1_and_2'] = $this.parents('div.box-material').attr('data-cofficient_weight_bw_range_1_and_2');
		price_calc['cofficient_2_smaller_weightrange'] = $this.parents('div.box-material').attr('data-cofficient_2_smaller_weightrange');
		price_calc['usdrmb_exchange_rate'] = $this.parents('div.box-material').attr('data-usdrmb_exchange_rate');
		price_calc['material_process'] = $this.parents('div.box-material').attr('data-material_process');
		price_calc['floor_price'] = $this.parents('div.box-material').attr('data-floor_price') ? $this.parents('div.box-material').attr('data-floor_price') : 0;
		price_calc['volume'] = volume;
		price_calc['density'] = density;
		price_calc['quantity'] = quantity;
		price_calc['unit_price'] = unit_price;
		price_calc['lead_time'] = leadtime;
		// New Array

		var calculated_price = calculate_price_with_formula(price_calc);
		//var price_file_html = $this.closest('.file-box').find('.col-price span');
		$this.closest('.file-box').attr('price-item', calculated_price.toFixed(2));
		$this.closest('.file-box').attr('quantity-item', quantity);
		//price_file_html.html( (calculated_price).toFixed(2) );
		update_newprice_box_material(box_id);

		//触发update cart按钮，更新购物车
		if (jQuery('input[name="update_cart"]').length > 0) {
			jQuery('input[name="update_cart"]').prop('disabled', false).trigger("click");
		}
	}
	var jquery = jQuery(this).closest('.box-material');
	update_printing_files_all_qty(jquery);
});



function ma_calculate_unit_price(P0,Lx, Wx, Hx){
	let D0 = 150;
	let Sx = 35727.73;
	let S0 = 101250.0;
	let unit_price= calcPrice(P0, Lx, Wx, Hx, D0, Sx, S0)
	return unit_price;
  }
  

// 显示单1价格
function ma_show_unit_price(ProductID_tag,price_calculation,box_x,box_y,box_z){
    // console.log(ProductID_tag);
	// console.log(price_calculation)
	let one_price = ma_calculate_unit_price(price_calculation,box_x,box_y,box_z)
    jQuery('#' + ProductID_tag).find('.ma-unit-material-price').html(totwoFixed(one_price));

  }



//删除复制后一条的文件数据
jQuery(document).on("click", ".remove_form", function() {
	var box_id = jQuery(this).closest('.box-material').attr('id');
	var jquery = jQuery(this).closest('.box-material');
	jQuery(this).closest(".file-box").remove();
	update_newprice_box_material(box_id);
	update_printing_color_name(jquery);
	update_printing_leadtime_name(jquery);
	update_printing_files_all_qty(jquery);
});


// New Price update function 更新价格
function update_newprice_box_material(box_id) {

    var price_total = 0;
    var files_total = 0;
    var price_item = 0;
    var p_unit = 0;
    var floor_price = jQuery('#' + box_id).attr('data-floor_price');
    jQuery('#' + box_id + ' .file-box').each(function () {
        price_item = Number(jQuery(this).attr('price-item'));
        // alert('Price Item inside loop'+price_item);
        price_total += price_item;
    });
    // console.log(price_total);
    if (Number(price_total) < Number(floor_price)) {
        jQuery('#' + box_id + ' .file-box').each(function () {
            price_item = jQuery(this).attr('price-item');
            // console.log(price_item);
            p_unit = Number(floor_price) * Number(price_item) / Number(price_total);
            // console.log(p_unit);
            jQuery(this).find('.col-price span').html(p_unit.toFixed(2));
        });
        price_total = Number(floor_price);
        // console.log(price_total);
    } else {
        jQuery('#' + box_id + ' .file-box').each(function () {
            price_item = Number(jQuery(this).attr('price-item'));
            jQuery(this).find('.col-price span').html(price_item.toFixed(2));
        });
    }
    // alert('Total Price '+price_total);
    jQuery('#' + box_id).find('.material-price').html(Number(price_total).toFixed(2));
    // jQuery('#'+box_id).find('td.files').html( files_total );
}




  // 点击dublicateclick复制一条文件数据
  jQuery(document).on('click', '.dublicateclick', function() {
    let cartindex=0;
    let sku,clickId,id,pindex,box,pid;
    let clone_html=null;
    clickId = jQuery(this).attr('data-click-id');
	box = jQuery(this).find('.files-box');
    pid = jQuery(this).closest('.box-material').attr('data-id');
    cartindex = document.getElementById(clickId).getElementsByClassName('file-box').length;
    console.log(cartindex++)
    id= cartindex++;
    pindex=pid+"-"+id;
    sku =GenNonDuplicateID()
	clone_html = jQuery(this).closest('.file-box').clone();
    // console.log(pindex)
    // console.log(clone_html)
    clone_html.attr('sku',sku);
    clone_html.find('.add-to-cart-sub-button').attr('cart-id',pindex)
	box.empty();
    let key = jQuery(this).closest('.file-box').attr('key');
	clone_html.insertAfter("#"+clickId+'-'+key);
    //debugger;
	
	//console.log('dublicateclick_boxid',box_id);
    var box_id = jQuery(this).closest('.box-material').attr('id');
	update_newprice_box_material(box_id);
	var jquery = jQuery(this).closest('.box-material');
	update_printing_color_name(jquery);
	update_printing_leadtime_name(jquery);
	update_printing_files_all_qty(jquery);
});



jQuery('body').on('click', '.file-box #mask table tr', function () {
    let bulkindex =null;
    let qty,unit,total;
    bulkindex = jQuery('.file-box #mask table tr').index(this);
    if(bulkindex===0){return false};
    //console.log(bulkindex);
    qty = jQuery('#mask table tr').eq(bulkindex).attr('bqty');
    unit = jQuery('#mask table tr').eq(bulkindex).attr('bunit')
    total = jQuery('#mask table tr').eq(bulkindex).attr('btotal')
    //console.log('clickId:'+bulkindex,qty,unit,total)
    //console.log(mid);
    jQuery("#"+mid).find('input[name="quantity"]').val(qty);
    jQuery("#"+mid).find(".one-price span").text(unit);
    jQuery("#"+mid).find(".col-price span").text(total);
  
});
