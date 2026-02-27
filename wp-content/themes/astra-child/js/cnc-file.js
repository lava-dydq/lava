//分离cnc


function add_file_cnc_main(_filesData){
    // console.log(_filesData)
    /*把文件附加到每个cnc列表里*/
    jQuery('.cnc-box-material').each(function (i) {
        var cnc_args = [];
        var cnc_material_id = jQuery(this).attr('data-id');
        var cnc_material = jQuery(this).attr('data-material');
        var cnc_material_id_tag = jQuery(this).attr('id');

        // 表面基础处理选择
        var basic_surface_treatment_html = '';

        var basic_surface_treatment_arr = [
            1,
            2,
            3,
            4,
            5,
            6
        ];
        basic_surface_treatment_html += '<div class="basic_surface_treatment_head finishing_option_head">Basic Surface Treatment</div><form class="options-form">';
        for (var bi = 0; bi < basic_surface_treatment_arr.length; bi++) {
            var finishing_key = basic_surface_treatment_arr[bi];
            if (bi == 0) {
                var default_finish = window.finishing_cost[finishing_key]['name'];
                basic_surface_treatment_html += '<label class="option-check"><input type="radio" hidden="true" name="basic_surface_treatment" value="' + finishing_key + '" checked="checked">' + finishing_cost[finishing_key]['name'] + '</label>';
            } else {
                basic_surface_treatment_html += '<label><input type="radio" hidden="true" name="basic_surface_treatment" value="' + finishing_key + '">' + finishing_cost[finishing_key]['name'] + '</label>';
            }
        }
        basic_surface_treatment_html += '</form>';

        // 表面高级处理选择
        var advanced_surface_treatment_html = '';

        var advanced_surface_treatment_arr = [
            0,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25
        ];
        advanced_surface_treatment_html += '<div class="advanced_surface_treatment_head finishing_option_head">Advanced Surface Treatment</div><form class="options-form">';
        for (var ri = 0; ri < advanced_surface_treatment_arr.length; ri++) {
            var finishing_key = advanced_surface_treatment_arr[ri];
            if (ri == 0) {
                advanced_surface_treatment_html += '<label class="option-check"><input type="radio" hidden="true" name="advanced_surface_treatment" value="' + finishing_key + '" checked="checked">' + finishing_cost[finishing_key]['name'] + '</label>';
            } else {
                advanced_surface_treatment_html += '<label><input type="radio" hidden="true" name="advanced_surface_treatment" value="' + finishing_key + '">' + finishing_cost[finishing_key]['name'] + '</label>';
            }
        }
        advanced_surface_treatment_html += '</form>';

        // 颜色选择
        var color_surface_treatment_html = '';

        var color_surface_treatment_arr = [
            26,
            27,
            28,
            29,
            30
        ];
        color_surface_treatment_html += '<div class="color_head finishing_option_head">Color Surface Treatment</div><form class="options-form">';
        for (var ti = 0; ti < color_surface_treatment_arr.length; ti++) {
            var finishing_key = color_surface_treatment_arr[ti];
            if (ti == 0) {
                color_surface_treatment_html += '<label class="option-check"><input type="radio" hidden="true" name="color_surface_treatment" value="' + finishing_key + '" checked="checked">' + finishing_cost[finishing_key]['name'] + '</label>';
            } else {
                color_surface_treatment_html += '<label><input type="radio" hidden="true" name="color_surface_treatment" value="' + finishing_key + '">' + finishing_cost[finishing_key]['name'] + '</label>';
            }
        }
        color_surface_treatment_html += '</form>';

        var finishing_html = basic_surface_treatment_html + advanced_surface_treatment_html + color_surface_treatment_html;

        var lead_time_option = jQuery(this).attr('data-lead_time_option');
        var lead_time_option_html = '';
        if (lead_time_option != '') {
            var lead_time_option_arr = lead_time_option.split(";");
            lead_time_option_html += '<form class="options-form">';
            for (var ci = 0; ci < lead_time_option_arr.length; ci++) {
                var ltoption = lead_time_option_arr[ci].replace(/(^\s*)|(\s*$)/g, ""); // 去掉两边空格符
                if (ci == 0) {
                    lead_time_option_html += '<label class="option-check"><input type="radio" hidden="true" name="cnc-lead-time-option" checked="checked" value="' + ltoption + '">' + ltoption + '</label>';
                } else {
                    lead_time_option_html += '<label><input type="radio" hidden="true" name="cnc-lead-time-option" value="' + ltoption + '">' + ltoption + '</label>';
                }
            }
            lead_time_option_html += '</form>';
        }

        var cnc_container = jQuery(this).find(".cnc-files-container");

        cnc_container.empty();

        var cnc_file_total_price = 0;
        
       
        jQuery.each(_filesData, function (i, file) {
            if (typeof(file['curved_surface']) == 'undefined') {
                file['curved_surface'] = 0;
            }
            if (typeof(file['quote']) == 'undefined') {
                file['quote'] = '';
            }
            // console.log(file)
            
            var box_x = file['box_xyz'].x;
            var box_y = file['box_xyz'].y;
            var box_z = file['box_xyz'].z;
            var volume = file['volume'];
            var surface_area = file['surface_area'];
            var curved_surface = file['curved_surface'];
            var quoteData = file['quote'];
            
            // // console.log('quoteData',quoteData);
            if (! quoteData) {
                return true; // 跳过本次循环
            }
    
    
            var file_one_cnc_price = quoteData['CNC']['Prices'][cnc_material] / 6.5;//汇率
            var file_cnc_price = file_one_cnc_price * 1;
            //console.log(file_cnc_price)
            cnc_file_total_price += file_cnc_price;
            // 计算单间 P1的价格
            cnc_show_unit_price(cnc_material_id_tag,file_cnc_price,box_x,box_y,box_z)
            //唯一sku
            sku =GenNonDuplicateID();
            //console.log(file_unit);
            file_unit ='mm'
           
          //   var cnchtml = '<div class="cnc-file-wrap duplicate_cnc-files-cols_outer price-father"  id="' + cnc_material_id_tag + '-'+i+'" key="'+i+'" column="cnc" sku="'+sku+'" data-file="' + file['filename'] + '" data-file_unit="' + file_unit + '" data-volume="' + parseFloat(file['volume']) + '" data-surface_area="' + parseFloat(file['surface_area']) + '" data-curved_surface="' + parseFloat(file['curved_surface']) + '" data-box_volume="' + parseFloat(file['box_volume']) + '" data-box_x="' + parseFloat(file['box_xyz'].x) + '" data-box_y="' + parseFloat(file['box_xyz'].y) + '" data-box_z="' + parseFloat(file['box_xyz'].z) + '" data-one_price="' + parseFloat(file_one_cnc_price) + '">';
          //
          //   cnchtml += '<div class="cnc-file-wrap-filelist">'+
          //   '<div class="material-file-img custom-cnc-column-width-1">'+
          //     '<img src="/wp-content/uploads/woocommerce-placeholder-300x300.png" alt="default img">'+
          //   '</div>'+
          //   '<div class="cnc-material-file-name custom-cnc-column-width-2 material-item-overflow">' +
          //       '<div class="preview-link" data-link="' + file["url"] +'">' +file["filename"] + '</div>' +
          //       '<div class="cnc-material-file-options-qty-wrap">'+
          //            '<div class="cnc-material-file-select-wrap">'+
          //                '<div class="select-options select-finishing">'+
          //                    '<div class="cnc-finish">' +default_finish +'</div>'+
          //                    '<span class="finishing-down"><i class="fa-solid fa-angle-down"></i></span>'+
          //               '</div>' +
          //               '<div class="option-wrap finishing-option-wrap cnc-finishing-option-wrap" style="display: none;">' +finishing_html +'</div>'+
          //            '</div>' +
          //            '<div class="select-options select-lead-time" style="display:none;">' +
          //                 '<div><span>Lead Time</span><span class="lead-time-down"><i class="fa-solid fa-angle-down"></i></span></div>' +
          //                  '<div class="option-wrap lead-time-option-wrap" style="display: none;">' +lead_time_option_html +'</div>'+
          //            '</div>'+
          //        '</div>' +
          //       '<div class="cnc-file-quantity-wrap">'+
          //            '<div class="cnc-bt-minus"><i class="fa-solid fa-circle-minus"></i></div>' +
          //            '<input type="text" class="cnc-file-quantity" name="cnc-file-quantity" value="1" maxlength="10">' +
          //            '<div class="cnc-bt-plus"><i class="fa-solid fa-circle-plus"></i></div>'+
          //       '</div>'+
          //   '</div>'+
          //   '<div class="two-price cnc-flie-price-wrap custom-cnc-column-width-3">US$ <span class="cnc-unit-price">' +Number(file_cnc_price).toFixed(2) +"</span></div>" +
          //   '<div class="cnc-flie-price-wrap custom-cnc-column-width-3">US$ <span class="cnc-flie-price">' +Number(file_cnc_price).toFixed(2) +'</span></div>' +
          //    '<div class="file-ation-wrap custom-cnc-column-width-4">' +
          //       '<div class="cn-abnormal-list base-price-list" mid="' + cnc_material_id_tag + '-'+i+'">'+
          //           '<div class="click-price" title="click to check bulk prices">bulk price</div>' +
          //           '<div id="mask" class="mask" >' +
          //           '<div class="abnormal-show-list">' +
          //             '<div class="bulk-top">'+
          //               '<div class="title">Bulk Price</div>'+
          //               '<div class="hide-close">x</div>'+
          //             '</div>' +
          //             '<div class="bklist"></div>' +
          //             '<div class="bulk-bottom">For more than 1000 please send us mail through:<a href="mailto:kevin@lava.limited">kevin@lava.limited</a></div>' +
          //           '</div>' +
          //           '</div>' +
          //       '</div>' +
          //         '<div class="cn-add-to-cart-sub">' +
          //           '<span class="cnc-add-to-cart-sub-button" title="Add to cart" cart-id="' +cnc_material_id + "-" + i +'">' +
          //                '<svg t="1655729930116" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5304" width="16" height="16">' +
          //                 '<path d="M358.4 921.6m-102.4 0a102.4 102.4 0 1 0 204.8 0 102.4 102.4 0 1 0-204.8 0Z" fill="#2c2c2c" p-id="5305"></path><path d="M802.133333 921.6m-102.4 0a102.4 102.4 0 1 0 204.8 0 102.4 102.4 0 1 0-204.8 0Z" fill="#2c2c2c" p-id="5306"></path><path d="M928.426667 443.733333c-37.546667 20.48-81.92 34.133333-126.293334 34.133334-129.706667 0-238.933333-95.573333-252.586666-225.28-3.413333-6.826667-10.24-13.653333-17.066667-13.653334H184.32l-23.893333-122.88c0-6.826667-6.826667-13.653333-13.653334-13.653333H17.066667c-10.24 0-17.066667 6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066666h112.64l23.893333 116.053334v6.826666l20.48 102.4 61.44 303.786667c13.653333 68.266667 71.68 119.466667 143.36 119.466667h491.52c10.24 0 17.066667-6.826667 17.066667-17.066667s-6.826667-17.066667-17.066667-17.066667H378.88c-44.373333 0-85.333333-27.306667-102.4-71.68l631.466667-78.506666c6.826667 0 13.653333-6.826667 13.653333-13.653334l34.133333-122.88c3.413333-6.826667 0-13.653333-6.826666-17.066666-6.826667-6.826667-13.653333-6.826667-20.48-3.413334z" fill="#2c2c2c" p-id="5307"></path><path d="M802.133333 0C679.253333 0 580.266667 98.986667 580.266667 221.866667s98.986667 221.866667 221.866666 221.866666S1024 344.746667 1024 221.866667 925.013333 0 802.133333 0z m68.266667 238.933333H819.2v51.2c0 10.24-6.826667 17.066667-17.066667 17.066667s-17.066667-6.826667-17.066666-17.066667V238.933333h-51.2c-10.24 0-17.066667-6.826667-17.066667-17.066666s6.826667-17.066667 17.066667-17.066667H785.066667V153.6c0-10.24 6.826667-17.066667 17.066666-17.066667s17.066667 6.826667 17.066667 17.066667V204.8h51.2c10.24 0 17.066667 6.826667 17.066667 17.066667s-6.826667 17.066667-17.066667 17.066666z" fill="#2c2c2c" p-id="5308"></path>' +
          //               '</svg>'+
          //           '</span>' +
          //         '</div>' +
          //         '<div class="cnc-abnormal-alert">' +
          //            '<i class="fa-solid fa-bell"></i>' +
          //            '<div class="abnormal-alert-tips">Click to ring the bell if you find the price too high, too low, looks strange. Or any other questions! We will get back to you ASAP!</div>' +
          //         '</div>' +
          //         '<div class="cnc-file-dublicate-delete-wrap">' +
          //              '<div class="cnc-file-dublicateclick" title="Click To Duplicate" data-click-id="' +cnc_material_id_tag +'"><i class="fa-solid fa-copy"></i></div>' +
          //              '<div class="cnc-file-remove" title="Click To Remove"><i class="fa-solid fa-trash-can"></i></div>' +
          //         '</div>' +
          //    '</div>' +
          // '</div>'+
          // '</div>';


            var cnchtml = `
<div class="cnc-file-wrap duplicate_cnc-files-cols_outer price-father" id="${cnc_material_id_tag}-${i}" key="${i}" column="cnc"
     sku="${sku}" data-file="${file['filename']}" data-file_unit="${file_unit}" data-volume="${parseFloat(file['volume'])}"
     data-surface_area="${parseFloat(file['surface_area'])}" data-curved_surface="${parseFloat(file['curved_surface'])}" data-box_volume="${parseFloat(file['box_volume'])}"
     data-box_x="${parseFloat(file['box_xyz'].x)}" data-box_y="${parseFloat(file['box_xyz'].y)}" data-box_z="${parseFloat(file['box_xyz'].z)}"
     data-one_price="${parseFloat(file_one_cnc_price)}">
    <div class="cnc-file-wrap-filelist">
        <div class="material-file-img cnc-column-swatch"><img
                src="/wp-content/uploads/woocommerce-placeholder-300x300.png" alt="default img"></div>
<!--        <div class="cnc-material-file-name custom-cnc-column-width-2 material-item-overflow">-->
            <div class="preview-link cnc-column-material""
                 data-link="${file["url"]}">${file["filename"]}
            </div>
             <div class="select-options select-finishing cnc-column-finish">
                 <div class="cnc-finish">${default_finish}</div>
                 <span class="finishing-down"><i class="fa-solid fa-angle-down"></i></span>
                 <div class="option-wrap finishing-option-wrap cnc-finishing-option-wrap" style="display: none;">
                      ${finishing_html}
                 </div>
             </div>
             
             <div class="cnc-file-quantity-wrap  cnc-column-qty">
                <div class="cnc-bt-minus"><i class="fa-solid fa-circle-minus"></i></div>
                <input type="text" class="cnc-file-quantity" name="cnc-file-quantity" value="1" maxlength="10">
                <div class="cnc-bt-plus"><i class="fa-solid fa-circle-plus"></i></div>
            </div>
            
            <div class="cnc-column-color"></div>
             
             <div class="select-options select-lead-time cnc-column-lead_time">
                 <div>
                     <span>Lead Time</span>
                     <span class="lead-time-down"><i class="fa-solid fa-angle-down"></i></span>
                 </div>
                 <div class="option-wrap lead-time-option-wrap" style="display: none;">
                     ${finishing_html}
                 </div>
             </div>
<!--        </div>-->
        <div class="two-price cnc-flie-price-wrap cnc-column-unit">
            US$ <span class="cnc-unit-price">${Number(file_cnc_price).toFixed(2)}</span>
        </div>
        <div class="cnc-flie-price-wrap cnc-column-price">US$ <span class="cnc-flie-price">${Number(file_cnc_price).toFixed(2)}</span></div>
        <div class="file-ation-wrap cnc-column-cart">
            <div class="cn-abnormal-list base-price-list" mid="${cnc_material_id_tag}-${i}">
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
            <div class="cn-add-to-cart-sub"><span class="cnc-add-to-cart-sub-button" title="Add to cart"
                                                  cart-id="${cnc_material_id}-${i}"><svg t="1655729930116" class="icon"
                                                                         viewBox="0 0 1024 1024" version="1.1"
                                                                         xmlns="http://www.w3.org/2000/svg" p-id="5304"
                                                                         width="16" height="16"><path
                    d="M358.4 921.6m-102.4 0a102.4 102.4 0 1 0 204.8 0 102.4 102.4 0 1 0-204.8 0Z" fill="#2c2c2c"
                    p-id="5305"></path><path
                    d="M802.133333 921.6m-102.4 0a102.4 102.4 0 1 0 204.8 0 102.4 102.4 0 1 0-204.8 0Z" fill="#2c2c2c"
                    p-id="5306"></path><path
                    d="M928.426667 443.733333c-37.546667 20.48-81.92 34.133333-126.293334 34.133334-129.706667 0-238.933333-95.573333-252.586666-225.28-3.413333-6.826667-10.24-13.653333-17.066667-13.653334H184.32l-23.893333-122.88c0-6.826667-6.826667-13.653333-13.653334-13.653333H17.066667c-10.24 0-17.066667 6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066666h112.64l23.893333 116.053334v6.826666l20.48 102.4 61.44 303.786667c13.653333 68.266667 71.68 119.466667 143.36 119.466667h491.52c10.24 0 17.066667-6.826667 17.066667-17.066667s-6.826667-17.066667-17.066667-17.066667H378.88c-44.373333 0-85.333333-27.306667-102.4-71.68l631.466667-78.506666c6.826667 0 13.653333-6.826667 13.653333-13.653334l34.133333-122.88c3.413333-6.826667 0-13.653333-6.826666-17.066666-6.826667-6.826667-13.653333-6.826667-20.48-3.413334z"
                    fill="#2c2c2c" p-id="5307"></path><path
                    d="M802.133333 0C679.253333 0 580.266667 98.986667 580.266667 221.866667s98.986667 221.866667 221.866666 221.866666S1024 344.746667 1024 221.866667 925.013333 0 802.133333 0z m68.266667 238.933333H819.2v51.2c0 10.24-6.826667 17.066667-17.066667 17.066667s-17.066667-6.826667-17.066666-17.066667V238.933333h-51.2c-10.24 0-17.066667-6.826667-17.066667-17.066666s6.826667-17.066667 17.066667-17.066667H785.066667V153.6c0-10.24 6.826667-17.066667 17.066666-17.066667s17.066667 6.826667 17.066667 17.066667V204.8h51.2c10.24 0 17.066667 6.826667 17.066667 17.066667s-6.826667 17.066667-17.066667 17.066666z"
                    fill="#2c2c2c" p-id="5308"></path></svg></span></div>
            <div class="cnc-abnormal-alert"><i class="fa-solid fa-bell"></i>
                <div class="abnormal-alert-tips">Click to ring the bell if you find the price too high, too low, looks
                    strange. Or any other questions! We will get back to you ASAP!
                </div>
            </div>
            <div class="cnc-file-dublicate-delete-wrap">
                <div class="cnc-file-dublicateclick" title="Click To Duplicate" data-click-id="${cnc_material_id_tag}"><i
                        class="fa-solid fa-copy"></i></div>
                <div class="cnc-file-remove" title="Click To Remove"><i class="fa-solid fa-trash-can"></i></div>
            </div>
        </div>
        <div class="show-files-arrow-close-all"></div>
    </div>
</div>`

           cnc_container.append(cnchtml);
    
        });

        
        // 更新每个cnc材料的价格
        jQuery(this).find('.cnc-material-price').html(Number(cnc_file_total_price).toFixed(2));
        // 如果不一致，则显示"see details below"
        let  cnc_do = jQuery(this);
        update_cnc_finish_name(cnc_do);
        // 更新每个cnc材料的总数量
        update_cnc_files_all_qty(cnc_do);
        //debugger;
    });
    let data ='CNC已加载完成';
    return data;
}




