// 判断手机横竖屏状态：
function hengshuping() {
    if (window.orientation == 180 || window.orientation == 0) {
        console.log("竖屏状态！")
        location.reload();
        var jQueryel = jQuery("body"); // 需要重新获得宽和高的元素
        newWidth = jQueryel.width(); // 新的宽
        newHeight = jQueryel.height(); // 新的高
        console.log(newWidth + "新宽");
        console.log(newHeight + "新高");

    }
    if (window.orientation == 90 || window.orientation == -90) {
        // alert("横屏状态！");
        console.log("横屏状态！")
        location.reload();
        var jQueryel = jQuery("body"); // 需要重新获得宽和高的元素
        newWidth = jQueryel.width(); // 新的宽
        newHeight = jQueryel.height(); // 新的高
        console.log(newWidth + "新宽");
        console.log(newHeight + "新高");

    }
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);

function search() { // 增加搜索
    var activeSearch = function () {
        jQuery(".ast-search-menu-icon").addClass('ast-dropdown-active');
        // console.log('active');
    }
    return activeSearch();
};
search();


// bulk price


function calcPrice(P0, Lx, Wx, Hx, D0, Sx, S0) {
    return(P0 * (Math.max(Lx / D0, 1) * Math.max(Wx / D0, 1) * Math.max(Hx / D0, 1) * Math.max(Sx / S0, 1)));
}


// 批量价格显示
var mid =null
jQuery('body').on('click', '.base-price-list', function () {
     
    mid =jQuery(this).attr('mid');
    console.log(mid);
    jQuery(this).find('#mask').show();
    let file_box = jQuery(this).closest('.price-father');
    let P0 = file_box.attr('data-one_price');
   
    let Lx = file_box.attr('data-box_x');
    let Wx = file_box.attr('data-box_y');
    let Hx = file_box.attr('data-box_z');
    let D0 = 150;
    let Sx = 35727.73;
    let S0 = 101250.0;

    let M = -0.14;

    const arrs = [
        1,
        2,
        5,
        10,
        25,
        50,
        100,
        200,
        400,
        500,
        750,
        1000
    ];
    let str = '<table cellspacing="0" cellpadding="0" border="0" class=""><tbody>' + '<tr><td><div align="left">Qty</div></td><td><div class="ratio" align="right">Unit Price</div></td><td><div align="right">Subtotal</div></td></tr>';
    let data = ''
    arrs.forEach((n) => {
        const P1 = calcPrice(P0, Lx, Wx, Hx, D0, Sx, S0);
        // console.log(P1)
        let DP = 0;
        let DPs = 0;
        let subtotal = 0;
        let stotal = 0;
        
        if (n >= 1 && n <= 100) {
            DP = P1 * Math.pow(n, M);
            // console.log(DP)
            subtotal = DP * n;
            stotal = totwoFixed(subtotal);
            DPs = totwoFixed(DP);

        }
        if (n > 100 && n <= 1000) {
            DP = P1 * Math.pow(100, M) * Math.pow(n - 100, -0.01);
            subtotal = DP * n;
            stotal = totwoFixed(subtotal);
            DPs = totwoFixed(DP);

        }
        if (n > 1000) {
            DP = P1 * Math.pow(100, M) * Math.pow(1000 - 100, -0.01);
            subtotal = DP * n;
            stotal = totwoFixed(subtotal);
            DPs = totwoFixed(DP);
        }


        // console.log(subtotal)


        data += '<tr class="clickid" bqty="'+n+'" bunit="' + DPs + '" btotal="' + stotal + '"><td><div align="left">' + n + '</div></td><td><div class="" align="right">$' + DPs + '</div></td><td><div align="right">$' + stotal + '</div></td></tr>';
    });
    let end = '</tbody></table>';

    let tableHtml = str + data + end;

    // list = str + data + end;
    let left = 0;
    let top = jQuery(this)[0].getBoundingClientRect().y + 10

    let minHeight = jQuery('.site-primary-header-wrap')[0].offsetHeight
    if ((window.screen.availHeight - minHeight - top) < 575) {
        top = window.screen.availHeight - 595
    }
    if (window.screen.availWidth <= 1400) {
        let base = jQuery(this)[0].getBoundingClientRect().x;
        console.log(base)
        let tmp = base - 326
        if (tmp < 0) {
            left = 15
        } else {
            left = tmp
        }
    } else {
        left = jQuery(this)[0].getBoundingClientRect().x - 326
        // console.log(left);
    }

    jQuery(this).find('.bklist').html(tableHtml);
    jQuery(this).find('.abnormal-show-list').css('top', `${top}px`);
    jQuery(this).find('.abnormal-show-list').css('left', `${left}px`);
    jQuery(this).find('.abnormal-show-list').show();
});

