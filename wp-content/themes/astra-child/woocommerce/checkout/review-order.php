<?php
/**
 * Review order table
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/review-order.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 5.2.0
 */

defined( 'ABSPATH' ) || exit;
?>
<style type="text/css">
	.woocommerce-checkout-review-order-table-div{
		overflow: auto;
	}
</style>
<div class="woocommerce-checkout-review-order-table-div">
	<table class="shop_table woocommerce-checkout-review-order-table">
		<thead>
			<tr>
				<th class="product-name"><?php esc_html_e( 'Part', 'woocommerce' ); ?></th>
				<th class="product-material"><?php esc_html_e( 'Material', 'woocommerce' ); ?></th>
				<th class="product-color"><?php esc_html_e( 'Color', 'woocommerce' ); ?></th>
				<th class="product-qty"><?php esc_html_e( "Qty", 'woocommerce' ); ?></th>
				<th class="product-total"><?php esc_html_e( 'Subtotal', 'woocommerce' ); ?></th>
			</tr>
		</thead>
		<tbody>
			<?php
			do_action( 'woocommerce_review_order_before_cart_contents' );

			foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
				$_product = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
				$product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );

				if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters( 'woocommerce_checkout_cart_item_visible', true, $cart_item, $cart_item_key ) ) {
					?>
					<tr class="<?php echo esc_attr( apply_filters( 'woocommerce_cart_item_class', 'cart_item', $cart_item, $cart_item_key ) ); ?>">
						<td class="product-name">
							<?php echo basename( get_post_meta( $product_id, 'file', 1  ) ); ?>
						</td>
						<?php $material_id = get_post_meta( $product_id, 'material_id', 1 ); ?>
						<td class="product-material">
							<?php echo get_the_title( $material_id ); ?>
						</td>
						<td class="product-color">
							<?php echo get_post_meta( $product_id, 'color_selected', 1  ); ?>
						</td>
						<td class="product-qty">
							<?php echo apply_filters( 'woocommerce_checkout_cart_item_quantity', $cart_item['quantity'], $cart_item, $cart_item_key ); ?>
						</td>
						<td class="product-total">
							<?php echo apply_filters( 'woocommerce_cart_item_subtotal', WC()->cart->get_product_subtotal( $_product, $cart_item['quantity'] ), $cart_item, $cart_item_key ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						</td>
					</tr>
					<?php
				}
			}

			do_action( 'woocommerce_review_order_after_cart_contents' );
			?>
		</tbody>
		<tfoot>

			<tr class="cart-subtotal">
				<th></th>
				<th></th>
				<th></th>
				<th><?php esc_html_e( 'Subtotal', 'woocommerce' ); ?></th>
				<!-- <td><?php wc_cart_totals_subtotal_html(); ?></td> -->
				<?php 
				$subtotalhtml = WC()->cart->get_cart_subtotal();
				$subtotalhtml = strip_tags($subtotalhtml);
				$subtotalhtml = str_replace(',', '', $subtotalhtml);
				$pattern = '/\d+\.\d*/';
				preg_match($pattern, $subtotalhtml, $match);
				//print_r($match);
				$subtotal = (float)$match[0];
				//print_r($total);
				// 最低价为50的逻辑
				// if ($subtotal < 50) {
				// 	echo '<td class="order_checkout_total"><del>'; wc_cart_totals_subtotal_html(); echo '</del> US$50.00<div class="checkout_total_tips">The minimum order is US$50.</div></td>';
				// } else {
					echo '<td>';wc_cart_totals_subtotal_html(); echo '</td>'; 
				// }
				?>
			</tr>

			<?php foreach ( WC()->cart->get_coupons() as $code => $coupon ) : ?>
				<tr class="cart-discount coupon-<?php echo esc_attr( sanitize_title( $code ) ); ?>">
					<th></th>
					<th></th>
					<th></th>
					<th><?php wc_cart_totals_coupon_label( $coupon ); ?></th>
					<td><?php wc_cart_totals_coupon_html( $coupon ); ?></td>
				</tr>
			<?php endforeach; ?>

			<?php if ( WC()->cart->needs_shipping() && WC()->cart->show_shipping() ) : ?>

				<?php do_action( 'woocommerce_review_order_before_shipping' ); ?>

				<?php wc_cart_totals_shipping_html(); ?>

				<?php do_action( 'woocommerce_review_order_after_shipping' ); ?>

			<?php endif; ?>

			<?php foreach ( WC()->cart->get_fees() as $fee ) : ?>
				<tr class="fee">
					<th></th>
					<th></th>
					<th></th>
					<th><?php echo esc_html( $fee->name ); ?></th>
					<td><?php wc_cart_totals_fee_html( $fee ); ?></td>
				</tr>
			<?php endforeach; ?>

			<?php if ( wc_tax_enabled() && ! WC()->cart->display_prices_including_tax() ) : ?>
				<?php if ( 'itemized' === get_option( 'woocommerce_tax_total_display' ) ) : ?>
					<?php foreach ( WC()->cart->get_tax_totals() as $code => $tax ) : // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited ?>
						<tr class="tax-rate tax-rate-<?php echo esc_attr( sanitize_title( $code ) ); ?>">
							<th></th>
							<th></th>
							<th></th>
							<th><?php echo esc_html( $tax->label ); ?></th>
							<td><?php echo wp_kses_post( $tax->formatted_amount ); ?></td>
						</tr>
					<?php endforeach; ?>
				<?php else : ?>
					<tr class="tax-total">
						<th></th>
						<th></th>
						<th></th>
						<th><?php echo esc_html( WC()->countries->tax_or_vat() ); ?></th>
						<td><?php wc_cart_totals_taxes_total_html(); ?></td>
					</tr>
				<?php endif; ?>
			<?php endif; ?>

			<?php do_action( 'woocommerce_review_order_before_order_total' ); ?>

			<tr class="order-total">
				<th></th>
				<th></th>
				<th></th>
				<th><?php esc_html_e( 'Total', 'woocommerce' ); ?></th>
				<!-- <td><?php wc_cart_totals_order_total_html(); ?></td> -->
				<?php 
				$totalhtml = WC()->cart->get_total();
				$totalhtml = strip_tags($totalhtml);
				$totalhtml = str_replace(',', '', $totalhtml);
				$pattern = '/\d+\.\d*/';
				preg_match($pattern, $totalhtml, $match);
				//print_r($match);
				$total = (float)$match[0];
				//print_r($total);
				// if ($subtotal < 50) {
				// 	$newtotal = (50 - $subtotal) + $total;
				// 	echo '<td class="order_checkout_total">US$'.$newtotal.'</td>';
				// } else {
					echo '<td>';wc_cart_totals_order_total_html(); echo '</td>'; 
				// }
				?>
			</tr>

			<?php do_action( 'woocommerce_review_order_after_order_total' ); ?>

		</tfoot>
	</table>
</div>