// 更新cnc每种材料的所有数量
function update_cnc_files_all_qty(jquery) {
    var qty = 0;
    jquery.find(".cnc-files-container").find('.cnc-file-wrap').each(function () {
        var one_qty = jQuery(this).find('.cnc-file-quantity').val();
        qty += parseInt(one_qty);
    });
    jquery.find('.cnc-file-all-quantity').html(qty);

}


// 更新cnc每种材料的后处理名称
function update_cnc_finish_name(jquery) {
    var cnc_finish_arr = [];
    jquery.find(".cnc-files-container").find('.cnc-file-wrap').each(function () {
        var cnc_finish = jQuery(this).find('.cnc-finish').text();
        cnc_finish_arr.push(cnc_finish);
    });
    // console.log('cnc_finish_arr',cnc_finish_arr);
    var result = removeDuplicate(cnc_finish_arr);
    if (result.length == 0) {
        var cnc_finish_name = '';
    } else if (result.length == 1) {
        var cnc_finish_name = result[0];
    } else {
        var cnc_finish_name = "see details below";
    } jquery.find('.cnc-select-finishing-name').html(cnc_finish_name);
}


//删除cnc一条的文件数据
jQuery(document).on("click", ".cnc-file-remove", function() {
	var box_id = jQuery(this).closest('.cnc-box-material').attr('id');
	var jquery = jQuery(this).closest('.cnc-box-material');
	jQuery(this).closest(".cnc-file-wrap").remove();
	update_cnc_material_price(box_id);
	// 更新每个cnc材料的后处理名称
	// 如果下面零件的选项都一致，是同样的，就显示那个同样的内容；
    // 如果不一致，则显示"see details below"
    update_cnc_finish_name(jquery);
    // 更新每个cnc材料的总数量
    update_cnc_files_all_qty(jquery);
});


