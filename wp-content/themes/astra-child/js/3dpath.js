/*--------------------------------------*/
/* 20221015 */
/* author :xjspace
/* lastupdate 20221029
/* file:3dpath.js
/*--------------------------------------*/

let twoSHow = true;
let twoIndex = 0;

jQuery('body').on('mouseover mouseout', '.three-drawing', function (event) {
    if (event.type == "mouseover") {
        if (jQuery('.three-drawing').index(this) == twoIndex) {
            twoSHow = false
        } else {
            twoSHow = true
        } twoIndex = jQuery('.three-drawing').index(this)
        // console.log(twoSHow)
        let url = '';
        let web = '';
        let height = '';
        let s800 = '';

        src = jQuery(this).find('input').val();
        s800 = jQuery(this).find('input').attr('data-zoom'); // 鹰眼图800版更清晰
        url = jQuery(this).find('input').attr('data-url');
        web = `<div class='piImg_wrapper'></div>`;

        height = jQuery(this).find('.wp-post-image')[0].getBoundingClientRect().y - 80
        let minHeight = jQuery('.site-primary-header-wrap')[0].offsetHeight
        // alert(document.body.clientWidth)
        let maxHeight = window.screen.availHeight - minHeight
        if (document.body.clientWidth > 1440) {
            maxHeight = window.screen.availHeight - minHeight - 460
        } else {
            maxHeight = window.screen.availHeight - minHeight - 280
        }
        if (height < minHeight) {
            height = minHeight
        }
        if (height > maxHeight) {
            height = maxHeight
        }
        if (src.length != 0 && !jQuery(this).find('.piImg_wrapper')[0]) {
            jQuery(this).css('cursor', 'zoom-in');
            jQuery(this).find('.one_zoom').html(web);
            jQuery(this).find('.piImg_wrapper').fadeIn(200);
            jQuery(this).find('.one_zoom').addClass('active');
            jQuery(this).find('.piImg_wrapper').css("top", height + 'px');
            jQuery(this).find('.piImg_wrapper').css("left", jQuery(this).find('.wp-post-image')[0].getBoundingClientRect().x + 80 + 'px');
            let originWidth = 480
            let originHeight = 460
            let magWidth = 120
            let magHeight = 120
            if (document.body.clientWidth < 1440) {

                originWidth = 280
                originHeight = 280
                magWidth = 75
                magHeight = 75

            }
             // width: ${originWidth}px;height: ${originWidth}px;
            let html=`
            <a  href="${s800}" class="jqzoom" rel='gal1' title="zoom">
                 
                 <img src="${src}" class="small" style="position: absolute;display: block;">
                 
            </a>
            `;
            jQuery(this).find('.piImg_wrapper').html(html);

            let link = `<a class="link" href="${url}" _target="blank" style="display: block; width: ${magHeight}px !important;height: ${magHeight}px !important;"></a>`;

            setTimeout(() => {
                jQuery('.three-drawing').find('.zoomPup').html(link);
                let path = jQuery('.zoomPup').find('.link').attr('href');
                // console.log(path);
            }, 50);


        }

    } else if (event.type == "mouseout") {
        twoSHow = true
        setTimeout(() => {
            if (twoSHow) {
              piimgWapperOut(this)
            }
        }, 100);
    }
})

jQuery('body').on('mouseenter mouseleave', '.piImg_wrapper', function (event) {
    if (event.type == 'mouseenter') {
        if (document.body.clientWidth < 1440) {
            jQuery(this).parent().find(".zoomWindow").css("margin-left","-590px");
        }
        jQuery(this).parent().find('.zoomPup').css('display', 'block');
        // console.log('小于1440')
        twoSHow = false
    } else if (event.type == 'mouseleave') {
        jQuery(this).parent().find('.zoomPup').css('display', 'none');
        twoSHow = true
        setTimeout(() => {
            if (twoSHow) {
                 piimgWapperOut('.three-drawing')
            }
        }, 100);
    }
    event.stopPropagation()
})

