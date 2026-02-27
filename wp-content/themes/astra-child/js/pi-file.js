// pi 分离

     /*把文件附加到每个 Plastic Injection Molding 列表里*/
function add_file_pi_main(filesData){

     jQuery('.pi-box-material').each(function (i) {
        var pi_args = [];
        var pi_material_id = jQuery(this).attr('data-id');
        var pi_material_id_tag = jQuery(this).attr('id');
        pi_args['quantity'] = 2000;
        pi_args['mould_quantity'] = 1;
        pi_args['coefficient_1'] = jQuery(this).attr('data-coefficient_1');
        pi_args['coefficient_2'] = jQuery(this).attr('data-coefficient_2');
        pi_args['coefficient_3'] = jQuery(this).attr('data-coefficient_3');
        pi_args['coefficient_4'] = jQuery(this).attr('data-coefficient_4');

        var surface_treatment = jQuery(this).attr('data-surface_treatment');
        var finishing_coating = jQuery(this).attr('data-finishingcoating');
        var logo_finishing = jQuery(this).attr('data-logopartial_finishing');
        var protective_coating = jQuery(this).attr('data-protective_coating');

        var surface_treatment_html = '';
        var finishing_coating_html = '';
        var logo_finishing_html = '';
        var protective_coating_html = '';

        if (surface_treatment != '') { // var surface_treatment_arr = surface_treatment.split(",");
            var surface_treatment_arr = [
                1,
                2,
                3,
                4,
                5,
                6
            ];
            surface_treatment_html += '<div class="surface_treatment_head finishing_option_head">Surface Treatment</div><form class="options-form">';
            for (var i = 0; i < surface_treatment_arr.length; i++) {
                var finishing_key = surface_treatment_arr[i];
                if (i == 0) {
                    var default_finish = finishing_cost[finishing_key]['name'];
                    surface_treatment_html += '<label class="option-check"><input type="radio" hidden="true" name="pi-surface_treatment" value="' + finishing_key + '" checked="checked">' + finishing_cost[finishing_key]['name'] + '</label>';
                } else {
                    surface_treatment_html += '<label><input type="radio" hidden="true" name="pi-surface_treatment" value="' + finishing_key + '">' + finishing_cost[finishing_key]['name'] + '</label>';
                }
            }
            surface_treatment_html += '</form>';
        }

        if (finishing_coating != '') { // var finishing_coating_arr = finishing_coating.split(",");
            var finishing_coating_arr = [
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
                17
            ];
            finishing_coating_html += '<div class="finishing_coating_head finishing_option_head">Finishing/Coating</div><form class="options-form">';
            for (var i = 0; i < finishing_coating_arr.length; i++) {
                var finishing_key = finishing_coating_arr[i];
                if (i == 0) {
                    finishing_coating_html += '<label class="option-check"><input type="radio" hidden="true" name="pi-finishing_coating" value="' + finishing_key + '" checked="checked">' + finishing_cost[finishing_key]['name'] + '</label>';
                } else {
                    finishing_coating_html += '<label><input type="radio" hidden="true" name="pi-finishing_coating" value="' + finishing_key + '">' + finishing_cost[finishing_key]['name'] + '</label>';
                }
            }
            finishing_coating_html += '</form>';
        }

        if (logo_finishing != '') { // var logo_finishing_arr = logo_finishing.split(",");
            var logo_finishing_arr = [
                0,
                18,
                19,
                20,
                21,
                22,
                23,
                24
            ];
            logo_finishing_html += '<div class="logo_finishing_head finishing_option_head">Logo/Partial Mark Finishing</div><form class="options-form">';
            for (var i = 0; i < logo_finishing_arr.length; i++) {
                var finishing_key = logo_finishing_arr[i];
                if (i == 0) {
                    logo_finishing_html += '<label class="option-check"><input type="radio" hidden="true" name="pi-logo_finishing" value="' + finishing_key + '" checked="checked">' + finishing_cost[finishing_key]['name'] + '</label>';
                } else {
                    logo_finishing_html += '<label><input type="radio" hidden="true" name="pi-logo_finishing" value="' + finishing_key + '">' + finishing_cost[finishing_key]['name'] + '</label>';
                }
            }
            logo_finishing_html += '</form>';
        }

        if (protective_coating != '') {
            var protective_coating_arr = protective_coating.split(",");
            var protective_coating_arr = [0, 25];
            protective_coating_html += '<div class="protective_coating_head finishing_option_head">Protective Coating</div><form class="options-form">';
            for (var i = 0; i < protective_coating_arr.length; i++) {
                var finishing_key = protective_coating_arr[i];
                if (i == 0) {
                    protective_coating_html += '<label class="option-check"><input type="radio" hidden="true" name="pi-protective_coating" value="' + finishing_key + '" checked="checked">' + finishing_cost[finishing_key]['name'] + '</label>';
                } else {
                    protective_coating_html += '<label><input type="radio" hidden="true" name="pi-protective_coating" value="' + finishing_key + '">' + finishing_cost[finishing_key]['name'] + '</label>';
                }
            }
            protective_coating_html += '</form>';
        }

        var finishing_html = surface_treatment_html + finishing_coating_html + logo_finishing_html + protective_coating_html;

        var lead_time_option = jQuery(this).attr('data-lead_time_option');
        var lead_time_option_html = '';
        if (lead_time_option != '') {
            var lead_time_option_arr = lead_time_option.split(";");
            lead_time_option_html += '<form class="options-form">';
            for (var i = 0; i < lead_time_option_arr.length; i++) {
                var ltoption = lead_time_option_arr[i].replace(/(^\s*)|(\s*$)/g, ""); // 去掉两边空格符
                if (i == 0) {
                    lead_time_option_html += '<label class="option-check"><input type="radio" hidden="true" name="pi-lead-time-option" checked="checked" value="' + ltoption + '">' + ltoption + '</label>';
                } else {
                    lead_time_option_html += '<label><input type="radio" hidden="true" name="pi-lead-time-option" value="' + ltoption + '">' + ltoption + '</label>';
                }
            }
            lead_time_option_html += '</form>';
        }

        var pi_container = jQuery(this).find(".pi-files-container");

        pi_container.empty();

        var pi_file_total_price = 0;

        jQuery.each(filesData, function (i, file) {
            var box_x = file['box_xyz'].x;
            var box_y = file['box_xyz'].y;
            var box_z = file['box_xyz'].z;
            if (file_unit == "inch") { // inch change to mm
                box_x = parseFloat(box_x) / 25.4;
                box_y = parseFloat(box_y) / 25.4;
                box_z = parseFloat(box_z) / 25.4;
                jQuery(".file-info-unit").text('inch')
            } else {
                jQuery(".file-info-unit").text('mm')
            } 
            pi_args['len'] = box_x;
            pi_args['width'] = box_y;
            pi_args['thickness'] = box_z;
            pi_args['surface_treatment'] = 1;
            pi_args['finishing_coating'] = 0;
            pi_args['logo_finishing'] = 0;
            pi_args['protective_coating'] = 0;

            var part_price = calculate_plastic_injection_part_price_with_formula(pi_args);
            // console.log(part_price)
            var mould_cost = calculate_plastic_injection_mould_price_with_formula(pi_args);

            var file_pi_price = calculate_plastic_injection_price_with_formula(pi_args);

            pi_file_total_price += file_pi_price;

           

            let one_price = calculate_plastic_injection_part_price_with_formula_one(pi_args);
            //console.log(part_price)

            let one_mould = calculate_plastic_injection_mould_price_with_formula_one(pi_args)

            sku =GenNonDuplicateID();//唯一sku
            //console.log(file_unit);
            // file_unit ='mm'
            
            // var pihtml = '<div class="pi-file-wrap duplicate_pi-files-cols_outer price-father"  id="' + pi_material_id_tag + '-'+i+'" key="'+i+'" column="pi" sku="'+sku+'" data-file="' + file['filename']
            //     + '" data-file_unit="' + file_unit + '" data-volume="' + parseFloat(file['volume']) + '" data-surface_area="' + parseFloat(file['surface_area'])
            //     + '" data-box_volume="' + parseFloat(file['box_volume']) + '" data-box_x="' + parseFloat(file['box_xyz'].x) + '" data-box_y="' + parseFloat(file['box_xyz'].y)
            //     + '" data-box_z="' + parseFloat(file['box_xyz'].z) + '"data-one_price=' + parseFloat(part_price) + '>';
            // pihtml += '<div class="pi-file-wrap-filelist">' + '<div class="material-file-img custom-pi-column-width-1"><img src="/wp-content/uploads/woocommerce-placeholder-300x300.png" alt="default img"></div>' + '<div class="pi-material-file-name custom-pi-column-width-2 material-item-overflow">'
            //     + '<div class="preview-link" data-link="' + file['url'] + '">' + file['filename'] + '</div>' + '<div class="pi-file-mould-part-wrap">' + '<div class="pi-mould-part-wrap">'
            //     + '<div class="pi-material-file-select-wrap"></div>' + '<div class="pi-file-mould-quantity-wrap">'
            //     + '<div class="pi-file-quantity-label">Mould Qty:</div>' + '<div class="pi-mould-bt-minus"><i class="fa-solid fa-circle-minus"></i></div>'
            //     + '<input type="text" class="mould-quantity" name="mould-quantity" value="1" maxlength="10">' + '<div class="pi-mould-bt-plus"><i class="fa-solid fa-circle-plus"></i></div>'
            //     + '</div>' + '</div>' + '<div class="pi-file-part-wrap">' + '<div class="pi-material-file-select-wrap">' + '<div class="select-options select-finishing">'
            //     + '<div><div class="pi-finish">' + default_finish + '</div><span class="finishing-down"><i class="fa-solid fa-angle-down"></i></span></div>'
            //     + '<div class="option-wrap finishing-option-wrap" style="display: none;">' + finishing_html + '</div>' + '</div>'
            //     + '<div class="select-options select-lead-time" style="display:none;">' + '<div><span>Lead Time</span><span class="lead-time-down"><i class="fa-solid fa-angle-down"></i></span></span></div>'
            //     + '<div class="option-wrap lead-time-option-wrap" style="display: none;">' + lead_time_option_html + '</div>' + '</div>' + '</div>' + '<div class="pi-file-quantity-wrap">'
            //     + '<div class="pi-file-quantity-label">Part Qty:</div>' + '<div class="pi-bt-minus"><i class="fa-solid fa-circle-minus"></i></div>' + '<input type="text" class="pi-file-quantity" name="pi-file-quantity" value="1000" maxlength="10">' + '<div class="pi-bt-plus"><i class="fa-solid fa-circle-plus"></i></div>' + '</div>' + '</div>' + '</div>' + '</div>'
            //     +            '<div class="three-price pi-flie-price-items-wrap custom-pi-column-width-3">' + '<div class="pi-file-mould-price-wrap">US$ <span class="pi-unit-mould-price">'+totwoFixed(one_mould)+'</span></div>'
            //     + '<div class="pi-file-part-price-wrap">US$ <span class="pi-unit-material-price">'+totwoFixed(one_price)+'</span></div>' + '<div class="pi-flie-price-wrap" style="display: none;">US$ <span class="pi-flie-price"></span></div>' + '</div>'
            //     +            '<div class="pi-flie-price-items-wrap custom-pi-column-width-3">' + '<div class="pi-file-mould-price-wrap">US$ <span class="pi-flie-mould-price">' + mould_cost.toFixed(2)
            //     + '</span></div>' + '<div class="pi-file-part-price-wrap">US$ <span class="pi-flie-part-price">' + part_price.toFixed(2) + '</span></div>'
            //     + '<div class="pi-flie-price-wrap" style="display: none;">US$ <span class="pi-flie-price">' + file_pi_price.toFixed(2) + '</span></div>' + '</div>' +
            // '<div class="file-ation-wrap custom-pi-column-width-4">' + '<div class="pi-abnormal-list base-price-list" mid="' + pi_material_id_tag + '-'+i+'">' + '<div class="click-price" title="click to check bulk prices">bulk price</div>' + '<div id="mask" class="mask" >' + '<div class="abnormal-show-list">' + '<div class="bulk-top"><div class="title">Bulk Price</div><div class="hide-close">x</div></div>' +
            // '<div class="bklist"></div>' + '<div class="bulk-bottom">For more than 1000 please send us mail through:<a href="mailto:kevin@lava.limited">kevin@lava.limited</a></div>' + '</div>' + '</div>' + '</div>' + '<div class="pi-add-to-cart-sub" >' + '<span class="pi-add-to-cart-sub-button"  title="Add to cart"  cart-id="'+pi_material_id+'-'+i+'">' + '<svg t="1655729930116" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5304" width="16" height="16">' + '<path d="M358.4 921.6m-102.4 0a102.4 102.4 0 1 0 204.8 0 102.4 102.4 0 1 0-204.8 0Z" fill="#2c2c2c" p-id="5305"></path><path d="M802.133333 921.6m-102.4 0a102.4 102.4 0 1 0 204.8 0 102.4 102.4 0 1 0-204.8 0Z" fill="#2c2c2c" p-id="5306"></path><path d="M928.426667 443.733333c-37.546667 20.48-81.92 34.133333-126.293334 34.133334-129.706667 0-238.933333-95.573333-252.586666-225.28-3.413333-6.826667-10.24-13.653333-17.066667-13.653334H184.32l-23.893333-122.88c0-6.826667-6.826667-13.653333-13.653334-13.653333H17.066667c-10.24 0-17.066667 6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066666h112.64l23.893333 116.053334v6.826666l20.48 102.4 61.44 303.786667c13.653333 68.266667 71.68 119.466667 143.36 119.466667h491.52c10.24 0 17.066667-6.826667 17.066667-17.066667s-6.826667-17.066667-17.066667-17.066667H378.88c-44.373333 0-85.333333-27.306667-102.4-71.68l631.466667-78.506666c6.826667 0 13.653333-6.826667 13.653333-13.653334l34.133333-122.88c3.413333-6.826667 0-13.653333-6.826666-17.066666-6.826667-6.826667-13.653333-6.826667-20.48-3.413334z" fill="#2c2c2c" p-id="5307"></path><path d="M802.133333 0C679.253333 0 580.266667 98.986667 580.266667 221.866667s98.986667 221.866667 221.866666 221.866666S1024 344.746667 1024 221.866667 925.013333 0 802.133333 0z m68.266667 238.933333H819.2v51.2c0 10.24-6.826667 17.066667-17.066667 17.066667s-17.066667-6.826667-17.066666-17.066667V238.933333h-51.2c-10.24 0-17.066667-6.826667-17.066667-17.066666s6.826667-17.066667 17.066667-17.066667H785.066667V153.6c0-10.24 6.826667-17.066667 17.066666-17.066667s17.066667 6.826667 17.066667 17.066667V204.8h51.2c10.24 0 17.066667 6.826667 17.066667 17.066667s-6.826667 17.066667-17.066667 17.066666z" fill="#2c2c2c" p-id="5308"></path>' + '</svg></span>' + '</div>' + '<div class="injection-abnormal-alert">' + '<i class="fa-solid fa-bell"></i>' + '<div class="abnormal-alert-tips">Click to ring the bell if you find the price too high, too low, looks strange. Or any other questions! We will get back to you ASAP!</div>' + '</div>' + '<div class="pi-file-dublicate-delete-wrap">'
            //     + '<div class="pi-file-dublicateclick" title="Click To Duplicate" data-click-id="' + pi_material_id_tag + '"><i class="fa-solid fa-copy"></i></div>' + '<div class="pi-file-remove" title="Click To Remove"><i class="fa-solid fa-trash-can"></i></div>' + '</div>' + '</div>' + '</div>';

            var pihtml = `
<div class="pi-file-wrap duplicate_pi-files-cols_outer price-father" id="${pi_material_id_tag}-${i}" key="${i}" column="pi"
     sku="${sku}" data-file="${file['filename']}" 
     data-file_unit="${file_unit}" 
     data-volume="${parseFloat(file['volume']) }"
     data-surface_area="${parseFloat(file['surface_area'])}" 
     data-box_volume="${parseFloat(file['box_volume'])}"
     data-box_x="${parseFloat(file['box_xyz'].x)}"
     data-box_y="${parseFloat(file['box_xyz'].y)}" 
     data-box_z="${parseFloat(file['box_xyz'].z)}" 
     data-one_price=${parseFloat(part_price)}>
    <div class="pi-file-wrap-filelist">
         <div class="material-file-img pi-column-swatch">
            <img src="/wp-content/uploads/woocommerce-placeholder-300x300.png" alt="default img">
        </div>
<!--        <div class="pi-material-file-name custom-pi-column-width-2 material-item-overflow">-->
            <div class="preview-link pi-column-material" data-link="${file['url']}">
                ${file['filename']}
            </div>
            <div class="pi-file-mould-part-wrap">
                <div class="pi-mould-part-wrap">
                    <div class="pi-material-file-select-wrap pi-column-finish"></div>
                    <div class="pi-file-mould-quantity-wrap pi-column-qty">
                        <div class="pi-file-quantity-label">Mould Qty:</div>
                        <div class="pi-mould-bt-minus"><i class="fa-solid fa-circle-minus"></i></div>
                        <input type="text" class="mould-quantity" name="mould-quantity" value="1" maxlength="10">
                        <div class="pi-mould-bt-plus"><i class="fa-solid fa-circle-plus"></i></div>
                    </div>
                </div>
                <div class="pi-file-part-wrap">
<!--                    <div class="pi-material-file-select-wrap">-->
                        <div class="select-options select-finishing">
                            <div>
                                <div class="pi-finish">${default_finish}</div>
                                <span class="finishing-down"><i class="fa-solid fa-angle-down"></i></span></div>
                            <div class="option-wrap finishing-option-wrap" style="display: none;">
                                ${finishing_html}
                            </div>
                        </div>
<!--                        <div class="select-options select-lead-time" style="display:none;">
                            <div><span>Lead Time</span><span class="lead-time-down"><i
                                    class="fa-solid fa-angle-down"></i></span></span></div>
                            <div class="option-wrap lead-time-option-wrap" style="display: none;">
                                 ${lead_time_option_html} 
                            </div>
                        </div>
                    </div>-->
                    
                    <div class="pi-file-quantity-wrap pi-column-qty">
                        <div class="pi-file-quantity-label">Part Qty:</div>
                        <div class="pi-bt-minus"><i class="fa-solid fa-circle-minus"></i></div>
                        <input type="text" class="pi-file-quantity" name="pi-file-quantity" value="1000" maxlength="10">
                        <div class="pi-bt-plus"><i class="fa-solid fa-circle-plus"></i></div>
                    </div>
                    
                </div>
                
            </div>
            <div class="pi-column-color"></div>
            <div class="pi-column-lead_time"></div>
<!--        </div>-->
        <div class="three-price pi-flie-price-items-wrap pi-column-unit">
            <div class="pi-file-mould-price-wrap">US$ <span class="pi-unit-mould-price">${totwoFixed(one_mould)}</span></div>
            <div class="pi-file-part-price-wrap">US$ <span class="pi-unit-material-price">${totwoFixed(one_price)}</span></div>
            <div class="pi-flie-price-wrap" style="display: none;">US$ <span class="pi-flie-price"></span></div>
        </div>
        <div class="pi-flie-price-items-wrap pi-column-price">
            <div class="pi-file-mould-price-wrap">US$ <span class="pi-flie-mould-price">${mould_cost.toFixed(2)}</span></div>
            <div class="pi-file-part-price-wrap">US$ <span class="pi-flie-part-price">${part_price.toFixed(2)}</span></div>
            <div class="pi-flie-price-wrap" style="display: none;">US$ <span class="pi-flie-price">${file_pi_price.toFixed(2)}</span></div>
        </div>
        <div class="file-ation-wrap pi-column-cart">
            <div class="pi-abnormal-list base-price-list" mid="${pi_material_id_tag}-${i}">
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
            <div class="pi-add-to-cart-sub"><span class="pi-add-to-cart-sub-button" title="Add to cart"
                                                  cart-id="${pi_material_id_tag}-${i}"><svg t="1655729930116" class="icon"
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
            <div class="injection-abnormal-alert"><i class="fa-solid fa-bell"></i>
                <div class="abnormal-alert-tips">Click to ring the bell if you find the price too high, too low, looks
                    strange. Or any other questions! We will get back to you ASAP!
                </div>
            </div>
            <div class="pi-file-dublicate-delete-wrap">
                <div class="pi-file-dublicateclick" title="Click To Duplicate" data-click-id="${pi_material_id_tag}">
                    <i class="fa-solid fa-copy"></i>
                </div>
                <div class="pi-file-remove" title="Click To Remove"><i class="fa-solid fa-trash-can"></i></div>
            </div>
        </div>
        <div class="show-files-arrow-close-all"></div>
    </div>
</div>`

            pi_container.append(pihtml);
        });
        // 更新每个 Plastic Injection Molding 材料的价格
        //console.log(Number(pi_file_total_price).toFixed(2))
        //totwoFixed
        jQuery(this).find('.pi-material-price').html(totwoFixed(pi_file_total_price));
        // 更新每个注塑材料的后处理名称
        // 如果下面零件的选项都一致，是同样的，就显示那个同样的内容；
        // 如果不一致，则显示"see details below"
        var jquery = jQuery(this);
        update_pi_finish_name(jquery);
        // 更新每个注塑材料的总数量
        var jquery = jQuery(this);
        update_pi_files_all_qty(jquery);
    });
    let data ='PI已加载完成';
    return data;
}


