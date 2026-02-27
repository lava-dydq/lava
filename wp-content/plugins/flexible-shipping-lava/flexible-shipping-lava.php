<?php
 
/**
 * Plugin Name: Lava Shipping
 * Plugin URI: http://code.tutsplus.com/tutorials/create-a-custom-shipping-method-for-woocommerce--cms-26098
 * Description: Custom Shipping Method for WooCommerce
 * Version: 1.0.0
 * Author: eason
 * Author URI: https://prec.life
 * License: GPL-3.0+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 * Domain Path: /lang
 * Text Domain: flexible-shipping-lava
 */
 
if ( ! defined( 'WPINC' ) ) {
 
    die;
 
}
 
/*
 * Check if WooCommerce is active
 */
if ( in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
 
    function lava_shipping_method_init() {
        if ( ! class_exists( 'WC_Lava_Shipping_Method' ) ) {
            class WC_Lava_Shipping_Method extends WC_Shipping_Method {
                /**
                 * Constructor for your shipping class
                 *
                 * @access public
                 * @return void
                 */
                public function __construct() {
                    $this->id                 = 'lava_shipping'; 
                    $this->method_title       = __( 'Lava Shipping', 'lava' );  
                    $this->method_description = __( 'Custom Shipping Method for PREC', 'lava' ); 
               
 
                    $this->init();
 
                    $this->enabled = isset( $this->settings['enabled'] ) ? $this->settings['enabled'] : 'yes';
                    $this->title = isset( $this->settings['title'] ) ? $this->settings['title'] :  __( 'Lava Shipping', 'lava' );
                }
 
                /**
                 * Init your settings
                 *
                 * @access public
                 * @return void
                 */
                function init() {
                    // Load the settings API
                    $this->init_form_fields(); 
                    $this->init_settings(); 
 
                    // Save settings in admin if you have any defined
                    add_action( 'woocommerce_update_options_shipping_' . $this->id, array( $this, 'process_admin_options' ) );
                }
 
                /**
                 * Define settings field for this shipping
                 * @return void 
                 */
                function init_form_fields() { 
 
                    $this->form_fields = array(
 
                     'enabled' => array(
                          'title' => __( 'Enable', 'lava' ),
                          'type' => 'checkbox',
                          'description' => __( 'Enable this shipping.', 'lava' ),
                          'default' => 'yes'
                          ),
 
                     'title' => array(
                        'title' => __( 'Title', 'lava' ),
                          'type' => 'text',
                          'description' => __( 'Title to be display on site', 'lava' ),
                          'default' => __( 'Cost', 'lava' )
                          )
                    );
                }
 
                /**
                 * This function is used to calculate the shipping cost. Within this function we can check for weights, dimensions and other parameters.
                 *
                 * @access public
                 * @param mixed $package
                 * @return void
                 */
                public function calculate_shipping( $package = array() ) {

                    $shipping_info = include plugin_dir_path(__FILE__) . 'country-shipping.php';


                    global $woocommerce;

                    $country = $package["destination"]["country"];

                    $items = $woocommerce->cart->get_cart();
                    $first_weight = $shipping_info[ $country ][ 'first_weight' ];
                    $continued_weight = $shipping_info[ $country ][ 'continued_weight' ];
                    $weight_ratio = $shipping_info[ $country ][ 'weight_ratio' ];
                    $first_weight_quantity = 500;
                    $shipping_exchange_rate = 6.4;

                    $total_volume = 0;
                    $total_box_volume = 0;

                    foreach ($items as $item => $values) {
                        $product_id = $values['product_id'];
                        $material_id = get_post_meta($product_id, 'material_id', true);
                        $quantity = $values['quantity'];
                        $volume = get_post_meta($product_id, 'volume', true);
                        $volume = number_format((float) $volume * $quantity / 1000, 2, '.', '');
                        $total_volume += $volume;
                        $box_volume = get_post_meta($product_id, 'box_volume', true);
                        $box_volume = number_format((float) $box_volume * $quantity / 1000, 2, '.', '');
                        $total_box_volume += $box_volume;
                    }

                    $total_quantity = 1;
                    $density = get_post_meta($material_id, 'density', true);
                    $weight = $density * $total_volume * $total_quantity;
                    $weight = number_format((float) $weight, 2, '.', '');
                    $Vweight = ($total_box_volume * $total_quantity) / $weight_ratio * 1000;

                    $divided_weight = $weight / $first_weight_quantity;
                    $divided_weight = number_format((float) $divided_weight, 2, '.', '');
                    $divided_Vweight = $Vweight / $first_weight_quantity;
                    $divided_Vweight = number_format((float) $divided_Vweight, 2, '.', '');
                    if ($divided_weight > $divided_Vweight) {
                        $figure = $divided_weight;
                    } else {
                        $figure = $divided_Vweight;
                    }

                    $shipping_price = ($first_weight + $continued_weight * $figure) / $shipping_exchange_rate * 1.3;
                    $shipping_cost = number_format((float) $shipping_price, 2, '.', '');

                    $rate = array(
                        'id' => $this->id,
                        'label' => $country,
                        'cost' => $shipping_cost,
                        'package' => $package
                    );

                    $this->add_rate( $rate );
                    
                }
            }
        }
    }
 
    add_action( 'woocommerce_shipping_init', 'lava_shipping_method_init' );

    add_filter( 'woocommerce_shipping_methods', 'add_lava_shipping_method', 10, 1 );
    function add_lava_shipping_method( $methods ) {
        $methods['lava_shipping'] = 'WC_Lava_Shipping_Method';
        return $methods;
    }
 
}