jQuery('body').on('click', 'bulk-top,.hide-close', function (e) {
    jQuery(this).parent().parent().parent().hide()
    bulkindex =0
});


jQuery('body').on('click', '.mask', function (e) {
    e.stopPropagation();
    if (jQuery(e.target).hasClass("mask")) {
        jQuery(jQuery(e.target)).hide();
    }
});


function totwoFixed(num = 0) {
    let str,
        sle,
        sre,
        merge
    str = num.toFixed(2)
    sle = str.split(".")[0];
    // console.log(sle)
    sre = str.split(".")[1];
    // console.log(sre)
    merge = Number(sle).toLocaleString()
    result = merge + '.' + sre
    return result;
}


let isMaterial = true
let materIndex = 0

var T0time=-1
var T1time=-1
// 第一列同类材料展示
jQuery('body').on('mouseover mouseout', '.ma-material-title', function (event) {
    if (event.type == "mouseover") {
        materIndex = 0
        isMaterial = true
        let [data, list, arr, str, arrs, mtype] = [
            '',
            '',
            '',
            '',
            [],
            ''
        ];
        mtype = jQuery(this).find('#one_type').val();
        // console.log(mtype);
        jQuery.ajax({
            url: myajax.url,
            data: {
                'action': 'get_one_type',
                'material_type': mtype
            },
            async: false,
            type: "post",
            success: (jsondata) => {
                arrs = JSON.parse(jsondata);
                let list = '';
                let firstList = ''
                arrs = arrs.data
                for (let key in arrs) {
                    if (arrs[key]['post_title'] == jQuery(this).find('.printing-full-title').text()) {
                        firstList = `<div class="one_material-item ma-active">
                                    <span data-id="${
                            arrs[key]['ID']
                        }">${
                            arrs[key]['post_title']
                        }</span>
                                </div>`
                    } else {
                        list += `<div class="one_material-item">
                                    <span data-id="${
                            arrs[key]['ID']
                        }">${
                            arrs[key]['post_title']
                        }</span>
                                </div>`
                    }
                    // console.log(arrs[key]['post_title'])
                }list = `<div style="font-size: 16px;font-weight: bold; text-align: center;padding: 10px;border-bottom: 1px solid #999999">All ${mtype} Meterial</div>
                    <div style="height: 430px; overflow: scroll">${firstList}${list}</div>`
                jQuery(this).parent().find('.one_material').html(list);
                jQuery(this).parent().find('.one_material').show();
                let top = jQuery(this)[0].getBoundingClientRect().y - 180
                let left = jQuery(this)[0].getBoundingClientRect().x
                let minHeight = jQuery('.site-primary-header-wrap')[0].offsetHeight
                let maxHeight = window.screen.availHeight - minHeight
                if (top < minHeight) {
                    top = minHeight
                }
                if (top + 480 > maxHeight) {
                    top = window.screen.availHeight - 480 - 110
                }
                jQuery(this).parent().find('.one_material').css('top', `${top}px`)
                jQuery(this).parent().find('.one_material').css('left', `${
                    left - 110
                }px`)
            }
        });
    } else if (event.type == "mouseout") {
        T0time =setTimeout(() => {
            if (isMaterial) {
                jQuery(this).parent().find('.one_material').empty();
                jQuery(this).parent().find('.one_material').hide();
            }
        }, 200);
    }
});

