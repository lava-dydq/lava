//价格颜色计算
jQuery(document).on('added_to_cart', function () {
    if(jQuery('.materials-select-outer-container-header bdi').text().indexOf('US$0.00') > -1){
        jQuery(".material-bottom-info-cart a,.material-bottom-info-total-price").css("color",'')
        jQuery(".material-bottom-info-cart a img.cart-green").hide()
        jQuery(".material-bottom-info-cart a img.cart-gray").show()
    }else {
        jQuery(".material-bottom-info-cart a,.material-bottom-info-total-price").css("color","#038b02")
        jQuery(".material-bottom-info-cart a img.cart-green").show()
        jQuery(".material-bottom-info-cart a img.cart-gray").hide()
    }

})

jQuery(document).ready(function (jQuery) {
    //处理价格颜色
    jQuery(document.body).trigger('added_to_cart');
})

jQuery.ajaxSettings.async = false


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
        // jQuery(".ma-unit").css("display", "flex");
        // jQuery(".one-price").css("display", "flex");
        jQuery('.material-file-options-qty-wrap').css('display', 'flex');
        jQuery('.printing-full-title').css('display', 'block');
        jQuery('.printing-abbreviated-title').css('display', 'none');
        // jQuery('.custom-column-width-2').css({
        //     width: printingWidth - 470 + 'px', //470
        //     minWidth: printingWidth - 470 + 'px'
        // });
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
        	// jQuery('.cn-unit').css('display', 'flex');
        	// jQuery('.two-price').css('display','flex');
        jQuery('.cnc-material-file-options-qty-wrap').css('display', 'flex');
        // jQuery('.custom-cnc-column-width-2').css({
        //     width: cncWidth - 670 + 'px',
        //     minWidth: cncWidth - 670 + 'px'
        // });
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
        jQuery('.pi-unit').css('display', 'flex');
        jQuery('.three-price').css('display', 'block');
        jQuery('.pi-file-mould-part-wrap').css('display', 'block');
        jQuery('.custom-pi-column-width-2').css({
            width: piWidth - 470 + 'px',//370
            minWidth: piWidth - 470 + 'px'
        });
    }

});


//列表上下滚动
var driection = [1, 1, 1]

t1 = setInterval(function () {
    let c = [jQuery('.materials-select-inner-container'), jQuery('.cnc-materials-select-inner-container'), jQuery('.pi-materials-select-inner-container')]
    let offset = 6

    let ds = function (index) {
        let i = c[index]
        if (i.prop('scrollHeight') + offset < i.scrollTop() + i.height()) {
            driection[index] *= -1
        }
        if (i.scrollTop() === 0) {
            driection[index] *= -1
        }
        i.scrollTop(i.scrollTop() + offset * driection[index])
    }


    ds(0)
    ds(1)
    ds(2)
}, 60)

//开关列
t2 = setInterval(function () {
    let it = [jQuery('.printing-fa-angles-wrap'), jQuery('.cnc-fa-angles-wrap'), jQuery('.pi-fa-angles-wrap')]
    let swIndex = -1
    for (let index in it) {
        if (it[index].find(".close").css('display') === "flex") {//是打开
            if (swIndex === -1) {
                swIndex = index
            }
            it[index].click()//关闭
        }
    }

    let next = it[(swIndex + 1) % it.length]
    if (next.find(".close").css('display') === "flex") {//打开
        //下一个已经打开
    } else {
        next.click()
    }

}, 3000)

//轮流显示
t3 = setInterval(function () {
    let doFunc = (className) => {
        let expend = jQuery(className)
        for (let expendKey = 0; expendKey < expend.length; expendKey++) {
            if (jQuery(expend[expendKey]).has('.fa-angle-up').length > 0) {
                jQuery(expend[expendKey]).click()
                setTimeout(() => {
                    jQuery(expend[(expendKey + 1) % expend.length]).click()
                }, 500)
                return
            }
        }
        expend.first().click()
    }

    if (jQuery(".file_name").length === 0) {
        return
    }

    doFunc('.printing-show-files-arrow')
    doFunc('.cnc-show-files-arrow')
    doFunc('.pi-show-files-arrow')
}, 1000)

jQuery(document).on('mouseover', '.materials-select-outer-container', function () {
    // console.log("鼠标经过，动画停止")
    clearInterval(t1)
    clearInterval(t2)
    clearInterval(t3)
})