// 计算注塑模具的价格
function calculate_plastic_injection_mould_price_with_formula(args) {
    var mould_quantity = args['mould_quantity'] ? parseFloat(args['mould_quantity']) : 1;
    var len = parseFloat(args['len']);
    var width = parseFloat(args['width']);
    var thickness = parseFloat(args['thickness']);
    var D = 7.85;
    var P = 12;
    var I = 9;
    var E = 6.6;
    // (L+300)*(W+300)*(T+250)/1000000*D*P*I
    if (len < width) {
        var tem = len;
        len = width;
        width = tem;
    }
    if (width < thickness) {
        var tem = width;
        width = thickness;
        thickness = tem;
    }
    var mould_unit_cost = (len + 300) * (width + 300) * (thickness + 250) / 1000000 * D * P * I / E;
    var mould_cost = mould_unit_cost * mould_quantity;
    return mould_cost;
}
// 计算注塑的基础价格
function calculate_plastic_injection_price_with_formula(args) {
    var plastic_injection_price = calculate_plastic_injection_mould_price_with_formula(args);
    var mould_cost = calculate_plastic_injection_part_price_with_formula(args);
    var basic_price = plastic_injection_price + mould_cost;
    return basic_price;
}



// 计算注塑后处理的总价格
function calculate_plastic_injection_finishing_price_with_formula(args) { // 基本价格
    var basic_price = calculate_plastic_injection_price_with_formula(args);
    // 后处理价格
    var finishing_price = calculate_finishing_price_with_formula(args);
    // 总价格
    var cost = finishing_price + basic_price;
    return cost;
}