// 第二列同列材料展示
jQuery('body').on('mouseover mouseout', '.cnc-material-title', function (event) {
    if (event.type == "mouseover") {
        materIndex = 1
        isMaterial = true
        let [data, list, arr, str, arrs, mtype] = [
            '',
            '',
            '',
            '',
            [],
            ''
        ];
        mtype = jQuery(this).find('#two_type').val();
        // console.log(mtype);
        jQuery.ajax({
            url: myajax.url,
            data: {
                'action': 'get_two_type',
                'material_type': mtype
            },
            async: false,
            type: "post",
            success: (jsondata) => {
                arrs = JSON.parse(jsondata);
                let list = '';
                let firstList = ''
                arrs = arrs.data
                for (let key in arrs) {
                    if (arrs[key]['post_title'] == jQuery(this).find('.printing-full-title').text()) {
                        firstList = `<div class="one_material-item ma-active">
                                    <span data-id="${
                            arrs[key]['ID']
                        }">${
                            arrs[key]['post_name']
                        }</span>
                                </div>`
                    } else {
                        list += `<div class="one_material-item">
                                    <span data-id="${
                            arrs[key]['ID']
                        }">${
                            arrs[key]['post_name']
                        }</span>
                                </div>`
                    }
                    // console.log(arrs[key]['post_title'])
                }list = `<div style="font-size: 16px;font-weight: bold; text-align: center;padding: 10px;border-bottom: 1px solid #999999">All ${mtype} Meterial</div>
                    <div style="height: 430px; overflow: scroll">${firstList}${list}</div>`
                jQuery(this).parent().find('.one_material').html(list);
                jQuery(this).parent().find('.one_material').show();
                let top = jQuery(this)[0].getBoundingClientRect().y - 180
                // console.log(top)
                let left = jQuery(this)[0].getBoundingClientRect().x
                let minHeight = jQuery('.site-primary-header-wrap')[0].offsetHeight
                let maxHeight = window.screen.availHeight - minHeight
                if (top < minHeight) {
                    top = minHeight
                }
                if (top + 480 > maxHeight) {
                    top = window.screen.availHeight - 480 - 110
                }
                // console.log(top)
                jQuery(this).parent().find('.one_material').css('top', `${top}px`)
                jQuery(this).parent().find('.one_material').css('left', `${left - 110}px`)
            }
        });
    } else if (event.type == "mouseout") {
       T1time = setTimeout(() => {
            if (isMaterial) {
                jQuery(this).parent().find('.one_material').empty();
                jQuery(this).parent().find('.one_material').hide();
            }
        }, 200);
    }
});


jQuery('body').on('mouseenter mouseleave', '.one_material', function (event) {
    if (event.type == 'mouseenter') {
        isMaterial = false
    } else if (event.type == 'mouseleave') {
        isMaterial = true
        jQuery('.one_material').empty();
        jQuery('.one_material').hide();
    }
    return false;
})

// 总材料数据
// 第一列数据请求
let one_index = 0
let one_Left_Html = []
let one_right_Html = []
var one_click_index=0
function oneAjax() {
    jQuery.ajax({
        url: myajax.url,
        data: {
            'action': 'get_total_ma_material'
        },
        type: "post",
        success: (resone) => {
            let arr_one = JSON.parse(resone);
            //console.log(arr_one);
            if (arr_one.length > 0) {
                let one_html = ''
                arr_one.forEach((item, index) => {
                    one_html += `<div class="le-item ${
                        index == one_index ? 'le-active' : ''
                    }">
                    <span>${
                        Object.keys(item)[1]
                    }</span>
                </div>`
                    let oneObj = item[Object.keys(item)[1]]
                    let one_column = ''
                    for (let key in oneObj) {
                        one_column += `<div class="ri-item ${
                            key == Object.keys(oneObj)[0] ? 'ri-active' : ''
                        }">
                                <span data-id="${
                            oneObj[key]['ID']
                        }">${
                            oneObj[key]['post_title']
                        }</span>
                            </div>`
                    }
                    one_right_Html.push(one_column)
                })
                one_Left_Html.push(one_html)
            } else {
                console.log('no data');
            }
        }
    });
}


// 第二列数据请求
let two_index = 0
let two_Left_Html = []
let two_right_Html = []
var two_click_index=0
function twoAjax() {
    jQuery.ajax({
        url: myajax.url,
        data: {
            'action': 'get_total_cn_material'
        },
        type: "post",
        success: (restwo) => {
            let arr_two = JSON.parse(restwo);
            // console.log(arr_two);
            if (arr_two.length > 0) {
                let two_html = ''
                arr_two.forEach((item, index) => {
                    two_html += `<div class="te-item ${
                        index == two_index ? 'te-active' : ''
                    }">
                    <span>${
                        Object.keys(item)[1]
                    }</span>
                </div>`
                    let twoObj = item[Object.keys(item)[1]]
                    let two_column = ''
                    for (let key in twoObj) {
                        two_column += `<div class="ti-item ${
                            key == Object.keys(twoObj)[0] ? 'ti-active' : ''
                        }">
                                <span data-id="${
                            twoObj[key]['ID']
                        }" >${
                            twoObj[key]['post_name']
                        }</span>
                            </div>`
                    }
                    two_right_Html.push(two_column)
                })
                two_Left_Html.push(two_html)
            } else {
                console.log('no data');
            }
        }
    });
}


