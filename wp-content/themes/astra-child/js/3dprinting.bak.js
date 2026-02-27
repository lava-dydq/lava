jQuery(document).ready(function (jQuery) {
    // 获取后处理的价格表--test
    window.finishing_cost = [];
    jQuery.ajax({
        url: myajax.url,
        data: {
            'action': 'get_finishing_cost'
        },
        async: false,
        type: "post",
        success: function (jsondata) {
            var jsondata = JSON.parse(jsondata);
            console.log('finishing_cost', jsondata)
            finishing_cost = jsondata;
        }
    });

    // 打开页面如果有上传文件的cookies，就显示文件
    // jQuery.post(
    // 	myajax.url,
    // 	{
    // 		'action' : 'update_from_session_files'
    // 	},
    // 	function(data){
    // 		enter_data_files();
    // 		var filelen = jQuery('.flies-cover').children().length;
    // 		console.log('file',filelen);
    // 		if (filelen > 0) {
    // 			jQuery('.file-model-container').show();
    // 			jQuery('.dropBox_wrap').hide();
    // 		} else {
    // 			jQuery('.file-model-container').hide();
    // 			jQuery('.dropBox_wrap').show();
    // 		}
    // 	}
    // );
    // 打开页面如果有上传文件就显示文件
    if (!window.localStorage) {
        alert("The browser does not support localstorage, please use a later browser or change the browser.");
    } else {
        var localStorage = window.localStorage;
        var getStorage = localStorage.getItem('session_files');
        if (getStorage != null) {
            enter_data_files();
        }
    }
    var filelen = jQuery('.flies-cover').children().length;
    console.log('file', filelen);
    if (filelen > 0) {
        jQuery('.file-model-container').show();
        jQuery('.dropBox_wrap').hide();
    } else {
        jQuery('.file-model-container').hide();
        jQuery('.dropBox_wrap').show();
    }


    // 处理cookie的bug
    var str = "a:";
    var oldcookie = Cookies.get('session_files');
    console.log('oldcookie', oldcookie);
    if (oldcookie != 'undefined' && oldcookie != '' && oldcookie != null) {
        if (oldcookie.indexOf(str) != -1) {
            Cookies.remove('session_files', {path: '/'});
        }
    }

    // 文件单位的按钮改变事件
    jQuery('input[name="file_unit"]').change(function () {
        //jQuery.post(
        // 	myajax.url,
        // 	{

        // 		'action' : 'change_file_unit'
        // 	},

        // 	function(data){
        // 		var jsdata = JSON.parse(data);
        // 		console.log('jsdata', jsdata);
        // 		if (jsdata.existfile == 'yes') {
        // 			enter_data_files();
        // 		}
        // 	}
        // );
        enter_data_files();


    });

    // 点击文件名
    jQuery(document).on('click', '.file_name', function () {
        jQuery('.file_name').removeClass('active');
        jQuery(this).addClass('active');
        var file_unit = jQuery(this).attr('data-file_unit');
        var box_x = jQuery(this).attr('data-box_x');
        var box_y = jQuery(this).attr('data-box_y');
        var box_z = jQuery(this).attr('data-box_z');
        var volume = jQuery(this).attr('data-volume');
        var surface = jQuery(this).attr('data-surface_area');
        if (file_unit == "inch") {
            // inch change to mm
            box_x = 25.4 * parseFloat(box_x);
            box_y = 25.4 * parseFloat(box_y);
            box_z = 25.4 * parseFloat(box_z);
            volume = 25.4 * 25.4 * 25.4 * parseFloat(volume);
            surface = 25.4 * 25.4 * parseFloat(surface);
        }
        var dimensions = parseFloat(box_x).toFixed(2) + '*' + parseFloat(box_y).toFixed(2) + '*' + parseFloat(box_z).toFixed(2);
        jQuery('.file-info-dimensions').text(dimensions);
        jQuery('.file-info-volume').text(parseFloat(volume).toFixed(2));
        jQuery('.file-info-surface').text(parseFloat(surface).toFixed(2));
    });

    // AJAX load STL files 上传stl文件
    // 触发打开文件选择框
    jQuery('.upload-button').click(function () {
        jQuery('input[type="file"]').trigger("click");
    });

    jQuery('.upload-3d-model').click(function () {
        jQuery('input[type="file"]').trigger("click");
    });

    jQuery(document).on('click', '.file-unit-label', function () {
        jQuery(this).addClass("checked");
        jQuery(this).siblings(".file-unit-label").removeClass("checked");
    });

    /*点击打开后处理选项框*/
    jQuery(document).on('click', '.select-color', function () {
        var displayval = jQuery(this).find('.color-option-wrap').css('display');
        if (displayval == "none") {
            jQuery(this).find('.color-option-wrap').show();
            // overflow=hidden会把展开的下拉框隐藏掉
            jQuery(this).closest('.material-item-overflow').css('overflow', 'unset');
        } else {
            jQuery(this).find('.color-option-wrap').hide();
            jQuery(this).closest('.material-item-overflow').css('overflow', 'hidden');
        }
    });
    jQuery(document).on('click', '.select-finishing', function () {
        var displayval = jQuery(this).find('.finishing-option-wrap').css('display');
        if (displayval == "none") {
            jQuery(this).find('.finishing-option-wrap').show();
            jQuery(this).closest('.material-item-overflow').css('overflow', 'unset');
        } else {
            jQuery(this).find('.finishing-option-wrap').hide();
            jQuery(this).closest('.material-item-overflow').css('overflow', 'hidden');
        }
    });
    jQuery(document).on('click', '.select-lead-time', function () {
        var displayval = jQuery(this).find('.lead-time-option-wrap').css('display');
        if (displayval == "none") {
            jQuery(this).find('.lead-time-option-wrap').show();
            jQuery(this).closest('.material-item-overflow').css('overflow', 'unset');
        } else {
            jQuery(this).find('.lead-time-option-wrap').hide();
            jQuery(this).closest('.material-item-overflow').css('overflow', 'hidden');
        }
    });

    jQuery(document).on('mouseleave', '.select-color', function () {
        jQuery(this).find('.color-option-wrap').hide();
        jQuery(this).closest('.material-item-overflow').css('overflow', 'hidden');
    });
    jQuery(document).on('mouseleave', '.select-finishing', function () {
        jQuery(this).find('.finishing-option-wrap').hide();
        jQuery(this).closest('.material-item-overflow').css('overflow', 'hidden');
    });
    jQuery(document).on('mouseleave', '.select-lead-time', function () {
        jQuery(this).find('.lead-time-option-wrap').hide();
        jQuery(this).closest('.material-item-overflow').css('overflow', 'hidden');
    });


    // 点击选中某个选项
    jQuery(document).on('click', '.options-form label', function () {
        jQuery(this).siblings('label').removeClass('option-check');
        jQuery(this).addClass('option-check');
    });

    // 颜色选项点击隐藏选择框
    jQuery(document).on('change', 'input[name="printing-color-option"]', function () {
        var color = jQuery(this).val();
        jQuery(this).closest('.select-color').find('.printing-color').text(color);
        jQuery(this).closest('.color-option-wrap').hide();
        var jquery = jQuery(this).closest('.box-material');
        update_printing_color_name(jquery);
    });

    // 交期选项点击隐藏选择框
    jQuery(document).on('change', 'input[name="printing-lead-time-option"]', function () {
        var leadtime = jQuery(this).closest('.option-check').text();
        jQuery(this).closest('.select-lead-time').find('.printing-leadtime').text(leadtime);
        jQuery(this).closest('.lead-time-option-wrap').hide();
        var jquery = jQuery(this).closest('.box-material');
        update_printing_leadtime_name(jquery);
    });

    /* XIA - leadtime -- start */
    // 交期选项点击隐藏选择框
        jQuery(document).on('change', 'input[name="xia-lead-time-option"]', function () {
            var leadtime = jQuery(this).closest('.option-check').text();
            jQuery(this).closest('.select-lead-time').find('.printing-leadtime').text(leadtime);
            jQuery(this).closest('.lead-time-option-wrap').hide();
            var jquery = jQuery(this).closest('.box-material');
            update_printing_leadtime_name(jquery);
        });
    /* XIA - leadtime -- end */

    // cnc后处理点击选择
    jQuery(document).on('change', 'input[name="basic_surface_treatment"], input[name="advanced_surface_treatment"], input[name="color_surface_treatment"]', function () {
        var basic_surface_treatment = jQuery(this).closest('.finishing-option-wrap').find('input[name="basic_surface_treatment"]:checked').closest('.option-check').text();
        var advanced_surface_treatment = jQuery(this).closest('.finishing-option-wrap').find('input[name="advanced_surface_treatment"]:checked').closest('.option-check').text();
        var color_surface_treatment = jQuery(this).closest('.finishing-option-wrap').find('input[name="color_surface_treatment"]:checked').closest('.option-check').text();
        // var protective_coating = jQuery(this).closest('.finishing-option-wrap').find('input[name="protective_coating"]:checked').closest('.option-check').text();
        var text = basic_surface_treatment + ', ' + advanced_surface_treatment + ', ' + color_surface_treatment;
        // var text = surface_treatment;
        console.log('text', text)
        jQuery(this).closest('.select-finishing').find('.cnc-finish').text(text);
        var jquery = jQuery(this).closest('.cnc-box-material');
        update_cnc_finish_name(jquery);
    });

    // 注塑后处理点击选择
    jQuery(document).on('change', 'input[name="pi-surface_treatment"], input[name="pi-finishing_coating"], input[name="pi-logo_finishing"], input[name="pi-protective_coating"]', function () {
        var surface_treatment = jQuery(this).closest('.finishing-option-wrap').find('input[name="pi-surface_treatment"]:checked').closest('.option-check').text();
        var finishing_coating = jQuery(this).closest('.finishing-option-wrap').find('input[name="pi-finishing_coating"]:checked').closest('.option-check').text();
        var logo_finishing = jQuery(this).closest('.finishing-option-wrap').find('input[name="pi-logo_finishing"]:checked').closest('.option-check').text();
        var protective_coating = jQuery(this).closest('.finishing-option-wrap').find('input[name="pi-protective_coating"]:checked').closest('.option-check').text();
        var text = surface_treatment + ', ' + finishing_coating + ', ' + logo_finishing + ', ' + protective_coating;
        console.log('text', text)
        jQuery(this).closest('.select-finishing').find('.pi-finish').text(text);
        var jquery = jQuery(this).closest('.pi-box-material');
        update_pi_finish_name(jquery);
    });

    /* 拖动时触发*/
    document.addEventListener("dragstart", function (event) {
        event.preventDefault();
    });
    //在拖动p元素的同时,改变输出文本的颜色
    document.addEventListener("drag", function (event) {
        event.preventDefault();
    });
    // 当拖完p元素输出一些文本元素和重置透明度
    document.addEventListener("dragend", function (event) {
        event.preventDefault();
    });
    /* 拖动完成后触发 */
    // 当p元素完成拖动进入droptarget,改变div的边框样式
    document.addEventListener("dragenter", function (event) {
        event.preventDefault();
    });
    // 默认情况下,数据/元素不能在其他元素中被拖放。对于drop我们必须防止元素的默认处理
    document.addEventListener("dragover", function (event) {
        event.preventDefault();
    });
    // 当可拖放的p元素离开droptarget，重置div的边框样式
    document.addEventListener("dragleave", function (event) {
        event.preventDefault();
    });
    // 拖拽到虚线框中上传文件
    document.addEventListener("drop", function (event) {
        event.preventDefault();
        if (event.target.className == "drop" || event.target.id == "files_wrap") {
            var fileList = event.dataTransfer.files;
            load_progress = jQuery('#progress');
            bar = jQuery('#bar');
            percent = jQuery('#percent');

            var error = false;
            var error_msg = '';

            jQuery.each(fileList, function (i, file) {
                if (file.size > 524288000) {
                    error = true;
                    error_msg = 'Error: single file does not exceed 500M.';
                } else if (i > 9) {
                    error = true;
                    error_msg = 'Error: single can upload up to 10 files.';
                }
            });
            // console.log('file_stl',fileList);

            jQuery('#viewer').empty();
            jQuery('#model-show-container .canvas-number').remove();
            //jQuery('#files_name').empty();
            jQuery('.preview-info').show();
            jQuery('.preview-info .title').show();
            jQuery('#total_files').html('--');
            jQuery('#total_capacity').html('--');


            if (error == false) {
                jQuery('.file-model-container').show();
                jQuery('.dropBox_wrap').hide();

                var formData = new FormData();
                formData.append('action', "upload_stl_file");//存入formData对象
                jQuery.each(fileList, function (i, file) {
                    formData.append('files_stl[]', file);//存入formData对象
                });
                // console.log('formData',formData);
                // console.log('files_stl',formData.getAll("files_stl[]"));
                jQuery.ajax({
                    type: "post",
                    url: myajax.url,
                    async: true,
                    data: formData,
                    contentType: false,
                    processData: false,
                    xhr: function () {
                        var xhrObj = jQuery.ajaxSettings.xhr();
                        if (onprogress && xhrObj.upload) {
                            xhrObj.upload.addEventListener("progress", onprogress, false);
                            return xhrObj;
                        }
                    },
                    success: function (data) {
                        console.log('success', JSON.parse(data));
                        load_progress.hide();

                        if (data != 0) {
                            var data = JSON.parse(data);
                            jQuery.each(data.files, function (i, file) {
                                urlToBlob(file, blogData);
                            });
                            jQuery.post(
                                myajax.url, {
                                    'action': 'mail_to_sale',
                                    'file_name': data.files,
                                },
                                function () {
                                }
                            );

                        } else {
                            alert('file upload error! Please upload the files again!');
                            window.history.go(0);
                        }
                    }
                });
            } else {
                if (!error_msg)
                    error_msg = 'Error STL File';

                jQuery(this).val('');
                alert(error_msg);
            }

        }
    });

    jQuery('.pi-materials-select-inner-container').css('overflow-x', 'hidden');

    //处理价格颜色
    if(jQuery('.materials-select-outer-container-header bdi').text() != 'US$0.00'){
        jQuery(document.body).trigger('added_to_cart');
    }
});