// 更新注塑每种材料的后处理名称
function update_pi_finish_name(jquery) {
    var pi_finish_arr = [];
    jquery.find(".pi-files-container").find('.pi-file-wrap').each(function () {
        var pi_finish = jQuery(this).find('.pi-finish').text();
        pi_finish_arr.push(pi_finish);
    });
    // console.log('pi_finish_arr',pi_finish_arr);
    var result = removeDuplicate(pi_finish_arr);
    if (result.length == 0) {
        var pi_finish_name = '';
    } else if (result.length == 1) {
        var pi_finish_name = result[0];
    } else {
        var pi_finish_name = "see details below";
    } jquery.find('.pi-select-finish-name').html(pi_finish_name);
}


// 更新 Plastic Injection Molding 某个材料的价格
function update_pi_material_price(box_id) {
    var pi_file_price_list = jQuery('#' + box_id).find('.pi-flie-price');
    // console.log('pi_file_price_list',pi_file_price_list)
    var total_price = 0;
    for (var i = 0; i < pi_file_price_list.length; i++) {
        var price = pi_file_price_list[i].innerText;
        total_price += parseFloat(price);
    }
    console.log(total_price)
    jQuery('#' + box_id).find('.pi-material-price').text(totwoFixed(total_price));
}



// 更新注塑每种材料的后处理名称
function update_pi_finish_name(jquery) {
    var pi_finish_arr = [];
    jquery.find(".pi-files-container").find('.pi-file-wrap').each(function () {
        var pi_finish = jQuery(this).find('.pi-finish').text();
        pi_finish_arr.push(pi_finish);
    });
    // console.log('pi_finish_arr',pi_finish_arr);
    var result = removeDuplicate(pi_finish_arr);
    if (result.length == 0) {
        var pi_finish_name = '';
    } else if (result.length == 1) {
        var pi_finish_name = result[0];
    } else {
        var pi_finish_name = "see details below";
    } jquery.find('.pi-select-finish-name').html(pi_finish_name);
}