// cnc finishing 后处理改变后更新价格
jQuery(document).on('change', 'input[name="surface_treatment"]', function() {
	// var $this = jQuery(this);
	var athis = this;
	update_cnc_file_price(athis);
});
jQuery(document).on('change', 'input[name="finishing_coating"]', function() {
	// var $this = jQuery(this);
	var athis = this;
	update_cnc_file_price(athis);
});
jQuery(document).on('change', 'input[name="logo_finishing"]', function() {
	// var $this = jQuery(this);
	var athis = this;
	update_cnc_file_price(athis);
});
jQuery(document).on('change', 'input[name="protective_coating"]', function() {
	// var $this = jQuery(this);
	var athis = this;
	update_cnc_file_price(athis);
});
jQuery(document).on('change', 'input[name="basic_surface_treatment"]', function() {
	// var $this = jQuery(this);
	var athis = this;
	update_cnc_file_price(athis);
});
jQuery(document).on('change', 'input[name="advanced_surface_treatment"]', function() {
	// var $this = jQuery(this);
	var athis = this;
	update_cnc_file_price(athis);
});
jQuery(document).on('change', 'input[name="color_surface_treatment"]', function() {
	// var $this = jQuery(this);
	var athis = this;
	update_cnc_file_price(athis);
});


//点击加号更新价格
jQuery('body').on('click', '.cnc-bt-plus', function(e) {
	e.preventDefault();
	var quantity = jQuery(this).closest('.cnc-file-quantity-wrap').find('input[name="cnc-file-quantity"]').val(); 
	quantity = parseInt(quantity);
	quantity = quantity + 1;
	jQuery(this).closest('.cnc-file-quantity-wrap').find('input[name="cnc-file-quantity"]').val(quantity); 
	var athis = this;
	update_cnc_file_price(athis);

	// 更新每个cnc材料的总数量
    let sub = jQuery(this).closest('.cnc-file-wrap');
    cnc_plus_cart(sub)
    //console.log(sub)
});

