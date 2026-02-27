jQuery(document).ready(function(jQuery) {
	var stl_load_progress = jQuery('.portrait-upload-stl-progressbar');
	var stl_bar = jQuery('#portrait-upload-stl-bar');
	var stl_percent = jQuery('#portrait-upload-stl-percent');
	jQuery('.portrait_file_stl').change(function() {
		console.log('portrait_file_stl',myajax.url);
		jQuery(this).parents('.portrait-stl-form').ajaxSubmit({
			url: myajax.url,
			beforeSend: function() {
				var percentVal = '0%';
				stl_bar.width(percentVal);
				stl_bar.css("background-color","#ED910E");
				var percenthtml = 'Uploading: ' + percentVal;
				stl_percent.html(percenthtml);
				stl_load_progress.show();
			},
			uploadProgress: function(event, position, total, percentComplete) {
				var percentVal = percentComplete + '%';
				stl_bar.width(percentVal);
				var percenthtml = 'Uploading: ' + percentVal;
				stl_percent.html(percenthtml);
			},
			success: function(data) {
				console.log('success', JSON.parse(data));
				var percentVal = '100%';
				stl_bar.width(percentVal);
				var percenthtml = 'Uploading: ' + percentVal;
				stl_percent.html(percenthtml);
				stl_load_progress.hide();

				if (data != 0) {
					var data = JSON.parse(data);
					if (data.error != '') {
						jQuery('.portrait-upload-stl-result-tip').text(data.error);
						jQuery('.portrait-upload-stl-result-tip').show();
					}else {
						//在上传框中显示文件名
						var file_html = jQuery('.portrait-files-area').html();
						if (file_html == '') {
							//如果文件框里没有文件名，把空文件的购物条目先删除。
							jQuery('.portrait-cart-file-item').remove();
						}
						data.files.forEach(function(val, index){
							file_html += '<div class="portrait-files-area-fileitem">' + 
											'<span class="portrait-files-area-filename">'+ val[1] +'</span>' + 
											'<span class="portrait-files-area-delfile"><span class="dashicons dashicons-dismiss"></span></span>' + 
										'</div>';
						});
						jQuery('.portrait-files-area').html(file_html);
						
						//添加文件对应的购物条目
						var portrait_cart_item_array = new Array();
						jQuery('.portrait-cart-init-item').each(function(index, el) { 
							var portrait_cart_init_item = jQuery(this).html();
							var item_html = '';
							data.files.forEach(function(val, i){
								var filename_html = '<span class="portrait-file-name">'+ val[1] +'</span>';
								var new_portrait_cart_init_item = portrait_cart_init_item.replace('<span class="portrait-file-name"></span>', filename_html);
								var tr_html = '<tr class="portrait-cart-file-item">' + new_portrait_cart_init_item + '</tr>';
								item_html += tr_html;
							});
							portrait_cart_item_array[index] = item_html;
						});
						jQuery('.portrait-cart-info-tbody').each(function(index, el) { 
							var portrait_cart_item = jQuery(this).html();
							var new_portrait_cart_item = portrait_cart_item + portrait_cart_item_array[index];
							jQuery(this).html(new_portrait_cart_item);
						});
						change_protrait_shipping();
					}
				}
			},
			error: function() {
				stl_load_progress.hide();
				jQuery('.portrait-upload-stl-result-tip').text("Error.Try it again!");
				jQuery('.portrait-upload-stl-result-tip').show();
			},
		});
	});
	//删除文件名
	jQuery('.portrait-files-area').on('click', '.portrait-files-area-delfile', function() {
		var obj = jQuery(this);
		var filename = jQuery(this).siblings('.portrait-files-area-filename').text();
		console.log('filename', filename);
		jQuery.post(
			myajax.url, {
				'action': 'delete_portrait_file',
				'file_name': filename,
			},
			function(res) {
				var res = JSON.parse(res);
				console.log('res', res);
				if (res == 1) {
					obj.closest('.portrait-files-area-fileitem').remove();
					jQuery('.portrait-file-name').each(function(index, el) {
						if (jQuery(this).text()==filename) {
							jQuery(this).closest('.portrait-cart-file-item').remove();
						}
					});
					//判断是否还有文件，如果没有文件了，加上一条空文件的购物条目。
					var files_area_html = jQuery('.portrait-files-area').html();
					console.log('files_area_html', files_area_html);
					if (files_area_html == '') {
						var portrait_cart_item_array = new Array();
						jQuery('.portrait-cart-init-item').each(function(index, el) { 
							var portrait_cart_init_item = jQuery(this).html();
							var tr_html = '<tr class="portrait-cart-file-item">' + portrait_cart_init_item + '</tr>';
							portrait_cart_item_array[index] = tr_html;
						});
						jQuery('.portrait-cart-info-tbody').each(function(index, el) { 
							var portrait_cart_item = jQuery(this).html();
							var new_portrait_cart_item = portrait_cart_item + portrait_cart_item_array[index];
							jQuery(this).html(new_portrait_cart_item);
						});
						change_protrait_shipping();
					}
					change_protrait_shipping();
				} else {
					alert('Delete failed, please try again!')
				}
			}
		);
	});
	// jQuery('.portrait-upload-stl-del').click(function(event) {
	// 	var stl = jQuery('.portrait-file-name').val();
	// 	jQuery('.portrait-upload-stl-del').hide();
	// 	jQuery('.portrait-file-name').val('');
	// 	jQuery.post(
	// 		myajax.url, {
	// 			'action': 'delete_portrait_file',
	// 			'file_name': stl,
	// 		},
	// 		function() {
	// 			jQuery('.portrait-file-name').text('');
	// 		}
	// 	);
	// });
	jQuery(document).on('change', '.portrait_height_select_box', function() {
		var portrait_height = jQuery(this).val();
		jQuery(this).closest('.portrait-cart-file-item').find('.portrait_height_input').val(portrait_height);
		var height_price_ratio = jQuery(this).closest('.portrait-cart-item').attr('data-height_price_ratio');
		var price = (Number(portrait_height) * Number(height_price_ratio)).toFixed(2);
		jQuery(this).closest('.portrait-cart-file-item').find('.portrait-price-number').text(price);
		var quantity = jQuery(this).closest('.portrait-cart-file-item').find(" input[ name='portrait-quantity' ] ").val();
		var total = (price * quantity).toFixed(2);
		jQuery(this).closest('.portrait-cart-file-item').find('.portrait-total-number').text(total);
		change_protrait_shipping();
	});

	jQuery(document).on('change', '.portrait_height_input', function() {
		var portrait_height = jQuery(this).val();
		var height_price_ratio = jQuery(this).closest('.portrait-cart-item').attr('data-height_price_ratio');
		var price = (Number(portrait_height) * Number(height_price_ratio)).toFixed(2);
		jQuery(this).closest('.portrait-cart-file-item').find('.portrait-price-number').text(price);
		var quantity = jQuery(this).closest('.portrait-cart-file-item').find(" input[ name='portrait-quantity' ] ").val();
		var total = (price * quantity).toFixed(2);
		jQuery(this).closest('.portrait-cart-file-item').find('.portrait-total-number').text(total);
		change_protrait_shipping();
	});

	jQuery(document).on('change', '.portrait-quantity-number', function() {
		var quantity = jQuery(this).val();
		var price = jQuery(this).closest('.portrait-cart-file-item').find('.portrait-price-number').text();
		var total = (price * quantity).toFixed(2);
		jQuery(this).closest('.portrait-cart-file-item').find('.portrait-total-number').text(total);
		change_protrait_shipping();
	});

	jQuery(document).on('change', '.portrait_country_select_box', function() {
		change_protrait_shipping();
	});
	function change_protrait_shipping() {
		var countrycode = jQuery('.portrait_country_select_box').val();
		var total_volumn = 0;
		var total_price = 0;
		jQuery('.portrait-cart-item').each(function() {
			jQuery('.portrait-cart-file-item').each(function(i) {
				var portrait_height = Number(jQuery(this).find('.portrait_height_select_box').val());
				var portrait_height = Number(portrait_height) * 25.4;
				var quantity = Number(jQuery(this).find('.portrait-quantity-number').val());
				var volumn_coefficient = Number(jQuery(this).closest('.portrait-cart-item').attr('data-volumn_coefficient'));
				var price_total = Number(jQuery(this).find('.portrait-total-number').text());
				// console.log('portrait_height', portrait_height); console.log('portrait_height', typeof(portrait_height));
				// console.log('quantity', quantity);console.log('quantity', typeof(quantity));
				// console.log('volumn_coefficient', volumn_coefficient);console.log('volumn_coefficient', typeof(volumn_coefficient));
				total_volumn += portrait_height * portrait_height * portrait_height * volumn_coefficient * quantity;
				total_price += price_total;
			});
		});
		
		console.log('total_volumn', total_volumn);
		console.log('countrycode', countrycode);
		jQuery.post(
			myajax.url, {
				'action': 'calculate_protrait_total_shipping',
				'change_country': countrycode,
				'total_box_volume': total_volumn
			},
			function(data) {
				//console.log('sipping', data);
				var data = JSON.parse(data);
				jQuery('.portrait-sipping-number').text(data);
				var totalprice = (parseFloat(data) + parseFloat(total_price)).toFixed(2);
				jQuery('.portrait-cart-total-number').text(totalprice);
			}
		)
	};
	// AJAX - button "Add Protrait to cart"
	jQuery('.portrait-cart-item').on('click', '.portrait-add-to-cart', function() {
		if (jQuery(this).parents('.portrait-cart-file-item').find('.portrait-file-name').text() == '') {
			alert("Can not add to cart without file!");
		} else {
			var box_material = jQuery(this).closest('.portrait-cart-file-item');
			var files = [];
			var item_id = jQuery(this).closest('.portrait-cart-item').attr('id');
			var portrait_height = jQuery(this).closest('.portrait-cart-file-item').find('.portrait_height_select_box').val();
			var portrait_height_uint = jQuery(this).closest('.portrait-cart-file-item').find('.portrait-height-unit').text();
			var portrait_height_text = String(portrait_height) + portrait_height_uint;
			var portrait_height = Number(portrait_height) * 25.4;

			console.log('item_id', item_id);

			jQuery('#' + item_id ).each(function(i) {
				var volumn_coefficient = jQuery(this).attr('data-volumn_coefficient');
				var box_volume = portrait_height * portrait_height * portrait_height * volumn_coefficient;
				var file_item = {
					portrait_height_text: portrait_height_text,
					volume: 0,
					surface_area: 0,
					box_volume: box_volume,
					material_id: jQuery(this).attr('data-id'),
					file_name: box_material.find('.portrait-file-name').text(),
					quantity: box_material.find("input[name='portrait-quantity']").val(),
					price_unit: box_material.find('.portrait-price-number').text(),
					leadtime: 'default',
					leadtime_selected: 'default',
					color_selected: 'default',
					density: 0,
					fixed_cofficient: jQuery(this).attr('data-fixed_cofficient'),
					weight_range_1: jQuery(this).attr('data-weight_range_1'),
					weight_range_2: jQuery(this).attr('data-weight_range_2'),
					cofficient_1_greater_weightrange: jQuery(this).attr('data-cofficient_1_greater_weightrange'),
					cofficient_weight_bw_range_1_and_2: jQuery(this).attr('data-cofficient_weight_bw_range_1_and_2'),
					cofficient_2_smaller_weightrange: jQuery(this).attr('data-cofficient_2_smaller_weightrange'),
					usdrmb_exchange_rate: jQuery(this).attr('data-usdrmb_exchange_rate')
				};

				files.push(file_item);
			});

			//console.log( files );

			if (files.length > 0) {

				jQuery.post(
					myajax.url, {
						'action': 'prints_create_protrait_product',
						'files': files
					},
					function(data) {

						//console.log('addtocartdata', data );
						if (data != 0) {
							var jsondata = JSON.parse(data);
							//console.log('addtocartdata', data );
							if (jsondata.error) {
								alert(jsondata.error);
							} else {
								if (jsondata.products.length > 0) {
									// 更新材料选择部分的购物车信息
									jQuery('.material-table-head-cart').html(jsondata.table_html_cart);
									// Trigger event so themes can refresh other areas. 更新头部的购物车信息 参考add-to-cart.js
									jQuery( document.body ).trigger( 'added_to_cart', [ jsondata.fragment.fragments, jsondata.fragment.cart_hash ] );
								}
							}

						}
					}
				);
			}
		}
	});
});