function debounce(callback, limit) {
    let timeout;
    let lock = false
    let fn = function (e) {
        let that = this
        if (lock) {
            // console.log("锁定ing")
            return
        }
        clearTimeout(timeout);
        lock = true
        callback.bind(that)(e)
        timeout = setTimeout(() => {
            lock = false;
        }, limit);
    }
    return fn
}


// 列展开
jQuery(document).on('mouseover', '.printing-materials-select-outer-container,.cnc-materials-select-outer-container,.pi-materials-select-outer-container', debounce(function (e) {

    if (jQuery(this).outerWidth() < e.offsetX) {
        console.log("虚位")
        return
    }
    let wrapClassName = jQuery(this).attr('class').replace('materials-select-outer-container', 'fa-angles-wrap')
    let next = jQuery('.' + wrapClassName)

    console.log(wrapClassName, '列展开')


    if (next.find(".close").css('display') === "flex") {//打开
        //下一个已经打开
    } else {
        // next.click()
    }

    let it = [jQuery('.printing-fa-angles-wrap'), jQuery('.cnc-fa-angles-wrap'), jQuery('.pi-fa-angles-wrap')]
    for (let index in it) {
        if (it[index].attr('class').indexOf(wrapClassName) !== -1) {
            continue
        }
        if (it[index].attr('auto-expand')) {
            continue
        }
        if (it[index].find(".close").css('display') === "flex") {//是打开
            it[index].click()//关闭
        }
    }

}, 400))

//行展开
jQuery(document).on('mouseover', '.box-material-materiallist,.cnc-box-material-materiallist,.pi-box-material-materiallist', function () {
    if (jQuery(".file_name").length === 0) {
        return
    }

    if (jQuery(this).find('.show-files-arrow-wrap').find('.fa-angle-down').length > 0) {
        if (jQuery(this).find('.show-files-arrow').attr('auto-expand')) {
            return
        }
        jQuery(this).find('.show-files-arrow').attr('auto-expand', true)
        jQuery(this).find('.show-files-arrow').click()
    }
})



;(function ($) {
    "use strict"
    $.fn.sortChildren = function (options) {
        var settings = $.isPlainObject(options)
            ? $.extend({ // Object parameter, new style
                cmp: function () {
                    return $(this).text()
                },
                ignoreFirst: 0, // ignore some of the first few children
                ignoreLast: 0, // ignore some of the last few children
                reverse: false  // sort in reverse
            }, options)
            : { // cmp,ignoreFirst,ignoreLast,reverse // old parameters
                cmp: arguments[0],
                ignoreFirst: arguments[1],
                ignoreLast: arguments[2],
                reverse: arguments[3]
            }
        return this.each(function () {
            var self = $(this),
                children = $.makeArray(self.children()),
                first = children.splice(0, settings.ignoreFirst || 0),
                last = children.splice(-(settings.ignoreLast || 0), settings.ignoreLast)
            $.each(children.sort(settings.cmp), function (i, child) {
                if (settings.reverse)
                    self.prepend(child)
                else
                    self.append(child)
            })
            self.prepend(first).append(last)
        })
    }
    $.fn.sortTable = function () { // an example solution  for simple table sorting
        return this.each(function () {
            var sorts = $("thead th", this).map(function (i) {
                return $.sortKeys.call(0, $(this).data("sort") || [{"childAlpha": i}])
            }).get()
            $("thead th", this).click(function () {
                if ($(this).hasClass("no-sort")) return
                var tbody = $(this).closest("table").children("tbody"),
                    column = $(this).index(),
                    alreadySorted = $(this).hasClass("sorted")
                if (alreadySorted) $(this).toggleClass("reversed").siblings().removeClass("sorted reversed")
                $(this).addClass("sorted").siblings().removeClass("sorted reversed")
                tbody.sortChildren({
                    cmp: sorts[column],
                    reverse: $(this).hasClass("reversed")
                })
            }).attr("title", "sortable").first().click()
        })
    }
    $.sortKeys = function (a) { // easier way to build sort compare functions.
        if ($.isArray(a))
            return $.sortFunc($.map(a, function (key, i) {
                return $.map(key, function (childNo, sort) {
                    return $.sortFunc[sort](childNo)
                })
            }))
        else
            return $.sortFunc($.map(arguments, function (argument, i) {
                return argument ? $.sortFunc[argument](i) : undefined
            }))
    }
    $.sortFunc = $.extend(function (sorts, options) {
        var options = options || []
        
        var funcs = sorts.map(function (v) {
            if ($.isFunction(v)) {
                options.push('')
                return v
            } else {
                var vS = v.split("::"),
                    option = {},
                    o = vS.length == 1 ? [] : vS[1].toLowerCase().split(" ")
                o.map(function (v) {
                    option[v] = true
                })
                options.push(option)
//                 console.log(v,JSON.stringify(options))
                return new Function("return " + vS[0])
            }
        })
        return function (a, b) {
            for (var i = 0; i < funcs.length; i++) {
                var func = funcs[i]
                    , aV = func.call(a)
                    , bV = func.call(b)
                if (options[i].numeric) {
                    aV = +aV
                    bV = +bV
                }
//             console.log("sort",aV,bV,reverse)
                var reverse = options[i].reverse ? -1 : +1
                if (aV < bV)
                    return -1 * reverse
                else if (aV > bV)
                    return 1 * reverse
            }
            return 0
        }
    }, {
        numeric: function () {
            return +$(this).text()
        },
        alpha: function () {
            return $(this).text()
        },
        reverseNumeric: function () {
            return -+$(this).text()
        },
        reverseAlpha: "$(this).text()::reverse",

        childNumeric: function (i) {
            return function () {
                return parseFloat($.trim($(this).children().eq(i).text()))
            }
        },
        childReverseNumeric: function (i) {
            return function () {
                return -parseFloat($.trim($(this).children().eq(i).text()))
            }
        },
        childAlpha: function (i) {
            return function () {
                return $.trim($(this).children().eq(i).text())
            }
        },
    })
})(jQuery)