// 修改文件的加减号之间的数量的价格更新
jQuery('body').on('change', 'input[name="cnc-file-quantity"]', function() {
	var quantity = jQuery(this).val();
	quantity = parseInt(quantity);
	if (isNaN(quantity)) {
		quantity = 1;
	}
	if (quantity < 0) {
		quantity = 1;
	}
	jQuery(this).val(quantity);

	var athis = this;
	update_cnc_file_price(athis);
	// 更新每个cnc材料的总数量
    var jquery = jQuery(this).closest('.cnc-box-material');
    update_cnc_files_all_qty(jquery);

})







// 更新cnc材料中一个文件的价格
function update_cnc_file_price(athis) {

    // console.log(athis);
    var cnc_file_wrap = jQuery(athis).closest('.cnc-file-wrap');
    var one_price = cnc_file_wrap.attr('data-one_price');

    var basic_surface_treatment = cnc_file_wrap.find('input[name="basic_surface_treatment"]:checked').val();
    var advanced_surface_treatment = cnc_file_wrap.find('input[name="advanced_surface_treatment"]:checked').val();
    var color_surface_treatment = cnc_file_wrap.find('input[name="color_surface_treatment"]:checked').val();
    var cnc_file_quantity = cnc_file_wrap.find('input[name="cnc-file-quantity"]').val();


    /*20221020*/
    let box_x = cnc_file_wrap.attr('data-box_x');
    let box_y = cnc_file_wrap.attr('data-box_y');
    let box_z = cnc_file_wrap.attr('data-box_z');
    let volume = cnc_file_wrap.attr('data-volume');
    let surface_area = cnc_file_wrap.attr('data-surface_area');

    cnc_file_quantity = parseFloat(cnc_file_quantity);//数量
    // console.log(cnc_file_quantity);   
    // console.log('cnc_unitprice', one_price); //单价

    var curved_surface = cnc_file_wrap.attr('data-curved_surface');
    var cnc_box_material = jQuery(athis).closest('.cnc-box-material');
    var cnc_material = cnc_box_material.attr('data-material');

    var unit_price = one_price;
    
    cnc_file_quantity = parseFloat(cnc_file_quantity);

    // 多件的价格
    
    
    if (cnc_file_quantity >= 1 && cnc_file_quantity <= 100) {
        unit_price = unit_price * Math.pow(cnc_file_quantity,-0.14);
    }
    if (cnc_file_quantity > 100 && cnc_file_quantity <= 1000) {
        unit_price = unit_price * Math.pow(100, M) * Math.pow(cnc_file_quantity - 100, -0.01);

    }
    if (cnc_file_quantity > 1000) {
        unit_price = unit_price * Math.pow(100, M) * Math.pow(1000 - 100, -0.01);
    }

    price= unit_price * cnc_file_quantity;


    
    let Pb = finishing_cost[basic_surface_treatment]['cost'];
    let Ph = finishing_cost[advanced_surface_treatment]['cost'];
    let Pc = finishing_cost[color_surface_treatment]['cost'];
    //console.log(Pb,Ph,Pc)
    P0 = Pb + Ph + Pc;

    // 一件价格

    var D0 = 150, S0 = 101250, M = 0.2;

    var P1 = P0*(Math.max(box_x/D0,1)*Math.max(box_y/D0,1)*Math.max(box_z/D0,1)*Math.max(surface_area/S0,1));
 
	var Pn = P1 * Math.pow(cnc_file_quantity, -M);

    var cost = price + Pn;

    cost = price;

    // 更新这一条文件的价格
    cnc_file_wrap.find('.cnc-flie-price').html(cost.toFixed(2));
    // 更新这个材料的总价格
    var box_id = cnc_box_material.attr('id');
    update_cnc_material_price(box_id)

}