/*1列*/
let maShow = true
jQuery('body').on('mouseenter mouseleave', '.material-one', function (event) {
    if (event.type == 'mouseenter') {

        let top = jQuery(this)[0].getBoundingClientRect().y - 30
        let left = jQuery(this)[0].getBoundingClientRect().x + 60
        jQuery('body').find('.ma-one').css('display', 'block')
        jQuery('body').find('.ma-one').css('top', `${top}px`)
        jQuery('body').find('.ma-one').css('left', `${left}px`)
        let one_temp = one_Left_Html[jQuery('.material-one').index(this)];
        // console.log(one_temp)
        jQuery('.classification-le').html(one_temp)
        // 记忆最终值
        //console.log(one_click_index)
        jQuery('.le-item').eq(one_click_index).addClass('le-active').siblings(this).removeClass('le-active');
        //载入记忆
        switch(one_click_index){
            case 0:
                // console.log(one_right_Html[0]);
                jQuery('.classification-ri').html(one_right_Html[0])
                break;
            case 1:
                // console.log(one_right_Html[1]);
                jQuery('.classification-ri').html(one_right_Html[1])
                break;
            case 2:
                // console.log(one_right_Html[2]);
                jQuery('.classification-ri').html(one_right_Html[2])
                break;                
        }        
        
 
    } else if (event.type == 'mouseleave') {
        setTimeout(() => {
            if (maShow) {
                jQuery('body').find('.ma-one').css('display', 'none')
            }
        }, 100);
    }
    return false;
})


jQuery('body').on('mouseenter mouseleave', '.ma-one', function (event) {
    if (event.type == 'mouseenter') {
        maShow = false
    } else if (event.type == 'mouseleave') {
        maShow = true
        setTimeout(() => {
            if (maShow) {
                jQuery('body').find('.ma-one').css('display', 'none')
            }
        }, 150);
    }
})


jQuery('body').on('click', '.le-item', function (event) {
    jQuery(this).addClass('le-active').siblings(this).removeClass('le-active')
    one_click_index = jQuery('.le-item').index(this)
    //console.log(one_click_index)
    jQuery('.classification-ri').html(one_right_Html[jQuery('.le-item').index(this)]);
})

jQuery('body').on('click', '.ri-item', function (event) {
    jQuery(this).addClass('ri-active').siblings(this).removeClass('ri-active')
    let dataId = jQuery(this).find('span').attr('data-id')
    //console.log(dataId)
    // 存储点击后的记忆
    switch(one_click_index){
    case 0:
        one_right_Html[0]= jQuery('.classification-ri').html();
        //console.log(one_right_Html[0])
        break;
    case 1:
        one_right_Html[1]= jQuery('.classification-ri').html();
        //console.log(one_right_Html[1])
        break;
    case 2:
        one_right_Html[2]= jQuery('.classification-ri').html();
        //console.log(one_right_Html[2])
        break;     
    }
    
    //console.log(dataId)
    let ma_container = ''
    ma_container = jQuery(".materials-select-inner-container")
    // 20230106
    // recordHighlighting('materials-select-inner-container', dataId)
    // setOrder('maorder', dataId)
    // setTimeout(() => {
    //     getOrder('maorder')
    // }, 10);
    scrollTo = jQuery('.materials-select-inner-container').find(`#material-${dataId}`)
    if (scrollTo.length > 0) {
        // console.log(scrollTo.offset().top);
        // console.log(ma_container.offset().top)
        // console.log(ma_container.scrollTop())

        ma_container.scrollTop(scrollTo.offset().top - ma_container.offset().top + ma_container.scrollTop());
        jQuery('.mater-scorll').css('background', '')
        scrollTo.find('.mater-scorll').css('background', '#8bc34a66')
    }
})