// 更新注塑每种材料的所有数量
function update_pi_files_all_qty(jquery,file_pi_price) {
    var qty = 0;
    jquery.find(".pi-files-container").find('.pi-file-wrap').each(function () {
        var mould_qty = jQuery(this).find('.mould-quantity').val();
        qty += parseInt(mould_qty);
        var part_qty = jQuery(this).find('.pi-file-quantity').val();
        qty += parseInt(part_qty);
    });
    jquery.find('.pi-files-all-qty').html(qty);

    jquery.find('pi-files-unit-Price').html(file_pi_price);

}

// 更新 Plastic Injection Molding 某个材料的价格
function update_pi_material_price(box_id) {
    var pi_file_price_list = jQuery('#' + box_id).find('.pi-flie-price');
    // console.log('pi_file_price_list',pi_file_price_list)
    var total_price = 0;
    // console.log(pi_file_price_list.length);
    for (var i = 0; i < pi_file_price_list.length; i++) {
        //console.log(pi_file_price_list[i]);
        var price = pi_file_price_list[i].innerText;
        price = price==""?0:price;
        //console.log(typeof(price))
        // console.log('price:'+price)
        total_price += parseFloat(price);
    }
    //console.log('total:'+total_price);
    jQuery('#' + box_id).find('.pi-material-price').text(totwoFixed(total_price));
}



// 更新注塑每种材料的所有数量
function update_pi_files_all_qty(jquery) {
    var qty = 0;
    jquery.find(".pi-files-container").find('.pi-file-wrap').each(function () {
        var mould_qty = jQuery(this).find('.mould-quantity').val();
        qty += parseInt(mould_qty);
        var part_qty = jQuery(this).find('.pi-file-quantity').val();
        qty += parseInt(part_qty);
    });
    jquery.find('.pi-files-all-qty').html(qty);
}


// // 第三列剪头事件
// jQuery(document).on('click', '.pi-fa-angles-wrap', function() {
// 	var display = jQuery(this).find(".close").css('display');
// 	if (display == "flex") {
// 		jQuery('.pi-materials-select-outer-container').css('minWidth', '');
// 		jQuery('.pi-file-mould-part-wrap').css('display', 'none');
// 		jQuery('.pi-unit').css('display', 'none');
// 		jQuery('.custom-pi-column-width-2').css({
// 			width: '130px',
// 			minWidth: '130px'
// 		});
// 		jQuery(this).find(".open").css('display', 'flex');
// 		jQuery(this).find(".close").css('display', 'none');
//         jQuery('.three-price').css('display', 'none');
// 	} else {
// 		jQuery('.pi-materials-select-outer-container').css('minWidth', '865px');
// 		jQuery('.pi-file-mould-part-wrap').css('display', 'block');
// 		jQuery('.pi-unit').css('display', 'flex');
// 		jQuery('.custom-pi-column-width-2').css({
// 			width: '470px',
// 			minWidth: '470px'
// 		});
// 		jQuery(this).find(".close").css('display', 'flex');
// 		jQuery(this).find(".open").css('display', 'none');
//         jQuery('.three-price').css('display', 'block');
// 	}
// });




//删除 Plastic Injection Molding 一条的文件数据
jQuery(document).on("click", ".pi-file-remove", function() {
	var box_id = jQuery(this).closest('.pi-box-material').attr('id');
	var jquery = jQuery(this).closest('.pi-box-material');
	jQuery(this).closest(".pi-file-wrap").remove();
	update_pi_material_price(box_id);
	update_pi_finish_name(jquery);
	update_pi_files_all_qty(jquery);
});


// Plastic Injection Molding finishing 后处理改变后更新价格
jQuery(document).on('change', 'input[name="pi-surface_treatment"]', function() {
	// var $this = jQuery(this);
	var athis = this;
	update_pi_file_price(athis);
});
jQuery(document).on('change', 'input[name="pi-finishing_coating"]', function() {
	// var $this = jQuery(this);
	var athis = this;
	update_pi_file_price(athis);
});
jQuery(document).on('change', 'input[name="pi-logo_finishing"]', function() {
	// var $this = jQuery(this);
	var athis = this;
	update_pi_file_price(athis);
});
jQuery(document).on('change', 'input[name="pi-protective_coating"]', function() {
	// var $this = jQuery(this);
	var athis = this;
	update_pi_file_price(athis);
});

//点击减号更新价格
jQuery('body').on('click', '.pi-mould-bt-minus', function(e) {
	e.preventDefault();
	var quantity = jQuery(this).closest('.pi-file-mould-quantity-wrap').find('input[name="mould-quantity"]').val(); 
	quantity = parseInt(quantity);
	if (quantity>0) {
		quantity = quantity - 1;
		jQuery(this).closest('.pi-file-mould-quantity-wrap').find('input[name="mould-quantity"]').val(quantity); 
	}else{
		return false;
	}

	var athis = this;
	update_pi_file_price(athis);

    var pi_box = jQuery(this).closest('.pi-box-material');
    var pi_box_id = pi_box.attr('id');
	update_pi_files_all_qty(pi_box);

       // 移除当前小购物车变为黑色
    let parent = jQuery(this).parents('.pi-file-wrap');
    let sub =parent.find('.pi-add-to-cart-sub-button');
    jQuery(sub).removeClass('cart');

        // 从右上角购物车删除
        var sku =parent.attr('sku');
        pi_Reduce_files_cart(sku)
        // 如果是最后一个，则把大购物车变黑
        setTimeout(() => {
        last_pi_small_cart(parent,pi_box_id,pi_box)
        }, 500);
    

});