//material-part reverse 增加图标
//material 排序

jQuery(document).on('click', '.material-box-head-name .material-part,.cnc-material-box-head-name .material-part,.pi-material-box-head-name .material-part', function () {
    jQuery(this).toggleClass("reverse")
    console.log("order", jQuery(this).hasClass("reverse"))
    jQuery(this).parents('.materials-select-inner-container,.cnc-materials-select-inner-container,.pi-materials-select-inner-container').children('.ma-order-parent,.pi-order-parent,.cnc-order-parent')
        .sortChildren(jQuery.sortFunc(["jQuery(this).find('.material-part').text()"]), 0, 0, jQuery(this).hasClass("reverse"))
})

//price 排序
jQuery(document).on('click', '.material-box-head-name .material-box-head-price,.cnc-material-box-head-name .cnc-material-box-head-price,.pi-material-box-head-name .pi-material-box-head-price', function () {
    jQuery(this).toggleClass("reverse")
    let className = "material-box-desc-price"
    jQuery(this).prop('class').split(" ").forEach(c => {
        let i = c.indexOf("material-box-head-price")
        if (i > 0) {
            className = c.slice(0, i) + className
        }
    })
    console.log(className)
    jQuery(this).parents('.materials-select-inner-container,.cnc-materials-select-inner-container,.pi-materials-select-inner-container').children('.ma-order-parent,.pi-order-parent,.cnc-order-parent')
        .sortChildren(jQuery.sortFunc([`jQuery(this).find('.${className}').text()`]), 0, 0, jQuery(this).hasClass("reverse"))
})

jQuery(document).on('click', '.material-box-head-name div', function () {
    if ('Process' === jQuery(this).text().trim()) {
        jQuery(this).toggleClass("reverse")
        jQuery(this).parents('.materials-select-inner-container,.cnc-materials-select-inner-container,.pi-materials-select-inner-container').children('.ma-order-parent,.pi-order-parent,.cnc-order-parent')
            .sortChildren(jQuery.sortFunc([`jQuery(this).find('.printing-material-process').text()`]), 0, 0, jQuery(this).hasClass("reverse"))
    }
})