// // 点击向右边移动
// jQuery(document).on('click', '.cnc-fa-angles-wrap', function() {
// 	var display = jQuery(this).find(".close").css('display');
// 	if (display == "flex") {
// 		jQuery('.cnc-materials-select-outer-container').css('minWidth', '');
// 		jQuery('.cnc-material-file-options-qty-wrap').css('display', 'none');
// 		jQuery('.cn-unit').css('display', 'none');
// 		jQuery('.custom-cnc-column-width-2').css({
// 			width: '130px',
// 			minWidth: '130px'
// 		});
// 		jQuery(this).find(".open").css('display', 'flex');
// 		jQuery(this).find(".close").css('display', 'none');
//         jQuery('.two-price').css('display','none');
// 	} else {
// 		jQuery('.cnc-materials-select-outer-container').css('minWidth', '865px');
// 		jQuery('.cnc-material-file-options-qty-wrap').css('display', 'flex');
// 		jQuery('.cn-unit').css('display', 'flex');
// 		jQuery('.custom-cnc-column-width-2').css({
// 			width: '400px',
// 			minWidth: '400px'
// 		});
// 		jQuery(this).find(".close").css('display', 'flex');
// 		jQuery(this).find(".open").css('display', 'none');
//         jQuery('.two-price').css('display','flex');
// 	}
// });



// CNC 价格异常提示
jQuery('body').on('click', '.cnc-abnormal-alert', function() {
	jQuery('#exception-prompt').show();
	var filename = jQuery(this).closest('.cnc-file-wrap').attr('data-file');
	var file_unit = jQuery(this).closest('.cnc-file-wrap').attr('data-file_unit');
	var material_id = jQuery(this).closest('.cnc-box-material').attr('data-id');
	var quantity = jQuery(this).closest('.cnc-file-wrap').find('input[name="cnc-file-quantity"]').val();
	var price = jQuery(this).closest('.cnc-file-wrap').find('.cnc-flie-price-wrap').text();
	var manual = 'CNC MACHINING';
	jQuery('.prompt-confirm-btn').attr({
		'data-filename': filename,
		'data-file_unit': file_unit,
		'data-material_id': material_id,
		'data-quantity': quantity,
		'data-price': price,
		'data-manual': manual
	});
});


// CNC 向上向下箭头事件
// jQuery('body').on('click', '.cnc-show-files-arrow', function() {
// 	if (jQuery('.file_name').length == 0) {
// 		jQuery('#alertToUploadFile').show();
// 		jQuery(this).prop('disabled', false);
// 		return;
// 	}else{
// 		var display = jQuery(this).closest('.cnc-box-material').find('.cnc-files-container').css('display');
// 		if (display == 'none') {
// 			jQuery(this).closest('.cnc-box-material').find('.cnc-files-container').show("slow");
// 			jQuery(this).find('.fa-solid').removeClass('fa-angle-down');
// 			jQuery(this).find('.fa-solid').addClass('fa-angle-up');
//
// 		}else{
// 			jQuery(this).closest('.cnc-box-material').find('.cnc-files-container').hide("slow");
// 			jQuery(this).find('.fa-solid').removeClass('fa-angle-up');
// 			jQuery(this).find('.fa-solid').addClass('fa-angle-down');
//
// 		}
// 	}
// });



