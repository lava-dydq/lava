// 移动端js

//一键关闭全部展开
jQuery(document).on('click', '.show-files-arrow-close-all .iconfont', function () {
    if (jQuery(".file_name").length === 0) {
        return
    }

    let re_action = false;
    if(jQuery(this).attr('class').indexOf("zhankai") > -1){
        re_action = true
    }

    let expend = jQuery(this).parents('.material-box-head-name').parent().find('.show-files-arrow');
    for (let expendKey = 0; expendKey < expend.length; expendKey++) {
        if (re_action){ // 展开
            if (jQuery(expend[expendKey]).has('.fa-angle-down').length > 0) {
                jQuery(expend[expendKey]).click()
            }
        }else {
            if (jQuery(expend[expendKey]).has('.fa-angle-up').length > 0) {
                jQuery(expend[expendKey]).click()
            }
        }
    }
})

// 点击材料的向下箭头,显示或隐藏文件框
jQuery('body').on('click', '.printing-show-files-arrow', function () {
    if (jQuery('.file_name').length == 0) {
        jQuery('#alertToUploadFile').show();
        jQuery(this).prop('disabled', false);
        return;
    } else {
        var display = jQuery(this).closest('.box-material').find('.files-box').css('display');
        var parent = jQuery(this).parent().parent().parent().eq(0);
        if (display == 'none') {
            jQuery(this).closest('.box-material').find('.files-box').show("slow");
            jQuery(this).find('.fa-solid').removeClass('fa-angle-down');
            jQuery(this).find('.fa-solid').addClass('fa-angle-up');
            parent.addClass('open-box-material');
        } else {
            jQuery(this).closest('.box-material').find('.files-box').hide("slow");
            jQuery(this).find('.fa-solid').removeClass('fa-angle-up');
            jQuery(this).find('.fa-solid').addClass('fa-angle-down');
            parent.removeClass('open-box-material');
        }
    }
});
jQuery('body').on('click', '.cnc-show-files-arrow', function () {
    if (jQuery('.file_name').length == 0) {
        jQuery('#alertToUploadFile').show();
        jQuery(this).prop('disabled', false);
        return;
    } else {
        var display = jQuery(this).closest('.cnc-box-material').find('.cnc-files-container').css('display');
        var parent = jQuery(this).parent().parent().parent().eq(0);
        if (display == 'none') {
            jQuery(this).closest('.cnc-box-material').find('.cnc-files-container').show("slow");
            jQuery(this).find('.fa-solid').removeClass('fa-angle-down');
            jQuery(this).find('.fa-solid').addClass('fa-angle-up');
            parent.addClass('open-box-material');
        } else {
            jQuery(this).closest('.cnc-box-material').find('.cnc-files-container').hide("slow");
            jQuery(this).find('.fa-solid').removeClass('fa-angle-up');
            jQuery(this).find('.fa-solid').addClass('fa-angle-down');
            parent.removeClass('open-box-material');
        }
    }
});
jQuery('body').on('click', '.pi-show-files-arrow', function () {
    if (jQuery('.file_name').length == 0) {
        jQuery('#alertToUploadFile').show();
        jQuery(this).prop('disabled', false);
        return;
    } else {
        var display = jQuery(this).closest('.pi-box-material').find('.pi-files-container').css('display');
        var parent = jQuery(this).parent().parent().parent().eq(0);
        if (display == 'none') {
            jQuery(this).closest('.pi-box-material').find('.pi-files-container').show("slow");
            jQuery(this).find('.fa-solid').removeClass('fa-angle-down');
            jQuery(this).find('.fa-solid').addClass('fa-angle-up');
            parent.addClass('open-box-material');
        } else {
            jQuery(this).closest('.pi-box-material').find('.pi-files-container').hide("slow");
            jQuery(this).find('.fa-solid').removeClass('fa-angle-up');
            jQuery(this).find('.fa-solid').addClass('fa-angle-down');
            parent.removeClass('open-box-material');
        }
    }
});

// 图标点击事件
jQuery(document).on('click', '.printing-fa-angles-wrap', function () {
    if (jQuery(this).find('.open').css('display') === 'none') {
        jQuery(this).find('.open').show();
        jQuery(this).find('.close').hide();
    }
});