function divChange() {

    // console.log(this)
    // debugger
    // setTimeout(() => {
    //     for (let elem of [jQuery('.printing-fa-angles-wrap'), jQuery('.cnc-fa-angles-wrap'), jQuery('.pi-fa-angles-wrap')]) {

            let elem = jQuery(this)
            let classPrefix = elem.attr('class').replaceAll('fa-angles-wrap', '').replaceAll(' ', '')
            //console.log("1:"+classPrefix)
            let outContainer = jQuery('.' + classPrefix + 'materials-select-outer-container')
            //console.log("2:"+JSON.stringify(outContainer))
            let w = outContainer.outerWidth()
            console.log("3:"+w)

            const column = [
                'swatch', 'price', 'material', 'qty', 'cart', 'color', 'lead_time', 'unit','process', 'finish'
            ]
            //.cnc-column-process
            for (let i = 0; i < column.length; i++) {
                //console.log(i)
                let elemClass = '.' + classPrefix + 'column-' + column[i]

                let elemW = jQuery(elemClass).outerWidth() ?? 0
                console.log("宽度计算，容器宽度", w, "列宽度", elemW, "列选择器", elemClass)
                if (w - elemW > 0) {
                    w -= elemW
                    jQuery(elemClass).show()
                    console.log(elemClass,'显示')
                } else {
                    jQuery(elemClass).hide()
                    w = 0
                    console.log(elemClass,'隐藏')
                }
            }
        // }

    // }, 500)
}

// 点击左移右移图标
jQuery(document).on('click', '.printing-fa-angles-wrap', function () {
    jQuery(this).attr('auto-expand', true)

    var display = jQuery(this).find(".close").css('display');
    if (display == "flex") {
        jQuery('.printing-materials-select-outer-container').animate({width: '30%'}, 400, 'linear', divChange.bind(this));
        // jQuery('.material-file-options-qty-wrap').css('display', 'none');
        // jQuery('.printing-full-title').css('display', 'none');
        // jQuery('.printing-abbreviated-title').css('display', 'block');
        // jQuery('.custom-column-width-2').animate({
        //     width: '130px',
        //     minWidth: '130px'
        // });
        jQuery(this).find(".open").css('display', 'flex');
        jQuery(this).find(".close").css('display', 'none');
        // jQuery(".ma-unit").css("display", "none");
        // jQuery(".one-price").css("display", "none");
        // jQuery('.materials-select-inner-container').css('overflow-x', 'hidden');
    } else {
        jQuery('.printing-materials-select-outer-container').animate({width: '1186px'}, 400, 'linear', divChange.bind(this));
        // jQuery('.material-file-options-qty-wrap').css('display', 'flex');
        // jQuery('.printing-full-title').css('display', 'block');
        // jQuery('.printing-abbreviated-title').css('display', 'none');
        // jQuery('.custom-column-width-2').animate({
        //     width: '500px',
        //     minWidth: '500px'
        // });
        jQuery(this).find(".close").css('display', 'flex');
        jQuery(this).find(".open").css('display', 'none');
        // jQuery(".ma-unit").css("display", "flex");
        // jQuery(".one-price").css("display", "flex");

        // jQuery('.materials-select-inner-container').css('overflow', 'scroll');
        // jQuery('.materials-select-inner-container').css('overflow-x', 'hidden');
    }


});

jQuery(document).on('click', '.cnc-fa-angles-wrap', function () {
    jQuery(this).attr('auto-expand', true)

    var display = jQuery(this).find(".close").css('display');
    if (display == "flex") {
        jQuery('.cnc-materials-select-outer-container').animate({width: '30%'}, 400, 'linear', divChange.bind(this));
        // jQuery('.cnc-material-file-options-qty-wrap').css('display', 'none');
        // jQuery('.custom-cnc-column-width-2').animate({
        //     width: '130px',
        //     minWidth: '130px'
        // });
        jQuery(this).find(".open").css('display', 'flex');
        jQuery(this).find(".close").css('display', 'none');

        // jQuery('.cn-unit').css('display', 'none');
        // jQuery('.two-price').css('display','none');

        // jQuery('.cnc-materials-select-inner-container').css('overflow', 'scroll');
        // jQuery('.cnc-materials-select-inner-container').css('overflow-x', 'hidden');
    } else {
        jQuery('.cnc-materials-select-outer-container').animate({width: '1170px'}, 400, 'linear', divChange.bind(this));
        // jQuery('.cnc-material-file-options-qty-wrap').css('display', 'flex');
        // jQuery('.custom-cnc-column-width-2').animate({
        //     width: '350px',
        //     minWidth: '350px'
        // });
        jQuery(this).find(".close").css('display', 'flex');
        jQuery(this).find(".open").css('display', 'none');

        // jQuery('.cn-unit').css('display', 'flex');
        // jQuery('.two-price').css('display','flex');

        // jQuery('.cnc-materials-select-inner-container').css('overflow', 'scroll');
        // jQuery('.cnc-materials-select-inner-container').css('overflow-x', 'hidden');
    }
});