// 当鼠标在“缩略图”窗口中移动时
jQuery('body').on('mousemove', '.piImg_wrapper', function (e) {
    if (document.body.clientWidth < 1440) {
        jQuery(this).parent().find(".zoomWindow").css("margin-left","-590px");
    }
    jQuery('.jqzoom').jqzoom({
        zoomType: 'standard', // innerzoom/standard/reverse/drag
        lens: true,
        preloadImages: false,
        alwaysOn: true,
        title: false,
        position: 'left'
    });
   
        
    
})


// 元素消失
function piimgWapperOut(ele) {
    jQuery(ele).css('cursor', 'default');
    jQuery(ele).find('.one_zoom').empty
    jQuery(ele).find('.piImg_wrapper').fadeOut(200).remove();
    jQuery(ele).find('.one_zoom').removeClass('active');
}


// 文件单位的按钮改变事件 2022 1208

function change_active_unit() {
    let b_volume = jQuery(".file_name.active").attr('data-volume');
    let b_surface_area = jQuery(".file_name.active").attr('data-surface_area');
    let box_volume = jQuery(".file_name.active").attr('data-box_volume');
    let b_x = jQuery(".file_name.active").attr('data-box_x');
    let b_y = jQuery(".file_name.active").attr('data-box_y')
    let b_z = jQuery(".file_name.active").attr('data-box_z')
    // let b_unit = jQuery(".file_name.active").attr('data-file_unit');
    var b_unit = jQuery('input[name="file_unit"]:checked').val();
    // console.log(b_unit);
    if (b_unit == "inch") { // console.log(b_unit);
        b_x = parseFloat(b_x) / 25.4;
        b_y = parseFloat(b_y) / 25.4;
        b_z = parseFloat(b_z) / 25.4;
        b_volume = parseFloat(b_volume) / 25.4;
        b_surface_area = parseFloat(b_surface_area) / 25.4;
        // console.log(b_x)
        jQuery(".file-info-unit").text('inch')
    } else {
        jQuery(".file-info-unit").text('mm')
    }

    var b_dimensions = parseFloat(b_x).toFixed(2) + '*' + parseFloat(b_y).toFixed(2) + '*' + parseFloat(b_z).toFixed(2);
    jQuery('.file-info-dimensions').text(b_dimensions);
    jQuery('.file-info-volume').text(parseFloat(b_volume).toFixed(2));
    jQuery('.file-info-surface').text(parseFloat(b_surface_area).toFixed(2));

}



//监听返回页面
window.onpageshow = function (event) {
	if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        update_get_mini_cart()
        load_id_sku();
    }	
};
// 返回获取购物车数据
function  update_get_mini_cart(){
    jQuery.post(myajax.url, {
        'action': 'my_mini_cart',
    }, function (data) { 
        //console.log('addtocartdata', data);
        if (data != 0) {
            var jsondata = JSON.parse(data);
            jQuery('.material-bottom-info-total-price-value').html(jsondata.total_price);
            
        }
    });
}



 // 存储sku状态，保持购物车的状态
 function  save_id_sku(column,id,sku_list,cid){
    //console.log(sku_list)
    let skudata =
        {
        'column':column,
        'id':id,
        'sku':sku_list,
        'cid':cid,
        }
    //console.log(skudata);
    var oldstorage = Storage.prototype.get('session_sku')
    if (! oldstorage || oldstorage == 'undefined' || oldstorage == '[]' || oldstorage == 'a:0:{}') {
        var storage = [];
    } else {
        var storage = Storage.prototype.get('session_sku');
    }
    storage.push(skudata);
    
    Storage.prototype.set("session_sku",storage,180)

  }