// 更新cnc某个材料的价格
function update_cnc_material_price(box_id) {
    var cnc_file_price_list = jQuery('#' + box_id).find('.cnc-flie-price');
    // console.log('cnc_file_price_list',cnc_file_price_list)
    // console.log(cnc_file_price_list.length);
    var total_price = 0;
    for (var i = 0; i < cnc_file_price_list.length; i++) {
        var price = cnc_file_price_list[i].innerText;
        // console.log(price)
        total_price += parseFloat(price);
        // console.log(total_price);
    }
    jQuery('#' + box_id).find('.cnc-material-price').text(totwoFixed(total_price));
}


function cnc_calculate_unit_price(P0,Lx, Wx, Hx){
  let D0 = 150;
  let Sx = 35727.73;
  let S0 = 101250.0;
  let unit_price= calcPrice(P0, Lx, Wx, Hx, D0, Sx, S0)
  return unit_price;
}


// 显示单一价格和单一模具单价
function cnc_show_unit_price(cnc_material_id_tag,file_cnc_price,box_x,box_y,box_z){
    let one_price = cnc_calculate_unit_price(file_cnc_price,box_x,box_y,box_z)
    jQuery('#' + cnc_material_id_tag).find('.cnc-unit-material-price').html(totwoFixed(one_price));
}



// AJAX - button "Add to cart" BIG将 cnc 材料异步添加购物车
jQuery('body').on('click', '.cnc-add-to-cart-button', function() {
    
    // 公共部分
    var cnc_box_material = jQuery(this).closest('.cnc-box-material');
    var files = [];
    var box_id = cnc_box_material.attr('id');
    
     // 调度处理购物车增减START
     if (jQuery(this).hasClass('cart')) {
        let sku = [];
        jQuery('#' + box_id + ' .cnc-file-wrap').each(function (i) {
            if (jQuery(this).find('input[name="cnc-file-quantity"]').val() * 1 > 0) {
                sku[i] = jQuery(this).attr('sku')
            }
        });
        // console.log(sku)
        cnc_Reduce_files_cart(sku)
        //移除大购物车绿色
        jQuery(this).removeClass('cart');
        //移除小购物车绿色
        jQuery(cnc_box_material).find('.cnc-add-to-cart-sub-button').removeClass('cart');
        // console.log('delete cart')
    } else {

	    if (jQuery(".file_name").length == 0) {
		   jQuery('#alertToUploadFile').show();
		   jQuery(this).prop('disabled', false);
		   return;
	   } else {
		jQuery('#' + box_id + ' .cnc-file-wrap').each(function(i) {
			if (jQuery(this).find('input[name="cnc-file-quantity"]').val() * 1 > 0) {
				var file_item = {
                    sku:jQuery(this).attr('sku'),
                    col:jQuery(this).attr('column'),
					volume: jQuery(this).attr('data-volume'),
					surface_area: jQuery(this).attr('data-surface_area'),
					box_volume: jQuery(this).attr('data-box_volume'),
					curved_surface: jQuery(this).attr('data-curved_surface'),
					file_unit: jQuery(this).attr('data-file_unit'),
					len: jQuery(this).attr('data-box_x'),
					width: jQuery(this).attr('data-box_y'),
					thickness: jQuery(this).attr('data-box_z'),
					//price: jQuery(this).attr('data-one_price'),
					material_id: jQuery(this).closest('.cnc-box-material').attr('data-id'),
					file_name: jQuery(this).attr('data-file'),
					quantity: jQuery(this).find('input[name="cnc-file-quantity"]').val(),
					price: jQuery(this).find('.cnc-flie-price').text(),
					leadtime: jQuery(this).closest('.cnc-box-material').attr('data-lead_time_option'),
					leadtime_checked: jQuery(this).find('input[name="cnc-lead-time-option"]:checked').val(),
					density: jQuery(this).closest('.cnc-box-material').attr('data-density'),
					surface_treatment: jQuery(this).find('input[name="surface_treatment"]:checked').val(),
					finishing_coating: jQuery(this).find('input[name="finishing_coating"]:checked').val(),
					logo_finishing: jQuery(this).find('input[name="logo_finishing"]:checked').val(),
					protective_coating: jQuery(this).find('input[name="protective_coating"]:checked').val(),
					basic_surface_treatment: jQuery(this).find('input[name="basic_surface_treatment"]:checked').val(),
					advanced_surface_treatment: jQuery(this).find('input[name="advanced_surface_treatment"]:checked').val(),
					color_surface_treatment: jQuery(this).find('input[name="color_surface_treatment"]:checked').val(),
				};

				files.push(file_item);
			}
		});
        let sku_list=[];
        // console.log(files);
        for(let i=0;i<files.length;i++){
                sku_list[i] = files[i]['sku']
        }
        save_id_sku('cnc-material',box_id,sku_list,null)
        cnc_add_files_cart(files);
       //增加大购物车绿色
        jQuery(this).addClass('cart');
        //增加小购物车绿色
        jQuery(cnc_box_material).find('.cnc-add-to-cart-sub-button').addClass('cart');

      }
    

    }
});