// 监听页面滚动，浮动标题栏
jQuery(window).scroll(function (event) {
    let dom_top = jQuery('#printing-container').offset().top,
        center_dom_top = jQuery('#cnc-container').offset().top,
        bottom_dom_top = jQuery('#pi-container').offset().top,
        foot_dom_top = jQuery('#table-foot-block').offset().top,
        float_title_height = jQuery('#xia-float-title').outerHeight(),
        table_head_height = jQuery('.material-box-head-name').outerHeight(),
        window_top = jQuery(window).scrollTop() + float_title_height + (table_head_height / 2); // 加上顶层浮动标签高度，提现浮动

    // console.log('dom_top:', dom_top);
    // console.log('window_top:', window_top);

    // dom_top -= 100; // 提前
    if (window_top >= dom_top && window_top <= foot_dom_top) {
        // 浮动标题
        if (!jQuery('#xia-float-title').hasClass('xia-float-position-title')) {
            jQuery('#xia-float-title').addClass('xia-float-position-title');
            // jQuery('#xia-float-table-head').addClass('xia-float-position-thead');
            jQuery('#ast-mobile-header').hide();
        }

        // 浮动表头
        if (window_top >= dom_top && window_top < center_dom_top){
            if (!jQuery('#printing-container .material-box-head-name').hasClass('xia-float-position-thead')) {
                // jQuery('.material-box-head-name').removeClass('xia-float-position-thead');
                jQuery('#printing-container .material-box-head-name').addClass('xia-float-position-thead');
            }
        }else if (window_top >= center_dom_top && window_top < bottom_dom_top){
            if (!jQuery('#cnc-container .material-box-head-name').hasClass('xia-float-position-thead')) {
                // jQuery('.material-box-head-name').removeClass('xia-float-position-thead');
                jQuery('#cnc-container .material-box-head-name').addClass('xia-float-position-thead');
            }
        }else if (window_top >= bottom_dom_top){
            if (!jQuery('#pi-container .material-box-head-name').hasClass('xia-float-position-thead')) {
                // jQuery('.material-box-head-name').removeClass('xia-float-position-thead');
                jQuery('#pi-container .material-box-head-name').addClass('xia-float-position-thead');
            }
        }

    } else {
        // 恢复标题位置
        if (jQuery('#xia-float-title').hasClass('xia-float-position-title')) {
            jQuery('#xia-float-title').removeClass('xia-float-position-title');
            // jQuery('#xia-float-table-head').removeClass('xia-float-position-thead');
            // jQuery('.material-box-head-name').removeClass('xia-float-position-thead');
            jQuery('#ast-mobile-header').show();
        }
    }

    // 图标高亮判断
    let icon_parent = jQuery('#xia-float-title .printing-fa-angles-wrap.fa-angles-wrap');
    iconHighlight(jQuery('#printing-container'), dom_top, window_top, icon_parent.eq(0));
    iconHighlight(jQuery('#cnc-container'), jQuery('#cnc-container').offset().top, window_top, icon_parent.eq(1));
    iconHighlight(jQuery('#pi-container'), jQuery('#pi-container').offset().top, window_top, icon_parent.eq(2), true);

    //全屏Dom判断
    icon_parent = jQuery('.full-screen-wrap.xia-full-screen-wrap .full-screen');
    iconHighlight(jQuery('#printing-container'), dom_top, window_top, icon_parent.eq(0));
    iconHighlight(jQuery('#cnc-container'), jQuery('#cnc-container').offset().top, window_top, icon_parent.eq(1));
    iconHighlight(jQuery('#pi-container'), jQuery('#pi-container').offset().top, window_top, icon_parent.eq(2), true);
});

// 图标高亮判断
function iconHighlight(dom, dom_top, window_top, icon_dom, is_end = false) {
    let dom_height = dom.height(),
        window_height = jQuery(window).height(),
        start_height = dom_top - (window_height / 2),
        end_height = dom_top + dom_height - (window_height / 2);

    if (window_top >= start_height && (window_top <= end_height || is_end)) {
        if (icon_dom.find('.open').css('display') === 'none') {
            icon_dom.find('.open').show();
            icon_dom.find('.close').hide();
        }
    } else {
        if (icon_dom.find('.open').css('display') !== 'none') {
            icon_dom.find('.open').hide();
            icon_dom.find('.close').show();
        }
    }
}

// 全屏OR退出全屏 方法
function fullScreenControl(type = 1) {
    if (type === 1) {
        //全屏
        var docElm = document.documentElement;
        //W3C
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        }
        //FireFox
        else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        }
        //Chrome等
        else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }
        //IE11
        else if (document.msRequestFullscreen) {
            document.msRequestFullscreen();
        }
        if (document.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
    } else {
        //退出全屏
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
}

// 判断当前是否全屏
function isFullscreen() {
    return document.fullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement || false;
}

// 全屏
jQuery(document).on('click', '.full-screen', function () {
    fullScreenControl();

    jQuery('.full-screen').css('display', 'none');
    jQuery('.minimize-screen').css('display', 'block');

    setTimeout(function () {
        var screen_height = window.innerHeight;
        console.log('screen_height', screen_height)
        var aHeight = screen_height - 216;
        var bHeight = aHeight + 'px';
        jQuery('.materials-select-outer-container').css({
            position: 'fixed',
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px',
            width: '100%',
            marginLeft: '0',
            marginRight: '0',
            overflowY: 'auto'
        });

        // 浮动标题
        if (!jQuery('#xia-float-title').hasClass('xia-float-position-title')) {
            jQuery('#xia-float-title').addClass('xia-float-position-title');
            jQuery('#xia-float-table-head').addClass('xia-float-position-thead');
            jQuery('#ast-mobile-header').hide();
        }
        jQuery('#printing-container .materials-select-inner-container').css('paddingTop',
            jQuery('#xia-float-title').height() + jQuery('#xia-float-table-head').height());

        // 图标高亮判断
        jQuery('.materials-select-outer-container').scroll(function () {
            // console.log('window_top:', jQuery('.materials-select-outer-container').scrollTop());

            let window_top = jQuery('.materials-select-outer-container').scrollTop();
            let icon_parent = jQuery('#xia-float-title .printing-fa-angles-wrap.fa-angles-wrap');
            iconHighlight(jQuery('#printing-container'), 0, window_top, icon_parent.eq(0));
            iconHighlight(jQuery('#cnc-container'), jQuery('#printing-container').height(), window_top, icon_parent.eq(1));
            iconHighlight(jQuery('#pi-container'),
                jQuery('#printing-container').height() + jQuery('#cnc-container').height(),
                window_top, icon_parent.eq(2));

            //收缩Dom判断
            icon_parent = jQuery('.full-screen-wrap.xia-full-screen-wrap .minimize-screen');
            iconHighlight(jQuery('#printing-container'), 0, window_top, icon_parent.eq(0));
            iconHighlight(jQuery('#cnc-container'), jQuery('#cnc-container').offset().top, window_top, icon_parent.eq(1));
            iconHighlight(jQuery('#pi-container'), jQuery('#pi-container').offset().top, window_top, icon_parent.eq(2), true);
        });

    }, 100);
});

// 旋转屏幕
jQuery(document).on('click', '.horizontal-screen-icon', function () {
    if (!isFullscreen()) {
        fullScreenControl();
        // 强制横屏
        window.screen.orientation.lock("landscape-primary");
    } else {
        fullScreenControl(0);
    }
});