//点击加号更新mouId价格
jQuery('body').on('click', '.pi-mould-bt-plus', function(e) {
	e.preventDefault();
	var quantity = jQuery(this).closest('.pi-file-mould-quantity-wrap').find('input[name="mould-quantity"]').val(); 
	quantity = parseInt(quantity);
	quantity = quantity + 1;
	jQuery(this).closest('.pi-file-mould-quantity-wrap').find('input[name="mould-quantity"]').val(quantity); 
	var athis = this;
	update_pi_file_price(athis);//更新单价
	let pi_box = jQuery(this).closest('.pi-box-material');
	update_pi_files_all_qty(pi_box);
    let sub = jQuery(pi_box).find('.pi-file-wrap');
    pi_mould_plus_cart(sub)
    
});

// 增购方法
function pi_mould_plus_cart(sub){
    var files = [];
    var file_item = {
        sku:jQuery(sub).attr('sku'),
        col:jQuery(sub).attr('column'),
        volume: jQuery(sub).attr('data-volume'),
        surface_area: jQuery(sub).attr('data-surface_area'),
        box_volume: jQuery(sub).attr('data-box_volume'),
        file_unit: jQuery(sub).attr('data-file_unit'),
        len: jQuery(sub).attr('data-box_x'),
        width: jQuery(sub).attr('data-box_y'),
        thickness: jQuery(sub).attr('data-box_z'),
        material_id: jQuery(sub).closest('.pi-box-material').attr('data-id'),
        file_name: jQuery(sub).attr('data-file'),
        quantity: jQuery(sub).find('input[name="pi-file-quantity"]').val()-1000,
        mould_quantity: jQuery(sub).find('input[name="mould-quantity"]').val(),
        price: jQuery(sub).find('.pi-flie-price').text(),
        mould_price: jQuery(sub).find('.pi-flie-mould-price').text(),
        part_price: jQuery(sub).find('.pi-flie-part-price').text(),
        leadtime: jQuery(sub).closest('.pi-box-material').attr('data-lead_time_option'),
        leadtime_checked: jQuery(sub).find('input[name="pi-lead-time-option"]:checked').val(),
        density: jQuery(sub).closest('.pi-box-material').attr('data-density'),
        coefficient_1: jQuery(sub).closest('.pi-box-material').attr('data-coefficient_1'),
        coefficient_2: jQuery(sub).closest('.pi-box-material').attr('data-coefficient_2'),
        coefficient_3: jQuery(sub).closest('.pi-box-material').attr('data-coefficient_3'),
        coefficient_4: jQuery(sub).closest('.pi-box-material').attr('data-coefficient_4'),
        surface_treatment: jQuery(sub).find('input[name="pi-surface_treatment"]:checked').val(),
        finishing_coating: jQuery(sub).find('input[name="pi-finishing_coating"]:checked').val(),
        logo_finishing: jQuery(sub).find('input[name="pi-logo_finishing"]:checked').val(),
        protective_coating: jQuery(sub).find('input[name="pi-protective_coating"]:checked').val()
    };
        files.push(file_item);
        //console.log(files)
   
    
    pi_add_files_cart(files);
    jQuery(parent).addClass('cart');
    // console.log('add cart')
}


// 修改文件的加减号之间的数量的价格更新
jQuery('body').on('change', 'input[name="mould-quantity"]', function() {
	var quantity = jQuery(this).val();
	quantity = parseInt(quantity);
    
	if (isNaN(quantity)) {
		quantity = 1;
	}
	if (quantity < 0) {
		quantity = 1;
	}
	jQuery(this).val(quantity);
    console.log("533:"+quantity)
	var athis = this;
	update_pi_file_price(athis);
	var jquery = jQuery(this).closest('.pi-box-material');
	update_pi_files_all_qty(jquery);
})




// 修改文件的加减号之间的数量的价格更新
jQuery('body').on('change', 'input[name="pi-file-quantity"]', function() {
	var quantity = jQuery(this).val();
	quantity = parseInt(quantity);
	if (isNaN(quantity)) {
		quantity = 1000;
	}
	if (quantity < 0) {
		quantity = 1000;
	}
	jQuery(this).val(quantity);
    console.log('554:'+quantity)
	var athis = this;
	update_pi_file_price(athis);
    updatePart(athis,quantity)
	var jquery = jQuery(this).closest('.pi-box-material');
	update_pi_files_all_qty(jquery);
})


// 注塑 价格异常提示
jQuery('body').on('click', '.injection-abnormal-alert', function() {
	jQuery('#exception-prompt').show();
	var filename = jQuery(this).closest('.pi-file-wrap').attr('data-file');
	var file_unit = jQuery(this).closest('.pi-file-wrap').attr('data-file_unit');
	var material_id = jQuery(this).closest('.pi-box-material').attr('data-id');
	var quantity1 = jQuery(this).closest('.pi-file-wrap').find('input[name="mould-quantity"]').val();
	var quantity2 = jQuery(this).closest('.pi-file-wrap').find('input[name="pi-file-quantity"]').val();
	var quantity = 'Mould Qty: ' + quantity1 + ' , Part Qty: ' + quantity2;
	var price = jQuery(this).closest('.pi-file-wrap').find('.pi-flie-price-wrap').text();
	var manual = 'INJECTION MOLDING';
	jQuery('.prompt-confirm-btn').attr({
		'data-filename': filename,
		'data-file_unit': file_unit,
		'data-material_id': material_id,
		'data-quantity': quantity,
		'data-price': price,
		'data-manual': manual
	});
});

// 向上向下剪头事件
// jQuery('body').on('click', '.pi-show-files-arrow', function() {
// 	if (jQuery('.file_name').length == 0) {
// 		jQuery('#alertToUploadFile').show();
// 		jQuery(this).prop('disabled', false);
// 		return;
// 	}else{
// 		var display = jQuery(this).closest('.pi-box-material').find('.pi-files-container').css('display');
// 		if (display == 'none') {
// 			jQuery(this).closest('.pi-box-material').find('.pi-files-container').show("slow");
// 			jQuery(this).find('.fa-solid').removeClass('fa-angle-down');
// 			jQuery(this).find('.fa-solid').addClass('fa-angle-up');
// 		}else{
// 			jQuery(this).closest('.pi-box-material').find('.pi-files-container').hide("slow");
// 			jQuery(this).find('.fa-solid').removeClass('fa-angle-up');
// 			jQuery(this).find('.fa-solid').addClass('fa-angle-down');
// 		}
// 	}
// });



// 计算后处理价格
function calculate_finishing_price_with_formula(args) {
    var quantity = args['quantity'] ? parseFloat(args['quantity']) : 1;
    var surface_treatment = args['surface_treatment'] ? args['surface_treatment'] : 1;
    var finishing_coating = args['finishing_coating'] ? args['finishing_coating'] : 0;
    var logo_finishing = args['logo_finishing'] ? args['logo_finishing'] : 0;
    var protective_coating = args['protective_coating'] ? args['protective_coating'] : 0;

    var surface_treatment_cost = finishing_cost[surface_treatment]['cost'];
    var finishing_coating_cost = finishing_cost[finishing_coating]['cost'];
    var logo_finishing_cost = finishing_cost[logo_finishing]['cost'];
    var protective_coating_cost = finishing_cost[protective_coating]['cost'];

    if (quantity > 99) {
        quantity = 99;
    }

    var cost = (surface_treatment_cost + finishing_coating_cost + logo_finishing_cost + protective_coating_cost) * (1 - (quantity - 1) / 100 * 0.4);
    return cost;
}