jQuery(document).on('click', '.pi-fa-angles-wrap', function () {
    jQuery(this).attr('auto-expand', true)

    var display = jQuery(this).find(".close").css('display');
    if (display == "flex") {
        jQuery('.pi-materials-select-outer-container').animate({width: '38%'},400,'linear',divChange.bind(this));
        // jQuery('.pi-file-mould-part-wrap').css('display', 'none');
        // jQuery('.custom-pi-column-width-2').animate({
        //     width: '130px',
        //     minWidth: '130px'
        // });
        jQuery(this).find(".open").css('display', 'flex');
        jQuery(this).find(".close").css('display', 'none');

        // jQuery('.pi-unit').css('display', 'none');
        // jQuery('.three-price').css('display', 'none');

        // jQuery('.pi-materials-select-inner-container').css('overflow-x', 'hidden');
    } else {
        jQuery('.pi-materials-select-outer-container').animate({width: '1500px'},400,'linear',divChange.bind(this));
        // jQuery('.pi-file-mould-part-wrap').css('display', 'block');
        // jQuery('.custom-pi-column-width-2').animate({
        //     width: '470px',
        //     minWidth: '470px'
        // });
        jQuery(this).find(".close").css('display', 'flex');
        jQuery(this).find(".open").css('display', 'none');

        // jQuery('.pi-unit').css('display', 'flex');
        // jQuery('.three-price').css('display', 'block');
        //
        // jQuery('.pi-materials-select-inner-container').css('overflow-x', 'hidden');
    }
    // divChange(this)
});



// 点击材料的向下箭头,显示或隐藏文件框
jQuery('body').on('click', '.printing-show-files-arrow', function () {
    if (jQuery('.file_name').length == 0) {
        jQuery('#alertToUploadFile').show();
        jQuery(this).prop('disabled', false);
        return;
    } else {
        var display = jQuery(this).closest('.box-material').find('.files-box').css('display');
        if (display == 'none') {
            jQuery(this).closest('.box-material').find('.files-box').show("slow");
            jQuery(this).find('.fa-solid').removeClass('fa-angle-down');
            jQuery(this).find('.fa-solid').addClass('fa-angle-up');
        } else {
            jQuery(this).closest('.box-material').find('.files-box').hide("slow");
            jQuery(this).find('.fa-solid').removeClass('fa-angle-up');
            jQuery(this).find('.fa-solid').addClass('fa-angle-down');
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
        if (display == 'none') {
            jQuery(this).closest('.cnc-box-material').find('.cnc-files-container').show("slow");
            jQuery(this).find('.fa-solid').removeClass('fa-angle-down');
            jQuery(this).find('.fa-solid').addClass('fa-angle-up');
        } else {
            jQuery(this).closest('.cnc-box-material').find('.cnc-files-container').hide("slow");
            jQuery(this).find('.fa-solid').removeClass('fa-angle-up');
            jQuery(this).find('.fa-solid').addClass('fa-angle-down');
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
        if (display == 'none') {
            jQuery(this).closest('.pi-box-material').find('.pi-files-container').show("slow");
            jQuery(this).find('.fa-solid').removeClass('fa-angle-down');
            jQuery(this).find('.fa-solid').addClass('fa-angle-up');
        } else {
            jQuery(this).closest('.pi-box-material').find('.pi-files-container').hide("slow");
            jQuery(this).find('.fa-solid').removeClass('fa-angle-up');
            jQuery(this).find('.fa-solid').addClass('fa-angle-down');
        }
    }
});

jQuery('body').on('mouseover', '.options-form label', function () {
    jQuery(this).find('.color-tips').show();
})



//一键关闭全部展开
jQuery(document).on('click', '.show-files-arrow-close-all .iconfont', function () {
    let parentClass = jQuery(this).parents('.printing-materials-select-outer-container,.cnc-materials-select-outer-container,.pi-materials-select-outer-container').attr('class');
    let className = '.' + parentClass.replaceAll('-materials-select-outer-container', '-show-files-arrow').replaceAll(' ', '');
    //    doFunc('.printing-show-files-arrow')
    //     doFunc('.cnc-show-files-arrow')
    //     doFunc('.pi-show-files-arrow')
    let re_action = false;
    if(jQuery(this).attr('class').indexOf("zhankai") > -1){
        re_action = true
    }
    let expend = jQuery(className)
    for (let expendKey = 0; expendKey < expend.length; expendKey++) {
        if (jQuery(expend[expendKey]).has('.fa-angle-up').length > 0 ^ re_action) {
            jQuery(expend[expendKey]).click()
        }
    }
})




// 全屏
jQuery(document).on('click', '.full-screen', function () {
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
    }if(document.webkitRequestFullScreen){
        element.webkitRequestFullScreen();
    }

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
            marginRight: '0'
        });
        jQuery('.materials-select-inner-container').css('height', bHeight);
        jQuery('.cnc-materials-select-inner-container').css('height', bHeight);
        jQuery('.pi-materials-select-inner-container').css('height', bHeight);

    }, 100);
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
        marginRight: 'calc( -50vw + 50%)'
    });
    jQuery('.materials-select-inner-container').css('height', '800px');
    jQuery('.cnc-materials-select-inner-container').css('height', '800px');
    jQuery('.pi-materials-select-inner-container').css('height', '800px');
    jQuery('.full-screen').css('display', 'block');
    jQuery('.minimize-screen').css('display', 'none');

    //退出全屏
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }if(document.webkitExitFullscreen){
        document.webkitExitFullscreen()
    }
});