// 小购物车加购
jQuery('body').on('click', '.cnc-add-to-cart-sub-button', function () { 
	// 公共部分
    var cnc_box_material = jQuery(this).closest('.cnc-box-material');
    var files = [];
    var box_id = cnc_box_material.attr('id');
    // console.log(box_id)
    let cartid = jQuery(this).attr('cart-id');  
    //console.log(cartid);
    let index = cartid.lastIndexOf("-");
    let cid = cartid.substring(index + 1, cartid.length)
    
    let sub = jQuery('#' + box_id + ' .cnc-file-wrap')[cid];
    
    // 调度处理购物车增减START
    if (jQuery(this).hasClass('cart')) {
        let sku = jQuery(sub).attr('sku')
        cnc_Reduce_files_cart(sku)
        jQuery(this).removeClass('cart');

        // 若小购物车是最后一个是绿色,点击后小购物车变黑,那大购物车也变黑
        let number= (document.getElementById(box_id).getElementsByClassName('cart').length);
        // console.log(number)
        // console.log('总购物车数量：'+number);
        if(number==1){
            cnc_Reduce_files_cart(sku)
            clear_my_cart()
            jQuery(cnc_box_material).find('.cnc-add-to-cart-button').removeClass('cart')
            jQuery(cnc_box_material).find('.cnc-add-to-cart-sub-button').removeClass('cart')
        }
    } else {
        if (jQuery(".file_name").length == 0) {
            jQuery('#alertToUploadFile').show();
            jQuery(this).prop('disabled', false);
            return;
        } else {
            if (jQuery(sub).find('input[name="cnc-file-quantity"]').val() * 1 > 0) {
                var file_item = {
                    sku:jQuery(sub).attr('sku'),
                    col:jQuery(sub).attr('column'),
					volume: jQuery(sub).attr('data-volume'),
					surface_area: jQuery(sub).attr('data-surface_area'),
					box_volume: jQuery(sub).attr('data-box_volume'),
					curved_surface: jQuery(sub).attr('data-curved_surface'),
					file_unit: jQuery(sub).attr('data-file_unit'),
					len: jQuery(sub).attr('data-box_x'),
					width: jQuery(sub).attr('data-box_y'),
					thickness: jQuery(sub).attr('data-box_z'),
					one_price: jQuery(sub).attr('data-one_price'),
					material_id: jQuery(sub).closest('.cnc-box-material').attr('data-id'),
					file_name: jQuery(sub).attr('data-file'),
					quantity: jQuery(sub).find('input[name="cnc-file-quantity"]').val(),
					price: jQuery(sub).find('.cnc-flie-price').text(),
					leadtime: jQuery(sub).closest('.cnc-box-material').attr('data-lead_time_option'),
					leadtime_checked: jQuery(sub).find('input[name="cnc-lead-time-option"]:checked').val(),
					density: jQuery(sub).closest('.cnc-box-material').attr('data-density'),
					surface_treatment: jQuery(sub).find('input[name="surface_treatment"]:checked').val(),
					finishing_coating: jQuery(sub).find('input[name="finishing_coating"]:checked').val(),
					logo_finishing: jQuery(sub).find('input[name="logo_finishing"]:checked').val(),
					protective_coating: jQuery(sub).find('input[name="protective_coating"]:checked').val(),
					basic_surface_treatment: jQuery(sub).find('input[name="basic_surface_treatment"]:checked').val(),
					advanced_surface_treatment: jQuery(sub).find('input[name="advanced_surface_treatment"]:checked').val(),
					color_surface_treatment: jQuery(sub).find('input[name="color_surface_treatment"]:checked').val(),
				};

                files.push(file_item);
               
            }
            let sku_list=[];
            // console.log(files);
            for(let i=0;i<files.length;i++){
                sku_list[i] = files[i]['sku']
            }
            let cartid =''
            cartid =jQuery('#' + box_id + ' .cnc-file-wrap').find('.cnc-add-to-cart-sub-button').eq(cid).attr('cart-id');
            console.log(cid,cartid)
            save_id_sku('cnc-material',box_id,sku_list,cartid)
            cnc_add_files_cart(files);
            jQuery(this).addClass('cart');
            // console.log(cid)
            if(cid==0){
                // 若是第一个小购物车变绿，那大购物车也变绿
                 jQuery(cnc_box_material).find('.cnc-add-to-cart-button').addClass('cart');
                //
            }
            // console.log('add cart')
            // 调度处理购物车增减END
            }
           
        }
});


// 增加更新购物车
function cnc_add_files_cart(files){
    //console.log(files.length)
    if (files.length > 0) {
    jQuery.post(
        myajax.url, {
            'action': 'create_cnc_product',
            'files': files
        },
        function(data) {
            //console.log('addtocartdata', data );
            if (data != 0) {
                var jsondata = JSON.parse(data);
                //console.log('addtocartdata', jsondata );
                if (jsondata.error) {
                    alert(jsondata.error);
                } else {
                    if (jsondata.products.length > 0) {
                        // 更新材料选择部分的购物车价格信息
                        jQuery('.material-bottom-info-total-price-value').html(jsondata.total_price);
                        // Trigger event so themes can refresh other areas. 更新头部的购物车信息 参考add-to-cart.js
                        jQuery( document.body ).trigger( 'added_to_cart', [ jsondata.fragment.fragments, jsondata.fragment.cart_hash ] );
                    }
                }
            }
        }
    );
    }
}