function three_calculate_unit_price(P0,Lx, Wx, Hx){
    let D0 = 150;
    let Sx = 35727.73;
    let S0 = 101250.0;
    let unit_price= calcPrice(P0, Lx, Wx, Hx, D0, Sx, S0)
    return totwoFixed(unit_price);
  }

 // 计算注塑零件单一的价格 20230226
 function  calculate_plastic_injection_part_price_with_formula_one(args){
   
    let price = calculate_plastic_injection_part_price_with_formula(args)
    // console.log(price/1000)
    return price/1000;
  }
 // 计算模具单一的价格
  function calculate_plastic_injection_mould_price_with_formula_one(args) {
    //console.log(args['quantity']) // 默认2000
    var mould_quantity = 1;//数量1
    var len = parseFloat(args['len']);
    var width = parseFloat(args['width']);
    var thickness = parseFloat(args['thickness']);
    var D = 7.85;
    var P = 12;
    var I = 9;
    var E = 6.6;
    // (L+300)*(W+300)*(T+250)/1000000*D*P*I
    if (len < width) {
        var tem = len;
        len = width;
        width = tem;
    }
    if (width < thickness) {
        var tem = width;
        width = thickness;
        thickness = tem;
    }
    var mould_unit_cost = (len + 300) * (width + 300) * (thickness + 250) / 1000000 * D * P * I / E;
    var mould_cost = mould_unit_cost * mould_quantity;
    return mould_cost;
}

// 显示单1价格和单一模具单价
  function pi_show_unit_price(pi_material_id_tag,args){
    let one_price = calculate_plastic_injection_part_price_with_formula_one(args);
    let one_mould = calculate_plastic_injection_mould_price_with_formula_one(args)
    // console.log(one_price);  
  }

// 大购物车
// AJAX - button "Add to cart" 将 Plastic Injection Molding 材料异步添加购物车
jQuery('body').on('click', '.pi-add-to-cart-button', function() {
	// return false;

    // 公共部分
    var pi_box_material = jQuery(this).closest('.pi-box-material');
	var files = [];
	var box_id = pi_box_material.attr('id');

    // 调度处理购物车增减START
    if (jQuery(this).hasClass('cart')) {
        let sku = [];
        jQuery('#' + box_id + ' .pi-file-wrap').each(function (i) {
            if (jQuery(this).find('input[name="pi-file-quantity"]').val() * 1 > 0) {
                sku[i] = jQuery(this).attr('sku')
            }
        });
        // console.log(sku)

        pi_Reduce_files_cart(sku)

        // console.log('delete cart')
        //移除大购物车绿色
        jQuery(this).removeClass('cart');
        //移除小购物车绿色
        jQuery(pi_box_material).find('.pi-add-to-cart-sub-button').removeClass('cart');
    } else {

	   if (jQuery(".file_name").length == 0) {
		jQuery('#alertToUploadFile').show();
		jQuery(this).prop('disabled', false);
		return;
	   } else {
		
		jQuery('#' + box_id + ' .pi-file-wrap').each(function(i) {
			if (jQuery(this).find('input[name="pi-file-quantity"]').val() * 1 > 0) {
				var file_item = {
                    sku:jQuery(this).attr('sku'),
                    col:jQuery(this).attr('column'),
					volume: jQuery(this).attr('data-volume'),
					surface_area: jQuery(this).attr('data-surface_area'),
					box_volume: jQuery(this).attr('data-box_volume'),
					file_unit: jQuery(this).attr('data-file_unit'),
					len: jQuery(this).attr('data-box_x'),
					width: jQuery(this).attr('data-box_y'),
					thickness: jQuery(this).attr('data-box_z'),
					material_id: jQuery(this).closest('.pi-box-material').attr('data-id'),
					file_name: jQuery(this).attr('data-file'),
					quantity: jQuery(this).find('input[name="pi-file-quantity"]').val(),
					mould_quantity: jQuery(this).find('input[name="mould-quantity"]').val(),
					price: jQuery(this).find('.pi-flie-price').text(),
					mould_price: jQuery(this).find('.pi-flie-mould-price').text(),
					part_price: jQuery(this).find('.pi-flie-part-price').text(),
					leadtime: jQuery(this).closest('.pi-box-material').attr('data-lead_time_option'),
					leadtime_checked: jQuery(this).find('input[name="pi-lead-time-option"]:checked').val(),
					density: jQuery(this).closest('.pi-box-material').attr('data-density'),
					coefficient_1: jQuery(this).closest('.pi-box-material').attr('data-coefficient_1'),
					coefficient_2: jQuery(this).closest('.pi-box-material').attr('data-coefficient_2'),
					coefficient_3: jQuery(this).closest('.pi-box-material').attr('data-coefficient_3'),
					coefficient_4: jQuery(this).closest('.pi-box-material').attr('data-coefficient_4'),
					surface_treatment: jQuery(this).find('input[name="pi-surface_treatment"]:checked').val(),
					finishing_coating: jQuery(this).find('input[name="pi-finishing_coating"]:checked').val(),
					logo_finishing: jQuery(this).find('input[name="pi-logo_finishing"]:checked').val(),
					protective_coating: jQuery(this).find('input[name="pi-protective_coating"]:checked').val()
				};

				files.push(file_item);

			}
		});
       }

       let sku_list=[];
       // console.log(files);
       for(var i=0;i<files.length;i++){
           sku_list[i] = files[i]['sku']
       }
       save_id_sku('pi-material',box_id,sku_list,null)
       pi_add_files_cart(files);
        //增加大购物车绿色
       jQuery(this).addClass('cart');
        //增加小购物车绿色
        jQuery(pi_box_material).find('.pi-add-to-cart-sub-button').addClass('cart');
       // console.log('add cart')
	}
});

// 小购物车

jQuery('body').on('click', '.pi-add-to-cart-sub-button', function () { 
	// 公共部分
    var pi_box_material = jQuery(this).closest('.pi-box-material');
	var files = [];
	var box_id = pi_box_material.attr('id');

    // console.log(box_id)
    let cartid = jQuery(this).attr('cart-id');  
    //console.log(cartid);
    let index = cartid.lastIndexOf("-");
    let cid = cartid.substring(index + 1, cartid.length)
    // console.log(cid);
    let sub = jQuery('#' + box_id + ' .pi-file-wrap')[cid];
    //console.log(sub)

    // 调度处理购物车增减START
    if (jQuery(this).hasClass('cart')) {
        let sku = jQuery(sub).attr('sku')
        //console.log(sku)

        pi_Reduce_files_cart(sku)

        jQuery(this).removeClass('cart');
 
        // 若小购物车是最后一个是绿色,点击后小购物车变黑,那大购物车也变黑
        let number= (document.getElementById(box_id).getElementsByClassName('cart').length);
        console.log(number)
        //console.log('总购物车数量：'+number);
        if(number==1 ){
            pi_Reduce_files_cart(sku)
            clear_my_cart()
            jQuery(pi_box_material).find('.pi-add-to-cart-button').removeClass('cart')
            jQuery(pi_box_material).find('.pi-add-to-cart-sub-button').removeClass('cart')
        }
    } else {
        if (jQuery(".file_name").length == 0) {
            jQuery('#alertToUploadFile').show();
            jQuery(this).prop('disabled', false);
            return;
        } else {
            console.log("单独添加");
            //console.log(sub);
            let num =jQuery(sub).find('input[name="pi-file-quantity"]').val()
            //console.log(num)
            if (num* 1 > 0) {
				var file_item = {
                    sku:jQuery(sub).attr('sku'),
                    col:jQuery(sub).attr('column'),
					volume: jQuery(sub).attr('data-volume'),
					surface_area: jQuery(sub).attr('data-surface_area'),
					box_volume: jQuery(sub).attr('data-box_volume'),
					file_unit: jQuery(sub).attr('data-file_unit'),
					len: jQuery(sub).attr('data-box_x'),
					width: jQuery(sub).attr('data-box_y'),
					thickness: jQuery(sub).attr('data-box_z'),
					material_id: jQuery(sub).closest('.pi-box-material').attr('data-id'),
					file_name: jQuery(sub).attr('data-file'),
					quantity: jQuery(sub).find('input[name="pi-file-quantity"]').val(),
					mould_quantity: jQuery(sub).find('input[name="mould-quantity"]').val(),
					price: jQuery(sub).find('.pi-flie-price').text(),
					mould_price: jQuery(sub).find('.pi-flie-mould-price').text(),
					part_price: jQuery(sub).find('.pi-flie-part-price').text(),
					leadtime: jQuery(sub).closest('.pi-box-material').attr('data-lead_time_option'),
					leadtime_checked: jQuery(sub).find('input[name="pi-lead-time-option"]:checked').val(),
					density: jQuery(sub).closest('.pi-box-material').attr('data-density'),
					coefficient_1: jQuery(sub).closest('.pi-box-material').attr('data-coefficient_1'),
					coefficient_2: jQuery(sub).closest('.pi-box-material').attr('data-coefficient_2'),
					coefficient_3: jQuery(sub).closest('.pi-box-material').attr('data-coefficient_3'),
					coefficient_4: jQuery(sub).closest('.pi-box-material').attr('data-coefficient_4'),
					surface_treatment: jQuery(sub).find('input[name="pi-surface_treatment"]:checked').val(),
					finishing_coating: jQuery(sub).find('input[name="pi-finishing_coating"]:checked').val(),
					logo_finishing: jQuery(sub).find('input[name="pi-logo_finishing"]:checked').val(),
					protective_coating: jQuery(sub).find('input[name="pi-protective_coating"]:checked').val()
				};
			    files.push(file_item);
                console.log(files)
            }
            // console.log(files);
            let sku_list=[];
            for(var i=0;i<files.length;i++){
                sku_list[i] = files[i]['sku']
            }
            cartid =jQuery('#' + box_id + ' .pi-file-wrap').find('.pi-add-to-cart-sub-button').eq(cid).attr('cart-id');
            console.log(cid,cartid)
            save_id_sku('pi-material',box_id,sku_list,cartid)
            pi_add_files_cart(files);
            jQuery(this).addClass('cart');
            // console.log(cid)
            if(cid==0){
                 jQuery(pi_box_material).find('.pi-add-to-cart-button').addClass('cart');
                //
            }
        } 
    }
});  

  // 增加更新购物车