/*2列*/
let twoShow = true
jQuery('body').on('mouseenter mouseleave', '.material-two', function (event) {
    if (event.type == 'mouseenter') {

        let top = jQuery(this)[0].getBoundingClientRect().y - 30
        let left = jQuery(this)[0].getBoundingClientRect().x + 60
        jQuery('body').find('.cn-two').css('display', 'block')
        jQuery('body').find('.cn-two').css('top', `${top}px`)
        jQuery('body').find('.cn-two').css('left', `${left}px`)
        jQuery('.classification-te').html(two_Left_Html[jQuery('.material-two').index(this)])
          // 记忆最终值
         // console.log(two_click_index) 
         jQuery('.te-item').eq(two_click_index).addClass('te-active').siblings(this).removeClass('te-active');
         //载入记忆
         switch(two_click_index){
             case 0:
                 // console.log(two_right_Html[0]);
                 jQuery('.classification-ti').html(two_right_Html[0])
                 break;
             case 1:
                 // console.log(two_right_Html[1]);
                 jQuery('.classification-ti').html(two_right_Html[1])
                 break;
             case 2:
                 // console.log(two_right_Html[2]);
                 jQuery('.classification-ti').html(two_right_Html[2])
                 break;                
         }        
        

    } else if (event.type == 'mouseleave') {
        setTimeout(() => {
            if (twoShow) {
                jQuery('body').find('.cn-two').css('display', 'none')
            }
        }, 100);
    }
    return false;
})


jQuery('body').on('mouseenter mouseleave', '.cn-two', function (event) {
    if (event.type == 'mouseenter') {
        twoShow = false
    } else if (event.type == 'mouseleave') {
        twoShow = true
        setTimeout(() => {
            if (twoShow) {
                jQuery('body').find('.cn-two').css('display', 'none')
            }
        }, 150);
    }
})


jQuery('body').on('click', '.te-item', function (event) {
    jQuery(this).addClass('te-active').siblings(this).removeClass('te-active')
    two_click_index =jQuery('.te-item').index(this);
    jQuery('.classification-ti').html(two_right_Html[jQuery('.te-item').index(this)])
})

jQuery('body').on('click', '.ti-item', function (event) {
    jQuery(this).addClass('ti-active').siblings(this).removeClass('ti-active')
    let dataId = jQuery(this).find('span').attr('data-id')
    // 存储点击后的记忆
    switch(two_click_index){
    case 0:
        two_right_Html[0]= jQuery('.classification-ti').html();
        // console.log(one_right_Html[0])
        break;
    case 1:
        two_right_Html[1]= jQuery('.classification-ti').html();
        // console.log(one_right_Html[1])
        break;
    case 2:
        two_right_Html[2]= jQuery('.classification-ti').html();
        // console.log(one_right_Html[2])
        break;     
    }

    //console.log(dataId)
    let cnc_container = ''
    cnc_container = jQuery(".cnc-materials-select-inner-container")
    // 20230106
    // recordHighlighting('cnc-materials-select-outer-container', dataId)
    // setOrder('maorder', dataId)
    // setTimeout(() => {
    //     getOrder('maorder')
    // }, 10);

    scrollTo = jQuery('.cnc-materials-select-inner-container').find(`#cnc-material-${dataId}`)
    if (scrollTo.length > 0) {
        // console.log(scrollTo.offset().top);
        // console.log(cnc_container.offset().top)
        // console.log(cnc_container.scrollTop())
        cnc_container.scrollTop(scrollTo.offset().top - cnc_container.offset().top + cnc_container.scrollTop());
        jQuery('.cnc-scorll').css('background', '')
        scrollTo.find('.cnc-scorll').css('background', '#8bc34a66')
    }

})


/********************************************************* */