function load_id_sku(){
    var storage = Storage.prototype.get('session_sku');
    if(storage !=null){
        //console.log(storage);
        for (var i = 0; i < storage.length; i++) {
        //遍历循环开始
        let  skulist =storage[i]['sku']
        let  material_id = storage[i].id
        let  current_cid =storage[i].cid
        switch(storage[i].column){
            case  'material':
                //console.log(skulist);
            if (skulist.length>0) {
                jQuery.each(skulist, function(index){  
                       //console.log(material_id);
                       //start 
                       let classname,cartid;
                       setTimeout(function(){
                            classname ='.'+material_id+ ' .file-box'
                            //console.log(classname);
                            cartid = jQuery(classname).find('.add-to-cart-sub-button').eq(index).attr('cart-id')
                            //console.log(cartid)

                       if(cartid !=undefined && current_cid ==null){
                            let d = cartid.lastIndexOf("-");
                            let cid = cartid.substring(d + 1, cartid.length)
                            // console.log(cid)
                            jQuery('#'+material_id+'').find('.add-to-cart-sub-button').eq(cid).addClass('cart'); 
                       }else if(current_cid !=null){
                            let d = current_cid .lastIndexOf("-");
                            let cid = current_cid .substring(d + 1, current_cid .length)
                            //console.log(cid)
                            jQuery('#'+material_id+'').find('.add-to-cart-sub-button').eq(cid).addClass('cart'); 
                       }
                        jQuery('#'+material_id+'').find('.add-to-cart-button').addClass('cart');  
                    },3000)
                    //end 
                }); 
            }
            break;
            case 'cnc-material':
                if (skulist.length>0) {
                    jQuery.each(skulist, function(index){  
                        // console.log(material_id);
                        //start 
                        let classname,cartid;
                        setTimeout(function(){
                           classname ='.'+material_id+ ' .cnc-file-wrap'
                           //console.log(classname);
                           cartid = jQuery(classname).find('.cnc-add-to-cart-sub-button').eq(index).attr('cart-id')
                       
                           //console.log(cartid)
                        if(cartid !=undefined  && current_cid ==null){
                            let d = cartid.lastIndexOf("-");
                            let cid = cartid.substring(d + 1, cartid.length)
                            // console.log(cid)
                            jQuery('#'+material_id+'').find('.cnc-add-to-cart-sub-button').eq(cid).addClass('cart'); 
                        }else if(current_cid !=null){
                            let d = current_cid .lastIndexOf("-");
                            let cid = current_cid.substring(d + 1, current_cid.length)
                            // console.log(cid)
                            jQuery('#'+material_id+'').find('.cnc-add-to-cart-sub-button').eq(cid).addClass('cart'); 
                        }
                        jQuery('#'+material_id+'').find('.cnc-add-to-cart-button').addClass('cart');  
                    },3000)
                    //end
                    });   
                }   
               
            break;
            case 'pi-material':
                if (skulist.length>0) {
                    jQuery.each(skulist, function(index){  
                    //start  
                    // console.log(material_id);  
                    let classname,cartid;
                    setTimeout(function(){
                        classname ='.'+material_id+ ' .pi-file-wrap'
                        //console.log(classname);
                        cartid = jQuery(classname).find('.pi-add-to-cart-sub-button').eq(index).attr('cart-id')
                        //console.log(cartid) 
                    if(cartid !=undefined  && current_cid ==null){
                        let d = cartid.lastIndexOf("-");
                        let cid = cartid.substring(d + 1, cartid.length)
                        // console.log(cid)
                        jQuery('#'+material_id+'').find('.pi-add-to-cart-sub-button').eq(cid).addClass('cart'); 
                    }else if(current_cid !=null){
                        let d = current_cid.lastIndexOf("-");
                        let cid = current_cid.substring(d + 1, current_cid.length)
                        // console.log(cid)
                        jQuery('#'+material_id+'').find('.pi-add-to-cart-sub-button').eq(cid).addClass('cart');  
                    }
                        jQuery('#'+material_id+'').find('.pi-add-to-cart-button').addClass('cart');  
                    },3000)
                    
                    //end
                    });   
                }        
        }
        //遍历循环结束
        }
   }  
}