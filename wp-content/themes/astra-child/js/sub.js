

jQuery('body').on('mouseover mouseout', '.printing-abnormal-alert', function (event) {
    if (event.type == "mouseover") { // 鼠标悬浮
        jQuery(this).find('.abnormal-alert-tips').show();
    } else if (event.type == "mouseout") { // 鼠标离开
        jQuery(this).find('.abnormal-alert-tips').hide();
    }
});


jQuery('body').on('mouseover mouseout', '.cnc-abnormal-alert', function (event) {
    if (event.type == "mouseover") { // 鼠标悬浮
        jQuery(this).find('.abnormal-alert-tips').show();
    } else if (event.type == "mouseout") { // 鼠标离开
        jQuery(this).find('.abnormal-alert-tips').hide();
    }
});
jQuery('body').on('mouseover mouseout', '.injection-abnormal-alert', function (event) {
    if (event.type == "mouseover") { // 鼠标悬浮
        jQuery(this).find('.abnormal-alert-tips').show();
    } else if (event.type == "mouseout") { // 鼠标离开
        jQuery(this).find('.abnormal-alert-tips').hide();
    }
});

function onprogress(evt){
	var load_progress = jQuery('#progress');
	var bar = jQuery('#bar');
	var percent = jQuery('#percent');
	var loaded = evt.loaded;                  //已经上传大小情况 
    var tot = evt.total;                      //附件总大小 
    var per = Math.floor(100*loaded/tot);     //已经上传的百分比  
	var percentVal = per + '%';
	jQuery('.preview-info .title').hide();
	load_progress.show();
	bar.width(percentVal);
	bar.css("background-color","#ED910E");
	var percenthtml = 'Uploading: ' + percentVal;
	if(per==100){
        percenthtml = 'Upload completed. Calculating...';
    }
    percent.html(percenthtml);
}



// 点击文件名渲染stl模型
jQuery('body').on('click', '.preview-link', function(e) {
	e.preventDefault();

	jQuery('.preview-info').hide();
	jQuery('#viewer').empty();

	var stlview = new STLView("viewer", jQuery(this).attr('data-link'));
	stlview.initScene();
});




// Leadtime options Price mapping 交期选择后更新价格
jQuery(document).on('change', 'input[name="printing-lead-time-option"]', function() {
	var $this = jQuery(this);
	var leadtime = jQuery(this).val();
	var leadtimetxt = jQuery(this).text();
	//console.log('leadtime', leadtime)
	//console.log('leadtimetxt', leadtimetxt)
	var parent = jQuery(this).parents('.file-box');
	var box = jQuery(this).closest('.box-material');
	var box_id = box.attr('id');
	var get_file = parent.attr('data-file');
	var volume = parent.attr('data-volume');
	var file_unit = parent.attr('data-file_unit');
	if (file_unit == "inch") {
		// inch change to mm
		volume = parseFloat(volume)/25.4;
	}

	var density = $this.parents('div.box-material').attr('data-density');
	var quantity = $this.closest('.file-box').find('input.plus-minus').val();
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
});


// Clear All- STL files 清除所有的文件
jQuery(document).on('click', '.clear-all-button', function() {
	//把模型预览界面初始化
	jQuery('#viewer').empty();
	jQuery('.preview-info').show();
	jQuery('#progress').hide();
	//把文件显示界面初始化
	jQuery('.flies-cover').empty();
	jQuery('#total_files').html('--');
	jQuery('#total_capacity').html('--');

	//清除文件的cookie
	localStorage.removeItem('session_files');
	// 文件信息初始化
	jQuery('.file-info-dimensions').text(0);
	jQuery('.file-info-volume').text(0);
	jQuery('.file-info-surface').text(0);
	// 初始化报价
	enter_data_files();
});

// 蒙层框的操作 点击关闭和灰色蒙层区域，关闭蒙层框
jQuery('body').on('click', '.modal-dialog, .close-modal', function() {
	jQuery('#alertToUploadFile').hide();
});
// 点击蒙层的内容区域，阻止蒙层框关闭
jQuery('body').on('click', '.modal-content', function(e) {
	e.stopPropagation();
	return;
});
// 点击click字体，触发上传文件
jQuery('body').on('click', '#uploadCADFile', function(e) {
	jQuery('#alertToUploadFile').hide();
	jQuery('input[type="file"]').trigger("click");
});