jQuery('body').on('click', '.one_material span', function (event) {

    let dataId = jQuery(this).attr('data-id')
        var one_container,
            two_container;
        if (materIndex == 0) {
            one_container = jQuery(".materials-select-inner-container")
            recordHighlighting('materials-select-inner-container', dataId)
            setOrder('maorder', dataId)
            setTimeout(() => {
                getOrder('maorder')
            }, 10);
        }
        if (materIndex == 1) {
            two_container = jQuery(".cnc-materials-select-outer-container")
            recordHighlighting('cnc-materials-select-outer-container', dataId)
            setOrder('cncorder', dataId)
            setTimeout(() => {
                getOrder('cncorder')
            }, 10);
        }
        setTimeout(() => { // let scrollTo = jQuery(`#cnc-material-${dataId}`);
            if (materIndex == 0) {
                scrollTo = jQuery('.materials-select-inner-container').find(`#material-${dataId}`)
                if (scrollTo.length > 0) {
                    one_container.scrollTop(scrollTo.offset().top - one_container.offset().top + one_container.scrollTop());
                    jQuery('.mater-scorll').css('background', '')
                    scrollTo.find('.mater-scorll').css('background', '#8bc34a66')
                }
            } else if (materIndex == 1) {
                scrollTo = jQuery('.cnc-materials-select-outer-container').find(`#cnc-material-${dataId}`)
                if (scrollTo.length > 0) {
                    two_container.scrollTop(scrollTo.offset().top - two_container.offset().top + two_container.scrollTop());
                    jQuery('.cnc-scorll').css('background', '')
                    scrollTo.find('.cnc-scorll').css('background', '#8bc34a66')
                }
            }
        }, 200);
    })


    // 记录高亮
    function recordHighlighting(key, value) {
        localStorage.setItem(key, value)
    }
    window.onload = function () {
        getHigh()
        getCncHigh()
        getOrder('maorder')
        getOrder('cncorder')
    }

    // 记录排序
    function setOrder(key, id) { // localStorage.setItem('')
        let orderList = localStorage.getItem(key)
        if (! orderList) {
            orderList = []
        } else {
            orderList = JSON.parse(orderList)
        }
        let count = 0;
        orderList.forEach((item, index) => {
            if (item.id == id) {
                count += 1;
                item.frequency += 1
            }
        })
        if (count == 0) {
            orderList.push({id: id, frequency: 1})
        }
        localStorage.setItem(key, JSON.stringify(orderList))
    }

    // 获取排序并渲染
    function getOrder(key) {
        var arr = [],
            cnc = [];
        if (materIndex == 0) {
            arr = jQuery('.box-material')
            for (var i = 0; i < arr.length - 1; i++) {
                for (var j = 0; j < arr.length - 1 - i; j++) { // 获取次数
                    let a = getClickNum(key, jQuery(arr[j]).attr('data-id'))
                    let b = getClickNum(key, jQuery(arr[j + 1]).attr('data-id'))
                    if (a < b) {
                        var temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
            jQuery('.ma-order-parent').html(arr)
        }
        if (materIndex == 1) {
            cnc = jQuery('.cnc-box-material')
            for (var i = 0; i < cnc.length - 1; i++) {
                for (var j = 0; j < cnc.length - 1 - i; j++) { // 获取次数
                    let a = getClickNum(key, jQuery(cnc[j]).attr('data-id'))
                    let b = getClickNum(key, jQuery(cnc[j + 1]).attr('data-id'))
                    if (a < b) {
                        var temp = cnc[j];
                        cnc[j] = cnc[j + 1];
                        cnc[j + 1] = temp;
                    }
                }
            }
            jQuery('.cnc-order-parent').html(cnc)
        }

    }

    // 获取点击次数
    function getClickNum(key, id) {
        let qu = 0
        let aorderList = localStorage.getItem(key)
        if (! aorderList) {
            aorderList = []
        } else {
            aorderList = JSON.parse(aorderList)
        } aorderList.forEach((item, index) => {
            if (item.id == id) {
                qu = item.frequency
            }
        })
        return qu;
    }


    // 获取高亮并渲染
    function getHigh() {
        let maHigh = localStorage.getItem('materials-select-inner-container')
        if (maHigh) {
            scrollTo = jQuery('.materials-select-inner-container').find(`#material-${maHigh}`);
            scrollTo.find('.mater-scorll').css('background', '#8bc34a66')
        }
    }

    // 获取高亮并渲染
    function getCncHigh() {
        let cncHigh = localStorage.getItem('cnc-materials-select-outer-container')
        if (cncHigh) {
            scrollTo = jQuery('.cnc-materials-select-outer-container').find(`#cnc-material-${cncHigh}`);
            scrollTo.find('.cnc-scorll').css('background', '#8bc34a66')
        }

    }


    /* 第一列 大图*/
    let isImgShow = true;
    let hoverIndex = 0;

    jQuery('body').on('mouseover mouseout', '.base-drawing', function (event) {
        if (event.type == "mouseover") {
            if (jQuery('.base-drawing').index(this) == hoverIndex) {
                isImgShow = false
            } else {
                isImgShow = true
            } hoverIndex = jQuery('.base-drawing').index(this)
            let web = '';
            let height = '';
            let s800 = '';

            src = jQuery(this).find('input').val();
            s800 = jQuery(this).find('input').attr('data-zoom'); // 鹰眼图800版更清晰
            web = `<div class='maImg_wrapper'></div>`;

            // height = jQuery(this).find('.wp-post-image')[0].getBoundingClientRect().y - 80
            // let minHeight = jQuery('.site-primary-header-wrap')[0].offsetHeight
            // // alert(document.body.clientWidth)
            // let maxHeight = window.screen.availHeight - minHeight
            // if (document.body.clientWidth > 1440) {
            //     maxHeight = window.screen.availHeight - minHeight - 460
            // } else {
            //     maxHeight = window.screen.availHeight - minHeight - 280
            // }
            // if (height < minHeight) {
            //     height = minHeight
            // }
            // if (height > maxHeight) {
            //     height = maxHeight
            // }
            if (src.length != 0 && !jQuery(this).find('.maImg_wrapper')[0]) {
                jQuery(this).css('cursor', 'zoom-in');
                jQuery(this).find('.one_zoom').html(web);
                jQuery(this).find('.maImg_wrapper').fadeIn(200);
                jQuery(this).find('.one_zoom').addClass('active');
                // jQuery(this).find('.maImg_wrapper').css("top", height + 'px');
                // jQuery(this).find('.maImg_wrapper').css("left", jQuery(this).find('.wp-post-image')[0].getBoundingClientRect().x + 80 + 'px');
                // let originWidth = 480
                // let originHeight = 460
                // let magWidth = 120
                // let magHeight = 120
                // if (document.body.clientWidth < 1440) {
                //     originWidth = 280
                //     originHeight = 280
                //     magWidth = 75
                //     magHeight = 75
                // }

                let html = `
            <a  href="${s800}" class="jqzoom" rel='gal1' title="zoom">
                 <img src="${src}"/>
            </a>
            `;
                jQuery(this).find('.maImg_wrapper').html(html);
            }

        } else if (event.type == "mouseout") {
            isImgShow = true
            setTimeout(() => {
                if (isImgShow) {
                 maimgWapperOut(this)
                }
            }, 100);
        }
    })


    // jQuery('body').on('mouseenter mouseleave', '.maImg_wrapper', function (event,magHeight) {
    //     if (event.type == 'mouseenter') {
    //         let url='';let link='';
    //         url = jQuery('.base-drawing').find('input').attr('data-url');
    //         jQuery(this).parent().find('.zoomPup').css('display', 'block');
    //         link = `<a class="link" href="${url}" _target="blank" style="display: block; width: ${magHeight}px !important;height: ${magHeight}px !important;"></a>`;
    //         setTimeout(() => {
    //             jQuery('.base-drawing').find('.zoomPup').html(link);
    //             let path = jQuery('.zoomPup').find('.link').attr('href');
    //             //console.log(path);
    //         }, 30);
    //         isImgShow = false
    //     } else if (event.type == 'mouseleave') {
    //         jQuery(this).parent().find('.zoomPup').css('display', 'none');
    //         isImgShow = true
    //         setTimeout(() => {
    //             if (isImgShow) {
    //                maimgWapperOut('.base-drawing')
    //             }
    //         }, 100);
    //     }
    //     event.stopPropagation()
    // })
    // 当鼠标在“缩略图”窗口中移动时
    jQuery('body').on('mousemove', '.maImg_wrapper', function (e) {
        jQuery('.jqzoom').jqzoom({
            zoomType: 'standard',
            lens: true,
            preloadImages: false,
            alwaysOn: true,
            position: 'right'
        });
    })

    // 元素消失
    function maimgWapperOut(ele) {
        jQuery(ele).css('cursor', 'default');
        jQuery(ele).find('.one_zoom').empty
        jQuery(ele).find('.maImg_wrapper').fadeOut(200).remove();
        jQuery(ele).find('.one_zoom').removeClass('active');
    }



    