function pi_add_files_cart(files){
    if (files.length > 0) {
        jQuery.post(
            myajax.url, {
                'action': 'create_plastic_injection_molding_product',
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



function pi_Reduce_files_cart(sku){
    // console.log(sku)
    jQuery.post(myajax.url, {
        'action': 'pi_Reduce_product_cart',
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



//点击减号更新价格 20230104 更新
jQuery('body').on('click', '.pi-bt-minus', function(e) {
	e.preventDefault();
	var quantity = jQuery(this).closest('.pi-file-quantity-wrap').find('input[name="pi-file-quantity"]').val(); 
	quantity = parseInt(quantity);
	if (quantity>0) {
		quantity = quantity - 1;
		jQuery(this).closest('.pi-file-quantity-wrap').find('input[name="pi-file-quantity"]').val(quantity); 
	}else{
		return false;
	}

	var athis = this;

	update_pi_file_price(athis);
    updatePart(athis,quantity)
	var pi_box = jQuery(this).closest('.pi-box-material');
    var pi_box_id = pi_box.attr('id');
	update_pi_files_all_qty(pi_box);

    // 移除当前小购物车变为黑色
    let parent = jQuery(this).parents('.pi-file-wrap');
    let sub =parent.find('.pi-add-to-cart-sub-button');
    jQuery(sub).removeClass('cart');

    // 从右上角购物车删除
    var sku =parent.attr('sku');
    pi_Reduce_files_cart(sku)
    // 如果是最后一个，则把大购物车变黑
    setTimeout(() => {
    last_pi_small_cart(parent,pi_box_id,pi_box)
    }, 500);

});




// 最后一个文件点击减购，大购物车变黑
function  last_pi_small_cart(last,box_id,box){
    // 获取当前是第几个 2023 1月11日
    let cartid = last.find('.pi-add-to-cart-sub-button').attr('cart-id');
    // console.log(cartid);
    // 获取购物车序号
    let index = cartid.lastIndexOf("-");
    let cid = cartid.substring(index + 1, cartid.length)
    // console.log(cid);
    // 获取当前产品的数量之和
    let number= jQuery('#' + box_id + ' .pi-file-wrap').length
    // console.log('cid'+cid);
    // console.log('number'+number);
    // 当序号= 总数减一，确定为最后一个减购物车,然后触发，把大购物车变黑，并去除所有购物车数量。
    if(Number(cid) ==number-1 ){
        // console.log(box)
    setTimeout(() => {
        clear_my_cart()
        jQuery(box).find('.pi-add-to-cart-button').removeClass('cart')
    }, 500);
   }else if(Number(cid)==number){
    // console.log('last'+number)
    setTimeout(() => {
        clear_my_cart()
       jQuery(box).find('.pi-add-to-cart-button').removeClass('cart')
    }, 500);
   }
}




// 增购方法
function pi_plus_cart(pi_box,sub){
    var files = [];
    var file_item = {
        sku:jQuery(sub).attr('sku'),
        col:jQuery(sub).attr('column'),
        volume: jQuery(sub).attr('data-volume'),
        surface_area: jQuery(sub).attr('data-surface_area'),
        box_volume: jQuery(sub).attr('data-box_volume'),
        file_unit: jQuery(sub).attr('data-file_unit'),
        len: jQuery(sub).attr('data-box_x'),
        width: jQuery(sub).attr('data-box_y'),
        thickness: jQuery(sub).attr('data-box_z'),
        material_id: jQuery(sub).closest('.pi-box-material').attr('data-id'),
        file_name: jQuery(sub).attr('data-file'),
        quantity: jQuery(sub).find('input[name="pi-file-quantity"]').val()-1000,
        mould_quantity: jQuery(sub).find('input[name="mould-quantity"]').val(),
        price: jQuery(sub).find('.pi-flie-price').text(),
        mould_price: jQuery(sub).find('.pi-flie-mould-price').text(),
        part_price: jQuery(sub).find('.pi-flie-part-price').text(),
        leadtime: jQuery(sub).closest('.pi-box-material').attr('data-lead_time_option'),
        leadtime_checked: jQuery(sub).find('input[name="pi-lead-time-option"]:checked').val(),
        density: jQuery(sub).closest('.pi-box-material').attr('data-density'),
        coefficient_1: jQuery(sub).closest('.pi-box-material').attr('data-coefficient_1'),
        coefficient_2: jQuery(sub).closest('.pi-box-material').attr('data-coefficient_2'),
        coefficient_3: jQuery(sub).closest('.pi-box-material').attr('data-coefficient_3'),
        coefficient_4: jQuery(sub).closest('.pi-box-material').attr('data-coefficient_4'),
        surface_treatment: jQuery(sub).find('input[name="pi-surface_treatment"]:checked').val(),
        finishing_coating: jQuery(sub).find('input[name="pi-finishing_coating"]:checked').val(),
        logo_finishing: jQuery(sub).find('input[name="pi-logo_finishing"]:checked').val(),
        protective_coating: jQuery(sub).find('input[name="pi-protective_coating"]:checked').val()
    };
        files.push(file_item);
        //console.log(files)
   
        let sku_list=[];
        // console.log(files);
        for(var i=0;i<files.length;i++){
            sku_list[i] = files[i]['sku']
        }
    let material_id =files[0]['material_id']
    //console.log(sub);
    let cartid = jQuery(sub).find('.pi-add-to-cart-sub-button').attr('cart-id');  
    //console.log(cartid);
    let box_id =jQuery(pi_box).attr('id');
    //console.log(box_id);
    save_id_sku('pi-material',box_id,sku_list,cartid)
    pi_add_files_cart(files);
    jQuery(parent).addClass('cart');
    // console.log('add cart')
}




//点击part 加号更新价格
jQuery('body').on('click', '.pi-bt-plus', function(e) {
	e.preventDefault();
	var quantity = jQuery(this).closest('.pi-file-quantity-wrap').find('input[name="pi-file-quantity"]').val(); 
	quantity = parseInt(quantity);
	quantity = quantity + 1;
    // console.log("A:"+quantity);
	jQuery(this).closest('.pi-file-quantity-wrap').find('input[name="pi-file-quantity"]').val(quantity); 
	var athis = this;

	update_pi_file_price(athis);
    updatePart(athis,quantity)
	let pi_box = jQuery(this).closest('.pi-box-material');
	update_pi_files_all_qty(pi_box);
    //增购方法 20220201
    let sub = jQuery(this).closest('.pi-file-wrap');
    pi_plus_cart(pi_box,sub);
});

// 计算注塑零件后处理的价格
function updatePart(athis,quantity) { // 基本价格
    
    let  one = jQuery(athis).closest('.pi-file-wrap').find('.pi-unit-material-price').text()
    //console.log(quantity)
    let part_price =one*quantity
    //console.log("B:"+part_price)
    jQuery(athis).closest('.pi-file-wrap').find('.pi-flie-part-price').text(part_price.toFixed(2));
}



// 更新 Plastic Injection Molding 材料中一个文件的价格
function update_pi_file_price(athis) {
    var pi_file_wrap = jQuery(athis).closest('.pi-file-wrap');
    var surface_treatment = pi_file_wrap.find('input[name="pi-surface_treatment"]:checked').val();
    var finishing_coating = pi_file_wrap.find('input[name="pi-finishing_coating"]:checked').val();
    var logo_finishing = pi_file_wrap.find('input[name="pi-logo_finishing"]:checked').val();
    var protective_coating = pi_file_wrap.find('input[name="pi-protective_coating"]:checked').val();
    var pi_file_quantity = pi_file_wrap.find('input[name="pi-file-quantity"]').val();
    var mould_quantity = pi_file_wrap.find('input[name="mould-quantity"]').val();;
    var file_unit = pi_file_wrap.attr('data-file_unit');
    var box_x = pi_file_wrap.attr('data-box_x');
    var box_y = pi_file_wrap.attr('data-box_y');
    var box_z = pi_file_wrap.attr('data-box_z');
    if (file_unit == "inch") {
        box_x = parseFloat(box_x)/25.4;
        box_y = parseFloat(box_y)/25.4;
        box_z = parseFloat(box_z)/25.4;
    }

    var pi_box_material = jQuery(athis).closest('.pi-box-material');
    var coefficient_1 = pi_box_material.attr('data-coefficient_1');
    var coefficient_2 = pi_box_material.attr('data-coefficient_2');
    var coefficient_3 = pi_box_material.attr('data-coefficient_3');
    var coefficient_4 = pi_box_material.attr('data-coefficient_4');

    var args = [];

    args['quantity'] = pi_file_quantity;
    args['mould_quantity'] = mould_quantity;
    args['len'] = box_x;
    args['width'] = box_y;
    args['thickness'] = box_z;
    args['coefficient_1'] = coefficient_1;
    args['coefficient_2'] = coefficient_2;
    args['coefficient_3'] = coefficient_3;
    args['coefficient_4'] = coefficient_4;

    args['surface_treatment'] = surface_treatment;
    args['finishing_coating'] = finishing_coating;
    args['logo_finishing'] = logo_finishing;
    args['protective_coating'] = protective_coating;

    
    var mould_price = calculate_plastic_injection_mould_price_with_formula(args);
    pi_file_wrap.find('.pi-flie-mould-price').text(mould_price.toFixed(2));

    var cost = calculate_plastic_injection_finishing_price_with_formula(args);
    pi_file_wrap.find('.pi-flie-price').text(cost.toFixed(2));
    //console.log(cost);
    // 更新这个材料的总价格
    var box_id = pi_box_material.attr('id');
    update_pi_material_price(box_id);
}

/* Plastic Injection Molding */
// 计算注塑零件的价格
function calculate_plastic_injection_part_price_with_formula(args) {
    
    var plastic_injection_quantity = args['quantity'] ? parseFloat(args['quantity']) : 1000;
    
    var len = parseFloat(args['len']);
    var width = parseFloat(args['width']);
    var thickness = parseFloat(args['thickness']);

    var coefficient_1 = parseFloat(args['coefficient_1']);
    var coefficient_2 = parseFloat(args['coefficient_2']);
    var coefficient_3 = parseFloat(args['coefficient_3']);
    var coefficient_4 = parseFloat(args['coefficient_4']);

    var part_unit_price = len * width * thickness / coefficient_1 * coefficient_2 * coefficient_3 / coefficient_4;
    //console.log(part_unit_price)

    if (plastic_injection_quantity >= 80 && plastic_injection_quantity <= 1000) {
        part_unit_price = part_unit_price * Math.pow(plastic_injection_quantity / 1000, -1 / 4);
    }
    if (plastic_injection_quantity > 1000 && plastic_injection_quantity <= 2000) {
        part_unit_price = part_unit_price * Math.pow(plastic_injection_quantity / 1000, -1 / 12);
    }
    if (plastic_injection_quantity > 2000) {
        part_unit_price = part_unit_price * Math.pow(2000 / 1000, -1 / 12);
    }

    var plastic_injection_part_price = part_unit_price * plastic_injection_quantity;

    //console.log(plastic_injection_part_price);

    if (plastic_injection_quantity > 0 && plastic_injection_part_price < 80) {
        // 最低价为80美金
        plastic_injection_part_price = 80;
    }
  
    //console.log(plastic_injection_quantity)
    //console.log(part_unit_price);
    

    return plastic_injection_part_price;
}




// 点击 pi-file-dublicateclick 复制一条文件数据
jQuery(document).on('click', '.pi-file-dublicateclick', function() {
    let cartindex=0;
    let sku,clickId,id,pindex,box,pid;
    let clone_html=null;
	clickId = jQuery(this).attr('data-click-id');
    pid = jQuery(this).closest('.pi-box-material').attr('data-id');
    cartindex = document.getElementById(clickId).getElementsByClassName('pi-file-wrap').length;
    //console.log(cartindex++)
    id= cartindex++;
    pindex=pid+"-"+id;
    sku =GenNonDuplicateID()
	clone_html = jQuery(this).closest('.duplicate_pi-files-cols_outer').clone();
    clone_html.attr('sku',sku);
    clone_html.find('.pi-add-to-cart-sub-button').attr('cart-id',pindex)
    //debugger;
    let key = jQuery(this).closest('.pi-file-wrap').attr('key');
	clone_html.insertAfter("#"+clickId+'-'+key);


	var box_id = jQuery(this).closest('.pi-box-material').attr('id');
	//console.log('dublicateclick_boxid',box_id);
	update_pi_material_price(box_id);
	var jquery = jQuery(this).closest('.pi-box-material');
	update_pi_finish_name(jquery);
	update_pi_files_all_qty(jquery);
});


jQuery('body').on('click', '.pi-file-wrap #mask table tr', function () {
    let bulkindex =null;
    let qty,unit,total;
    bulkindex = jQuery('.pi-file-wrap #mask table tr').index(this);
    if(bulkindex===0){return false};
    //console.log(bulkindex);
    qty = jQuery('#mask table tr').eq(bulkindex).attr('bqty');
    unit = jQuery('#mask table tr').eq(bulkindex).attr('bunit')
    total = jQuery('#mask table tr').eq(bulkindex).attr('btotal')
    //console.log('clickId:'+bulkindex,qty,unit,total)
    //console.log(mid);
    jQuery("#"+mid).find('input[name="pi-file-quantity"]').val(qty);
    jQuery("#"+mid).find(".pi-unit-material-price").text(unit);
    jQuery("#"+mid).find(".pi-flie-part-price").text(total);
    
});