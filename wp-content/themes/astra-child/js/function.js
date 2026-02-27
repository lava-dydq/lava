var printingOverRight = false,
    cncOverRight = false,
    piOverRight = false,
    printingNewWidth,
    cncNewWidth,
    piNewWidth,
    printingDragged = false,
    cncDragged = false,
    file_unit='',
    piDragged = false;


jQuery(function () { // 打开页面如果有上传文件的cookies，就显示文件
    jQuery.post(myajax.url, {
        'action': 'update_from_session_files'
    }, function (data) {
        //console.log('file', data);
        enter_data_files();
        var filelen = jQuery('.flies-cover').children().length;
        // console.log('file',filelen);
        if (filelen > 0) {
            jQuery('.file-model-container').show();
            jQuery('.dropBox_wrap').hide();
            jQuery('#files_wrap .preview-link').last().click()
        } else {
            jQuery('.file-model-container').hide();
            jQuery('.dropBox_wrap').show();
        }
    });

    // 获取后处理的价格表
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
            // console.log('finishing_cost', jsondata )
            finishing_cost = jsondata;
        }
    });

    // 处理cookie的bug
    var str = "a:";
    var oldcookie = Cookies.get('session_files');
    // console.log('oldcookie', oldcookie);
    if (oldcookie != 'undefined' && oldcookie != '' && oldcookie != null) {
        if (oldcookie.indexOf(str) != -1) {
            Cookies.remove('session_files', {path: '/'});
        }
    }

    // 文件单位的按钮改变事件
    jQuery('input[name="file_unit"]').change(function () {
        change_active_unit();
    });

    
    // 点击文件名
    jQuery(document).on('click', '.file_name', function () {
        jQuery('.file_name').removeClass('active');
        jQuery(this).addClass('active');

        var box_x = jQuery(this).attr('data-box_x');
        var box_y = jQuery(this).attr('data-box_y');
        var box_z = jQuery(this).attr('data-box_z');
        var volume = jQuery(this).attr('data-volume');
        var surface = jQuery(this).attr('data-surface_area');
        file_unit = jQuery('input[name="file_unit"]:checked').val();
        if (file_unit == "inch") {
            // console.log(file_unit)
            // inch change to mm
            box_x = parseFloat(box_x) / 25.4;
            box_y = parseFloat(box_y) / 25.4;
            box_z = parseFloat(box_z) / 25.4;
            volume = parseFloat(volume) / 25.4;
            surface = parseFloat(surface) / 25.4;
            jQuery(".file-info-unit").text('inch')
            //jQuery('.file-unit-label').trigger("click");
            
        } else {
            // console.log(file_unit)
            jQuery(".file-info-unit").text('mm')
            //jQuery('.file-unit-label').trigger("click");
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
        /*修复于12月09日*/
        jQuery(this).addClass("checked").siblings(".file-unit-label").removeClass("checked");
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

    // cnc后处理点击选择
    jQuery(document).on('change', 'input[name="basic_surface_treatment"], input[name="advanced_surface_treatment"], input[name="color_surface_treatment"]', function () {
        var basic_surface_treatment = jQuery(this).closest('.finishing-option-wrap').find('input[name="basic_surface_treatment"]:checked').closest('.option-check').text();
        var advanced_surface_treatment = jQuery(this).closest('.finishing-option-wrap').find('input[name="advanced_surface_treatment"]:checked').closest('.option-check').text();
        var color_surface_treatment = jQuery(this).closest('.finishing-option-wrap').find('input[name="color_surface_treatment"]:checked').closest('.option-check').text();
        // var protective_coating = jQuery(this).closest('.finishing-option-wrap').find('input[name="protective_coating"]:checked').closest('.option-check').text();
        var text = basic_surface_treatment + ', ' + advanced_surface_treatment + ', ' + color_surface_treatment;
        // var text = surface_treatment;
        // console.log('text', text)
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
        // console.log('text', text)
        jQuery(this).closest('.select-finishing').find('.pi-finish').text(text);
        var jquery = jQuery(this).closest('.pi-box-material');
        update_pi_finish_name(jquery);
    });

    // 文件上传处理
    var load_progress; // = jQuery('#progress');
    var bar; // = jQuery('#bar');
    var percent; // = jQuery('#percent');

    jQuery('.files_stl').change(function () {
        load_progress = jQuery('#progress');
        bar = jQuery('#bar');
        percent = jQuery('#percent');
        if (jQuery(this).val() != '') {
            var error = false;
            var error_msg = '';

            jQuery.each(this.files, function (i, file) {
                if (file.size > 524288000) {
                    error = true;
                    error_msg = 'Error: single file does not exceed 64M.';
                } else if (i > 9) {
                    error = true;
                    error_msg = 'Error: single can upload up to 10 files.';
                }
            });
            // console.log('file_stl',this.files);

            jQuery('#viewer').empty();
            jQuery('#model-show-container .canvas-number').remove();
            // jQuery('#files_name').empty();
            jQuery('.preview-info').show();
            jQuery('.preview-info .title').show();
            jQuery('#total_files').html('--');
            jQuery('#total_capacity').html('--');


            if (error == false) {
                jQuery('.file-model-container').show();
                jQuery('.dropBox_wrap').hide();

                jQuery(this).parents('.form_files').ajaxSubmit({
                    async: true,
                    timeout: 0,
                    url: myajax.url,
                    beforeSend: function () { // status.empty();
                        jQuery('.preview-info .title').hide();
                        var percentVal = '0%';
                        bar.width(percentVal);
                        bar.css("background-color", "#ED910E");
                        var percenthtml = 'Uploading: ' + percentVal;
                        percent.html(percenthtml);
                        load_progress.show();
                    },
                    uploadProgress: function (event, position, total, percentComplete) {
                        var percentVal = percentComplete + '%';
                        bar.width(percentVal);
                        var percenthtml = 'Uploading: ' + percentVal;
                        if (percentComplete == 100) {
                            percenthtml = 'Upload completed. Calculating...';
                        }
                        percent.html(percenthtml);
                        // console.log(percentVal, position, total);
                    },
                    success: function (data) { // console.log('success', JSON.parse(data));
                        load_progress.hide();

                        if (data != 0) {
                            //取消头部固定
                         jQuery(".fix-head").removeClass("fix-head")
                            var data = JSON.parse(data);


                            jQuery.each(data.files, function (i, file) {
                                urlToBlob(file, blogData);
                            });

                            //切换到最后一个零件
                            jQuery('#files_wrap .preview-link').last().click()

                            // jQuery.post(myajax.url, {
                            //     'action': 'mail_to_sale',
                            //     'file_name': data.files
                            // }, function () {});
                            // jQuery.ajax({
                            //     async: true,
                            //     type: "POST",
                            //     url: myajax.url,
                            //     data: {
                            //         'action': 'mail_to_sale',
                            //         'file_name': data.files,
                            //     }
                            // });

                        } else {
                            alert('file upload error! Please upload the files again!');
                            window.history.go(0);
                        }
                    },
                    complete: function (xhr) { // status.html(xhr.responseText);
                        load_progress.hide();
                    }
                });
            } else {
                if (! error_msg) 
                    error_msg = 'Error STL File';
                

                jQuery(this).val('');
                alert(error_msg);
            }
        }
    });
    /* 拖动时触发*/
    document.addEventListener("dragstart", function (event) {
        event.preventDefault();
    });
    // 在拖动p元素的同时,改变输出文本的颜色
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
        // console.log(event.target.id)
        if (event.target.id == "" || event.target.id == "drop" ||event.target.id == "dropbox" || event.target.id == "files_wrap") {
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
            // jQuery('#files_name').empty();
            jQuery('.preview-info').show();
            jQuery('.preview-info .title').show();
            jQuery('#total_files').html('--');
            jQuery('#total_capacity').html('--');


            if (error == false) {
                jQuery('.file-model-container').show();
                jQuery('.dropBox_wrap').hide();

                var formData = new FormData();
                formData.append('action', "upload_stl_file"); // 存入formData对象
                jQuery.each(fileList, function (i, file) {
                    formData.append('files_stl[]', file); // 存入formData对象
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
                    success: function (data) { // console.log('success', JSON.parse(data));
                        load_progress.hide();

                        if (data != 0) {
                            var data = JSON.parse(data);
                            // console.log(data);
                            jQuery.each(data.files, function (i, file) {
                                urlToBlob(file, blogData);
                            });
                            // jQuery.post(myajax.url, {
                            //     'action': 'mail_to_sale',
                            //     'file_name': data.files
                            // }, function () {});

                        } else {
                            alert('file upload error! Please upload the files again!');
                            window.history.go(0);
                        }
                    }
                });
            } else {
                if (! error_msg) 
                    error_msg = 'Error STL File';
                

                jQuery(this).val('');
                alert(error_msg);
            }

        }
    });


    oneAjax();
    twoAjax();

});