//退出全屏
jQuery(document).on('click', '.minimize-screen', function () {
    jQuery('.materials-select-outer-container').css({
        position: 'static',
        top: '',
        left: '',
        right: '',
        bottom: '',
        width: '100vw',
        marginLeft: 'calc( -50vw + 50%)',
        marginRight: 'calc( -50vw + 50%)',
        overflow: 'unset'
    });
    jQuery('.full-screen').css('display', 'block');
    jQuery('.minimize-screen').css('display', 'none');

    // 恢复标题位置
    if (jQuery('#xia-float-title').hasClass('xia-float-position-title')) {
        jQuery('#xia-float-title').removeClass('xia-float-position-title');
        jQuery('#xia-float-table-head').removeClass('xia-float-position-thead');
        jQuery('#ast-mobile-header').show();
    }
    jQuery('#printing-container .materials-select-inner-container').css('paddingTop', 0);

    fullScreenControl(0);
});

//文件上传处理
var load_progress; //= jQuery('#progress');
var bar; //= jQuery('#bar');
var percent; //= jQuery('#percent');
jQuery('body').on('change', '.files_stl', function () {
// jQuery('.files_stl').change(function () {
    load_progress = jQuery('#progress');
    bar = jQuery('#bar');
    percent = jQuery('#percent');
    let file_name = jQuery(this).val();
    if (file_name != '') {
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
        console.log('file_stl', this.files);

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

            let progress_html = jQuery(`
                    <div class="file_name  active" >
                        <div class="preview-link  active">${file_name}</div> 
                        <div class="delete-link del_stl xia-delete-link">
                            <svg t="1631517961861" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9709" width="20" height="20">
                                <path d="M584.157867 532.821333l120.695466-120.695466a51.2 51.2 0 1 0-72.430933-72.362667L511.726933 460.3904 391.031467 339.7632a51.2 51.2 0 1 0-72.362667 72.362667l120.695467 120.695466-120.695467 120.695467a51.2 51.2 0 0 0 72.362667 72.362667l120.695466-120.6272 120.695467 120.695466a51.2 51.2 0 1 0 72.362667-72.430933L584.226133 532.821333z m-72.362667 477.866667a477.866667 477.866667 0 1 1 0-955.733333 477.866667 477.866667 0 0 1 0 955.733333z" p-id="9710" fill="#888888"></path>
                            </svg>
                        </div>
                    </div>
                    
                    <div id="percent_progress_shell">
                        <div id="percent_progress"></div>
                    </div>
                `);

            jQuery(this).parents('.form_files').ajaxSubmit({
                url: myajax.url,
                beforeSend: function (event) {
                    //status.empty();
                    jQuery('.preview-info .title').hide();
                    var percentVal = '0%';
                    bar.width(percentVal);
                    bar.css("background-color", "#ED910E");
                    var percenthtml = 'Uploading: ' + percentVal;
                    percent.html(percenthtml);
                    load_progress.show();
                    jQuery('#files_wrap').append(progress_html);
                    jQuery('#percent_progress').width(percentVal);
                    jQuery(document).on('click', '.xia-delete-link', function () {
                        event.abort();
                        progress_html.remove();
                    });
                },
                uploadProgress: function (event, position, total, percentComplete) {
                    var percentVal = percentComplete + '%';
                    bar.width(percentVal);
                    var percenthtml = 'Uploading: ' + percentVal;
                    if (percentComplete == 100) {
                        percenthtml = 'Upload completed. Calculating...';
                        progress_html.remove();
                    }
                    percent.html(percenthtml);
                    // console.log(percentVal, position, total);
                    jQuery('#percent_progress').width(percentVal);
                },
                success: function (data) {
                    console.log('success', JSON.parse(data));
                    load_progress.hide();

                    if (data != 0) {
                        var data = JSON.parse(data);
                        jQuery('#percent_progress_shell').html('Rendering...');
                        jQuery.each(data.files, function (i, file) {
                            urlToBlob(file, blogData);
                        });
                        jQuery('#percent_progress_shell').remove();
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
                },
                complete: function (xhr) {
                    //status.html(xhr.responseText);
                    load_progress.hide();
                    progress_html.remove();
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

jQuery(document).on('change', 'input[name="xia-lead-time-option"]', function () {
    var leadtime = jQuery(this).closest('.option-check').text();
    jQuery(this).closest('.select-lead-time').find('.printing-leadtime').text(leadtime);
    jQuery(this).closest('.lead-time-option-wrap').hide();
    var jquery = jQuery(this).closest('.box-material');
    update_printing_leadtime_name(jquery);
});

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
    // if (!window.localStorage) {
    //     alert("The browser does not support localstorage, please use a later browser or change the browser.");
    // } else {
    //     var localStorage = window.localStorage;
    //     var getStorage = localStorage.getItem('session_files');
    //     if (getStorage != null) {
    //         var jsonStorage = JSON.parse(getStorage);
    //     } else {
    //         var jsonStorage = [];
    //     }
    // }
    var filesData = Storage.prototype.get('session_files') ?? [];
    console.log('filesData', filesData);

    var file_unit = jQuery('input[name="file_unit"]:checked').val();
    if (typeof (file_unit) == 'undefined') {
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
    // var count_link = 0;
    //var weight_calculation = 0;
    var price_calculation = 0;
    var leadtime_val = 1;

    //jQuery('#model-show-container .canvas-number').length == 1 防止上传多个文件时重复渲染文件
    jQuery('#model-show-container').append('<div class="canvas-number"></div>');
    if (jQuery('#model-show-container .canvas-number').length == 1) {
        let file_item = filesData.slice(-1)[0]
        if(file_item != undefined){
            var stlview = new STLView("viewer", file_item['url']);
            stlview.initScene();
        }
    }

    jQuery.each(filesData, function (i, file) {
        if (typeof (file['volume']) == "undefined") file['volume'] = 0;
        if (typeof (file['surface_area']) == "undefined") file['surface_area'] = 0;
        if (typeof (file['box_volume']) == "undefined") file['box_volume'] = 0;
        total_volume = total_volume + parseFloat(file['volume']);
        total_area = total_area + parseFloat(file['surface_area']);
        total_box_volume = total_box_volume + parseFloat(file['box_volume']);

        class_link = '';
        if (i === filesData.length - 1) {
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
        // count_link++;

        jQuery('.flies-cover').append('<div class="file_name ' + class_link + '" data-file_unit="' + file_unit + '" data-volume="' + parseFloat(file['volume']) +
            '" data-surface_area="' + parseFloat(file['surface_area']) + '" data-box_volume="' + parseFloat(file['box_volume']) +
            '" data-box_x="' + parseFloat(file['box_xyz'].x) + '" data-box_y="' + parseFloat(file['box_xyz'].y) +
            '" data-box_z="' + parseFloat(file['box_xyz'].z) + '"><div data-link="' + file['url'] + '" class="preview-link ' + class_link + '">' +
            file['filename'] + '</div> <div href="#" class="delete-link del_stl" data-file="' + file['filename'] +
            '"><svg t="1631517961861" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9709" width="20" height="20"><path d="M584.157867 532.821333l120.695466-120.695466a51.2 51.2 0 1 0-72.430933-72.362667L511.726933 460.3904 391.031467 339.7632a51.2 51.2 0 1 0-72.362667 72.362667l120.695467 120.695466-120.695467 120.695467a51.2 51.2 0 0 0 72.362667 72.362667l120.695466-120.6272 120.695467 120.695466a51.2 51.2 0 1 0 72.362667-72.430933L584.226133 532.821333z m-72.362667 477.866667a477.866667 477.866667 0 1 1 0-955.733333 477.866667 477.866667 0 0 1 0 955.733333z" p-id="9710" fill="#888888"></path></svg></div></div>');
    });
    //jQuery('#uploaded_files').val(uploaded_files);

    // jQuery('.flies-cover').find('.preview-link:last').click()

    jQuery('#total_files').html(Object.keys(filesData).length);
    if (file_unit == "inch") {
        // inch change to mm
        total_volume = 25.4 * 25.4 * 25.4 * parseFloat(total_volume);
    }

    // Add Files in Table
    jQuery('.box-material').each(function (i) {
        var price_calc = [];
        var price = jQuery(this).attr('data-price_item');
        var is_painting = jQuery(this).attr('data-is_painting');
        var is_screen = jQuery(this).attr('data-is_screen');
        var box = jQuery(this).find('.files-box');
        var Unitprice = jQuery(this).attr('data-unit_price');
        var ProductID = jQuery(this).attr('id');
        var ProductID_tag = jQuery(this).attr('id');
        var density_val = jQuery(this).attr('data-density');

        let init_i = i;

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
                var desc = 'desc 描述'
                var label = `<div class="color-tips" style="display: none">${desc}</div>`
                if (i == 0) {
                    var default_color = coption;
                    color_option_html += '<label class="option-check">' + label + '<input type="radio" hidden="true" name="printing-color-option" checked="checked" value="' + coption + '">' + coption + '</label>';
                } else {
                    color_option_html += '<label>' + label + '<input type="radio" hidden="true" name="printing-color-option" value="' + coption + '">' + coption + '</label>';
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
        var price_unit;
        var totalprice = 0;
        var price_unit_array = new Array();
        jQuery.each(filesData, function (i, file) {
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
        jQuery.each(filesData, function (i, file) {
            // 价格低于最低价的逻辑
            if (mytotal < price_calc['floor_price']) {
                totalprice = Number(price_calc['floor_price']);
                price_unit = Number(totalprice / mytotal * price_unit_array[i]).toFixed(2);
            } else {
                totalprice = mytotal;
                price_unit = price_unit_array[i];
            }

            //console.log('mytotal',mytotal);
            //console.log('totalprice',typeof(price_unit));
            html = `<div class="file-box duplicate_cols_outer price-father" id="${ProductID_tag}-${i}" data-one_price="${parseFloat(price_unit)}" data-file="` + file['filename'] + '" data-file_unit="' + file_unit + '" quantity-item="' + price_calc['quantity'] + '" price-item="' + price_unit_array[i] + '" data-volume="' + parseFloat(file['volume']) +
                '" data-surface_area="' + parseFloat(file['surface_area']) + '" data-box_volume="' + parseFloat(file['box_volume']) +
                `" data-box_x="${parseFloat(file['box_xyz'].x)}"
                 data-box_y="${parseFloat(file['box_xyz'].y)}" 
                 data-box_z="${parseFloat(file['box_xyz'].z)}" >` +
                '<div class="file-box-filelist">' +
                // '<div class="material-file-img custom-column-width-1"><img src="https://www.3dprintingservice.cc/wp-content/uploads/woocommerce-placeholder-300x300.png" alt="default img"></div>' +
                // '<div class="material-file-process custom-column-width-1"></div>' +

                // '<div class="material-file-name custom-column-width-2 material-item-overflow">' +

                '<div class="preview-link" data-link="' + file['url'] + '">' + file['filename'] + '</div>' +
                // '<div class="material-file-options-qty-wrap">' +

                '<div class="color-process">' +
                '<div class="select-options select-color">' +
                '<div><div class="printing-color">' + default_color + '</div><span class="color-down"><i class="fa-solid fa-angle-down"></i></span></span></div>' +
                '<div class="option-wrap color-option-wrap" style="display: none;">' + color_option_html + '</div>' +
                '</div>' +

                '<div class="printing-material-process material-file-options-qty-wrap printing-column-process">' + price_calc['material_process'] + '</div>' +

                '</div>' +

                '<div class="material-file-select-wrap">' +
                '<div class="col-quantity col_float_left">' +
                '<div class="bt-minus"><i class="fa-solid fa-circle-minus"></i></div>' +
                '<input type="text" class="plus-minus input-text qty text" name="quantity" value="1" maxlength="10">' +
                '<div class="bt-plus"><i class="fa-solid fa-circle-plus"></i></div>' +
                '</div>' +

                '<div class="select-options select-lead-time">' +
                '<div><div class="printing-leadtime">' + default_leadtime + '</div><span class="lead-time-down"><i class="fa-solid fa-angle-down"></i></span></span></div>' +
                '<div class="option-wrap lead-time-option-wrap" style="display: none;">' + lead_time_option_html + '</div>' +
                '</div>' +
                '</div>' +

                // '</div>' +

                // '</div>' +

                '<div class="col-price col_float_left">' +
                '<div>$<span >' + parseFloat(price_unit).toFixed(2) + '</span></div>' +
                `<div class="printing-abnormal-list base-price-list" mid="${ProductID_tag}">
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
                </div>`+
                '</div>' +
                '<div style="width: 5%;"></div>' +
                '<div class="file-ation-wrap custom-column-width-4">' +
                '<div class="printing-abnormal-alert">' +
                // '<i class="fa-solid fa-bell"></i>' +
                '   <img class="img_icon" src="' + static_img + '/img/new-icon/提醒.png" alt="">' +
                '<div class="abnormal-alert-tips">Click to ring the bell if you find the price too high, too low, looks strange. Or any other questions! We will get back to you ASAP!</div>' +
                '</div>' +
                '<div class="dublicate-delete-wrap">' +
                '<div class="dublicateclick" title="Click To Duplicate" data-click-id="' + ProductID + '">' +
                // '   <i class="fa-solid fa-copy"></i>' +
                '   <img class="img_icon" src="' + static_img + '/img/new-icon/复制.png" alt="">' +
                '</div>' +
                // '<div class="remove_form remove_icon" title="Click To Remove"><i class="fa-solid fa-trash-can"></i></div>' +
                `<div class="add-to-cart-sub"><span class="add-to-cart-sub-button" title="Add to cart" cart-id="${ProductID + '-' + i}">
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
                    </span></div>` +
                '</div>' +
                '</div>' +
                '</div></div>';
            cnt++;
            box.append(html);

        });


        jQuery(this).find('.material-price').html(totalprice.toFixed(2));
        //jQuery(this).removeClass('disabled');
        //jQuery(this).find('.addtocart .button').prop('disabled', false);
        if (init_i == 0) {
            jQuery(this).find('.files-box').show();
            jQuery(this).addClass('open-box-material');
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
    jQuery('.cnc-box-material').each(function (i) {
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

        if (i == 0) {
            jQuery(this).addClass('open-box-material');
        }

        // 表面基础处理选择
        var basic_surface_treatment_html = '';

        var basic_surface_treatment_arr = [1, 2, 3, 4, 5, 6];
        basic_surface_treatment_html += '<div class="basic_surface_treatment_head finishing_option_head">Basic Surface Treatment</div><form class="options-form">';
        for (var i = 0; i < basic_surface_treatment_arr.length; i++) {
            var finishing_key = basic_surface_treatment_arr[i];
            if (i == 0) {
                var default_finish = finishing_cost[finishing_key]['name'];
                basic_surface_treatment_html += '<label class="option-check"><input type="radio" hidden="true" name="basic_surface_treatment" value="' + finishing_key + '" checked="checked">' + finishing_cost[finishing_key]['name'] + '</label>';
            } else {
                basic_surface_treatment_html += '<label><input type="radio" hidden="true" name="basic_surface_treatment" value="' + finishing_key + '">' + finishing_cost[finishing_key]['name'] + '</label>';
            }
        }
        basic_surface_treatment_html += '</form>';

        // 表面高级处理选择
        var advanced_surface_treatment_html = '';

        var advanced_surface_treatment_arr = [0, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
        advanced_surface_treatment_html += '<div class="advanced_surface_treatment_head finishing_option_head">Advanced Surface Treatment</div><form class="options-form">';
        for (var i = 0; i < advanced_surface_treatment_arr.length; i++) {
            var finishing_key = advanced_surface_treatment_arr[i];
            if (i == 0) {
                advanced_surface_treatment_html += '<label class="option-check"><input type="radio" hidden="true" name="advanced_surface_treatment" value="' + finishing_key + '" checked="checked">' + finishing_cost[finishing_key]['name'] + '</label>';
            } else {
                advanced_surface_treatment_html += '<label><input type="radio" hidden="true" name="advanced_surface_treatment" value="' + finishing_key + '">' + finishing_cost[finishing_key]['name'] + '</label>';
            }
        }
        advanced_surface_treatment_html += '</form>';

        // 颜色选择
        var color_surface_treatment_html = '';

        var color_surface_treatment_arr = [26, 27, 28, 29, 30];
        color_surface_treatment_html += '<div class="color_head finishing_option_head">Color Surface Treatment</div><form class="options-form">';
        for (var i = 0; i < color_surface_treatment_arr.length; i++) {
            var finishing_key = color_surface_treatment_arr[i];
            if (i == 0) {
                color_surface_treatment_html += '<label class="option-check"><input type="radio" hidden="true" name="color_surface_treatment" value="' + finishing_key + '" checked="checked">' + finishing_cost[finishing_key]['name'] + '</label>';
            } else {
                color_surface_treatment_html += '<label><input type="radio" hidden="true" name="color_surface_treatment" value="' + finishing_key + '">' + finishing_cost[finishing_key]['name'] + '</label>';
            }
        }
        color_surface_treatment_html += '</form>';

        var finishing_html = basic_surface_treatment_html + advanced_surface_treatment_html + color_surface_treatment_html;


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
                    lead_time_option_html += '<label class="option-check"><input type="radio" hidden="true" name="xia-lead-time-option" checked="checked" value="' + lead_opt[1] + '">' + lead_opt[0] + '</label>';
                } else {
                    lead_time_option_html += '<label><input type="radio" hidden="true" name="xia-lead-time-option" value="' + lead_opt[1] + '">' + lead_opt[0] + '</label>';
                }
            }
            lead_time_option_html += '</form>';
        }

        var cnc_container = jQuery(this).find(".cnc-files-container");

        cnc_container.empty();

        var cnc_file_total_price = 0;

        jQuery.each(filesData, function (i, file) {
            if (typeof (file['curved_surface']) == 'undefined') {
                file['curved_surface'] = 0;
            }
            if (typeof (file['quote']) == 'undefined') {
                file['quote'] = '';
            }
            var box_x = file['box_xyz'].x;
            var box_y = file['box_xyz'].y;
            var box_z = file['box_xyz'].z;
            var volume = file['volume'];
            var surface_area = file['surface_area'];
            var curved_surface = file['curved_surface'];
            var quoteData = file['quote'];
            console.log('quoteData', quoteData);
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
            var file_one_cnc_price = quoteData['CNC']['Prices'][cnc_material] / 6.5;
            var file_cnc_price = file_one_cnc_price * 1;

            cnc_file_total_price += file_cnc_price;

            var cnchtml = `<div class="file-box cnc-file-wrap duplicate_cnc-files-cols_outer price-father" id="${cnc_material_id_tag}-${i}" data-file="` + file['filename'] + '" data-file_unit="' + file_unit + '" data-volume="' + parseFloat(file['volume']) +
                '" data-surface_area="' + parseFloat(file['surface_area']) + '" data-curved_surface="' + parseFloat(file['curved_surface']) + '" data-box_volume="' + parseFloat(file['box_volume']) + '" data-box_x="' + parseFloat(file['box_xyz'].x) +
                '" data-box_y="' + parseFloat(file['box_xyz'].y) + '" data-box_z="' + parseFloat(file['box_xyz'].z) + '" data-one_price="' + parseFloat(file_one_cnc_price) + '">';
            cnchtml += '<div class="cnc-file-wrap-filelist">' +
                // '<div class="material-file-img custom-cnc-column-width-1"><img src="https://www.3dprintingservice.cc/wp-content/uploads/woocommerce-placeholder-300x300.png" alt="default img"></div>' +
                // '<div class="cnc-material-file-name custom-cnc-column-width-2 material-item-overflow">' +

                '<div class="preview-link" data-link="' + file['url'] + '">' + file['filename'] + '</div>' +
                // '<div class="cnc-material-file-options-qty-wrap">' +

                // '<div class="cnc-material-file-select-wrap">' +
                '<div class="select-options select-finishing">' +
                '<div><div class="cnc-finish">' + default_finish + '</div><span class="finishing-down"><i class="fa-solid fa-angle-down"></i></span></div>' +
                '<div class="option-wrap finishing-option-wrap cnc-finishing-option-wrap" style="display: none;">' + finishing_html + '</div>' +
                '</div>' +

                // '</div>' +
                // '</div>' +

                // '</div>' +

                '<div class="material-file-select-wrap">' +
                '<div class="cnc-file-quantity-wrap">' +
                '<div class="cnc-bt-minus"><i class="fa-solid fa-circle-minus"></i></div>' +
                '<input type="text" class="plus-minus cnc-file-quantity" name="cnc-file-quantity" value="1" maxlength="10">' +
                '<div class="cnc-bt-plus"><i class="fa-solid fa-circle-plus"></i></div>' +
                '</div>' +

                // '<div class="cnc-flie-price-wrap custom-cnc-column-width-3">' +
                '<div class="select-options select-lead-time">' +
                '<div style="white-space: nowrap;overflow: hidden;"><div class="printing-leadtime">' + default_leadtime + '</div><span class="lead-time-down"><i class="fa-solid fa-angle-down"></i></span></div>' +
                '<div class="option-wrap lead-time-option-wrap" style="display: none;">' + lead_time_option_html + '</div>' +
                '</div>' +
                // '</div>' +

                '</div>' +

                '<div class="cnc-flie-price-wrap custom-cnc-column-width-3 col-price">' +
                '<div style="display: flex">$<span class="cnc-flie-price">' + Number(file_cnc_price).toFixed(2) + '</span></div>' +
                `<div class="cn-abnormal-list base-price-list" mid="${cnc_material_id_tag}-${i}">
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
                </div>`+
                '</div>' +

                '<div class="file-ation-wrap custom-cnc-column-width-4">' +
                '<div class="cnc-abnormal-alert">' +
                // '<i class="fa-solid fa-bell"></i>' +
                '   <img class="img_icon" src="' + static_img + '/img/new-icon/提醒.png" alt="">' +
                '<div class="abnormal-alert-tips">Click to ring the bell if you find the price too high, too low, looks strange. Or any other questions! We will get back to you ASAP!</div>' +
                '</div>' +

                '<div class="cnc-file-dublicate-delete-wrap">' +
                '<div class="cnc-file-dublicateclick" title="Click To Duplicate" data-click-id="' + cnc_material_id_tag + '">' +
                // '<i class="fa-solid fa-copy"></i>' +
                '   <img class="img_icon" src="' + static_img + '/img/new-icon/复制.png" alt="">' +
                '</div>' +
                // '<div class="cnc-file-remove" title="Click To Remove"><i class="fa-solid fa-trash-can"></i></div>' +
                `<div class="cn-add-to-cart-sub"><span class="cnc-add-to-cart-sub-button" title="Add to cart"
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
                    fill="#2c2c2c" p-id="5308"></path></svg></span></div>`+
                '</div>' +

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
    jQuery('.pi-box-material').each(function (i) {
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

        if (i == 0) {
            jQuery(this).addClass('open-box-material');
        }

        var surface_treatment_html = '';
        var finishing_coating_html = '';
        var logo_finishing_html = '';
        var protective_coating_html = '';

        if (surface_treatment != '') {
            // var surface_treatment_arr = surface_treatment.split(",");
            var surface_treatment_arr = [1, 2, 3, 4, 5, 6];
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

        if (finishing_coating != '') {
            // var finishing_coating_arr = finishing_coating.split(",");
            var finishing_coating_arr = [0, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
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

        if (logo_finishing != '') {
            // var logo_finishing_arr = logo_finishing.split(",");
            var logo_finishing_arr = [0, 18, 19, 20, 21, 22, 23, 24];
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

        var lead_time_option = jQuery(this).attr('data-leadtime-options');
        var lead_time_option_html = '';
        if (lead_time_option != '') {
            var lead_time_option_arr = lead_time_option.split(";");
            lead_time_option_html += '<form class="options-form">';
            for (var i = 0; i < lead_time_option_arr.length; i++) {
                var ltoption = lead_time_option_arr[i].replace(/(^\s*)|(\s*$)/g, "");//去掉两边空格符
                var lead_opt = ltoption.split(':');
                if (i == 0) {
                    var default_leadtime = lead_opt[0];
                    lead_time_option_html += '<label class="option-check"><input type="radio" hidden="true" name="xia-lead-time-option" checked="checked" value="' + ltoption + '">' + ltoption + '</label>';
                } else {
                    lead_time_option_html += '<label><input type="radio" hidden="true" name="xia-lead-time-option" value="' + ltoption + '">' + ltoption + '</label>';
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
            //
            // var pihtml = '<div class="file-box pi-file-wrap duplicate_pi-files-cols_outer" data-file="' + file['filename'] + '" data-file_unit="' + file_unit + '" data-volume="' + parseFloat(file['volume']) +
            //     '" data-surface_area="' + parseFloat(file['surface_area']) + '" data-box_volume="' + parseFloat(file['box_volume']) + '" data-box_x="' + parseFloat(file['box_xyz'].x) +
            //     '" data-box_y="' + parseFloat(file['box_xyz'].y) + '" data-box_z="' + parseFloat(file['box_xyz'].z) + '">';
            // pihtml += '<div class="pi-file-wrap-filelist">' +
            //     // '<div class="material-file-img custom-pi-column-width-1"><img src="https://www.3dprintingservice.cc/wp-content/uploads/woocommerce-placeholder-300x300.png" alt="default img"></div>' +
            //     // '<div class="pi-material-file-name custom-pi-column-width-2 material-item-overflow">' +
            //
            //     '<div class="preview-link" data-link="' + file['url'] + '">' + file['filename'] + '</div>' +
            //     '<div class="pi-file-mould-part-wrap">' +
            //     '<div class="pi-mould-part-wrap">' +
            //     '<div class="pi-material-file-select-wrap"></div>' +
            //     '<div class="pi-file-mould-quantity-wrap">' +
            //     '<div class="pi-file-quantity-label">Mould Qty:</div>' +
            //     '<div class="pi-mould-bt-minus"><i class="fa-solid fa-circle-minus"></i></div>' +
            //     '<input type="text" class="mould-quantity" name="mould-quantity" value="1" maxlength="10">' +
            //     '<div class="pi-mould-bt-plus"><i class="fa-solid fa-circle-plus"></i></div>' +
            //     '</div>' +
            //     '</div>' +
            //     '<div class="pi-file-part-wrap">' +
            //     '<div class="pi-material-file-select-wrap">' +
            //     '<div class="select-options select-finishing">' +
            //     '<div><div class="pi-finish">' + default_finish + '</div><span class="finishing-down"><i class="fa-solid fa-angle-down"></i></span></div>' +
            //     '<div class="option-wrap finishing-option-wrap" style="display: none;">' + finishing_html + '</div>' +
            //     '</div>' +
            //     '<div class="select-options select-lead-time" style="display:none;">' +
            //     '<div><span>Lead Time</span><span class="lead-time-down"><i class="fa-solid fa-angle-down"></i></span></span></div>' +
            //     '<div class="option-wrap lead-time-option-wrap" style="display: none;">' + lead_time_option_html + '</div>' +
            //     '</div>' +
            //     '</div>' +
            //     '<div class="pi-file-quantity-wrap">' +
            //     '<div class="pi-file-quantity-label">Part Qty:</div>' +
            //     '<div class="pi-bt-minus"><i class="fa-solid fa-circle-minus"></i></div>' +
            //     '<input type="text" class="plus-minus pi-file-quantity" name="pi-file-quantity" value="0" maxlength="10">' +
            //     '<div class="pi-bt-plus"><i class="fa-solid fa-circle-plus"></i></div>' +
            //     '</div>' +
            //     '</div>' +
            //     '</div>' +
            //
            //     // '</div>' +
            //
            //     '<div></div>' +
            //     '<div class="cnc-flie-price-wrap custom-cnc-column-width-3">' +
            //     '<div class="select-options select-lead-time">' +
            //     '<div style="white-space: nowrap;overflow: hidden;"><div class="printing-leadtime">' + default_leadtime + '</div><span class="lead-time-down"><i class="fa-solid fa-angle-down"></i></span></div>' +
            //     '<div class="option-wrap lead-time-option-wrap" style="display: none;">' + lead_time_option_html + '</div>' +
            //     '</div>' +
            //     '</div>' +
            //
            //     '<div class="pi-flie-price-items-wrap custom-pi-column-width-3">' +
            //     '<div class="pi-file-mould-price-wrap">US$ <span class="pi-flie-mould-price">' + mould_cost.toFixed(2) + '</span></div>' +
            //     '<div class="pi-file-part-price-wrap">US$ <span class="pi-flie-part-price">' + part_price.toFixed(2) + '</span></div>' +
            //     '<div class="pi-flie-price-wrap" style="display: none;">US$ <span class="pi-flie-price">' + file_pi_price.toFixed(2) + '</span></div>' +
            //     '</div>' +
            //     '<div class="file-ation-wrap custom-pi-column-width-4">' +
            //     '<div class="injection-abnormal-alert">' +
            //     // '<i class="fa-solid fa-bell"></i>' +
            //     '   <img class="img_icon" src="' + static_img + '/img/new-icon/提醒.png" alt="">' +
            //     '<div class="abnormal-alert-tips">Click to ring the bell if you find the price too high, too low, looks strange. Or any other questions! We will get back to you ASAP!</div>' +
            //     '</div>' +
            //     '<div class="pi-file-dublicate-delete-wrap">' +
            //     '<div class="pi-file-dublicateclick" title="Click To Duplicate" data-click-id="' + pi_material_id_tag + '">' +
            //     // '<i class="fa-solid fa-copy"></i>' +
            //     '   <img class="img_icon" src="' + static_img + '/img/new-icon/复制.png" alt="">' +
            //     '</div>' +
            //     '<div class="pi-file-remove" title="Click To Remove"><i class="fa-solid fa-trash-can"></i></div>' +
            //     '</div>' +
            //     '</div>' +
            //     '</div>';

            var pihtml=`
<div class="file-box pi-file-wrap duplicate_pi-files-cols_outer price-father" id="${pi_material_id_tag}-${i}" key="${i}" data-file="${file['filename']}" data-file_unit="${file_unit}"
     data-volume="${parseFloat(file['volume'])}" data-surface_area="${parseFloat(file['surface_area'])}" data-box_volume="${parseFloat(file['box_volume'])}"
     data-box_x="${parseFloat(file['box_xyz'].x)}" data-box_y="${parseFloat(file['box_xyz'].y)}" data-box_z="${parseFloat(file['box_xyz'].z)}" data-one_price=${parseFloat(part_price)}>
    <div class="pi-file-wrap-filelist">
        <div class="preview-link" data-link="${file['url'] }">${file['filename']}</div>`+
        // `<div class="pi-file-mould-part-wrap">
        //     <div class="pi-mould-part-wrap">
        //         <div class="pi-material-file-select-wrap"></div>
        //         <div class="pi-file-mould-quantity-wrap">
        //             <div class="pi-file-quantity-label">Mould Qty:</div>
        //             <div class="pi-mould-bt-minus"><i class="fa-solid fa-circle-minus"></i></div>
        //             <input type="text" class="mould-quantity" name="mould-quantity" value="1" maxlength="10">
        //             <div class="pi-mould-bt-plus"><i class="fa-solid fa-circle-plus"></i></div>
        //         </div>
        //     </div>
        //     <div class="pi-file-part-wrap">
        //         <div class="pi-material-file-select-wrap">
        //             <div class="select-options select-finishing">
        //                 <div>
        //                     <div class="pi-finish">${default_finish}</div>
        //                     <span class="finishing-down"><i class="fa-solid fa-angle-down"></i></span></div>
        //                 <div class="option-wrap finishing-option-wrap" style="display: none;">
        //                     ${finishing_html}
        //                 </div>
        //             </div>
        //             <div class="select-options select-lead-time" style="display:none;">
        //                 <div><span>Lead Time</span><span class="lead-time-down"><i
        //                         class="fa-solid fa-angle-down"></i></span></span></div>
        //                 <div class="option-wrap lead-time-option-wrap" style="display: none;">
        //                     ${lead_time_option_html}
        //                 </div>
        //             </div>
        //         </div>
        //         <div class="pi-file-quantity-wrap">
        //             <div class="pi-file-quantity-label">Part Qty:</div>
        //             <div class="pi-bt-minus"><i class="fa-solid fa-circle-minus"></i></div>
        //             <input type="text" class="plus-minus pi-file-quantity" name="pi-file-quantity" value="0"
        //                    maxlength="10">
        //             <div class="pi-bt-plus"><i class="fa-solid fa-circle-plus"></i></div>
        //         </div>
        //     </div>
        // </div>`+
        `<div style="width: 15%"></div>
        <div class="cnc-flie-price-wrap custom-cnc-column-width-3" style="width: 25%">
            <div class="pi-file-mould-quantity-wrap">
                <div class="pi-file-quantity-label">MQ:</div>
                <div class="pi-mould-bt-minus"><i class="fa-solid fa-circle-minus"></i></div>
                <input type="text" class="mould-quantity" name="mould-quantity" value="1" maxlength="10">
                <div class="pi-mould-bt-plus"><i class="fa-solid fa-circle-plus"></i></div>
            </div>
            <div class="pi-file-quantity-wrap">
                <div class="pi-file-quantity-label">PQ:</div>
                <div class="pi-bt-minus"><i class="fa-solid fa-circle-minus"></i></div>
                <input type="text" class="plus-minus pi-file-quantity" name="pi-file-quantity" value="0"
                       maxlength="10">
                <div class="pi-bt-plus"><i class="fa-solid fa-circle-plus"></i></div>
            </div>
        
            <div class="select-options select-lead-time">
                <div style="white-space: nowrap;overflow: hidden;">
                    <div class="printing-leadtime">${default_leadtime}</div>
                    <span class="lead-time-down"><i class="fa-solid fa-angle-down"></i></span></div>
                <div class="option-wrap lead-time-option-wrap" style="display: none;">
                ${lead_time_option_html}
                </div>
            </div>
        </div>
        <div class="pi-flie-price-items-wrap custom-pi-column-width-3">
            <div class="pi-file-mould-price-wrap">$<span class="pi-flie-mould-price">${mould_cost.toFixed(2)}</span></div>
            <div class="pi-file-part-price-wrap">$<span class="pi-flie-part-price">${part_price.toFixed(2)}</span></div>
            <div class="pi-flie-price-wrap" style="display: none;">US$ <span class="pi-flie-price">${file_pi_price.toFixed(2)}</span></div>
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
        </div>
        <div class="file-ation-wrap custom-pi-column-width-4">
            <div class="injection-abnormal-alert">
                <img class="img_icon" src="${static_img}/img/new-icon/提醒.png">
                <div class="abnormal-alert-tips">Click to ring the bell if you find the price too high, too low, looks
                    strange. Or any other questions! We will get back to you ASAP!
                </div>
            </div>
            <div class="pi-file-dublicate-delete-wrap">
                <div class="pi-file-dublicateclick" title="Click To Duplicate" data-click-id="${pi_material_id_tag}">
                    <img class="img_icon" src="${static_img}/img/new-icon/复制.png">
                </div>
                <div style="display:none" class="pi-file-remove" title="Click To Remove"><i class="fa-solid fa-trash-can"></i></div>
                
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
            </div>
        </div>
    </div>
</div>`



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