// 减少购物车数量和金额
function cnc_Reduce_files_cart(sku){
    console.log(sku)
    jQuery.post(myajax.url, {
        'action': 'cnc_Reduce_product_cart',
        'products': sku
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



//点击减号更新价格   20230104 更新
jQuery('body').on('click', '.cnc-bt-minus', function(e) {
	e.preventDefault();
	var quantity = jQuery(this).closest('.cnc-file-quantity-wrap').find('input[name="cnc-file-quantity"]').val(); 
	quantity = parseInt(quantity);
	if (quantity>1) {
		quantity = quantity - 1;
		// console.log(quantity);
		jQuery(this).closest('.cnc-file-quantity-wrap').find('input[name="cnc-file-quantity"]').val(quantity); 
	}else{
		return false;
	}

	var athis = this;
	update_cnc_file_price(athis);
    // 更新每个cnc材料的总数量
    var cnc_box = jQuery(this).closest('.cnc-box-material');
    var cnc_box_id = cnc_box.attr('id');
    update_cnc_files_all_qty(cnc_box);
    // 移除当前小购物车变为黑色
    var parent = jQuery(this).parents('.cnc-file-wrap');
    let sub =parent.find('.cnc-add-to-cart-sub-button');
    // console.log(sub)
    jQuery(sub).removeClass('cart');
    // 当前产品是否是最后一个，是大购物车变黑

    // console.log(sub);
    var sku =parent.attr('sku');
    // console.log(sku)
    cnc_Reduce_files_cart(sku)
    // 如果是最后一个，则把大购物车变黑
    setTimeout(() => {
      last_cnc_small_cart(parent,cnc_box_id,cnc_box)
    }, 500);

});


// 最后一个文件点击减购，大购物车变黑
function  last_cnc_small_cart(last,box_id,box){
    // 获取当前是第几个 2023 1月11日
    let cartid = last.find('.cnc-add-to-cart-sub-button').attr('cart-id');
    // console.log(cartid);
    // 获取购物车序号
    let index = cartid.lastIndexOf("-");
    let cid = cartid.substring(index + 1, cartid.length)
    // console.log(cid);
    // 获取当前产品的数量之和
    let number= jQuery('#' + box_id + ' .cnc-file-wrap').length
    // console.log('cid'+cid);
    // console.log('number'+number);
    // 当序号= 总数减一，确定为最后一个减购物车,然后触发，把大购物车变黑，并去除所有购物车数量。
    if(Number(cid) ==number-1 ){
    // console.log(box)
    setTimeout(() => {
        clear_my_cart()
        jQuery(box).find('.cnc-add-to-cart-button').removeClass('cart')
     }, 300);
   }else if(Number(cid)==number){
        // console.log('last'+number)
    setTimeout(() => {
        clear_my_cart()
       jQuery(box).find('.cnc-add-to-cart-button').removeClass('cart')
    }, 300);
   }
}



// 点击加号加购数量为一
function cnc_plus_cart(sub){

    var files = [];
                var file_item = {
                    sku:jQuery(sub).attr('sku'),
                    col:jQuery(sub).attr('column'),
					volume: jQuery(sub).attr('data-volume'),
					surface_area: jQuery(sub).attr('data-surface_area'),
					box_volume: jQuery(sub).attr('data-box_volume'),
					curved_surface: jQuery(sub).attr('data-curved_surface'),
					file_unit: jQuery(sub).attr('data-file_unit'),
					len: jQuery(sub).attr('data-box_x'),
					width: jQuery(sub).attr('data-box_y'),
					thickness: jQuery(sub).attr('data-box_z'),
					one_price: jQuery(sub).attr('data-one_price'),
					material_id: jQuery(sub).closest('.cnc-box-material').attr('data-id'),
					file_name: jQuery(sub).attr('data-file'),
					quantity: jQuery(sub).find('input[name="cnc-file-quantity"]').val()-1,
					price: jQuery(sub).find('.cnc-flie-price').text(),
					leadtime: jQuery(sub).closest('.cnc-box-material').attr('data-lead_time_option'),
					leadtime_checked: jQuery(sub).find('input[name="cnc-lead-time-option"]:checked').val(),
					density: jQuery(sub).closest('.cnc-box-material').attr('data-density'),
					surface_treatment: jQuery(sub).find('input[name="surface_treatment"]:checked').val(),
					finishing_coating: jQuery(sub).find('input[name="finishing_coating"]:checked').val(),
					logo_finishing: jQuery(sub).find('input[name="logo_finishing"]:checked').val(),
					protective_coating: jQuery(sub).find('input[name="protective_coating"]:checked').val(),
					basic_surface_treatment: jQuery(sub).find('input[name="basic_surface_treatment"]:checked').val(),
					advanced_surface_treatment: jQuery(sub).find('input[name="advanced_surface_treatment"]:checked').val(),
					color_surface_treatment: jQuery(sub).find('input[name="color_surface_treatment"]:checked').val(),
				};
        files.push(file_item);
        // console.log(files)
   
    let sku_list=[];
    //console.log(files);
    for(var i=0;i<files.length;i++){
            sku_list[i] = files[i]['sku']
    }

    let material_id =files[0]['material_id']

    let cartid =''
    cartid = jQuery(sub).find('.cnc-add-to-cart-sub-button').attr('cart-id');    
    console.log(cartid)
    save_id_sku('cnc-material','cnc-material-'+material_id,sku_list,cartid)
    cnc_add_files_cart(files);
    jQuery(parent).addClass('cart');
    //console.log('add cart')
}


// 点击 cnc-file-dublicateclick 复制一条文件数据
jQuery(document).on('click', '.cnc-file-dublicateclick', function() {
    let cartindex=0;
    let sku,clickId,id,pindex,box,pid;
    let clone_html=null;
    pid = jQuery(this).closest('.cnc-box-material').attr('data-id')
	clickId = jQuery(this).attr('data-click-id');
    sku =GenNonDuplicateID()
    cartindex = document.getElementById(clickId).getElementsByClassName('cnc-file-wrap').length;
    //console.log(cartindex++)
    id= cartindex++;
    pindex=pid+"-"+id;
    //console.log(pindex)
	clone_html = jQuery(this).closest('.duplicate_cnc-files-cols_outer').clone();
    clone_html.attr('sku',sku);
    clone_html.find('.cnc-add-to-cart-sub-button').attr('cart-id',pindex)

    let key = jQuery(this).closest('.cnc-file-wrap').attr('key');
	clone_html.insertAfter("#"+clickId+'-'+key);
    //debugger;
	//console.log('dublicateclick_boxid',box_id);
    var box_id = jQuery(this).closest('.cnc-box-material').attr('id');
	update_cnc_material_price(box_id);
	// 更新每个cnc材料的后处理名称
	// 如果下面零件的选项都一致，是同样的，就显示那个同样的内容；
    // 如果不一致，则显示"see details below"
    var jquery = jQuery(this).closest('.cnc-box-material');
    update_cnc_finish_name(jquery);
    // 更新每个cnc材料的总数量
    var jquery = jQuery(this).closest('.cnc-box-material');
    update_cnc_files_all_qty(jquery);
});




jQuery('body').on('click', '.cnc-file-wrap #mask table tr', function () {
    let bulkindex =null;
    let qty,unit,total;
    bulkindex = jQuery('.cnc-file-wrap #mask table tr').index(this);
    if(bulkindex===0){return false};
    //console.log(bulkindex);
    qty = jQuery('#mask table tr').eq(bulkindex).attr('bqty');
    unit = jQuery('#mask table tr').eq(bulkindex).attr('bunit')
    total = jQuery('#mask table tr').eq(bulkindex).attr('btotal')
    //console.log('clickId:'+bulkindex,qty,unit,total)
    //console.log(mid);
    jQuery("#"+mid).find('input[name="cnc-file-quantity"]').val(qty);
    jQuery("#"+mid).find(".cnc-unit-price").text(unit);
    jQuery("#"+mid).find(".cnc-flie-price").text(total);
    
});