// render model, show files, calculate price 渲染模型，显示文件，计算价格
function enter_data_files() {

    var oldstorage = Storage.prototype.get('session_files')
    if (! oldstorage || oldstorage == 'undefined' || oldstorage == '[]' || oldstorage == 'a:0:{}') {
        var storage = [];
    } else {
        var storage = Storage.prototype.get('session_files');
    }
    //console.log(storage);
    var filesData = storage;
    // console.log('filesData',filesData);

    var file_unit = jQuery('input[name="file_unit"]:checked').val();

    //console.log('436'+file_unit);
    if (typeof(file_unit) == 'undefined') {
        file_unit = 'mm';
        console.log(file_unit)
        jQuery(".file-info-unit").text(file_unit)
    }


    var files_volumes = new Array();

    jQuery('.flies-cover').empty();

    var total_volume = 0;
    var total_box_volume = 0;
    // var total_weight   = 0;
    // var total_density  = 0;
    var total_area = 0;
    // var uploaded_files = '';
    var class_link = '';
    var count_link = 0;
    // var weight_calculation = 0;
    var price_calculation = 0;
    var leadtime_val = 1;

    // jQuery('#model-show-container .canvas-number').length == 1 防止上传多个文件时重复渲染文件
    jQuery('#model-show-container').append('<div class="canvas-number"></div>');
    // if (jQuery('#model-show-container .canvas-number').length == 1) {
    //     let file_item = filesData.slice(-1)[0]
    //     if(file_item != undefined){
    //         var stlview = new STLView("viewer", file_item['url']);
    //         stlview.initScene();
    //     }
    // }

    //console.log(filesData)
    jQuery.each(filesData, function (count_link, file) {
        if (typeof(file['volume']) == "undefined") 
            file['volume'] = 0;
        
        if (typeof(file['surface_area']) == "undefined") 
            file['surface_area'] = 0;
        
        if (typeof(file['box_volume']) == "undefined") 
            file['box_volume'] = 0;
        
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
            //console.log('495'+file_unit)
            if (file_unit == "inch") { // inch change to mm
                box_x = parseFloat(box_x) / 25.4;
                box_y = parseFloat(box_y) / 25.4;
                box_z = parseFloat(box_z) / 25.4;
                volume = parseFloat(volume) / 25.4;
                surface_area = parseFloat(surface_area) / 25.4;
                jQuery(".file-info-unit").text('inch')
            } else {
                jQuery(".file-info-unit").text('mm')
            }
            // console.log('506'+file_unit)
            var dimensions = parseFloat(box_x).toFixed(2) + '*' + parseFloat(box_y).toFixed(2) + '*' + parseFloat(box_z).toFixed(2);
            jQuery('.file-info-dimensions').text(dimensions);
            jQuery('.file-info-volume').text(parseFloat(volume).toFixed(2));
            jQuery('.file-info-surface').text(parseFloat(surface_area).toFixed(2));
        }
        // alert(file['volume']);
        // files_volumes[count_link] = file['volume'].toFixed(2) * 1.160 * 0.001;

         // console.log(file_unit)
        jQuery('.flies-cover').append('<div id="file_' + count_link + '" class="file_name ' + class_link + '" data-file_unit="' + file_unit + '" data-volume="' + parseFloat(file['volume']) + '" data-surface_area="' + parseFloat(file['surface_area']) + '" data-box_volume="' + parseFloat(file['box_volume']) + '" data-box_x="' + parseFloat(file['box_xyz'].x) + '" data-box_y="' + parseFloat(file['box_xyz'].y) + '" data-box_z="' + parseFloat(file['box_xyz'].z) + '"><div data-link="' + file['url'] + '" class="preview-link ' + class_link + '">' + file['filename'] + '</div> <div href="#" class="delete-link del_stl" data-file="' + file['filename'] + '"><svg t="1631517961861" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9709" width="20" height="20"><path d="M584.157867 532.821333l120.695466-120.695466a51.2 51.2 0 1 0-72.430933-72.362667L511.726933 460.3904 391.031467 339.7632a51.2 51.2 0 1 0-72.362667 72.362667l120.695467 120.695466-120.695467 120.695467a51.2 51.2 0 0 0 72.362667 72.362667l120.695466-120.6272 120.695467 120.695466a51.2 51.2 0 1 0 72.362667-72.430933L584.226133 532.821333z m-72.362667 477.866667a477.866667 477.866667 0 1 1 0-955.733333 477.866667 477.866667 0 0 1 0 955.733333z" p-id="9710" fill="#888888"></path></svg></div></div>');
    });
    // jQuery('#uploaded_files').val(uploaded_files);


    jQuery('#total_files').html(Object.keys(filesData).length);
    if (file_unit == "inch") { // inch change to mm
        total_volume = parseFloat(total_volume) / 25.4;
    }
    // 并行执行3个函数
    setTimeout(() => {
        Promise.all([
            add_file_ma_main(filesData, leadtime_val),
            add_file_cnc_main(filesData),
            add_file_pi_main(filesData),

        ]).then(function (data) {
            //console.log(data);
        })
    }, 3000);

    jQuery('#files_wrap .preview-link').last().click()
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
function blogData(fileData, data) { // console.log('fileData',fileData);
    var reader = new FileReader();
    reader.readAsArrayBuffer(data);
    reader.onload = function () { // console.log('result',reader.result);
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
        if ((filesData['quote'] ?? '') === '') {
            jQuery.post(myajax.url, {
                'action': 'get_stl_cnc_quote',
                'f': filesData['filename'],
                'l': filesData['box_xyz'].x,
                'w': filesData['box_xyz'].y,
                'h': filesData['box_xyz'].z,
                's': filesData['surface_area'],
                'c': filesData['curved_surface'],
                'v': filesData['volume']
            }, function (data) {
                var result = JSON.parse(data); //获取到的json数据
                filesData['File'] = result['File'];
                filesData['quote']  = result['Quote'];
            })
        }

       
        var oldstorage = Storage.prototype.get('session_files')
        if (! oldstorage || oldstorage == 'undefined' || oldstorage == '[]' || oldstorage == 'a:0:{}') {
            var storage = [];
        } else {
            var storage = Storage.prototype.get('session_files');
        }

        storage.push(filesData);
        //debugger;
        Storage.prototype.set("session_files",storage,180)

        enter_data_files();
    }
}

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
        // console.log('count_price_one',calculated_price_one);
        // console.log('floor_price',floor_price);
        if (calculated_price_one < floor_price) {
            var calculated_price = floor_price * args['quantity'];
        } else {
            var calculated_price = calculated_price_one * args['quantity'];
        }
    } else {
        var calculated_price = (weight) * (args['unit_price'] * fixed_cofficient) * (weight_based_figure / exchange_rate) * (parseFloat(args['lead_time']));
        // console.log('count_price',calculated_price);
        // console.log('floor_price',floor_price);
        if (calculated_price<floor_price) {
            calculated_price = floor_price;
        }
    }
    // var calculated_price = (weight) * (args['unit_price'] * fixed_cofficient) * (weight_based_figure / exchange_rate) * (args['lead_time']);
    // var calculated_price = (weight) * (args['unit_price'] * fixed_cofficient) * (weight_based_figure / exchange_rate) * (args['lead_time']);
    // alert(weight +'*'+ unit_price +'*'+ fixed_cofficient +'*'+ weight_based_figure +'/'+ exchange_rate +'*'+ lead_time);
    return Number(calculated_price);
}