// //文件上传处理
// var load_progress; //= jQuery('#progress');
// var bar; //= jQuery('#bar');
// var percent; //= jQuery('#percent');

// jQuery('body').on('change', '.files_stl', function () {
// // jQuery('.files_stl').change(function () {
//     load_progress = jQuery('#progress');
//     bar = jQuery('#bar');
//     percent = jQuery('#percent');
//     if (jQuery(this).val() != '') {
//         var error = false;
//         var error_msg = '';

//         jQuery.each(this.files, function (i, file) {
//             if (file.size > 524288000) {
//                 error = true;
//                 error_msg = 'Error: single file does not exceed 64M.';
//             } else if (i > 9) {
//                 error = true;
//                 error_msg = 'Error: single can upload up to 10 files.';
//             }
//         });
//         console.log('file_stl', this.files);

//         jQuery('#viewer').empty();
//         jQuery('#model-show-container .canvas-number').remove();
//         //jQuery('#files_name').empty();
//         jQuery('.preview-info').show();
//         jQuery('.preview-info .title').show();
//         jQuery('#total_files').html('--');
//         jQuery('#total_capacity').html('--');


//         if (error == false) {
//             jQuery('.file-model-container').show();
//             jQuery('.dropBox_wrap').hide();

//             jQuery(this).parents('.form_files').ajaxSubmit({
//                 url: myajax.url,
//                 beforeSend: function () {
//                     //status.empty();
//                     jQuery('.preview-info .title').hide();
//                     var percentVal = '0%';
//                     bar.width(percentVal);
//                     bar.css("background-color", "#ED910E");
//                     var percenthtml = 'Uploading: ' + percentVal;
//                     percent.html(percenthtml);
//                     load_progress.show();
//                 },
//                 uploadProgress: function (event, position, total, percentComplete) {
//                     var percentVal = percentComplete + '%';
//                     bar.width(percentVal);
//                     var percenthtml = 'Uploading: ' + percentVal;
//                     if (percentComplete == 100) {
//                         percenthtml = 'Upload completed. Calculating...';
//                     }
//                     percent.html(percenthtml);
//                     // console.log(percentVal, position, total);
//                 },
//                 success: function (data) {
//                     console.log('success', JSON.parse(data));
//                     load_progress.hide();

//                     if (data != 0) {
//                         //取消头部固定
//                         jQuery(".fix-head").removeClass("fix-head")

//                         var data = JSON.parse(data);
//                         jQuery.each(data.files, function (i, file) {
//                             urlToBlob(file, blogData);
//                         });
//                         jQuery.post(
//                             myajax.url, {
//                                 'action': 'mail_to_sale',
//                                 'file_name': data.files,
//                             },
//                             function () {
//                             }
//                         );

//                     } else {
//                         alert('file upload error! Please upload the files again!');
//                         window.history.go(0);
//                     }
//                 },
//                 complete: function (xhr) {
//                     //status.html(xhr.responseText);
//                     load_progress.hide();
//                 }
//             });
//         } else {
//             if (!error_msg)
//                 error_msg = 'Error STL File';

//             jQuery(this).val('');
//             alert(error_msg);
//         }
//     }
// });