// 全屏
// jQuery(document).on('click', '.full-screen', function() {
// 	var screen_height = window.innerHeight;
// 	//console.log('screen_height', screen_height)
// 	var aHeight = screen_height - 316;
// 	var bHeight = aHeight + 'px';
// 	jQuery('.materials-select-outer-container').css({
// 		position: 'fixed',
// 		top: '0px',
// 		left: '0px',
// 		right: '0px',
// 		bottom: '0px',
// 		width: '100%',
// 		marginLeft: '0',
// 		marginRight: '0'
// 	});
// 	jQuery('.materials-select-inner-container').css('height', bHeight);
// 	jQuery('.cnc-materials-select-inner-container').css('height', bHeight);
// 	jQuery('.pi-materials-select-inner-container').css('height', bHeight);
// 	jQuery('.full-screen').css('display', 'none');
// 	jQuery('.minimize-screen').css('display', 'block');
// });

//迷你
// jQuery(document).on('click', '.minimize-screen', function() {
// 	jQuery('.materials-select-outer-container').css({
// 		position: 'static',
// 		top: '',
// 		left: '',
// 		right: '',
// 		bottom: '',
// 		width: '100vw',
// 		marginLeft: 'calc( -50vw + 50%)',
// 		marginRight: 'calc( -50vw + 50%)'
// 	});
// 	jQuery('.materials-select-inner-container').css('height', '800px');
// 	jQuery('.cnc-materials-select-inner-container').css('height', '800px');
// 	jQuery('.pi-materials-select-inner-container').css('height', '800px');
// 	jQuery('.full-screen').css('display', 'block');
// 	jQuery('.minimize-screen').css('display', 'none');
// });



// 清空购物车
jQuery('body').on('click', '.material-bottom-info-total-price-label', function () {
    clear_my_cart()
	window.localStorage.removeItem('session_sku');
});

function clear_my_cart() {
    jQuery.post(myajax.url, {
        'action': 'my_empty_cart'
    }, function (data) {
        if (data != 0) {
            var jsondata = JSON.parse(data);
            //console.log('addtocartdata', jsondata);
            if (jsondata.error) {
                alert(jsondata.error);
            } else {
                if (jsondata.code == 200) {
                    // 更新材料选择部分的购物车信息
                    //console.log(jsondata.total_price)

                    jQuery('.material-bottom-info-total-price-value').html(jsondata.total_price);

                    // Trigger event so themes can refresh other areas. 更新头部的购物车信息 参考add-to-cart.js
                    jQuery(document.body).trigger('added_to_cart', [jsondata.fragment.fragments, jsondata.fragment.cart_hash]);

                }
            }
        }
    });
}


// 点击输入邮件的悬浮窗的取消
jQuery('body').on('click', '.prompt-cancel-btn', function () {
    jQuery('#exception-prompt').hide();
});
// 点击输入邮件的悬浮窗的提交
jQuery('body').on('click', '.prompt-confirm-btn', function () {
    var email = jQuery('input[name="prompt-email"]').val();
    var regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (! regex.test(email)) {
        alert('The mailbox is incorrect, please try again!');
        return false;
    }
    var message = jQuery('textarea[name="prompt-message"]').val();
    var filename = jQuery(this).attr('data-filename');
    var file_unit = jQuery(this).attr('data-file_unit');
    var material_id = jQuery(this).attr('data-material_id');
    var quantity = jQuery(this).attr('data-quantity');
    var price = jQuery(this).attr('data-price');
    var manual = jQuery(this).attr('data-manual');
    jQuery.post(myajax.url, {
        'action': 'mail_about_abnormal_price',
        'email': email,
        'message': message,
        'filename': filename,
        'file_unit': file_unit,
        'material_id': material_id,
        'quantity': quantity,
        'price': price,
        'manual': manual
    }, function (data) {
        if (data) {
            alert("Success to send the Notice!")
        } else {
            alert("Failed to send the Notice!")
        }
    });
    jQuery('#exception-prompt').hide();
});