function onprogress(evt) {
    var load_progress = jQuery('#progress');
    var bar = jQuery('#bar');
    var percent = jQuery('#percent');
    var loaded = evt.loaded;                  //已经上传大小情况
    var tot = evt.total;                      //附件总大小
    var per = Math.floor(100 * loaded / tot);     //已经上传的百分比
    var percentVal = per + '%';
    jQuery('.preview-info .title').hide();
    load_progress.show();
    bar.width(percentVal);
    bar.css("background-color", "#ED910E");
    var percenthtml = 'Uploading: ' + percentVal;
    if (per == 100) {
        percenthtml = 'Upload completed. Calculating...';
    }
    percent.html(percenthtml);
}

// render model, show files, calculate price 渲染模型，显示文件，计算价格
function enter_data_files() {
	// // 获取cookie的文件数据
	// var oldcookie = Cookies.get('session_files');
	// if (!oldcookie || oldcookie == 'undefined' || oldcookie == '[]' || oldcookie == 'a:0:{}' ) {
	// 	var cookie = [];
	// }else{
	// 	var cookie = JSON.parse(Cookies.get('session_files'));
	// }

	// var filesData = cookie;
	// 获取 localStorage 的文件数据
	if(!window.localStorage){
    	alert("The browser does not support localstorage, please use a later browser or change the browser.");
	}else{
	    var localStorage = window.localStorage;
	    var getStorage = localStorage.getItem('session_files');
	    if( getStorage  != null ){
	        var jsonStorage = JSON.parse(getStorage);
	    } else {
	    	var jsonStorage = [];
	    }
	}
	var filesData = jsonStorage;
	console.log('filesData',filesData);

	var file_unit = jQuery('input[name="file_unit"]:checked').val();
	if (typeof(file_unit) == 'undefined') {
		file_unit = 'mm';
	}
	var files_volumes = new Array();

	jQuery('.flies-cover').empty();

	var total_volume = 0;
	var total_box_volume = 0;
	//var total_weight   = 0;
	//var total_density  = 0;
	var total_area = 0;
	//var uploaded_files = '';
	var class_link = '';
	var count_link = 0;
	//var weight_calculation = 0; 
	var price_calculation = 0;
	var leadtime_val = 1;

	//jQuery('#model-show-container .canvas-number').length == 1 防止上传多个文件时重复渲染文件
	jQuery('#model-show-container').append('<div class="canvas-number"></div>');
	if (jQuery('#model-show-container .canvas-number').length == 1) {
		jQuery.each(filesData, function(i, file_item) {
			if (i==0) {
				var stlview = new STLView("viewer", file_item['url']);
				stlview.initScene();
			}
		})
	}

	jQuery.each(filesData, function(i, file) {
		if(typeof(file['volume'])=="undefined") file['volume']=0;
		if(typeof(file['surface_area'])=="undefined") file['surface_area']=0;
		if(typeof(file['box_volume'])=="undefined") file['box_volume']=0;
		total_volume = total_volume + parseFloat(file['volume']);
		total_area = total_area + parseFloat(file['surface_area']);
		total_box_volume = total_box_volume + parseFloat(file['box_volume']);
		
		class_link = '';
		if (count_link == 0) {
			class_link = ' active';
			var box_x = file['box_xyz'].x;
			var box_y = file['box_xyz'].y;
			var box_z = file['box_xyz'].z;
			var volume = file['volume'];
			var surface_area = file['surface_area'];
			// 文件的尺寸信息
			if (file_unit == "inch") {
				// inch change to mm
				box_x = 25.4 * parseFloat(box_x);
				box_y = 25.4 * parseFloat(box_y);
				box_z = 25.4 * parseFloat(box_z);
				volume = 25.4 * 25.4 * 25.4 * parseFloat(volume);
				surface_area = 25.4 * 25.4 * parseFloat(surface_area);
			}
			var dimensions = parseFloat(box_x).toFixed(2) + '*' + parseFloat(box_y).toFixed(2) + '*' + parseFloat(box_z).toFixed(2);
			jQuery('.file-info-dimensions').text(dimensions);
			jQuery('.file-info-volume').text(parseFloat(volume).toFixed(2));
			jQuery('.file-info-surface').text(parseFloat(surface_area).toFixed(2));
		}
		// alert(file['volume']);
		//files_volumes[count_link] = file['volume'].toFixed(2) * 1.160 * 0.001;
		count_link++;

		jQuery('.flies-cover').append('<div class="file_name ' + class_link + '" data-file_unit="' + file_unit + '" data-volume="' + parseFloat(file['volume']) +
			'" data-surface_area="' + parseFloat(file['surface_area']) + '" data-box_volume="' + parseFloat(file['box_volume']) + 
			'" data-box_x="' + parseFloat(file['box_xyz'].x) + '" data-box_y="' + parseFloat(file['box_xyz'].y) + 
			'" data-box_z="' + parseFloat(file['box_xyz'].z) + '"><div data-link="'+ file['url'] + '" class="preview-link ' + class_link + '">' + 
			file['filename'] + '</div> <div href="#" class="delete-link del_stl" data-file="' + file['filename'] + 
			'"><svg t="1631517961861" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9709" width="20" height="20"><path d="M584.157867 532.821333l120.695466-120.695466a51.2 51.2 0 1 0-72.430933-72.362667L511.726933 460.3904 391.031467 339.7632a51.2 51.2 0 1 0-72.362667 72.362667l120.695467 120.695466-120.695467 120.695467a51.2 51.2 0 0 0 72.362667 72.362667l120.695466-120.6272 120.695467 120.695466a51.2 51.2 0 1 0 72.362667-72.430933L584.226133 532.821333z m-72.362667 477.866667a477.866667 477.866667 0 1 1 0-955.733333 477.866667 477.866667 0 0 1 0 955.733333z" p-id="9710" fill="#888888"></path></svg></div></div>');
	});
	//jQuery('#uploaded_files').val(uploaded_files);


	jQuery('#total_files').html(Object.keys(filesData).length);
	if (file_unit == "inch") {
		// inch change to mm
		total_volume = 25.4 * 25.4 * 25.4 * parseFloat(total_volume);
	}

	// Add Files in Table
	jQuery('.box-material').each(function(i) {
		var price_calc = [];
		var price = jQuery(this).attr('data-price_item');
		var is_painting = jQuery(this).attr('data-is_painting');
		var is_screen = jQuery(this).attr('data-is_screen');
		var box = jQuery(this).find('.files-box');
		var Unitprice = jQuery(this).attr('data-unit_price');
		var ProductID = jQuery(this).attr('id');
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
		//price_calc['volume'] = total_volume;
		price_calc['density'] = density_val;
		price_calc['quantity'] = 1;
		price_calc['unit_price'] = Unitprice;
		price_calc['lead_time'] = leadtime_val;
		// Price formula fields
		//box.css('border', '2px solid pink');
		//console.log(box);
		box.empty();
		
		var color_options = jQuery(this).attr('data-color-options');
		var color_option_html = '';
		if (color_options != '') {
			var color_options_arr = color_options.split(',');
			color_option_html += '<form class="options-form">';
			for (var i = 0; i < color_options_arr.length; i++) {
				var coption = color_options_arr[i].replace(/(^\s*)|(\s*$)/g, "");//去掉两边空格符
				if (i == 0) {
					var default_color = coption;
					color_option_html += '<label class="option-check"><input type="radio" hidden="true" name="printing-color-option" checked="checked" value="'+coption+'">'+coption+'</label>';
				} else {
					color_option_html += '<label><input type="radio" hidden="true" name="printing-color-option" value="'+coption+'">'+coption+'</label>';
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
				var ltoption = lead_options_arr[i].replace(/(^\s*)|(\s*$)/g, "");//去掉两边空格符
				var lead_opt = ltoption.split(':');
				if (i == 0) {
					var default_leadtime = lead_opt[0];
					lead_time_option_html += '<label class="option-check"><input type="radio" hidden="true" name="printing-lead-time-option" checked="checked" value="'+lead_opt[1]+'">'+lead_opt[0]+'</label>';
				} else {
					lead_time_option_html += '<label><input type="radio" hidden="true" name="printing-lead-time-option" value="'+lead_opt[1]+'">'+lead_opt[0]+'</label>';
				}
			}
			lead_time_option_html += '</form>';
		}

		var html = '';
		var cnt = 0;
		var mytotal = 0;
		var price_unit;
		var totalprice = 0;
		var price_unit_array = new Array();
		jQuery.each(filesData, function(i, file) {
			var volume = file['volume'];
			if (file_unit == "inch") {
				// inch change to mm
				volume = 25.4 * 25.4 * 25.4 * parseFloat(volume);
			}
			price_calc['volume'] = volume;
			//price_calc['volume'] = file['volume'];
			price_calculation = calculate_price_with_formula(price_calc);
			price_unit = price_calculation.toFixed(2);
			mytotal = mytotal + Number(price_unit);
			price_unit_array.push(price_unit);
		});
		jQuery.each(filesData, function(i, file) {
			//* 判断是否大于最低价的逻辑
			if (mytotal < price_calc['floor_price']) {
				totalprice = Number(price_calc['floor_price']);
				price_unit = Number(totalprice / mytotal * price_unit_array[i]).toFixed(2);
			} else //*/
			{
				totalprice = mytotal;
				price_unit = price_unit_array[i];
			}

			//console.log('mytotal',mytotal);
			//console.log('totalprice',typeof(price_unit));
			html = '<div class="file-box duplicate_cols_outer" data-file="' + file['filename'] + '" data-file_unit="' + file_unit + '" quantity-item="' + price_calc['quantity'] + '" price-item="' + price_unit_array[i] + '" data-volume="' + parseFloat(file['volume']) +
				'" data-surface_area="' + parseFloat(file['surface_area']) + '" data-box_volume="' + parseFloat(file['box_volume']) + '">' +
				'<div class="file-box-filelist">' +
					'<div class="material-file-img custom-column-width-1"><img src="https://www.3dprintingservice.cc/wp-content/uploads/woocommerce-placeholder-300x300.png" alt="default img"></div>' +
					'<div class="material-file-process custom-column-width-1"></div>' +
					'<div class="material-file-name custom-column-width-2 material-item-overflow">' +
						'<div class="preview-link" data-link="' + file['url'] + '">' + file['filename'] + '</div>' +
						'<div class="material-file-options-qty-wrap">' +
							'<div class="material-file-select-wrap">' +
								'<div class="select-options select-color">' +
									'<div><div class="printing-color">'+ default_color +'</div><span class="color-down"><i class="fa-solid fa-angle-down"></i></span></span></div>' +
									'<div class="option-wrap color-option-wrap" style="display: none;">' + color_option_html + '</div>' +
								'</div>' +
								'<div class="select-options select-lead-time">' +
									'<div><div class="printing-leadtime">' + default_leadtime + '</div><span class="lead-time-down"><i class="fa-solid fa-angle-down"></i></span></span></div>' +
									'<div class="option-wrap lead-time-option-wrap" style="display: none;">' + lead_time_option_html + '</div>' +
								'</div>' +
							'</div>' +
							'<div class="col-quantity col_float_left">' +
								'<div class="bt-minus"><i class="fa-solid fa-circle-minus"></i></div>' +
									'<input type="text" class="plus-minus input-text qty text" name="quantity" value="1" maxlength="10">' +
								'<div class="bt-plus"><i class="fa-solid fa-circle-plus"></i></div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="col-price col_float_left custom-column-width-3">US$ <span >' + parseFloat(price_unit).toFixed(2) + '</span></div>' +
					'<div class="file-ation-wrap custom-column-width-4">' +
						'<div class="printing-abnormal-alert">' +
							'<i class="fa-solid fa-bell"></i>' +
							'<div class="abnormal-alert-tips">Click to ring the bell if you find the price too high, too low, looks strange. Or any other questions! We will get back to you ASAP!</div>' +
						'</div>' +
						'<div class="dublicate-delete-wrap">' +
							'<div class="dublicateclick" title="Click To Duplicate" data-click-id="' + ProductID + '"><i class="fa-solid fa-copy"></i></div>' +
							'<div class="remove_form remove_icon" title="Click To Remove"><i class="fa-solid fa-trash-can"></i></div>' +
						'</div>' +
					'</div>' +
				'</div></div>';
			cnt++;
			box.append(html);

		});


		jQuery(this).find('.material-price').html(totalprice.toFixed(2));
		//jQuery(this).removeClass('disabled');
		//jQuery(this).find('.addtocart .button').prop('disabled', false);
		if (i == 0){
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
        update_printing_files_all_qty(jquery);
	});

	/*把文件附加到每个cnc列表里*/
	jQuery('.cnc-box-material').each(function(i) {
		var cnc_args = [];
		var cnc_material_id = jQuery(this).attr('data-id');
		var cnc_material = jQuery(this).attr('data-material');
		var cnc_material_id_tag = jQuery(this).attr('id');
		// cnc_args['quantity'] = 1;
		// cnc_args['r_coefficient_1'] = jQuery(this).attr('data-r_coefficient_1');
		// cnc_args['r_coefficient_2'] = jQuery(this).attr('data-r_coefficient_2');
		// cnc_args['m_coefficient'] = jQuery(this).attr('data-m_coefficient');
		// cnc_args['f_coefficient'] = jQuery(this).attr('data-f_coefficient');
		// cnc_args['rmf_coefficient_1'] = jQuery(this).attr('data-rmf_coefficient_1');
		// cnc_args['rmf_coefficient_2'] = jQuery(this).attr('data-rmf_coefficient_2');
		// cnc_args['rmf_coefficient_3'] = jQuery(this).attr('data-rmf_coefficient_3');

		// var surface_treatment = jQuery(this).attr('data-surface_treatment');
		// var finishing_coating = jQuery(this).attr('data-finishingcoating');
		// var logo_finishing = jQuery(this).attr('data-logopartial_finishing');
		// var protective_coating = jQuery(this).attr('data-protective_coating');

		// var surface_treatment_html = '';
		// var finishing_coating_html = '';
		// var logo_finishing_html = '';
		// var protective_coating_html = '';

		// if (surface_treatment != '') {
		// 	var surface_treatment_arr = surface_treatment.split(",");
		// 	surface_treatment_html += '<div class="surface_treatment_head finishing_option_head">Surface Treatment</div><form class="options-form">';
		// 	for (var i = 0; i < surface_treatment_arr.length; i++) {
		// 		var finishing_key = surface_treatment_arr[i].replace(/(^\s*)|(\s*$)/g, "");//去掉两边空格符
		// 		if ( i == 0 ) {
		// 			var default_finish = finishing_cost[finishing_key]['name'];
		// 			surface_treatment_html += '<label class="option-check"><input type="radio" hidden="true" name="surface_treatment" value="'+finishing_key+'" checked="checked">'+finishing_cost[finishing_key]['name']+'</label>';
		// 		}else{
		// 			surface_treatment_html += '<label><input type="radio" hidden="true" name="surface_treatment" value="'+finishing_key+'">'+finishing_cost[finishing_key]['name']+'</label>';
		// 		}
		// 	}
		// 	surface_treatment_html += '</form>';
		// }

		// if (finishing_coating != '') {
		// 	var finishing_coating_arr = finishing_coating.split(",");
		// 	finishing_coating_html += '<div class="finishing_coating_head finishing_option_head">Finishing/Coating</div><form class="options-form">';
		// 	for (var i = 0; i < finishing_coating_arr.length; i++) {
		// 		var finishing_key = finishing_coating_arr[i].replace(/(^\s*)|(\s*$)/g, "");//去掉两边空格符
		// 		if ( i == 0 ) {
		// 			finishing_coating_html += '<label class="option-check"><input type="radio" hidden="true" name="finishing_coating" value="'+finishing_key+'" checked="checked">'+finishing_cost[finishing_key]['name']+'</label>';
		// 		}else{
		// 			finishing_coating_html += '<label><input type="radio" hidden="true" name="finishing_coating" value="'+finishing_key+'">'+finishing_cost[finishing_key]['name']+'</label>';
		// 		}
		// 	}
		// 	finishing_coating_html += '</form>';
		// }

		// if (logo_finishing != '') {
		// 	var logo_finishing_arr = logo_finishing.split(",");
		// 	logo_finishing_html += '<div class="logo_finishing_head finishing_option_head">Logo/Partial Mark Finishing</div><form class="options-form">';
		// 	for (var i = 0; i < logo_finishing_arr.length; i++) {
		// 		var finishing_key = logo_finishing_arr[i].replace(/(^\s*)|(\s*$)/g, "");//去掉两边空格符
		// 		if ( i == 0 ) {
		// 			logo_finishing_html += '<label class="option-check"><input type="radio" hidden="true" name="logo_finishing" value="'+finishing_key+'" checked="checked">'+finishing_cost[finishing_key]['name']+'</label>';
		// 		}else{
		// 			logo_finishing_html += '<label><input type="radio" hidden="true" name="logo_finishing" value="'+finishing_key+'">'+finishing_cost[finishing_key]['name']+'</label>';
		// 		}
		// 	}
		// 	logo_finishing_html += '</form>';
		// }

		// if (protective_coating != '') {
		// 	var protective_coating_arr = protective_coating.split(",");
		// 	protective_coating_html += '<div class="protective_coating_head finishing_option_head">Protective Coating</div><form class="options-form">';
		// 	for (var i = 0; i < protective_coating_arr.length; i++) {
		// 		var finishing_key = protective_coating_arr[i].replace(/(^\s*)|(\s*$)/g, "");//去掉两边空格符
		// 		if ( i == 0 ) {
		// 			protective_coating_html += '<label class="option-check"><input type="radio" hidden="true" name="protective_coating" value="'+finishing_key+'" checked="checked">'+finishing_cost[finishing_key]['name']+'</label>';
		// 		}else{
		// 			protective_coating_html += '<label><input type="radio" hidden="true" name="protective_coating" value="'+finishing_key+'">'+finishing_cost[finishing_key]['name']+'</label>';
		// 		}
		// 	}
		// 	protective_coating_html += '</form>';
		// }

		// var finishing_html = surface_treatment_html + finishing_coating_html + logo_finishing_html + protective_coating_html;
		// var finishing_html = surface_treatment_html;

		// 表面基础处理选择
		var basic_surface_treatment_html = '';

		var basic_surface_treatment_arr = [1,2,3,4,5,6];
		basic_surface_treatment_html += '<div class="basic_surface_treatment_head finishing_option_head">Basic Surface Treatment</div><form class="options-form">';
		for (var i = 0; i < basic_surface_treatment_arr.length; i++) {
			var finishing_key = basic_surface_treatment_arr[i];
			if ( i == 0 ) {
				var default_finish = finishing_cost[finishing_key]['name'];
				basic_surface_treatment_html += '<label class="option-check"><input type="radio" hidden="true" name="basic_surface_treatment" value="'+finishing_key+'" checked="checked">'+finishing_cost[finishing_key]['name']+'</label>';
			}else{
				basic_surface_treatment_html += '<label><input type="radio" hidden="true" name="basic_surface_treatment" value="'+finishing_key+'">'+finishing_cost[finishing_key]['name']+'</label>';
			}
		}
		basic_surface_treatment_html += '</form>';

		// 表面高级处理选择
		var advanced_surface_treatment_html = '';

		var advanced_surface_treatment_arr = [0,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
		advanced_surface_treatment_html += '<div class="advanced_surface_treatment_head finishing_option_head">Advanced Surface Treatment</div><form class="options-form">';
		for (var i = 0; i < advanced_surface_treatment_arr.length; i++) {
			var finishing_key = advanced_surface_treatment_arr[i];
			if ( i == 0 ) {
				advanced_surface_treatment_html += '<label class="option-check"><input type="radio" hidden="true" name="advanced_surface_treatment" value="'+finishing_key+'" checked="checked">'+finishing_cost[finishing_key]['name']+'</label>';
			}else{
				advanced_surface_treatment_html += '<label><input type="radio" hidden="true" name="advanced_surface_treatment" value="'+finishing_key+'">'+finishing_cost[finishing_key]['name']+'</label>';
			}
		}
		advanced_surface_treatment_html += '</form>';

		// 颜色选择
		var color_surface_treatment_html = '';

		var color_surface_treatment_arr = [26,27,28,29,30];
		color_surface_treatment_html += '<div class="color_head finishing_option_head">Color Surface Treatment</div><form class="options-form">';
		for (var i = 0; i < color_surface_treatment_arr.length; i++) {
			var finishing_key = color_surface_treatment_arr[i];
			if ( i == 0 ) {
				color_surface_treatment_html += '<label class="option-check"><input type="radio" hidden="true" name="color_surface_treatment" value="'+finishing_key+'" checked="checked">'+finishing_cost[finishing_key]['name']+'</label>';
			}else{
				color_surface_treatment_html += '<label><input type="radio" hidden="true" name="color_surface_treatment" value="'+finishing_key+'">'+finishing_cost[finishing_key]['name']+'</label>';
			}
		}
		color_surface_treatment_html += '</form>';

		var finishing_html = basic_surface_treatment_html + advanced_surface_treatment_html + color_surface_treatment_html;

		var lead_time_option = jQuery(this).attr('data-lead_time_option');
		var lead_time_option_html = '';
		if (lead_time_option != '') {
			var lead_time_option_arr = lead_time_option.split(";");
			lead_time_option_html += '<form class="options-form">';
			for (var i = 0; i < lead_time_option_arr.length; i++) {
				var ltoption = lead_time_option_arr[i].replace(/(^\s*)|(\s*$)/g, "");//去掉两边空格符
				if (i == 0) {
					lead_time_option_html += '<label class="option-check"><input type="radio" hidden="true" name="cnc-lead-time-option" checked="checked" value="'+ltoption+'">'+ltoption+'</label>';
				} else {
					lead_time_option_html += '<label><input type="radio" hidden="true" name="cnc-lead-time-option" value="'+ltoption+'">'+ltoption+'</label>';
				}
			}
			lead_time_option_html += '</form>';
		}

		var cnc_container = jQuery(this).find(".cnc-files-container");

		cnc_container.empty();

		var cnc_file_total_price = 0;

		jQuery.each(filesData, function(i, file) {
			if (typeof(file['curved_surface']) == 'undefined') {
				file['curved_surface'] = 0;
			}
			if (typeof(file['quote']) == 'undefined') {
				file['quote'] = '';
			}
			var box_x = file['box_xyz'].x;
			var box_y = file['box_xyz'].y;
			var box_z = file['box_xyz'].z;
			var volume = file['volume'];
			var surface_area = file['surface_area'];
			var curved_surface = file['curved_surface'];
			var quoteData = file['quote'];
			console.log('quoteData',quoteData);
			if (!quoteData) {
				return true; //跳过本次循环
			}


			// if (file_unit == "inch") {
			// 	// inch change to mm
			// 	box_x = 25.4 * parseFloat(box_x);
			// 	box_y = 25.4 * parseFloat(box_y);
			// 	box_z = 25.4 * parseFloat(box_z);
			// 	volume = 25.4 * 25.4 * 25.4 * volume;
			// 	surface_area = 25.4 * 25.4 * surface_area;
			// 	curved_surface = 25.4 * 25.4 * curved_surface;
			// }
			// cnc_args['len'] = box_x;
			// cnc_args['width'] = box_y;
			// cnc_args['thickness'] = box_z;
			// cnc_args['surface_treatment'] = 1;
			// cnc_args['finishing_coating'] = 0;
			// cnc_args['logo_finishing'] = 0;
			// cnc_args['protective_coating'] = 0;

			// var file_cnc_price = calculate_cnc_price_with_formula(cnc_args);
			// file_one_cnc_price： cnc一件的价格
			// var cnc_q = new Quote(parseFloat(volume),parseFloat(surface_area), parseFloat(curved_surface), parseFloat(box_x),parseFloat(box_y),parseFloat(box_z), cnc_material);
			// var file_one_cnc_price = cnc_q.cnc();
			var file_one_cnc_price = quoteData['CNC']['Prices'][cnc_material]/6.5;
			var file_cnc_price = file_one_cnc_price * 1;

			cnc_file_total_price += file_cnc_price;

			var cnchtml = '<div class="cnc-file-wrap duplicate_cnc-files-cols_outer" data-file="' + file['filename'] + '" data-file_unit="' + file_unit + '" data-volume="' + parseFloat(file['volume']) +
			'" data-surface_area="' + parseFloat(file['surface_area']) + '" data-curved_surface="' + parseFloat(file['curved_surface']) + '" data-box_volume="' + parseFloat(file['box_volume']) + '" data-box_x="' + parseFloat(file['box_xyz'].x) +
			'" data-box_y="' + parseFloat(file['box_xyz'].y) + '" data-box_z="' + parseFloat(file['box_xyz'].z) + '" data-one_price="' + parseFloat(file_one_cnc_price) + '">';
			cnchtml += '<div class="cnc-file-wrap-filelist">' +
							'<div class="material-file-img custom-cnc-column-width-1"><img src="https://www.3dprintingservice.cc/wp-content/uploads/woocommerce-placeholder-300x300.png" alt="default img"></div>' +
							'<div class="cnc-material-file-name custom-cnc-column-width-2 material-item-overflow">' +
								'<div class="preview-link" data-link="' + file['url'] + '">' + file['filename'] + '</div>' +
								'<div class="cnc-material-file-options-qty-wrap">'+
									'<div class="cnc-material-file-select-wrap">'+
										'<div class="select-options select-finishing">'+
											'<div><div class="cnc-finish">'+ default_finish +'</div><span class="finishing-down"><i class="fa-solid fa-angle-down"></i></span></div>' +
											'<div class="option-wrap finishing-option-wrap cnc-finishing-option-wrap" style="display: none;">'+ finishing_html + '</div>' +
										'</div>'+
										'<div class="select-options select-lead-time" style="display:none;">' +
											'<div><span>Lead Time</span><span class="lead-time-down"><i class="fa-solid fa-angle-down"></i></span></span></div>' +
											'<div class="option-wrap lead-time-option-wrap" style="display: none;">' + lead_time_option_html + '</div>' +
										'</div>' +
									'</div>' +
									'<div class="cnc-file-quantity-wrap">' +
										'<div class="cnc-bt-minus"><i class="fa-solid fa-circle-minus"></i></div>' +
										'<input type="text" class="cnc-file-quantity" name="cnc-file-quantity" value="1" maxlength="10">' +
										'<div class="cnc-bt-plus"><i class="fa-solid fa-circle-plus"></i></div>' +
									'</div>'+
								'</div>'+
							'</div>'+
							'<div class="cnc-flie-price-wrap custom-cnc-column-width-3">US$ <span class="cnc-flie-price">'+Number(file_cnc_price).toFixed(2)+'</span></div>' +
							'<div class="file-ation-wrap custom-cnc-column-width-4">' +
								'<div class="cnc-abnormal-alert">' +
									'<i class="fa-solid fa-bell"></i>' +
									'<div class="abnormal-alert-tips">Click to ring the bell if you find the price too high, too low, looks strange. Or any other questions! We will get back to you ASAP!</div>' +
								'</div>' +
								'<div class="cnc-file-dublicate-delete-wrap">' +
									'<div class="cnc-file-dublicateclick" title="Click To Duplicate" data-click-id="'+ cnc_material_id_tag +'"><i class="fa-solid fa-copy"></i></div>' +
									'<div class="cnc-file-remove" title="Click To Remove"><i class="fa-solid fa-trash-can"></i></div>' +
								'</div>' +
							'</div>' +
						'</div>';
			cnc_container.append(cnchtml);

		});
		// 更新每个cnc材料的价格
		jQuery(this).find('.cnc-material-price').html(Number(cnc_file_total_price).toFixed(2));
		// 更新每个cnc材料的后处理名称
		// 如果下面零件的选项都一致，是同样的，就显示那个同样的内容；
        // 如果不一致，则显示"see details below"
        var jquery = jQuery(this);
        update_cnc_finish_name(jquery);
        // 更新每个cnc材料的总数量
        var jquery = jQuery(this);
        update_cnc_files_all_qty(jquery);
	});

	/*把文件附加到每个 Plastic Injection Molding 列表里*/
	jQuery('.pi-box-material').each(function(i) {
		var pi_args = [];
		var pi_material_id = jQuery(this).attr('data-id');
		var pi_material_id_tag = jQuery(this).attr('id');
		pi_args['quantity'] = 0;
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

		if (surface_treatment != '') {
			// var surface_treatment_arr = surface_treatment.split(",");
			var surface_treatment_arr = [1,2,3,4,5,6];
			surface_treatment_html += '<div class="surface_treatment_head finishing_option_head">Surface Treatment</div><form class="options-form">';
			for (var i = 0; i < surface_treatment_arr.length; i++) {
				var finishing_key = surface_treatment_arr[i];
				if ( i == 0 ) {
					var default_finish = finishing_cost[finishing_key]['name'];
					surface_treatment_html += '<label class="option-check"><input type="radio" hidden="true" name="pi-surface_treatment" value="'+finishing_key+'" checked="checked">'+finishing_cost[finishing_key]['name']+'</label>';
				}else{
					surface_treatment_html += '<label><input type="radio" hidden="true" name="pi-surface_treatment" value="'+finishing_key+'">'+finishing_cost[finishing_key]['name']+'</label>';
				}
			}
			surface_treatment_html += '</form>';
		}

		if (finishing_coating != '') {
			// var finishing_coating_arr = finishing_coating.split(",");
			var finishing_coating_arr = [0,7,8,9,10,11,12,13,14,15,16,17];
			finishing_coating_html += '<div class="finishing_coating_head finishing_option_head">Finishing/Coating</div><form class="options-form">';
			for (var i = 0; i < finishing_coating_arr.length; i++) {
				var finishing_key = finishing_coating_arr[i];
				if ( i == 0 ) {
					finishing_coating_html += '<label class="option-check"><input type="radio" hidden="true" name="pi-finishing_coating" value="'+finishing_key+'" checked="checked">'+finishing_cost[finishing_key]['name']+'</label>';
				}else{
					finishing_coating_html += '<label><input type="radio" hidden="true" name="pi-finishing_coating" value="'+finishing_key+'">'+finishing_cost[finishing_key]['name']+'</label>';
				}
			}
			finishing_coating_html += '</form>';
		}

		if (logo_finishing != '') {
			// var logo_finishing_arr = logo_finishing.split(",");
			var logo_finishing_arr = [0,18,19,20,21,22,23,24];
			logo_finishing_html += '<div class="logo_finishing_head finishing_option_head">Logo/Partial Mark Finishing</div><form class="options-form">';
			for (var i = 0; i < logo_finishing_arr.length; i++) {
				var finishing_key = logo_finishing_arr[i];
				if ( i == 0 ) {
					logo_finishing_html += '<label class="option-check"><input type="radio" hidden="true" name="pi-logo_finishing" value="'+finishing_key+'" checked="checked">'+finishing_cost[finishing_key]['name']+'</label>';
				}else{
					logo_finishing_html += '<label><input type="radio" hidden="true" name="pi-logo_finishing" value="'+finishing_key+'">'+finishing_cost[finishing_key]['name']+'</label>';
				}
			}
			logo_finishing_html += '</form>';
		}

		if (protective_coating != '') {
			var protective_coating_arr = protective_coating.split(",");
			var protective_coating_arr = [0,25];
			protective_coating_html += '<div class="protective_coating_head finishing_option_head">Protective Coating</div><form class="options-form">';
			for (var i = 0; i < protective_coating_arr.length; i++) {
				var finishing_key = protective_coating_arr[i];
				if ( i == 0 ) {
					protective_coating_html += '<label class="option-check"><input type="radio" hidden="true" name="pi-protective_coating" value="'+finishing_key+'" checked="checked">'+finishing_cost[finishing_key]['name']+'</label>';
				}else{
					protective_coating_html += '<label><input type="radio" hidden="true" name="pi-protective_coating" value="'+finishing_key+'">'+finishing_cost[finishing_key]['name']+'</label>';
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
				var ltoption = lead_time_option_arr[i].replace(/(^\s*)|(\s*$)/g, "");//去掉两边空格符
				if (i == 0) {
					lead_time_option_html += '<label class="option-check"><input type="radio" hidden="true" name="pi-lead-time-option" checked="checked" value="'+ltoption+'">'+ltoption+'</label>';
				} else {
					lead_time_option_html += '<label><input type="radio" hidden="true" name="pi-lead-time-option" value="'+ltoption+'">'+ltoption+'</label>';
				}
			}
			lead_time_option_html += '</form>';
		}

		var pi_container = jQuery(this).find(".pi-files-container");

		pi_container.empty();

		var pi_file_total_price = 0;

		jQuery.each(filesData, function(i, file) {
			var box_x = file['box_xyz'].x;
			var box_y = file['box_xyz'].y;
			var box_z = file['box_xyz'].z;
			if (file_unit == "inch") {
				// inch change to mm
				box_x = 25.4 * parseFloat(box_x);
				box_y = 25.4 * parseFloat(box_y);
				box_z = 25.4 * parseFloat(box_z);
			}
			pi_args['len'] = box_x;
			pi_args['width'] = box_y;
			pi_args['thickness'] = box_z;
			pi_args['surface_treatment'] = 1;
			pi_args['finishing_coating'] = 0;
			pi_args['logo_finishing'] = 0;
			pi_args['protective_coating'] = 0;

			var part_price = calculate_plastic_injection_part_price_with_formula(pi_args);
			var mould_cost = calculate_plastic_injection_mould_price_with_formula(pi_args);
			var file_pi_price = calculate_plastic_injection_price_with_formula(pi_args);

			pi_file_total_price += file_pi_price;

			var pihtml = '<div class="pi-file-wrap duplicate_pi-files-cols_outer" data-file="' + file['filename'] + '" data-file_unit="' + file_unit + '" data-volume="' + parseFloat(file['volume']) +
			'" data-surface_area="' + parseFloat(file['surface_area']) + '" data-box_volume="' + parseFloat(file['box_volume']) + '" data-box_x="' + parseFloat(file['box_xyz'].x) +
			'" data-box_y="' + parseFloat(file['box_xyz'].y) + '" data-box_z="' + parseFloat(file['box_xyz'].z) + '">';
			pihtml += '<div class="pi-file-wrap-filelist">' +
						'<div class="material-file-img custom-pi-column-width-1"><img src="https://www.3dprintingservice.cc/wp-content/uploads/woocommerce-placeholder-300x300.png" alt="default img"></div>' +
						'<div class="pi-material-file-name custom-pi-column-width-2 material-item-overflow">' +
							'<div class="preview-link" data-link="' + file['url'] + '">' + file['filename'] + '</div>' +
							'<div class="pi-file-mould-part-wrap">' +
								'<div class="pi-mould-part-wrap">' +
									'<div class="pi-material-file-select-wrap"></div>' +
									'<div class="pi-file-mould-quantity-wrap">' +
										'<div class="pi-file-quantity-label">Mould Qty:</div>' +
										'<div class="pi-mould-bt-minus"><i class="fa-solid fa-circle-minus"></i></div>'+
										'<input type="text" class="mould-quantity" name="mould-quantity" value="1" maxlength="10">' +
										'<div class="pi-mould-bt-plus"><i class="fa-solid fa-circle-plus"></i></div>' +
									'</div>'+
								'</div>' +
								'<div class="pi-file-part-wrap">' +
									'<div class="pi-material-file-select-wrap">'+
										'<div class="select-options select-finishing">'+
											'<div><div class="pi-finish">'+ default_finish +'</div><span class="finishing-down"><i class="fa-solid fa-angle-down"></i></span></div>' +
											'<div class="option-wrap finishing-option-wrap" style="display: none;">'+ finishing_html + '</div>' +
										'</div>'+
										'<div class="select-options select-lead-time" style="display:none;">' +
											'<div><span>Lead Time</span><span class="lead-time-down"><i class="fa-solid fa-angle-down"></i></span></span></div>' +
											'<div class="option-wrap lead-time-option-wrap" style="display: none;">' + lead_time_option_html + '</div>' +
										'</div>' +
									'</div>' +
									'<div class="pi-file-quantity-wrap">' +
										'<div class="pi-file-quantity-label">Part Qty:</div>' +
										'<div class="pi-bt-minus"><i class="fa-solid fa-circle-minus"></i></div>' +
										'<input type="text" class="pi-file-quantity" name="pi-file-quantity" value="0" maxlength="10">' +
										'<div class="pi-bt-plus"><i class="fa-solid fa-circle-plus"></i></div>' +
									'</div>'+
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="pi-flie-price-items-wrap custom-pi-column-width-3">' + 
							'<div class="pi-file-mould-price-wrap">US$ <span class="pi-flie-mould-price">'+ mould_cost.toFixed(2) +'</span></div>' + 
							'<div class="pi-file-part-price-wrap">US$ <span class="pi-flie-part-price">'+part_price.toFixed(2)+'</span></div>' + 
							'<div class="pi-flie-price-wrap" style="display: none;">US$ <span class="pi-flie-price">'+file_pi_price.toFixed(2)+'</span></div>' + 
						'</div>' +
						'<div class="file-ation-wrap custom-pi-column-width-4">' +
							'<div class="injection-abnormal-alert">' + 
								'<i class="fa-solid fa-bell"></i>' + 
								'<div class="abnormal-alert-tips">Click to ring the bell if you find the price too high, too low, looks strange. Or any other questions! We will get back to you ASAP!</div>' + 
							'</div>' + 
							'<div class="pi-file-dublicate-delete-wrap">' +
								'<div class="pi-file-dublicateclick" title="Click To Duplicate" data-click-id="'+ pi_material_id_tag +'"><i class="fa-solid fa-copy"></i></div>' +
								'<div class="pi-file-remove" title="Click To Remove"><i class="fa-solid fa-trash-can"></i></div>' +
							'</div>' +
						'</div>' +
					'</div>';
			pi_container.append(pihtml);
		});
		// 更新每个 Plastic Injection Molding 材料的价格
		jQuery(this).find('.pi-material-price').html(Number(pi_file_total_price).toFixed(2));
		// 更新每个注塑材料的后处理名称
		// 如果下面零件的选项都一致，是同样的，就显示那个同样的内容；
        // 如果不一致，则显示"see details below"
        var jquery = jQuery(this);
        update_pi_finish_name(jquery);
        // 更新每个注塑材料的总数量
        var jquery = jQuery(this);
        update_pi_files_all_qty(jquery);
	});
}

// url转Blob ，使得 FileReader() 可用
function urlToBlob(fileData, callback) {
    let xhr = new XMLHttpRequest();
    var url = fileData['url'];
    xhr.open("get", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (this.status == 200) {
            if (callback) {
                callback(fileData, this.response);
            }
        }
    };
    xhr.send();
}

// urlToBlob的回调函数
function blogData(fileData, data) {
    console.log('fileData', fileData);
    var reader = new FileReader();
    reader.readAsArrayBuffer(data);
    reader.onload = function () {
        console.log('result', reader.result);
        var loader = new THREE.STLLoader();
        var model_geometry = loader.parse(reader.result);
        var modelarr = calculateModel(model_geometry);

        var filesData = {
            'url': fileData['url'],
            'filename': fileData['filename'],
            'volume': modelarr[0],
            'surface_area': modelarr[1],
            'box_volume': modelarr[2],
            'box_xyz': modelarr[3],
            'curved_surface': fileData['SurfaceArea'] ? fileData['SurfaceArea'] : 0,
            'File': fileData['File'] ? fileData['File'] : '',
            'quote': fileData['Quote'] ? fileData['Quote'] : ''
        };


        // 如果quote为空，说明上传的是stl文件，因此需要通过接口获取stl的cnc报价
        if (filesData['quote'] == '') {
            jQuery.post(
                myajax.url,
                {
                    'action': 'get_stl_cnc_quote',
                    'f': filesData['filename'],
                    'l': filesData['box_xyz'].x,
                    'w': filesData['box_xyz'].y,
                    'h': filesData['box_xyz'].z,
                    's': filesData['surface_area'],
                    'c': filesData['curved_surface'],
                    'v': filesData['volume']
                },
                function (data) {
                    var result = JSON.parse(data); //获取到的json数据
                    filesData['File'] = result['File'];
                    filesData['quote'] = result['Quote'];
                    // var oldcookie = Cookies.get('session_files');
                    // console.log('blogData-oldcookie',oldcookie);
                    // if (!oldcookie || oldcookie == 'undefined' || oldcookie == '[]' || oldcookie == 'a:0:{}' ) {
                    // 	var cookie = [];
                    // }else{
                    // 	var cookie = JSON.parse(Cookies.get('session_files'));
                    // }

                    // cookie.push(filesData);
                    // Cookies.set('session_files', JSON.stringify(cookie), { expires: 180, path: '/' });

                    var localStorage = window.localStorage;
                    var getOldStorage = localStorage.getItem('session_files');
                    console.log('getOldStorage', getOldStorage);
                    if (getOldStorage != null) {
                        var jsonStorage = JSON.parse(getOldStorage);
                    } else {
                        var jsonStorage = [];
                    }
                    jsonStorage.push(filesData);
                    localStorage.setItem('session_files', JSON.stringify(jsonStorage));

                    enter_data_files();
                }
            );
        } else {
            //console.log('Cookiesboolean',Boolean(Cookies.get('session_files')));
            // var oldcookie = Cookies.get('session_files');
            // console.log('blogData-oldcookie',oldcookie);
            // if (!oldcookie || oldcookie == 'undefined' || oldcookie == '[]' || oldcookie == 'a:0:{}' ) {
            // 	var cookie = [];
            // }else{
            // 	var cookie = JSON.parse(Cookies.get('session_files'));
            // }
            // cookie.push(filesData);
            // Cookies.set('session_files', JSON.stringify(cookie), { expires: 180, path: '/' });

            var localStorage = window.localStorage;
            var getOldStorage = localStorage.getItem('session_files');
            console.log('getOldStorage', getOldStorage);
            if (getOldStorage != null) {
                var jsonStorage = JSON.parse(getOldStorage);
            } else {
                var jsonStorage = [];
            }
            jsonStorage.push(filesData);
            localStorage.setItem('session_files', JSON.stringify(jsonStorage));

            enter_data_files();
        }
    }
}

// 点击文件名渲染stl模型
jQuery('body').on('click', '.preview-link', function (e) {
    e.preventDefault();

    jQuery('.preview-info').hide();
    jQuery('#viewer').empty();

    var stlview = new STLView("viewer", jQuery(this).attr('data-link'));
    stlview.initScene();
});

// 点击dublicateclick复制一条文件数据
jQuery(document).on('click', '.dublicateclick', function () {
    // var box = jQuery(this).find('.files-box');
    // var clickId = jQuery(this).attr('data-click-id');
    var clone_html = jQuery(this).closest('.file-box').clone();
    // clone_html.find('.remove_icon').remove();

    // box.empty();
    jQuery(this).closest('.file-box').after(clone_html);
    // clone_html.appendTo("." + clickId);
    var box_id = jQuery(this).closest('.box-material').attr('id');
    //console.log('dublicateclick_boxid',box_id);
    update_newprice_box_material(box_id);
    var jquery = jQuery(this).closest('.box-material');
    update_printing_color_name(jquery);
    update_printing_leadtime_name(jquery);
    update_printing_files_all_qty(jquery);
});

//删除复制后一条的文件数据
jQuery(document).on("click", ".remove_form", function () {
    var box_id = jQuery(this).closest('.box-material').attr('id');
    var jquery = jQuery(this).closest('.box-material');
    jQuery(this).closest(".file-box").remove();
    update_newprice_box_material(box_id);
    update_printing_color_name(jquery);
    update_printing_leadtime_name(jquery);
    update_printing_files_all_qty(jquery);
});

// calculate price 计算价格
function calculate_price_with_formula(args) {
    var material_id = args['material_id'];
    var fixed_cofficient = args['fixed_cofficient'];
    var exchange_rate = args['usdrmb_exchange_rate'];
    var material_process = args['material_process'];
    var floor_price = args['floor_price'];
    var weight = args['volume'] * args['density'] * args['quantity'];
    var weight = weight / 1000;
    var weight_one_unit = args['volume'] * args['density'] * 1;
    var weight_one_unit = weight_one_unit / 1000;
    var weight_based_figure;
    var weight_based_figure_one;
    if (weight > args['weight_range_1']) {
        weight_based_figure = args['cofficient_1_greater_weightrange'];
    } else if (weight < args['weight_range_2']) {
        weight_based_figure = args['cofficient_2_smaller_weightrange'];
    } else {
        weight_based_figure = args['cofficient_weight_bw_range_1_and_2'];
    }

    if (weight_one_unit > args['weight_range_1']) {
        weight_based_figure_one = args['cofficient_1_greater_weightrange'];
    } else if (weight_one_unit < args['weight_range_2']) {
        weight_based_figure_one = args['cofficient_2_smaller_weightrange'];
    } else {
        weight_based_figure_one = args['cofficient_weight_bw_range_1_and_2'];
    }

    if (material_process.toUpperCase() == 'DMLS') {
        var calculated_price_one = (weight_one_unit) * (args['unit_price'] * fixed_cofficient) * (weight_based_figure_one / exchange_rate) * (parseFloat(args['lead_time']));
        //console.log('count_price_one',calculated_price_one);
        //console.log('floor_price',floor_price);

		//* 判断是否大于最低价的逻辑
		if (calculated_price_one < floor_price) {
			var calculated_price = floor_price * args['quantity'];
		} else //*/
		{
        var calculated_price = calculated_price_one * args['quantity'];
		}

    } else {
        var calculated_price = (weight) * (args['unit_price'] * fixed_cofficient) * (weight_based_figure / exchange_rate) * (parseFloat(args['lead_time']));
        //console.log('count_price',calculated_price);
        //console.log('floor_price',floor_price);

		/* 判断是否大于最低价的逻辑
		if (calculated_price<floor_price) {
			  calculated_price = floor_price;
		} //*/
    }
    //var calculated_price = (weight) * (args['unit_price'] * fixed_cofficient) * (weight_based_figure / exchange_rate) * (args['lead_time']);
    //var calculated_price = (weight) * (args['unit_price'] * fixed_cofficient) * (weight_based_figure / exchange_rate) * (args['lead_time']);
    //alert(weight +'*'+ unit_price +'*'+ fixed_cofficient +'*'+ weight_based_figure +'/'+ exchange_rate +'*'+ lead_time);
    return Number(calculated_price);
}


// 更新 3D printing 每种材料的颜色名称
function update_printing_color_name(jquery) {
    var printing_color_arr = [];
    jquery.find(".files-box").find('.file-box').each(function () {
        var printing_color = jQuery(this).find('.printing-color').text();
        printing_color_arr.push(printing_color);
    });
    console.log('printing_color_arr', printing_color_arr);
    var result = removeDuplicate(printing_color_arr);
    if (result.length == 0) {
        var printing_color_name = '';
    } else if (result.length == 1) {
        var printing_color_name = result[0];
    } else {
        var printing_color_name = "see details below";
    }
    jquery.find('.printing-select-color').html(printing_color_name);
}

// 更新 3D printing 每种材料的交货期名称
function update_printing_leadtime_name(jquery) {
    var printing_leadtime_arr = [];
    jquery.find(".files-box").find('.file-box .select-lead-time').each(function () {
        if(jQuery(this).css('display') === 'none') {
            return;
        }
        var printing_leadtime = jQuery(this).find('.printing-leadtime').text();
        printing_leadtime_arr.push(printing_leadtime);
    });
    console.log('printing_leadtime_arr', printing_leadtime_arr);
    var result = removeDuplicate(printing_leadtime_arr);
    if (result.length == 0) {
        var printing_leadtime_name = '';
    } else if (result.length == 1) {
        var printing_leadtime_name = result[0];
    } else {
        var printing_leadtime_name = "see details below";
    }
    jquery.find('.printing-select-lead-time').html(printing_leadtime_name);
}

// 更新 3D printing 每种材料的所有数量
function update_printing_files_all_qty(jquery) {
    var qty = 0;
    jquery.find(".files-box").find('.file-box').each(function () {
        var one_qty = jQuery(this).find('.plus-minus').val();
        qty += parseInt(one_qty);
    });
    jquery.find('.printing-files-all-qty').html(qty);
}

// New Price update function 更新价格
function update_newprice_box_material(box_id) {

    var price_total = 0;
    var files_total = 0;
    var price_item = 0;
    var price_unit = 0;
    var floor_price = jQuery('#' + box_id).attr('data-floor_price');
    jQuery('#' + box_id + ' .file-box').each(function () {
        price_item = Number(jQuery(this).attr('price-item'));
        //alert('Price Item inside loop'+price_item);
        price_total += price_item;
    });
    //console.log(price_total);

	//* 判断是否大于最低价的逻辑
	if (Number(price_total) < Number(floor_price)) {
		jQuery('#' + box_id + ' .file-box').each(function() {
			price_item = jQuery(this).attr('price-item');
			//console.log(price_item);
			price_unit = Number(floor_price) * Number(price_item) / Number(price_total);
			//console.log(price_unit);
			jQuery(this).find('.col-price span').html(price_unit.toFixed(2));
		});
		price_total = Number(floor_price);
		//console.log(price_total);
	} else //*/
	{
    jQuery('#' + box_id + ' .file-box').each(function () {
        price_item = Number(jQuery(this).attr('price-item'));
        jQuery(this).find('.col-price span').html(price_item.toFixed(2));
    });
	}

    //alert('Total Price '+price_total);
    jQuery('#' + box_id).find('.material-price').html(Number(price_total).toFixed(2));
    //jQuery('#'+box_id).find('td.files').html( files_total );
}

// Leadtime options Price mapping 交期选择后更新价格
jQuery(document).on('change', 'input[name="printing-lead-time-option"]', function () {
    var $this = jQuery(this);
    var leadtime = jQuery(this).val();
    var leadtimetxt = jQuery(this).text();
    console.log('leadtime', leadtime)
    console.log('leadtimetxt', leadtimetxt)
    var parent = jQuery(this).parents('.file-box');
    var box = jQuery(this).closest('.box-material');
    var box_id = box.attr('id');
    var get_file = parent.attr('data-file');
    var volume = parent.attr('data-volume');
    var file_unit = parent.attr('data-file_unit');
    if (file_unit == "inch") {
        // inch change to mm
        volume = 25.4 * 25.4 * 25.4 * parseFloat(volume);
    }

    var density = $this.parents('div.box-material,div.cnc-box-material,div.pi-box-material').attr('data-density');
    var quantity = $this.closest('.file-box').find('input.plus-minus').val();
    var unit_price = $this.parents('div.box-material,div.cnc-box-material,div.pi-box-material').attr('data-unit_price');
    var price_calc = [];
//cnc-box-material
    // New Array
    price_calc['fixed_cofficient'] = $this.parents('div.box-material,div.cnc-box-material,div.pi-box-material').attr('data-fixed_cofficient');
    price_calc['weight_range_1'] = $this.parents('div.box-material').attr('data-weight_range_1');
    price_calc['weight_range_2'] = $this.parents('div.box-material').attr('data-weight_range_2');
    price_calc['cofficient_1_greater_weightrange'] = $this.parents('div.box-material').attr('data-cofficient_1_greater_weightrange');
    price_calc['cofficient_weight_bw_range_1_and_2'] = $this.parents('div.box-material').attr('data-cofficient_weight_bw_range_1_and_2');
    price_calc['cofficient_2_smaller_weightrange'] = $this.parents('div.box-material').attr('data-cofficient_2_smaller_weightrange');
    price_calc['usdrmb_exchange_rate'] = $this.parents('div.box-material').attr('data-usdrmb_exchange_rate');
    price_calc['material_process'] = $this.parents('div.box-material,div.cnc-box-material,div.pi-box-material').attr('data-material_process');
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
jQuery(document).on('click', '.clear-all-button', function () {
    //把模型预览界面初始化
    jQuery('#viewer').empty();
    jQuery('.preview-info').show();
    jQuery('#progress').hide();
    //把文件显示界面初始化
    jQuery('.flies-cover').empty();
    jQuery('#total_files').html('--');
    jQuery('#total_capacity').html('--');

    //清除文件的cookie
    // Cookies.remove('session_files', { path: '/' });
    // 清除文件的 localStorage
    var localStorage = window.localStorage;
    var getStorage = localStorage.getItem('session_files');
    if (getStorage != null) {
        localStorage.removeItem('session_files');
        console.log('删除成功');
    }
    // 文件信息初始化
    jQuery('.file-info-dimensions').text(0);
    jQuery('.file-info-volume').text(0);
    jQuery('.file-info-surface').text(0);
    // 初始化报价
    enter_data_files();
});

// 点击文件后面的删除按钮，删除一个文件
jQuery(document).on('click', '.del_stl', function () {
    //获取删除的文件名
    var file_name = jQuery(this).attr('data-file');
    //删除当前的文件
    jQuery(this).closest('.file_name').remove();
    //判断是否还有文件存在
    if (jQuery('.file_name').length > 0) {

        // //删除对应文件名的cookie
        // var cookie = JSON.parse(Cookies.get('session_files'));
        // console.log('cookie', cookie);
        // for (var i = 0; i < cookie.length; i++) {
        // 	if (cookie[i]['filename'] == file_name) {
        // 		cookie.splice(i, 1);
        // 	}
        // }


        // Cookies.remove('session_files', { path: '/' });
        // Cookies.set('session_files', JSON.stringify(cookie), { expires: 180, path: '/' });

        //删除对应文件名的 localStorage
        var localStorage = window.localStorage;
        var getStorage = localStorage.getItem('session_files');
        if (getStorage != null) {
            var jsonStorage = JSON.parse(getStorage);
            for (var i = 0; i < jsonStorage.length; i++) {
                if (jsonStorage[i]['filename'] == file_name) {
                    jsonStorage.splice(i, 1);
                }
            }
            localStorage.removeItem('session_files');
            localStorage.setItem('session_files', JSON.stringify(jsonStorage));
        }

    } else {
        // Cookies.remove('session_files', { path: '/' });
        var localStorage = window.localStorage;
        var getStorage = localStorage.getItem('session_files');
        if (getStorage != null) {
            localStorage.removeItem('session_files');
        }
    }
    // jQuery.post(
    // 	myajax.url,
    // 	{

    // 		'action' : 'update_from_session_files'
    // 	},

    // 	function(data){
    // 		enter_data_files();
    // 		var filelen = jQuery('.flies-cover').children().length;
    // 		console.log('file',filelen);
    // 		if (filelen > 0) {
    // 			jQuery('.file-model-container').show();
    // 			jQuery('.dropBox_wrap').hide();
    // 		} else {
    // 			jQuery('.file-model-container').hide();
    // 			jQuery('.dropBox_wrap').show();
    // 		}
    // 	}
    // );
    enter_data_files();
    var filelen = jQuery('.flies-cover').children().length;
    console.log('file', filelen);
    if (filelen > 0) {
        jQuery('.file-model-container').show();
        jQuery('.dropBox_wrap').hide();
    } else {
        jQuery('.file-model-container').hide();
        jQuery('.dropBox_wrap').show();
    }


});

//点击加减号更新价格
jQuery('body').on('click', '.bt-plus, .bt-minus', function (e) {
    e.preventDefault();
    var update_val = false;
    var box = jQuery(this).closest('.box-material');
    var box_id = box.attr('id');
    var price_item = box.attr('data-price_item');

    var input = jQuery(this).parent().find('input');
    var value = parseInt(input.val());

    if (jQuery(this).hasClass('bt-plus')) {
        value = value + 1;
        update_val = true;
    } else if (value > 0) {
        value = value - 1;
        update_val = true;
    }

    if (update_val == true) {
        input.val(value);
        //触发update cart按钮，更新购物车
        if (jQuery('input[name="update_cart"]').length > 0) {
            jQuery('input[name="update_cart"]').prop('disabled', false).trigger("click");
        }
    }

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
            volume = 25.4 * 25.4 * 25.4 * parseFloat(volume);
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
    }
    var jquery = jQuery(this).closest('.box-material');
    update_printing_files_all_qty(jquery);
});

// 修改文件的加减号之间的数量的价格更新
jQuery('body').on('change', '.plus-minus', function () {
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
            volume = 25.4 * 25.4 * 25.4 * parseFloat(volume);
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


// AJAX - button "Add to cart" 异步批量添加购物车
jQuery('body').on('click', '.add-to-cart-button', function () {
    if (jQuery(".file_name").length == 0) {
        jQuery('#alertToUploadFile').show();
        jQuery(this).prop('disabled', false);
        return;
    } else {
        var box_material = jQuery(this).closest('.box-material');
        var files = [];
        var box_id = jQuery(this).closest('.box-material').attr('id');
        //update_newprice_box_material(box_id);

        jQuery(this).addClass('cart');
        jQuery('#' + box_id + ' .file-box').each(function (i) {
            if (jQuery(this).find('input.plus-minus').val() * 1 > 0) {
                var file_item = {
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

        //console.log( files );

        if (files.length > 0) {
            jQuery.post(
                myajax.url, {
                    'action': 'prints_create_product',
                    'files': files
                },
                function (data) {
                    //console.log('addtocartdata', data );
                    if (data != 0) {
                        var jsondata = JSON.parse(data);
                        //console.log('addtocartdata', jsondata );
                        if (jsondata.error) {
                            alert(jsondata.error);
                        } else {
                            if (jsondata.products.length > 0) {
                                // 更新材料选择部分的购物车信息
                                jQuery('.material-bottom-info-total-price-value').html(jsondata.total_price);
                                // Trigger event so themes can refresh other areas. 更新头部的购物车信息 参考add-to-cart.js
                                jQuery(document.body).trigger('added_to_cart', [jsondata.fragment.fragments, jsondata.fragment.cart_hash]);
                            }
                        }
                    }
                }
            );
        }
    }
});


// 蒙层框的操作
// 点击关闭和灰色蒙层区域，关闭蒙层框
jQuery('body').on('click', '.modal-dialog, .close-modal', function () {
    jQuery('#alertToUploadFile').hide();
});
// 点击蒙层的内容区域，阻止蒙层框关闭
jQuery('body').on('click', '.modal-content', function (e) {
    e.stopPropagation();
    return;
});
// 点击click字体，触发上传文件
jQuery('body').on('click', '#uploadCADFile', function (e) {
    jQuery('#alertToUploadFile').hide();
    jQuery('input[type="file"]').trigger("click");
});


// 计算cnc基础价格 已废弃
function calculate_cnc_price_with_formula(args) {
    var quantity = args['quantity'] ? parseFloat(args['quantity']) : 1;
    var len = parseFloat(args['len']);
    var width = parseFloat(args['width']);
    var thickness = parseFloat(args['thickness']);
    var r = (len + 30) * (width + 30) * (thickness + 5) / 1000000 * 1.0 * 19;
    var m = len * width * thickness * 40 / (100 * 100 * 30);
    var f = len * width * 25 / (100 * 100);
    var r_coefficient_1 = parseFloat(args['r_coefficient_1']);
    var r_coefficient_2 = parseFloat(args['r_coefficient_2']);
    var m_coefficient = parseFloat(args['m_coefficient']);
    var f_coefficient = parseFloat(args['f_coefficient']);
    var rmf_coefficient_1 = parseFloat(args['rmf_coefficient_1']);
    var rmf_coefficient_2 = parseFloat(args['rmf_coefficient_2']);
    var rmf_coefficient_3 = parseFloat(args['rmf_coefficient_3']);

    var cnc_unit_price = (r * r_coefficient_1 * r_coefficient_2 + m * m_coefficient + f * f_coefficient) * rmf_coefficient_1 / rmf_coefficient_2 * rmf_coefficient_3;
    var basic_price = cnc_unit_price * quantity;
    return basic_price;
}

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


// 更新cnc某个材料的价格
function update_cnc_material_price(box_id) {
    var cnc_file_price_list = jQuery('#' + box_id).find('.cnc-flie-price');
    //console.log('cnc_file_price_list',cnc_file_price_list)
    var total_price = 0;
    for (var i = 0; i < cnc_file_price_list.length; i++) {
        var price = cnc_file_price_list[i].innerText;
        total_price += parseFloat(price);
    }
    jQuery('#' + box_id).find('.cnc-material-price').text(total_price.toFixed(2));
}

// 点击 cnc-file-dublicateclick 复制一条文件数据
jQuery(document).on('click', '.cnc-file-dublicateclick', function () {
    var clickId = jQuery(this).attr('data-click-id');
    var clone_html = jQuery(this).closest('.duplicate_cnc-files-cols_outer').clone();

    clone_html.appendTo("." + clickId);

    var box_id = jQuery(this).closest('.cnc-box-material').attr('id');
    //console.log('dublicateclick_boxid',box_id);
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

//删除cnc一条的文件数据
jQuery(document).on("click", ".cnc-file-remove", function () {
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

// 对数组去重
function removeDuplicate(arr) {
    const map = new Map();
    const newArr = [];

    arr.forEach(item => {
        if (!map.has(item)) { // has()用于判断map是否包为item的属性值
            map.set(item, true); // 使用set()将item设置到map中，并设置其属性值为true
            newArr.push(item);
        }
    });

    return newArr;
}

// 更新cnc每种材料的后处理名称
function update_cnc_finish_name(jquery) {
    var cnc_finish_arr = [];
    jquery.find(".cnc-files-container").find('.cnc-file-wrap').each(function () {
        var cnc_finish = jQuery(this).find('.cnc-finish').text();
        cnc_finish_arr.push(cnc_finish);
    });
    console.log('cnc_finish_arr', cnc_finish_arr);
    var result = removeDuplicate(cnc_finish_arr);
    if (result.length == 0) {
        var cnc_finish_name = '';
    } else if (result.length == 1) {
        var cnc_finish_name = result[0];
    } else {
        var cnc_finish_name = "see details below";
    }
    jquery.find('.cnc-select-finishing-name').html(cnc_finish_name);
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

// 更新cnc材料中一个文件的价格
function update_cnc_file_price(athis) {
    var cnc_file_wrap = jQuery(athis).closest('.cnc-file-wrap');
    var one_price = cnc_file_wrap.attr('data-one_price');
    // var surface_treatment = cnc_file_wrap.find('input[name="surface_treatment"]:checked').val();
    // var finishing_coating = cnc_file_wrap.find('input[name="finishing_coating"]:checked').val();
    // var logo_finishing = cnc_file_wrap.find('input[name="logo_finishing"]:checked').val();
    // var protective_coating = cnc_file_wrap.find('input[name="protective_coating"]:checked').val();

    var basic_surface_treatment = cnc_file_wrap.find('input[name="basic_surface_treatment"]:checked').val();
    var advanced_surface_treatment = cnc_file_wrap.find('input[name="advanced_surface_treatment"]:checked').val();
    var color_surface_treatment = cnc_file_wrap.find('input[name="color_surface_treatment"]:checked').val();
    var cnc_file_quantity = cnc_file_wrap.find('input[name="cnc-file-quantity"]').val();
    // var file_unit = cnc_file_wrap.attr('data-file_unit');
    var volume = cnc_file_wrap.attr('data-volume');
    var surface_area = cnc_file_wrap.attr('data-surface_area');
    var curved_surface = cnc_file_wrap.attr('data-curved_surface');
    var box_x = cnc_file_wrap.attr('data-box_x');
    var box_y = cnc_file_wrap.attr('data-box_y');
    var box_z = cnc_file_wrap.attr('data-box_z');
    // if (file_unit == "inch") {
    // 	box_x = 25.4 * parseFloat(box_x);
    // 	box_y = 25.4 * parseFloat(box_y);
    // 	box_z = 25.4 * parseFloat(box_z);
    // 	volume = 25.4 * 25.4 * 25.4 * volume;
    // 	surface_area = 25.4 * 25.4 * surface_area;
    // 	curved_surface = 25.4 * 25.4 * curved_surface;
    // }

    var cnc_box_material = jQuery(athis).closest('.cnc-box-material');
    var cnc_material = cnc_box_material.attr('data-material');

    // var surface_treatment_key = finishing_cost[surface_treatment]['key'];
    // console.log('surface_treatment_key',surface_treatment_key);
    // var finish_arr = [];
    // finish_arr.push(surface_treatment_key);
    // console.log('finish_arr',finish_arr);

    // // 一件cnc的价格(包括后处理)
    // var cnc_q = new Quote(parseFloat(volume),parseFloat(surface_area), parseFloat(curved_surface), parseFloat(box_x),parseFloat(box_y),parseFloat(box_z), cnc_material, finish_arr);
    // var unit_price = cnc_q.cnc();
    var unit_price = one_price;
    console.log('cnc_unitprice', unit_price);
    cnc_file_quantity = parseFloat(cnc_file_quantity);

    // 多件的价格
    if (cnc_file_quantity >= 1 && cnc_file_quantity <= 100) {
        unit_price = unit_price * Math.pow(cnc_file_quantity, -0.14);
    }
    if (cnc_file_quantity > 100 && cnc_file_quantity <= 1000) {
        unit_price = unit_price * Math.pow(100, -0.14) * Math.pow(cnc_file_quantity - 100, -0.01);
    }
    if (cnc_file_quantity > 1000) {
        unit_price = unit_price * Math.pow(100, -0.14) * Math.pow(1000 - 100, -0.01);
    }
    var price = unit_price * cnc_file_quantity;

    // 后处理的价格
    // var args = [];
    // args['quantity'] = cnc_file_quantity;
    // args['surface_treatment'] = surface_treatment;
    // args['finishing_coating'] = finishing_coating;
    // args['logo_finishing'] = logo_finishing;
    // args['protective_coating'] = protective_coating;
    // var finish_cost = calculate_finishing_price_with_formula(args);
    var Pb = finishing_cost[basic_surface_treatment]['cost'];
    var Ph = finishing_cost[advanced_surface_treatment]['cost'];
    var Pc = finishing_cost[color_surface_treatment]['cost'];
    var P0 = Pb + Ph + Pc;
    var D0 = 150, S0 = 101250, M = 0.2;
    // 一件价格
    var P1 = P0 * (Math.max(box_x / D0, 1) * Math.max(box_y / D0, 1) * Math.max(box_z / D0, 1) * Math.max(surface_area / S0, 1));
    // 多件价格
    var Pn = P1 * Math.pow(cnc_file_quantity, -M);

    // var cost = price + finish_cost;
    // var cost = price;
    var cost = price + Pn;
    // 更新这一条文件的价格
    cnc_file_wrap.find('.cnc-flie-price').text(cost.toFixed(2));
    // 更新这个材料的总价格
    var box_id = cnc_box_material.attr('id');
    update_cnc_material_price(box_id)
}

// cnc finishing 后处理改变后更新价格
jQuery(document).on('change', 'input[name="surface_treatment"]', function () {
    // var $this = jQuery(this);
    var athis = this;
    update_cnc_file_price(athis);
});
jQuery(document).on('change', 'input[name="finishing_coating"]', function () {
    // var $this = jQuery(this);
    var athis = this;
    update_cnc_file_price(athis);
});
jQuery(document).on('change', 'input[name="logo_finishing"]', function () {
    // var $this = jQuery(this);
    var athis = this;
    update_cnc_file_price(athis);
});
jQuery(document).on('change', 'input[name="protective_coating"]', function () {
    // var $this = jQuery(this);
    var athis = this;
    update_cnc_file_price(athis);
});
jQuery(document).on('change', 'input[name="basic_surface_treatment"]', function () {
    // var $this = jQuery(this);
    var athis = this;
    update_cnc_file_price(athis);
});
jQuery(document).on('change', 'input[name="advanced_surface_treatment"]', function () {
    // var $this = jQuery(this);
    var athis = this;
    update_cnc_file_price(athis);
});
jQuery(document).on('change', 'input[name="color_surface_treatment"]', function () {
    // var $this = jQuery(this);
    var athis = this;
    update_cnc_file_price(athis);
});

//点击减号更新价格
jQuery('body').on('click', '.cnc-bt-minus', function (e) {
    e.preventDefault();
    var quantity = jQuery(this).closest('.cnc-file-quantity-wrap').find('input[name="cnc-file-quantity"]').val();
    quantity = parseInt(quantity);
    if (quantity > 0) {
        quantity = quantity - 1;
        jQuery(this).closest('.cnc-file-quantity-wrap').find('input[name="cnc-file-quantity"]').val(quantity);
    } else {
        return false;
    }

    var athis = this;
    update_cnc_file_price(athis);
    // 更新每个cnc材料的总数量
    var jquery = jQuery(this).closest('.cnc-box-material');
    update_cnc_files_all_qty(jquery);
});

//点击加号更新价格
jQuery('body').on('click', '.cnc-bt-plus', function (e) {
    e.preventDefault();
    var quantity = jQuery(this).closest('.cnc-file-quantity-wrap').find('input[name="cnc-file-quantity"]').val();
    quantity = parseInt(quantity);
    quantity = quantity + 1;
    jQuery(this).closest('.cnc-file-quantity-wrap').find('input[name="cnc-file-quantity"]').val(quantity);
    var athis = this;
    update_cnc_file_price(athis);
    // 更新每个cnc材料的总数量
    var jquery = jQuery(this).closest('.cnc-box-material');
    update_cnc_files_all_qty(jquery);
});

// 修改文件的加减号之间的数量的价格更新
jQuery('body').on('change', 'input[name="cnc-file-quantity"]', function () {
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

// AJAX - button "Add to cart" 将 cnc 材料异步添加购物车
jQuery('body').on('click', '.cnc-add-to-cart-button', function () {
    // return false;
    if (jQuery(".file_name").length == 0) {
        jQuery('#alertToUploadFile').show();
        jQuery(this).prop('disabled', false);
        return;
    } else {
        var cnc_box_material = jQuery(this).closest('.cnc-box-material');
        var files = [];
        var box_id = cnc_box_material.attr('id');
        //update_newprice_box_material(box_id);

        jQuery(this).addClass('cart');
        jQuery('#' + box_id + ' .cnc-file-wrap').each(function (i) {
            if (jQuery(this).find('input[name="cnc-file-quantity"]').val() * 1 > 0) {
                var file_item = {
                    volume: jQuery(this).attr('data-volume'),
                    surface_area: jQuery(this).attr('data-surface_area'),
                    box_volume: jQuery(this).attr('data-box_volume'),
                    curved_surface: jQuery(this).attr('data-curved_surface'),
                    file_unit: jQuery(this).attr('data-file_unit'),
                    len: jQuery(this).attr('data-box_x'),
                    width: jQuery(this).attr('data-box_y'),
                    thickness: jQuery(this).attr('data-box_z'),
                    one_price: jQuery(this).attr('data-one_price'),
                    material_id: jQuery(this).closest('.cnc-box-material').attr('data-id'),
                    file_name: jQuery(this).attr('data-file'),
                    quantity: jQuery(this).find('input[name="cnc-file-quantity"]').val(),
                    price: jQuery(this).find('.cnc-flie-price').text(),
                    leadtime: jQuery(this).closest('.cnc-box-material').attr('data-lead_time_option'),
                    // leadtime_checked: jQuery(this).find('input[name="cnc-lead-time-option"]:checked').val(),
                    leadtime_checked: jQuery(this).find('input[name="xia-lead-time-option"]:checked').val(),
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

        //console.log( files );

        if (files.length > 0) {
            jQuery.post(
                myajax.url, {
                    'action': 'create_cnc_product',
                    'files': files
                },
                function (data) {
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
                                jQuery(document.body).trigger('added_to_cart', [jsondata.fragment.fragments, jsondata.fragment.cart_hash]);
                            }
                        }
                    }
                }
            );
        }
    }
});

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

    if (plastic_injection_quantity >= 1 && plastic_injection_quantity <= 1000) {
        part_unit_price = part_unit_price * Math.pow(plastic_injection_quantity / 1000, -1 / 4);
    }
    if (plastic_injection_quantity > 1000 && plastic_injection_quantity <= 2000) {
        part_unit_price = part_unit_price * Math.pow(plastic_injection_quantity / 1000, -1 / 12);
    }
    if (plastic_injection_quantity > 2000) {
        part_unit_price = part_unit_price * Math.pow(2000 / 1000, -1 / 12);
    }
    var plastic_injection_part_price = part_unit_price * plastic_injection_quantity;
    // 最低价为80美金
    if (plastic_injection_quantity > 0 && plastic_injection_part_price < 80) {
        plastic_injection_part_price = 80;
    }
    return plastic_injection_part_price;
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

// 计算注塑零件后处理的价格
function calculate_plastic_injection_part_finishing_price_with_formula(args) {
    // 基本价格
    var part_price = calculate_plastic_injection_part_price_with_formula(args);
    // 后处理价格
    var finishing_price = calculate_finishing_price_with_formula(args);
    // 总价格
    var cost = finishing_price + part_price;
    return cost;
}

// 计算注塑后处理的总价格
function calculate_plastic_injection_finishing_price_with_formula(args) {
    // 基本价格
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
    console.log('pi_finish_arr', pi_finish_arr);
    var result = removeDuplicate(pi_finish_arr);
    if (result.length == 0) {
        var pi_finish_name = '';
    } else if (result.length == 1) {
        var pi_finish_name = result[0];
    } else {
        var pi_finish_name = "see details below";
    }
    jquery.find('.pi-select-finish-name').html(pi_finish_name);
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

// 更新 Plastic Injection Molding 某个材料的价格
function update_pi_material_price(box_id) {
    var pi_file_price_list = jQuery('#' + box_id).find('.pi-flie-price');
    //console.log('pi_file_price_list',pi_file_price_list)
    var total_price = 0;
    for (var i = 0; i < pi_file_price_list.length; i++) {
        var price = pi_file_price_list[i].innerText;
        total_price += parseFloat(price);
    }
    jQuery('#' + box_id).find('.pi-material-price').text(total_price.toFixed(2));
}

// 点击 pi-file-dublicateclick 复制一条文件数据
jQuery(document).on('click', '.pi-file-dublicateclick', function () {
    var clickId = jQuery(this).attr('data-click-id');
    var clone_html = jQuery(this).closest('.duplicate_pi-files-cols_outer').clone();

    clone_html.appendTo("." + clickId);

    var box_id = jQuery(this).closest('.pi-box-material').attr('id');
    //console.log('dublicateclick_boxid',box_id);
    update_pi_material_price(box_id);
    var jquery = jQuery(this).closest('.pi-box-material');
    update_pi_finish_name(jquery);
    update_pi_files_all_qty(jquery);
});

//删除 Plastic Injection Molding 一条的文件数据
jQuery(document).on("click", ".pi-file-remove", function () {
    var box_id = jQuery(this).closest('.pi-box-material').attr('id');
    var jquery = jQuery(this).closest('.pi-box-material');
    jQuery(this).closest(".pi-file-wrap").remove();
    update_pi_material_price(box_id);
    update_pi_finish_name(jquery);
    update_pi_files_all_qty(jquery);
});

// 更新 Plastic Injection Molding 材料中一个文件的价格
function update_pi_file_price(athis) {
    var pi_file_wrap = jQuery(athis).closest('.pi-file-wrap');
    var surface_treatment = pi_file_wrap.find('input[name="pi-surface_treatment"]:checked').val();
    var finishing_coating = pi_file_wrap.find('input[name="pi-finishing_coating"]:checked').val();
    var logo_finishing = pi_file_wrap.find('input[name="pi-logo_finishing"]:checked').val();
    var protective_coating = pi_file_wrap.find('input[name="pi-protective_coating"]:checked').val();
    var pi_file_quantity = pi_file_wrap.find('input[name="pi-file-quantity"]').val();
    var mould_quantity = pi_file_wrap.find('input[name="mould-quantity"]').val();
    ;
    var file_unit = pi_file_wrap.attr('data-file_unit');
    var box_x = pi_file_wrap.attr('data-box_x');
    var box_y = pi_file_wrap.attr('data-box_y');
    var box_z = pi_file_wrap.attr('data-box_z');
    if (file_unit == "inch") {
        box_x = 25.4 * parseFloat(box_x);
        box_y = 25.4 * parseFloat(box_y);
        box_z = 25.4 * parseFloat(box_z);
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

    var part_price = calculate_plastic_injection_part_finishing_price_with_formula(args);
    var mould_price = calculate_plastic_injection_mould_price_with_formula(args);
    var cost = calculate_plastic_injection_finishing_price_with_formula(args);
    // 更新这一条文件的价格
    pi_file_wrap.find('.pi-flie-mould-price').text(mould_price.toFixed(2));
    pi_file_wrap.find('.pi-flie-part-price').text(part_price.toFixed(2));
    pi_file_wrap.find('.pi-flie-price').text(cost.toFixed(2));
    // 更新这个材料的总价格
    var box_id = pi_box_material.attr('id');
    update_pi_material_price(box_id);
}

// Plastic Injection Molding finishing 后处理改变后更新价格
jQuery(document).on('change', 'input[name="pi-surface_treatment"]', function () {
    // var $this = jQuery(this);
    var athis = this;
    update_pi_file_price(athis);
});
jQuery(document).on('change', 'input[name="pi-finishing_coating"]', function () {
    // var $this = jQuery(this);
    var athis = this;
    update_pi_file_price(athis);
});
jQuery(document).on('change', 'input[name="pi-logo_finishing"]', function () {
    // var $this = jQuery(this);
    var athis = this;
    update_pi_file_price(athis);
});
jQuery(document).on('change', 'input[name="pi-protective_coating"]', function () {
    // var $this = jQuery(this);
    var athis = this;
    update_pi_file_price(athis);
});

//点击减号更新价格
jQuery('body').on('click', '.pi-mould-bt-minus', function (e) {
    e.preventDefault();
    var quantity = jQuery(this).closest('.pi-file-mould-quantity-wrap').find('input[name="mould-quantity"]').val();
    quantity = parseInt(quantity);
    if (quantity > 0) {
        quantity = quantity - 1;
        jQuery(this).closest('.pi-file-mould-quantity-wrap').find('input[name="mould-quantity"]').val(quantity);
    } else {
        return false;
    }

    var athis = this;
    update_pi_file_price(athis);
    var jquery = jQuery(this).closest('.pi-box-material');
    update_pi_files_all_qty(jquery);
});

//点击加号更新价格
jQuery('body').on('click', '.pi-mould-bt-plus', function (e) {
    e.preventDefault();
    var quantity = jQuery(this).closest('.pi-file-mould-quantity-wrap').find('input[name="mould-quantity"]').val();
    quantity = parseInt(quantity);
    quantity = quantity + 1;
    jQuery(this).closest('.pi-file-mould-quantity-wrap').find('input[name="mould-quantity"]').val(quantity);
    var athis = this;
    update_pi_file_price(athis);
    var jquery = jQuery(this).closest('.pi-box-material');
    update_pi_files_all_qty(jquery);
});

// 修改文件的加减号之间的数量的价格更新
jQuery('body').on('change', 'input[name="mould-quantity"]', function () {
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
    update_pi_file_price(athis);
    var jquery = jQuery(this).closest('.pi-box-material');
    update_pi_files_all_qty(jquery);
})

//点击减号更新价格
jQuery('body').on('click', '.pi-bt-minus', function (e) {
    e.preventDefault();
    var quantity = jQuery(this).closest('.pi-file-quantity-wrap').find('input[name="pi-file-quantity"]').val();
    quantity = parseInt(quantity);
    if (quantity > 0) {
        quantity = quantity - 1;
        jQuery(this).closest('.pi-file-quantity-wrap').find('input[name="pi-file-quantity"]').val(quantity);
    } else {
        return false;
    }

    var athis = this;
    update_pi_file_price(athis);
    var jquery = jQuery(this).closest('.pi-box-material');
    update_pi_files_all_qty(jquery);
});

//点击加号更新价格
jQuery('body').on('click', '.pi-bt-plus', function (e) {
    e.preventDefault();
    var quantity = jQuery(this).closest('.pi-file-quantity-wrap').find('input[name="pi-file-quantity"]').val();
    quantity = parseInt(quantity);
    quantity = quantity + 1;
    jQuery(this).closest('.pi-file-quantity-wrap').find('input[name="pi-file-quantity"]').val(quantity);
    var athis = this;
    update_pi_file_price(athis);
    var jquery = jQuery(this).closest('.pi-box-material');
    update_pi_files_all_qty(jquery);
});

// 修改文件的加减号之间的数量的价格更新
jQuery('body').on('change', 'input[name="pi-file-quantity"]', function () {
    var quantity = jQuery(this).val();
    quantity = parseInt(quantity);
    if (isNaN(quantity)) {
        quantity = 1000;
    }
    if (quantity < 0) {
        quantity = 1000;
    }
    jQuery(this).val(quantity);

    var athis = this;
    update_pi_file_price(athis);
    var jquery = jQuery(this).closest('.pi-box-material');
    update_pi_files_all_qty(jquery);
})

// AJAX - button "Add to cart" 将 Plastic Injection Molding 材料异步添加购物车
jQuery('body').on('click', '.pi-add-to-cart-button', function () {
    // return false;
    if (jQuery(".file_name").length == 0) {
        jQuery('#alertToUploadFile').show();
        jQuery(this).prop('disabled', false);
        return;
    } else {
        var pi_box_material = jQuery(this).closest('.pi-box-material');
        var files = [];
        var box_id = pi_box_material.attr('id');
        //update_newprice_box_material(box_id);

        jQuery(this).addClass('cart');
        jQuery('#' + box_id + ' .pi-file-wrap').each(function (i) {
            if (jQuery(this).find('input[name="pi-file-quantity"]').val() * 1 > 0) {
                var file_item = {
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

        //console.log( files );

        if (files.length > 0) {
            jQuery.post(
                myajax.url, {
                    'action': 'create_plastic_injection_molding_product',
                    'files': files
                },
                function (data) {
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
                                jQuery(document.body).trigger('added_to_cart', [jsondata.fragment.fragments, jsondata.fragment.cart_hash]);
                            }
                        }
                    }
                }
            );
        }
    }
});

// 3d 打印价格异常提示
jQuery('body').on('click', '.printing-abnormal-alert', function () {
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

// CNC 价格异常提示
jQuery('body').on('click', '.cnc-abnormal-alert', function () {
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

// 注塑 价格异常提示
jQuery('body').on('click', '.injection-abnormal-alert', function () {
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

// 点击输入邮件的悬浮窗的取消
jQuery('body').on('click', '.prompt-cancel-btn', function () {
    jQuery('#exception-prompt').hide();
});
// 点击输入邮件的悬浮窗的提交
jQuery('body').on('click', '.prompt-confirm-btn', function () {
    var email = jQuery('input[name="prompt-email"]').val();
    var regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (!regex.test(email)) {
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
    jQuery.post(
        myajax.url, {
            'action': 'mail_about_abnormal_price',
            'email': email,
            'message': message,
            'filename': filename,
            'file_unit': file_unit,
            'material_id': material_id,
            'quantity': quantity,
            'price': price,
            'manual': manual
        },
        function (data) {
            if (data) {
                alert("Success to send the Notice!")
            } else {
                alert("Failed to send the Notice!")
            }
        }
    );
    jQuery('#exception-prompt').hide();
});

jQuery('body').on('mouseover mouseout', '.printing-abnormal-alert', function (event) {
    if (event.type == "mouseover") {
        //鼠标悬浮
        jQuery(this).find('.abnormal-alert-tips').show();
    } else if (event.type == "mouseout") {
        //鼠标离开
        jQuery(this).find('.abnormal-alert-tips').hide();
    }
});
jQuery('body').on('mouseover mouseout', '.cnc-abnormal-alert', function (event) {
    if (event.type == "mouseover") {
        //鼠标悬浮
        jQuery(this).find('.abnormal-alert-tips').show();
    } else if (event.type == "mouseout") {
        //鼠标离开
        jQuery(this).find('.abnormal-alert-tips').hide();
    }
});
jQuery('body').on('mouseover mouseout', '.injection-abnormal-alert', function (event) {
    if (event.type == "mouseover") {
        //鼠标悬浮
        jQuery(this).find('.abnormal-alert-tips').show();
    } else if (event.type == "mouseout") {
        //鼠标离开
        jQuery(this).find('.abnormal-alert-tips').hide();
    }
});

var printingOverRight = false,
    cncOverRight = false,
    piOverRight = false,
    printingNewWidth,
    cncNewWidth,
    piNewWidth,
    printingDragged = false,
    cncDragged = false,
    piDragged = false;
jQuery(document).mousedown(function (e) {
    if (printingOverRight) {
        printingDragged = true;
    }
    if (cncOverRight) {
        cncDragged = true;
    }
    if (piOverRight) {
        piDragged = true;
    }
});

jQuery(document).mouseup(function (e) {
    printingDragged = false;
    cncDragged = false;
    piDragged = false;
});

jQuery(document).mouseover(function (e) {
    // 3D打印部分
    var printingParentOffset = jQuery("#printing-container").offset();
    var printingRelX = e.pageX - printingParentOffset.left;
    var printingRelY = e.pageY - printingParentOffset.top;
    var printingWidth = jQuery("#printing-container").outerWidth();
    // console.log("printingRelX:printingRelY", printingRelX + ":" + printingRelY);
    // console.log("printingouterWidth", printingWidth);

    /* check if mouse is above right border */
    if (printingRelX >= printingWidth - 4 && printingRelX <= printingWidth) {
        jQuery("#printing-container").css("cursor", "col-resize");
        printingOverRight = true;
    } else {
        jQuery("#printing-container").css("cursor", "default");
        printingOverRight = false;
    }
    if (printingDragged) {
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        printingNewWidth = printingRelX - printingWidth;
        // console.log("printingNewWidth: ", printingNewWidth);
        jQuery("#printing-container").width(printingWidth + printingNewWidth);
        jQuery("#printing-container").css('min-width', '');
        jQuery('.material-file-options-qty-wrap').css('display', 'flex');
        jQuery('.printing-full-title').css('display', 'block');
        jQuery('.printing-abbreviated-title').css('display', 'none');
        jQuery('.custom-column-width-2').css({
            width: printingWidth - 470 + 'px',
            minWidth: printingWidth - 470 + 'px'
        });
    }

    // cnc 部分
    var cncParentOffset = jQuery("#cnc-container").offset();
    var cncRelX = e.pageX - cncParentOffset.left;
    var cncRelY = e.pageY - cncParentOffset.top;
    var cncWidth = jQuery("#cnc-container").outerWidth();
    // console.log("cncRelX:cncRelY", cncRelX + ":" + cncRelY);
    // console.log("cncouterWidth", cncWidth);

    /* check if mouse is above right border */
    if (cncRelX >= cncWidth - 4 && cncRelX <= cncWidth) {
        jQuery("#cnc-container").css("cursor", "col-resize");
        cncOverRight = true;
    } else {
        jQuery("#cnc-container").css("cursor", "default");
        cncOverRight = false;
    }
    if (cncDragged) {
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        cncNewWidth = cncRelX - cncWidth;
        // console.log("cncNewWidth: ", cncNewWidth);
        jQuery("#cnc-container").width(cncWidth + cncNewWidth);
        jQuery("#cnc-container").css('min-width', '');
        jQuery('.cnc-material-file-options-qty-wrap').css('display', 'flex');
        jQuery('.custom-cnc-column-width-2').css({
            width: cncWidth - 670 + 'px',
            minWidth: cncWidth - 670 + 'px'
        });
    }

    // pi 部分
    var piParentOffset = jQuery("#pi-container").offset();
    var piRelX = e.pageX - piParentOffset.left;
    var piRelY = e.pageY - piParentOffset.top;
    var piWidth = jQuery("#pi-container").outerWidth();
    // console.log("piRelX:piRelY", piRelX + ":" + piRelY);
    // console.log("piouterWidth", piWidth);

    /* check if mouse is above right border */
    if (piRelX >= piWidth - 4 && piRelX <= piWidth) {
        jQuery("#pi-container").css("cursor", "col-resize");
        piOverRight = true;
    } else {
        jQuery("#pi-container").css("cursor", "default");
        piOverRight = false;
    }
    if (piDragged) {
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        piNewWidth = piRelX - piWidth;
        // console.log("piNewWidth: ", piNewWidth);
        jQuery("#pi-container").width(piWidth + piNewWidth);
        jQuery("#pi-container").css('min-width', '');
        jQuery('.pi-file-mould-part-wrap').css('display', 'block');
        jQuery('.custom-pi-column-width-2').css({
            width: piWidth - 370 + 'px',
            minWidth: piWidth - 370 + 'px'
        });
    }

});

jQuery(document).on('added_to_cart', function () {
    //价格颜色计算
    jQuery(".material-bottom-info-cart a,.material-bottom-info-total-price").css("color","#038b02")
})