// 对数组去重
function removeDuplicate(arr) {
    const map = new Map();
    const newArr = [];

    arr.forEach(item => {
        if (! map.has(item)) { // has()用于判断map是否包为item的属性值
            map.set(item, true); // 使用set()将item设置到map中，并设置其属性值为true
            newArr.push(item);
        }
    });

    return newArr;
}




// 点击文件后面的删除按钮，删除一个文件
jQuery(document).on('click', '.del_stl', function() {
	//获取删除的文件名
	var file_name = jQuery(this).attr('data-file');
	//删除当前的文件
	jQuery(this).closest('.file_name').remove();
	//判断是否还有文件存在
	if (jQuery('.file_name').length > 0) {

		//删除对应文件名的cookie
		var storage = Storage.prototype.get('session_files');
		//console.log('storage', storage);
		for (var i = 0; i < storage.length; i++) {
			if (storage[i]['filename'] == file_name) {
				storage.splice(i, 1);
			}
		}
        window.localStorage.removeItem('session_files');
		Storage.prototype.set('session_files',storage,180);
		

	} else {
		window.localStorage.removeItem('session_files');
        window.localStorage.removeItem('session_sku');//20230201
	}
	jQuery.post(
		myajax.url,
		{
			'action' : 'update_from_session_files'
		},
		function(data){
			enter_data_files();
			var filelen = jQuery('.flies-cover').children().length;
			//console.log('file',filelen);
			if (filelen > 0) {
				jQuery('.file-model-container').show();
				jQuery('.dropBox_wrap').hide();
			} else {
				jQuery('.file-model-container').hide();
				jQuery('.dropBox_wrap').show();
			}
		}
	);
});


Storage.prototype.set = (key, value, expire) => {
    if (isNaN(expire) || expire < 1) {
        throw new Error('有效期应为一个有效数值')
    }
    let time = expire * 86_400_000
    let obj = {
        data: value, // 存储值
        time: Date.now(), // 存值时间戳
        expire: time, // 过期时间
    }
    localStorage.setItem(key, JSON.stringify(obj))
}

Storage.prototype.get = key => {
    let val = localStorage.getItem(key)
    if (! val) 
        return val
    
    val = JSON.parse(val)
    if (Date.now() > val.time + val.expire) {
        localStorage.removeItem(key)
        return 'null'
    }
    return val.data
}

Storage.prototype.remove=key=>{
    localStorage.removeItem(key)
}
// 生成唯一编号
function GenNonDuplicateID(){
    return Math.random().toString(36).substr(2)
}



 
  