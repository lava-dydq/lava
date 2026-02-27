// cart page 修改数量
jQuery(document).on('change', '.quantity .qty', function(e) {
	e.preventDefault();
	var current_quantity = jQuery(this).val();
	//console.log(current_quantity);
	var product_id = jQuery(this).parents('td.product-quantity').attr('data-product-id');
	//console.log(product_id);
	jQuery.post(
		myajax.url, {
			'action': 'update_cart_quantity',
			'quantity': current_quantity,
			'product_id': product_id
		},
		function(data) {
			//console.log('data', data);
			jQuery('button[name="update_cart"]').prop('disabled', false).trigger("click");
			if (jQuery('input[name="update_cart"]').length > 0) {
				jQuery('input[name="update_cart"]').prop('disabled', false).trigger("click");
			}
		}
	);

});

// 点击清空购物车按钮
jQuery(document).on('click', '.emptyCart', function(e) {
	var target = jQuery(this).attr('data-target');
	jQuery(target).show();
});

jQuery(document).on('click', '.emptycart-modal-footer .no-btn', function(e) {
	jQuery('#emptyCart').hide();
});

jQuery(document).on('click', '.emptycart-modal-footer .yes-btn', function(e) {
	jQuery('#emptyCart').hide();
	jQuery.post(
		myajax.url, {
			'action': 'woocommerce_clear_cart',
		},
		function(data) {
			window.location.reload();
		}
	);
});