<?php
/**
 * Astra Child Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Astra Child
 * @since 1.0.0
 */

/**
 * Define Constants
 */
define( 'CHILD_THEME_ASTRA_CHILD_VERSION', '1.0.0' );

/**
 * Enqueue styles
 */
function child_enqueue_styles() {

	wp_enqueue_style( 'astra-child-theme-css', get_stylesheet_directory_uri() . '/style.css', array('astra-theme-css'), CHILD_THEME_ASTRA_CHILD_VERSION, 'all' );

}

add_action( 'wp_enqueue_scripts', 'child_enqueue_styles', 15 );


/* Write here your own functions */

// Our custom post type function 注册materials文章类型
function materials_posttype()
{
    register_post_type(
        'materials',
        // CPT Options
        array(
            'labels' => array(
                'name' => __('Materials'),
                'singular_name' => __('materials')
            ),
            'public' => true,
            'has_archive' => false,
            'rewrite' => array(
                'slug' => 'material'
            ),
            'supports' => array('title', 'author', 'page-attributes', 'editor', 'thumbnail')
        )
    );
}
// Hooking up our function to theme setup
add_action('init', 'materials_posttype');


// Our custom post type function 注册technologies文章类型
function technologies_posttype()
{
    register_post_type(
        'technologies',
        // CPT Options
        array(
            'labels' => array(
                'name' => __('Technologies'),
                'singular_name' => __('technologies')
            ),
            'public' => true,
            'has_archive' => false,
            'rewrite' => array(
                'slug' => '3d-printing-technologies'
            ),
            'show_in_rest' => true,
            'supports' => array('editor'),
            'supports' => array('title', 'author', 'page-attributes', 'editor', 'thumbnail')
        )
    );
}
// Hooking up our function to theme setup
add_action('init', 'technologies_posttype');

// Our custom post type function 注册 CNC Machined 文章类型
function cnc_posttype()
{
    register_post_type(
        'cnc-machined',
        // CPT Options
        array(
            'labels' => array(
                'name' => __('CNC Machined'),
                'singular_name' => __('CNC Machining Material')
            ),
            'public' => true,
            'has_archive' => false,
            'rewrite' => array(
                'slug' => 'cnc-machined'
            ),
            'show_in_rest' => true,
            'supports' => array('editor'),
            'supports' => array('title', 'author', 'page-attributes', 'editor', 'thumbnail')
        )
    );
}
// Hooking up our function to theme setup
add_action('init', 'cnc_posttype');

// Our custom post type function 注册 Plastic Injection 文章类型
function plastic_injection_posttype()
{
    register_post_type(
        'plastic-injection',
        // CPT Options
        array(
            'labels' => array(
                'name' => __('Plastic Injection'),
                'singular_name' => __('plastic-injection')
            ),
            'public' => true,
            'has_archive' => false,
            'rewrite' => array(
                'slug' => 'plastic-injection'
            ),
            'show_in_rest' => true,
            'supports' => array('editor'),
            'supports' => array('title', 'author', 'page-attributes', 'editor', 'thumbnail')
        )
    );
}
// Hooking up our function to theme setup
add_action('init', 'plastic_injection_posttype');


 /* 把admin-ajax.php 在前端本地化，让js可以使用ajax传输url */
function adds_js_css_thema()
{
    wp_enqueue_script('jquery');
    wp_localize_script('jquery', 'myajax', array(
        'url' => admin_url('admin-ajax.php'),
        'theme_url' => get_stylesheet_directory_uri()
    ));
}
add_action('wp_enqueue_scripts', 'adds_js_css_thema');


/* AJAX -改变文件单位，重新计算价格，更新页面 */
function ajax_change_file_unit()
{
    $result           = array(
        'files' => array(),
        'error' => '',
        'existfile' => 'yes'
    );
    if (isset($_COOKIE['session_files'])) {
        $session_files = json_decode(stripcslashes($_COOKIE['session_files']));
        if (!empty($session_files)) {
            $result['files'] = $session_files;
        } else {
            $result['existfile'] = 'no';
        }
    } else {
        $result['existfile'] = 'no';
    }
    echo json_encode($result);
    exit;
}
add_action('wp_ajax_change_file_unit', 'ajax_change_file_unit');
add_action('wp_ajax_nopriv_change_file_unit', 'ajax_change_file_unit');


/* AJAX - UPDATE Page Prints from session_files 打开上传文件页面，ajax cookies显示文件 */
function ajax_update_from_session_files()
{
    $result           = array(
        'files' => array(),
        'error' => ''
    );
    $upload_dir       = wp_upload_dir();
    $uploads_dir_temp = $upload_dir['basedir'] . '/' . uploads_dir_name();
    if (isset($_COOKIE['session_files'])) {
        $session_files = json_decode(stripcslashes($_COOKIE['session_files']));
        if (!empty($session_files)) {
            $new_session_files = [];
            foreach ($session_files as $key => $session_file) {
                $keylabel = ['url','filename','volume','surface_area','box_volume','box_xyz'];
                foreach ($session_file as $k => $v) {
                    if (is_numeric($k)) {
                        $new_session_files[$key][$keylabel[$k]] = $v;
                    } else {
                        $new_session_files[$key][$k] = $v;
                    }
                }
            }
            $result['files'] = $new_session_files;
        }
        setcookie('session_files', "", time() - 3600, '/');
        setcookie('session_files', json_encode($new_session_files), current_time('timestamp') + 60 * 60 * 24 * 180, '/'); 
    }
    echo json_encode($result);
    exit;
}
add_action('wp_ajax_update_from_session_files', 'ajax_update_from_session_files');
add_action('wp_ajax_nopriv_update_from_session_files', 'ajax_update_from_session_files');


/* AJAX - when Upload STL-file mail to 
 $name string  upload file name
 当用户上传文件时，把文件发到给定的邮箱
*/
function mail_to_sale ()
{
    return;
    $files = $_POST['file_name'];

    if (is_user_logged_in()) {
        $current_user = wp_get_current_user();
        $uploader = $current_user->display_name;
    } else {
        $uploader = "a Guest User";
    }

    $to = 'sales@3dprintingservice.cc';
    //$from = $_POST['from'];
    //$name = get_bloginfo('name');

    $headers = 'From: Lava <myname@mydomain.com>' . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    $subject = 'Upload file Alert';
    $upload_dir       = wp_upload_dir();

    foreach ($files as $key => $name) {
        $mail_attachment = $upload_dir['baseurl'] . '/' . uploads_dir_name() . '/' . $name[1];
        $msg = '<div style="min-height: 500px; border: 1px solid black; width: 90%; padding: 10px; text-align: center;">
            <div style="width: 100%; text-align: center;"><img src="https://lava.limited/staging/wp-content/themes/3dprinting/img/Logo.png"></div>
            <h1>A New File has been uploaded by ' . $uploader . '</h1>
            <p>Hello a new file has been uploaded, To get the file Please see the attachment below.<br/><a href="' . $mail_attachment . '">Click here to download file</a></p>
            </div>';

        wp_mail($to, $subject, $msg, $headers, $mail_attachment);   
    }   
}
add_action('wp_ajax_mail_to_sale', 'mail_to_sale');
add_action('wp_ajax_nopriv_mail_to_sale', 'mail_to_sale');


//用户提交邮箱地址相关逻辑
function add_email()
{
    global $wpdb;
    $email = $_POST['email'];
    $wpdb->insert($wpdb->prefix . "user_emails", ["email" => $email]);
    echo $wpdb->last_error;
    return ;
}

add_action('wp_ajax_add_email','add_email');
add_action('wp_ajax_nopriv_add_email','add_email');

function view_user_email_log(){
    global $wpdb;
    $tale = $wpdb->prefix . "user_emails";
    $log = $wpdb->get_results("select * from {$tale}");
    echo "<table style='width: 500px' border='1'>
<thead>
<tr><th>ID</th><th>Email</th><th>提交时间</th></tr>
</thead>
";
    foreach ($log as $i){
        echo "<tr><td>{$i->id}</td><td>{$i->email}</td><td>{$i->created_at}</td></tr>";
    }
    echo "
</table>
";

}
function add_user_email_menu () {
    add_menu_page('User Email Log', 'User Email Log', 'manage_options', 'user_email_log', 'view_user_email_log', '', 136);
}
add_action('admin_menu', 'add_user_email_menu');


/* AJAX - Upload STL-file 异步上传文件后存储文件在服务器 */
function ajax_upload_stl_file()
{
    $size_limit = 524288000;
    $result     = array(
        'files' => array(),
        'error' => ''
    );
    set_time_limit(600);
    $upload_dir       = wp_upload_dir();
    $uploads_dir_temp = $upload_dir['basedir'] . '/' . uploads_dir_name();

    if (!empty($_FILES['files_stl'])) {
        foreach ($_FILES["files_stl"]["error"] as $key => $error) {
            if ($error == UPLOAD_ERR_OK) {
                if ($size_limit && $_FILES["files_stl"]['size'][$key] > $size_limit) {
                    continue;
                }
                if (stripos($_FILES["files_stl"]['name'][$key], '.stl') === false && stripos($_FILES["files_stl"]['name'][$key], '.stp') === false && stripos($_FILES["files_stl"]['name'][$key], '.step') === false) {
                    $result['error'] = __('Error. not .stl file type.', '3dprinting');
                    continue;
                }
                $tmp_name = $_FILES["files_stl"]["tmp_name"][$key];
                $name     = wp_unique_filename($uploads_dir_temp, basename($_FILES["files_stl"]["name"][$key]));
                $upl      = move_uploaded_file($tmp_name, "$uploads_dir_temp/$name");
                $file_url = $upload_dir['baseurl'] . '/' . uploads_dir_name() . '/' . $name;
                if ($upl) {
                    if (stripos($_FILES["files_stl"]['name'][$key], '.stp') || stripos($_FILES["files_stl"]['name'][$key], '.step')) {
                        $basedir_filename = $uploads_dir_temp . '/' . $name;
                        $basedir_name = str_replace(strrchr($basedir_filename, "."),".stl",$basedir_filename);

                        $py_path = __DIR__ . '/step_stl.py';
                        exec("/usr/bin/python $py_path $basedir_filename $basedir_name", $output);
                        $result['output'] = $output;
                        //var_dump($output);
                        $file_url = str_replace(strrchr($file_url, "."),".stl",$file_url);

                        // 把stp文件传到另一个接口
                        // $curl_url = "http://119.29.101.91:8000/upload";
                        // $data = [
                        //     'modelFile' => new \CURLFile($basedir_filename)
                        // ];
                        // $curl_json = curl_post($curl_url, $data);
                        // $curl_response = json_decode($curl_json, true);
                        // // $result['curl_response'][] = $curl_response;

                        $curl_quote_url = "http://119.29.101.91:8000/quote";
                        $quote_data = [
                            'modelFile' => new \CURLFile($basedir_filename)
                        ];
                        $quote_json = curl_post($curl_quote_url, $quote_data);
                        $quote_response = json_decode($quote_json, true);
                        
                       
                        // $result['quote_response'][] = $quote_response;
                        // $myfile = fopen("/var/www/html/wp-content/themes/astra-child/log.txt", "a+");
                        // fwrite($myfile, '11111');
                        // fwrite($myfile, $quote_json);
                        // fwrite($myfile, $quote_response);
                        // fclose($myfile);
                    }
                    $filesData = ['url' => $file_url, 'filename' => $name];
                    // if (isset($curl_response)) {
                    //     foreach ($curl_response as $key => $value) {
                    //         $filesData[$key] = $value;
                    //     }
                    // }
                    if (isset($quote_response)) {
                        foreach ($quote_response as $key => $value) {
                            $filesData[$key] = $value;
                        }
                    }
                    $result['files'][] = $filesData;
                }
            }else{
                $result['error'] = __('Error. File upload failed.', '3dprinting');
            }
        }

        if (empty($result['files'])) {
            $result['error'] = __('Error loading file.', '3dprinting');
        }
    } else {
        $result['error'] = __('Error. File not found.', '3dprinting');
    }
    echo json_encode($result);
    exit;
}
add_action('wp_ajax_upload_stl_file', 'ajax_upload_stl_file');
add_action('wp_ajax_nopriv_upload_stl_file', 'ajax_upload_stl_file');


// ajax获取stl文件cnc报价
function get_stl_cnc_quote(){
    $curl_stl_quote_url = "http://119.29.101.91:8000/quote_params";
    $quote_data = [
        'f' => $_POST['f'],
        'l' => $_POST['l'],
        'w' => $_POST['w'],
        'h' => $_POST['h'],
        's' => $_POST['s'],
        'c' => $_POST['c'],
        'v' => $_POST['v']
    ];
    $quote_json = curl_post($curl_stl_quote_url, $quote_data);
    echo $quote_json;
    exit;
}
add_action('wp_ajax_get_stl_cnc_quote', 'get_stl_cnc_quote');
add_action('wp_ajax_nopriv_get_stl_cnc_quote', 'get_stl_cnc_quote');


// post 请求别的接口
function curl_post($url, $data){
    // Header ('Content-type: text / html; charset = utf-8');
    $curl = curl_init(); 
    curl_setopt($curl, CURLOPT_URL, $url); // 要访问的地址  
    curl_setopt($curl, CURLOPT_HEADER, 0);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE); // 对认证证书来源的检查  
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE); // 从证书中检查SSL加密算法是否存在  
    curl_setopt($curl, CURLOPT_POST, 1);             // 发送一个常规的Post请求  
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);   // Post提交的数据包x  
    curl_setopt($curl, CURLOPT_TIMEOUT, 300);         // 设置超时限制 防止死循环  
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);   // 获取的信息以文件流的形式返回  
    //执行命令  
    $result = curl_exec($curl);  
    //关闭URL请求  
    curl_close($curl);
    //获得数据并返回  
    return $result;
}
// get 请求别的接口
function curl_get($url){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,$url);  //设置访问的url地址     
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);  
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);      
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);//不输出内容  
    $result =  curl_exec($ch);  
    curl_close ($ch);  
    return $result; 
}

/* AJAX - DELETE STL-file 异步删除文件，暂时没用到*/
function ajax_delete_stl_file()
{
    global $woocommerce;
    if (isset($_COOKIE['session_files'])) {
        $session_files = json_decode(stripcslashes($_COOKIE['session_files']));
    } else {
        $session_files = array();
    }
    $upload_dir       = wp_upload_dir();
    $uploads_dir_temp = $upload_dir['basedir'] . '/' . uploads_dir_name();
    $file_name        = $_POST['file_name'];
    if ($file_name) {
        if (!is_array($file_name)) {
            $files = array(
                $file_name
            );
        } else {
            $files = $file_name;
        }
        foreach ($files as $file_name) {
            foreach ($session_files as $key => $file_item) {
                if ($file_item['filename'] == $file_name) {
                    unset($session_files[$key]);
                }
            }
            // delete STL file
            if (WC()->cart->get_cart_contents_count() == 0) {
                $file_link = $uploads_dir_temp . '/' . $file_name;
                if (file_exists($file_link)) {
                    unlink($file_link);
                }
            }
        }
        $session_files = array_values($session_files);
        setcookie('session_files', "", time() - 3600, '/');
        setcookie('session_files', json_encode($session_files), current_time('timestamp') + 60 * 60 * 24 * 180, '/');
        if (($_POST['pageName'] == 'my-files')) {
            if (($_POST['file_id'] != 0)) {
                $postID = $_POST['file_id'];
                update_post_meta($postID, 'file_hide', '1');
            } else {
                $items = $woocommerce->cart->get_cart();
                foreach ($items as $item => $values) {
                    $cart_productName = explode('|', $values['data']->get_name());
                    if (trim($cart_productName[0]) == $file_name) {
                        $product_id  = $values['data']->get_id();
                        $cartId      = WC()->cart->generate_cart_id($product_id);
                        $cartItemKey = WC()->cart->find_product_in_cart($cartId);
                        WC()->cart->remove_cart_item($cartItemKey);
                    }
                }
            }
        }
    }
    echo json_encode($session_files);
    exit;
}
add_action('wp_ajax_delete_stl_file', 'ajax_delete_stl_file');
add_action('wp_ajax_nopriv_delete_stl_file', 'ajax_delete_stl_file');


/* AJAX - Add new Produt  创建新产品*/
function ajax_create_product()
{
    global $woocommerce, $wpdb;
    wc_clear_notices();
    @set_time_limit(300);
    $result           = array(
        'products' => array(),
        'products_add_to_cart' => array(),
        'error' => ''
    );

    $upload_dir       = wp_upload_dir();
    $uploads_dir_temp = $upload_dir['basedir'] . '/' . uploads_dir_name();
    if (!empty($_POST['files'])) {
        $unit          = "cm";
        $cart_id       = WC()->cart->generate_cart_id(233);
        $cart_item_key = WC()->cart->find_product_in_cart($cart_id);
        if ($cart_item_key)
            wc_get_cart_remove_url($cart_item_key);
        foreach ($_POST['files'] as $key => $file) {
            $file['file_name'] = trim($file['file_name']);
            $volume = $file['volume'];
            $sku = $file['sku'];
            $col = $file['col'];
            $surface_area = $file['surface_area'];
            //$stl_unit = $file['stl_unit'];
            $box_volume = $file['box_volume'];
            $file_unit = $file['file_unit'];
            if ($file_unit == "inch") {
                // inch change to mm
                $volume = 25.4 * 25.4 * 25.4 * floatval($volume);
                $surface_area = 25.4 * floatval($surface_area);
                $box_volume = 25.4 * 25.4 * 25.4 * floatval($box_volume);
            }
            $file['price'] = str_replace(',', '.', $file['price']);
            
            if (file_exists("$uploads_dir_temp/" . $file['file_name'])) {
                $args_product = array(
                    'post_type' => 'product',
                    'post_status' => 'publish',
                    'post_title' => wp_strip_all_tags($file['file_name'] . ' | ' . get_post_field('post_title', $file['material_id']) )
                );
                //echo "<br/>PostID -- ".
                $post_id      = wp_insert_post($args_product);
                /**/
                $my_post      = array(
                    'post_title' => 'Variation #' . $i . ' of ' . esc_attr(strip_tags($_POST['postTitle'])),
                    'post_name' => 'product-' . $post_id . '-variation-' . $i,
                    'post_status' => 'publish',
                    'post_parent' => $post_id,
                    'post_type' => 'product_variation',
                    'guid' => home_url() . '/?product_variation=product-' . $post_id . '-variation-' . $i
                );
                // Insert the post into the database
                wp_insert_post($my_post);
                $variable_id    = $post_id + 1;
                $variable_two   = $variable_id + 1;
                $variable_three = $variable_two + 1;
                update_post_meta($variable_id, 'attribute_pa_resolution', 'high-resolution');
                update_post_meta($variable_id, '_price', 8.50);
                update_post_meta($variable_id, '_regular_price', '8.50');
                update_post_meta($variable_two, 'attribute_pa_resolution', 'medium-resolution');
                update_post_meta($variable_two, '_price', 5.50);
                update_post_meta($variable_two, '_regular_price', '5.50');
                update_post_meta($variable_three, 'attribute_pa_resolution', 'low-resolution');
                update_post_meta($variable_three, '_price', 3.50);
                update_post_meta($variable_three, '_regular_price', '3.50');
                if ($post_id) {
                    $price_product = get_post_meta((int)$file['material_id'], 'unit_price', 1);
                    $material_process = get_post_meta((int)$file['material_id'], 'process', 1);
                    $floor_price  = get_post_meta((int)$file['material_id'], 'floor_price', 1);
                    /*   if ( isset( $file['is_painting'] ) && $file['is_painting'] == 'true' ) {
                    $price_product = $price_product + get_post_meta( (int)$file['material_id'], 'price_painting', 1 );
                    }
                    if ( isset( $file['is_screen'] ) && $file['is_screen'] == 'true' ) {
                    $price_product = $price_product + get_post_meta( (int)$file['material_id'], 'price_silk_screen', 1 );
                    } */
                    //$obj      = new STLStats( "$uploads_dir_temp/" . $file['file_name'] );
                    //$obj_area = new STLArea(  "$uploads_dir_temp/" . $file['file_name'] );

                    // Price Formula
                    $density = get_post_meta($file['material_id'], 'density', 1);
                    $price_args = array('volume' => $volume, 'density' => $density, 'unit_price' => $price_product, 'material_process'=>$material_process, 'floor_price'=>$floor_price);

                    $price_valarray = array_merge($price_args, $file);


                    $calculations_arr =  calculate_price_with_formula($price_valarray);
                    $calculated_price = $calculations_arr['total_price'];

                    // Modify Price for Add to cart Quantity problem
                    $calculated_price = $calculated_price / $file['quantity'];
                    // Modify Price for Add to cart Quantity problem

                    $calculated_price_one_unit = $calculations_arr['one_unit_price'];

                    // Additon of one unit price
                    update_post_meta($post_id, 'one_unit_price', $calculated_price_one_unit);
                    // Addition of one unit price
                    // Price Formula
                    //$newPrice      = $volume;
                    $updatePrice   = $calculated_price;
                    $price_unit = round($file['price_unit']/$file['quantity'],2);
                    //echo $price_product;

                    // New Values for cart page
                    $leadtime_selected = $file['leadtime_selected'];
                    $leadtime = $file['leadtime'];
                    //$calculated_weight = $session_files[$session_key][2] * $density * $_POST['files'][$key]['quantity'];
                    $calculated_weight = $volume * $density * $file['quantity'];
                    $calculated_weight = $calculated_weight / 1000;
                    $calculated_weight = number_format((float) $calculated_weight, 2, '.', '');
                    $color_selected =    $file['color_selected'];

                    $weight = $calculated_weight;
                    update_post_meta($post_id, 'leadtime_selected', $leadtime_selected);
                    update_post_meta($post_id, 'leadtime', $leadtime);
                    update_post_meta($post_id, 'color_selected', $color_selected);
                    // New Values for cart page

                    update_post_meta($post_id, '_visibility', 'visible');
                    update_post_meta($post_id, '_stock_status', 'instock');
                    update_post_meta($post_id, 'total_sales', '0');
                    update_post_meta($post_id, '_downloadable', 'no');
                    update_post_meta($post_id, '_virtual', 'no');
                    update_post_meta($post_id, '_regular_price', $price_unit);
                    update_post_meta($post_id, '_price', $price_unit);
                    update_post_meta($post_id, '_featured', 'no');
                    //update_post_meta( $post_id, '_product_version', '2.6.14' );
                    //update_post_meta( $post_id, '_manage_stock',    'no' );
                    //update_post_meta( $post_id, '_backorders',      'no' );
                    $estimated_delivery = get_post_meta((int) $file['material_id'], 'estimated_delivery', 1);
                    $date_delivery      = current_time('timestamp') + intval($estimated_delivery) * 3600;
                    update_post_meta($post_id, 'volume', $volume);
                    update_post_meta($post_id, 'surface_area', $surface_area);
                    update_post_meta($post_id, 'box_volume', $box_volume);
                    update_post_meta($post_id, 'weight', $weight);
                    update_post_meta($post_id, 'density', $density);
                    update_post_meta($post_id, 'material_id', $file['material_id']);
                    update_post_meta($post_id, 'file_unit', $file_unit);
                    update_post_meta($post_id, 'file', $upload_dir['baseurl'] . '/' . uploads_dir_name() . '/' . $file['file_name']);
                    update_post_meta($post_id, 'estimated_delivery', $estimated_delivery);
                    update_post_meta($post_id, 'timestamp_delivery', $date_delivery);
                    $manufacture = "3D Printing";
                    update_post_meta($post_id, 'manufacture', $manufacture);
                    update_post_meta($post_id,'sku',$sku);
                    update_post_meta($post_id,'col',$col);
                    
                    WC()->cart->add_to_cart($post_id, (int) $file['quantity']);
                    

                    $result['products'][]=['id'=>$post_id,'sku'=>$sku];
                    //$result['products_add_to_cart'][] = array( $post_id, (int)$file['quantity'] );
                } else {
                    $result['error'] = __('Error. Failed create item.', '3dprinting');
                }
            } else {
                $result['error'] = __('Error. File not found in dir.', '3dprinting');
            }
        }
        update_cart_price($_POST['files'][0]['material_id']);

        //更新头部的购物车信息，具体参考 class-wc-ajax.php的public static function get_refreshed_fragments()
        ob_start();
        woocommerce_mini_cart();
        $mini_cart = ob_get_clean();
        $data = array(
            'fragments' => apply_filters(
                'woocommerce_add_to_cart_fragments',
                array(
                    'div.widget_shopping_cart_content' => '<div class="widget_shopping_cart_content">' . $mini_cart . '</div>',
                )
            ),
            'cart_hash' => WC()->cart->get_cart_hash(),
        );
        //wp_send_json( $data );
        $result['fragment'] = $data;

        //更新材料选择部分的购物车信息
        //$result['table_html_cart'] = '<div class="ast-cart-menu-wrap"><span class="count">' . WC()->cart->get_cart_contents_count() . '</span></div> <span class="ast-woo-header-cart-total">' . WC()->cart->get_cart_subtotal() . '</span>';
        $result['total_price'] = WC()->cart->get_cart_subtotal();
    } else {
        $result['error'] = __('Error. File not found.', '3dprinting');
    }

    echo json_encode($result);
    exit;
}
add_action('wp_ajax_prints_create_product', 'ajax_create_product');
add_action('wp_ajax_nopriv_prints_create_product', 'ajax_create_product');

function uploads_dir_name()
{
    $dir = 'stl_files_uploads';
    return $dir;
}


/*在后台做个功能：可以显示添加到购物车的stl文件 start*/
add_action('admin_menu', 'register_stl_admin_area');

function register_stl_admin_area()
{
    add_menu_page(
        'Download Panel For STL Files',     // page title
        'Uploaded STL Files',     // menu title
        'manage_options',   // capability
        'uploaded-stl-files',     // menu slug
        'render_stl_uploads_page' // callback function
    );
}
function render_stl_uploads_page()
{
    global $wpdb;
    if (isset($_POST['bulk_files_download'])) {
        download_bulk_stl($_POST['stl_bulk_checked']);
    }

    $query = $wpdb->get_results("SELECT post_title, meta_value FROM `wp_posts`JOIN wp_postmeta ON wp_posts.ID = wp_postmeta.post_id WHERE post_type='product' AND meta_key='file' ORDER BY ID DESC", ARRAY_A);
    $html = '<div class="stl_files_panel">
                <h1>STL files associated with products</h1>
                <form method="post" name="stl_download_form" class="stl_download_form">
                <input type="submit" name="bulk_files_download" value="Download Selected files"><br/><br/>
                <input type="checkbox" id="selectall_stl">&nbsp; <b>Select all</b>
            <table>';
    $count = 0;
    foreach ($query as $stl_files) {

        $FilePath = str_replace(site_url(), "", $stl_files['meta_value']);
        $count++;
        $html .= '
                    <tr>
                        <td class="stl_bulk_check"><input type="checkbox" class="select_stlfile" name="stl_bulk_checked[]" value="' . $FilePath . '"></td>
                        <td class="stl_count"><b>' . $count . '.</b></td>
                        <td class="stl_product"><b>' . $stl_files['post_title'] . '</b></td>
                        <td class="stl_file"><a href="' . $stl_files['meta_value'] . '">Download File</a></td>
                    </tr>';
    }
    $html .= '
            </table>
            </form>
        </div>';


    echo $html;
}

function download_bulk_stl($files)
{
    $zipname = ABSPATH . 'wp-content/themes/3dprinting/files.zip';
    $zip = new ZipArchive;
    if ($zip->open($zipname, ZipArchive::CREATE) === TRUE) {

        foreach ($files as $file) {

            /* $content = file_get_contents(str_replace("//","/",site_url().$file));
    $zip->addFromString(pathinfo ( $file, PATHINFO_BASENAME), $content); */

            $zip->addFile(str_replace("//", "/", ABSPATH . $file), "/" . basename($file));
        }
        //$zip->addFromString('wuxiancheng.cn.txt','yes'.time());
        $zip->close();
    }


    header("Pragma: public");
    header("Expires: 0");
    header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
    header("Cache-Control: public");
    header("Content-Description: File Transfer");
    header("Content-type: application/octet-stream");
    header('Content-disposition: attachment; filename=' . basename($zipname));
    header("Content-Transfer-Encoding: binary");
    header('Content-Length: ' . filesize($zipname));
    header("Pragma: no-cache");
    header("Expires: 0");
    ob_end_flush();
    $read = readfile($zipname);
    if ($read == true) {
        delete_files($zipname);
    }
    exit;
}


function delete_files($target)
{
    if (is_dir($target)) {
        $files = glob($target . '*', GLOB_MARK); //GLOB_MARK adds a slash to directories returned

        foreach ($files as $file) {
            delete_files($file);
        }

        rmdir($target);
    } elseif (is_file($target)) {
        unlink($target);
    }
}

function custom_admin_js()
{

    echo "<script type='text/javascript'>
        jQuery(document).on('click','#selectall_stl',function() {
            jQuery('.select_stlfile').not(this).prop('checked', this.checked);


        });
        </script>";

    echo "<script type='text/javascript'>
            jQuery(document).on('click','input.show_shoppingpage',function() {
                var postid = this.value;
                var update;
                if(this.checked == true) {
                    update = 1;
                } else {
                    update = 0;
                }
                jQuery.post(
                '" . admin_url('admin-ajax.php') . "',
                {
                    'action'  : 'post_show_on_shopping',
                    'post_id' : postid,
                    'update'  : update
                },
                function(data){
                    var response = data;

                }
            );
            });
            </script>";
    echo "<style>
            .stl_files_panel {margin: 35px; padding: 20px;  background: #fff;}
            .stl_files_panel table tr td {padding: 10px 0;}
            #order_line_items td.item_cost {visibility: hidden;}
            .woocommerce_order_items th.item_cost {color: #f8f8f8 !important; }
      </style>";
}
add_action('admin_footer', 'custom_admin_js');
/*在后台做个显示操作添加到购物车的stl文件 end*/

// calculate price 计算价格
function calculate_price_with_formula($args)
{

    //$args['quantity'] = 1; // Set to calculate price per unit.
    //echo $args['volume']; exit;
    //echo "<pre>"; print_r($args); echo "</pre>"; exit;
    $calculations = array();
    $fixed_cofficient = $args['fixed_cofficient'];
    $exchange_rate = $args['usdrmb_exchange_rate'];
    $material_process = $args['material_process'];
    $floor_price = $args['floor_price'];
    $weight = $args['volume'] * $args['density'] * $args['quantity'];
    $weight = $weight / 1000;
    // echo $args['volume'] .'*'. $args['density'] .'*'. $args['quantity']; exit;
    $weight_one_unit = $args['volume'] * $args['density'] * 1;
    $weight_one_unit = $weight_one_unit / 1000; 
    //echo "Weight---".$weight;
    
    if ($weight > $args['weight_range_1']) {
        $weight_based_figure = $args['cofficient_1_greater_weightrange'];
    } else if ($weight < $args['weight_range_2']) {
        $weight_based_figure = $args['cofficient_2_smaller_weightrange'];
    } else {
        $weight_based_figure = $args['cofficient_weight_bw_range_1_and_2'];
    }

    if ($weight_one_unit > $args['weight_range_1']) {
        $weight_based_figure_one = $args['cofficient_1_greater_weightrange'];
    } else if ($weight_one_unit < $args['weight_range_2']) {
        $weight_based_figure_one = $args['cofficient_2_smaller_weightrange'];
    } else {
        $weight_based_figure_one = $args['cofficient_weight_bw_range_1_and_2'];
    }

    //echo ($weight) .'*'. ($args['unit_price'] .'*'. $fixed_cofficient) .'*'. ($weight_based_figure .'/'. $exchange_rate) .'*'. ($args['leadtime']); exit;
    //echo ($weight_one_unit) .'*'. ($args['unit_price'] .'*'. $fixed_cofficient) .'*'. ($weight_based_figure_one .'/'. $exchange_rate) .'*'. ($args['leadtime']);
    // $calculated_price = ($weight) * ($args['unit_price'] * $fixed_cofficient) * ($weight_based_figure / $exchange_rate) * ($args['leadtime']);
    // $calculated_price_one_unit = ($weight_one_unit) * ($args['unit_price'] * $fixed_cofficient) * ($weight_based_figure_one / $exchange_rate) * ($args['leadtime']);
    if (strtoupper($material_process)=='DMLS') {
        $calculated_price_one_unit = ($weight_one_unit) * ($args['unit_price'] * $fixed_cofficient) * ($weight_based_figure_one / $exchange_rate) * ($args['leadtime']);
        if ($calculated_price_one_unit<$floor_price) {
            $calculated_price = $floor_price * $args['quantity'];
            $calculated_price_one_unit = $floor_price;
        }else{
            $calculated_price = $calculated_price_one_unit * $args['quantity'];
        }
    } else {
        $calculated_price = ($weight) * ($args['unit_price'] * $fixed_cofficient) * ($weight_based_figure / $exchange_rate) * ($args['leadtime']); 
        if ($calculated_price<$floor_price) {
            $calculated_price = $floor_price;
        }
        $calculated_price_one_unit = ($weight_one_unit) * ($args['unit_price'] * $fixed_cofficient) * ($weight_based_figure_one / $exchange_rate) * ($args['leadtime']);
        if ($calculated_price_one_unit<$floor_price) {
            $calculated_price_one_unit = $floor_price;
        }
    }
    
    $calculated_price = number_format((float) $calculated_price, 2, '.', '');
    $calculated_price_one_unit = number_format((float) $calculated_price_one_unit, 2, '.', '');
    $calculations['total_price'] = $calculated_price;
    $calculations['one_unit_price'] = $calculated_price_one_unit;
    //echo $calculated_price; //exit;
    return $calculations;
}

//update the cart material price 更新购物车的价格
function update_cart_price($materialid,$productid=0,$newquantity=0)
{
    $cart_array = [];
    $total_price = 0;
    //echo "<pre>";print_r(WC()->cart->get_cart());echo "<pre>";exit;
    foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
        $product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );
        $material_id = get_post_meta( $product_id, 'material_id', 1 );
        $regular_price = get_post_meta( $product_id, '_regular_price', 1 );
        if ($productid!=0&&$productid==$product_id) {
            $quantity = $newquantity;
        }else{
            $quantity = $cart_item['quantity'];
        }
        $count_price = (float)$regular_price * (int)$quantity;
        $cart_array[$material_id][$product_id] = array($quantity,$count_price);
        if ($material_id == $materialid) {
            $total_price += $count_price;
        }
    }
    // var_dump($cart_array);echo "<br>";
    // var_dump($total_price);echo "<br>";
    $arr = [];
    if (count($cart_array)>0) {
        $floor_price  = get_post_meta($materialid, 'floor_price', 1);
        //var_dump($floor_price);echo "<br>";
        foreach ($cart_array[$materialid] as $product_id => $value) {
            if ($total_price<$floor_price) {
                $divided_price = round((float)$floor_price*$value[1]/(float)$total_price,2)/$value[0];
            }else{
               $regular_price = get_post_meta( $product_id, '_regular_price', 1 ); 
               $divided_price = round($regular_price,2);
            }
            //var_dump($divided_price);echo "<br>";
            $rs[] = update_post_meta($product_id, '_price', $divided_price);
            //var_dump($rs);echo "<br>";
            $arr[] = $divided_price;
        }    
    }
    return array($rs,$arr);
}


// 修改美元货币符号
add_action('woocommerce_currency_symbols', 'add_new_currency_symbol', 10, 1);
function add_new_currency_symbol($currency_symbol)
{
    unset($currency_symbol['USD']);
    $currency_symbol['USD'] = 'US&#36;';
    return $currency_symbol;
}

// 修改订单备注的label和placeholder
add_filter('woocommerce_checkout_fields', 'md_custom_woocommerce_checkout_fields');
function md_custom_woocommerce_checkout_fields($fields)
{
    $fields['order']['order_comments']['placeholder'] = 'Notes about your order, e.g. special notes for delivery.';
    $fields['order']['order_comments']['label'] = 'Special Notes';

    return $fields;
}



function ip_info($ip = NULL, $purpose = "location", $deep_detect = TRUE)
{
    $output = NULL;
    $ip = $_SERVER['REMOTE_ADDR'];
    if(!filter_var($ip, FILTER_VALIDATE_IP)){
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && filter_var($_SERVER['HTTP_X_FORWARDED_FOR'], FILTER_VALIDATE_IP)) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } elseif (isset($_SERVER['HTTP_CLIENT_IP']) && filter_var($_SERVER['HTTP_CLIENT_IP'], FILTER_VALIDATE_IP)) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (isset($_SERVER['HTTP_CF_CONNECTING_IP']) && filter_var($_SERVER['HTTP_CF_CONNECTING_IP'], FILTER_VALIDATE_IP)) {
            $ip = $_SERVER['HTTP_CF_CONNECTING_IP'];
        } elseif (isset($_SERVER['HTTP_X_REAL_IP']) && filter_var($_SERVER['HTTP_X_REAL_IP'], FILTER_VALIDATE_IP)) {
            $ip = $_SERVER['HTTP_X_REAL_IP'];
        }
    }     
    $purpose    = str_replace(array("name", "\n", "\t", " ", "-", "_"), NULL, strtolower(trim($purpose)));
    $support    = array("country", "countrycode", "state", "region", "city", "location", "address");
    $continents = array(
        "AF" => "Africa",
        "AN" => "Antarctica",
        "AS" => "Asia",
        "EU" => "Europe",
        "OC" => "Australia (Oceania)",
        "NA" => "North America",
        "SA" => "South America"
    );
    if ((filter_var($ip, FILTER_VALIDATE_IP)||$ip==NULL) && in_array($purpose, $support)) {
        $ipdat = @json_decode(file_get_contents("http://ip-api.com/json/".$ip));
        switch ($purpose) {
            case "location":
                $output = array(
                    "city"           => @$ipdat->city,
                    "state"          => @$ipdat->regionName,
                    "country"        => @$ipdat->country,
                    "country_code"   => @$ipdat->countryCode,
                );
                break;
            case "address":
                $address = array($ipdat->country);
                if (@strlen($ipdat->regionName) >= 1)
                    $address[] = $ipdat->regionName;
                if (@strlen($ipdat->city) >= 1)
                    $address[] = $ipdat->city;
                $output = implode(", ", array_reverse($address));
                break;
            case "city":
                $output = @$ipdat->city;
                break;
            case "state":
                $output = @$ipdat->regionName;
                break;
            case "region":
                $output = @$ipdat->regionName;
                break;
            case "country":
                $output = @$ipdat->country;
                break;
            case "countrycode":
                $output = @$ipdat->countryCode;
                break;
        }
        
    }
    return $output;
}


// ajax Update Cart quantity 异步修改数量更新购物车的价格
add_action('wp_ajax_update_cart_quantity', 'update_cart_quantity');
add_action('wp_ajax_nopriv_update_cart_quantity', 'update_cart_quantity');
function update_cart_quantity()
{
    // 获取3d打印的所有材料id
    $printing_material = get_posts(array(
      'post_type'      => 'materials',
      'posts_per_page' => -1,
      'orderby'        => 'menu_order',
      'order'          => 'ASC',
      'meta_key'       => 'show_on_shopping_page',
      'meta_value'     =>  1
    ));
    $printing_material_ids = [];
    foreach ($printing_material as $material) {
        $printing_material_ids[] = $material->ID;
    }

    // 获取人像打印的所有材料id
    $portrait_material = get_posts(array(
        'post_type'      => 'portrait-material',
        'posts_per_page' => -1,
        'orderby'        => 'menu_order',
        'order'          => 'ASC'
    ));
    $portrait_material_ids = [];
    foreach ($portrait_material as $material) {
        $portrait_material_ids[] = $material->ID;
    }

    // 获取CNC的所有材料id
    $cnc_material = get_posts(array(
      'post_type'      => 'cnc-machined',
      'posts_per_page' => -1,
      'orderby'        => 'menu_order,post_date',
      'order'          => 'ASC'
    ));
    $cnc_material_ids = [];
    foreach ($cnc_material as $material) {
        $cnc_material_ids[] = $material->ID;
    }

    // 获取注塑的所有材料id
    $pi_material = get_posts(array(
      'post_type'      => 'plastic-injection',
      'posts_per_page' => -1,
      'orderby'        => 'menu_order,post_date',
      'order'          => 'ASC'
    ));
    $pi_material_ids = [];
    foreach ($pi_material as $material) {
        $pi_material_ids[] = $material->ID;
    }

    $args = array();
    $product_id = $_POST['product_id'];
    $quantity = $_POST['quantity'];
    $material_id = get_post_meta($product_id, 'material_id', 1);

    // cart页面3d打印的购物车数量更新
    if (in_array($material_id, $printing_material_ids)) {
        $args['volume'] = get_post_meta($product_id, 'volume', 1);
        $args['density']  = get_post_meta($product_id, 'density', 1);
        $args['material_process'] = get_post_meta($material_id, 'process', 1);
        $args['floor_price']  = get_post_meta($material_id, 'floor_price', 1);
        $args['quantity'] = $quantity;
        $args['weight_range_1']  = get_post_meta($material_id, 'weight_range_1', 1);
        $args['weight_range_2']  = get_post_meta($material_id, 'weight_range_2', 1);
        $args['cofficient_1_greater_weightrange']  = get_post_meta($material_id, 'cofficient_1_greater_weightrange', 1);
        $args['cofficient_weight_bw_range_1_and_2']  = get_post_meta($material_id, 'cofficient_weight_bw_range_1_and_2', 1);
        $args['cofficient_2_smaller_weightrange']  = get_post_meta($material_id, 'cofficient_2_smaller_weightrange', 1);
        $args['unit_price']  = get_post_meta($material_id, 'unit_price', 1);
        $args['fixed_cofficient']  = get_post_meta($material_id, 'fixed_cofficient', 1);
        $args['usdrmb_exchange_rate']  = get_post_meta($material_id, 'usdrmb_exchange_rate', 1);
        $args['leadtime']  = get_post_meta($product_id, 'leadtime', 1);
        $calculated_price = calculate_price_with_formula($args);
        $calculated_price['total_price'];
        $divided_price = $calculated_price['total_price'] / $quantity;
        //$divided_price = number_format((float)$calculated_price, 2, '.', '');
        update_post_meta($product_id, '_regular_price', $divided_price);
    }
    
    // cart页面CNC的购物车数量更新
    if (in_array($material_id, $cnc_material_ids)) {
        $one_price  = get_post_meta($product_id, 'one_price', 1);

        // 多件的价格
        if ($quantity == 0) {
            $unit_price = $one_price;
        }
        if ($quantity >=1 && $quantity <= 100) {
            $unit_price = $one_price * $quantity ** (-0.14);
        }
        if ($quantity > 100 && $quantity <= 1000) {
            $unit_price = $one_price * 100 ** (-0.14) * ($quantity - 100) ** (-0.01);
        }
        if ($quantity > 1000) {
            $unit_price = $one_price * 100 ** (-0.14) * (100 - 100) ** (-0.01);
        }
        $price = $unit_price * $quantity;

        
        // $args['quantity'] = $quantity;
        // $args['surface_treatment']  = get_post_meta($product_id, 'surface_treatment', 1);
        // $args['finishing_coating']  = get_post_meta($product_id, 'finishing_coating', 1);
        // $args['logo_finishing']  = get_post_meta($product_id, 'logo_finishing', 1);
        // $args['protective_coating']  = get_post_meta($product_id, 'protective_coating', 1);

        // $finishing_price = calculate_finishing_price_with_formula($args);

        $basic_surface_treatment = get_post_meta($product_id, 'basic_surface_treatment', 1);
        $advanced_surface_treatment = get_post_meta($product_id, 'advanced_surface_treatment', 1);
        $color_surface_treatment = get_post_meta($product_id, 'color_surface_treatment', 1);
        $surface_area = get_post_meta($product_id, 'surface_area', 1);
        $len = get_post_meta($product_id, 'len', 1);
        $width = get_post_meta($product_id, 'width', 1);
        $thickness = get_post_meta($product_id, 'thickness', 1);

        $processes_cost_map = after_processes_cost();
        $Pb = $processes_cost_map[$basic_surface_treatment]['cost'];
        $Ph = $processes_cost_map[$advanced_surface_treatment]['cost'];
        $Pc = $processes_cost_map[$color_surface_treatment]['cost'];
        $P0 = $Pb + $Ph + $Pc;
        $D0 = 150; 
        $S0 = 101250; 
        $M = 0.2;
        // 一件价格
        $P1 = $P0*(max($len/$D0,1)*max($width/$D0,1)*max($thickness/$D0,1)*max($surface_area/$S0,1));
        // 多件价格 
        $Pn = $P1 * $quantity ** (-$M);

        $total_price = $price + $Pn;
        $divided_price = $total_price / $quantity;
        update_post_meta($product_id, '_regular_price', $divided_price);
    }

    // cart页面注塑的购物车数量更新,只对零件 part 部分更新平均价格，对模具 mould 无影响。
    if (in_array($material_id, $pi_material_ids)) {
        $manufacture = get_post_meta($product_id, 'manufacture', 1);
        if ($manufacture == "Plastic Injection Molding Part") {
            $args['quantity'] = $quantity;

            $args['len'] = get_post_meta($product_id, 'len', 1);
            $args['width']  = get_post_meta($product_id, 'width', 1);
            $args['thickness'] = get_post_meta($product_id, 'thickness', 1);

            $args['coefficient_1']  = get_post_meta($material_id, 'coefficient_1', 1);
            $args['coefficient_2'] = get_post_meta($material_id, 'coefficient_2', 1);
            $args['coefficient_3']  = get_post_meta($material_id, 'coefficient_3', 1);
            $args['coefficient_4']  = get_post_meta($material_id, 'coefficient_4', 1);

            $args['surface_treatment']  = get_post_meta($product_id, 'surface_treatment', 1);
            $args['finishing_coating']  = get_post_meta($product_id, 'finishing_coating', 1);
            $args['logo_finishing']  = get_post_meta($product_id, 'logo_finishing', 1);
            $args['protective_coating']  = get_post_meta($product_id, 'protective_coating', 1);

            $total_price = calculate_plastic_injection_part_finishing_price_with_formula($args);
            $divided_price = $total_price / $quantity;
            update_post_meta($product_id, '_regular_price', $divided_price);
        }
    }

    // 所有
    $result = update_cart_price($material_id, $product_id, $quantity);
    echo json_encode($result);
    exit;
}



/* AJAX - Upload portrait file */
function ajax_upload_portrait_file()
{
    $result     = array(
        'files' => array(),
        'error' => ''
    );

    if (empty($_POST['portrait_file_upload_zip']) || !wp_verify_nonce($_POST['portrait_file_upload_zip'], 'upload_portrait_file')) {
        $result['error'] = __('Error. Nonce field. Refresh the page.', '3dprinting');
    } else {
        $upload_dir       = wp_upload_dir();
        $uploads_dir_temp = $upload_dir['basedir'] . '/portrait_upload_files';
        if (!is_dir($uploads_dir_temp)) {
            mkdir($uploads_dir_temp, 0777, true);
        }
        if (!empty($_FILES['portrait_file'])) {
            foreach ($_FILES["portrait_file"]["error"] as $key => $error) {
                if ($error == UPLOAD_ERR_OK) {
                    $tmp_name = $_FILES["portrait_file"]["tmp_name"][$key];
                    $name     = wp_unique_filename($uploads_dir_temp, basename($_FILES["portrait_file"]["name"][$key]));
                    $upl      = move_uploaded_file($tmp_name, "$uploads_dir_temp/$name");
                    if ($upl) {
                        $result['files'][] = array(
                            $upload_dir['baseurl'] . '/portrait_upload_files/' . $name,
                            $name
                        );
                    } 
                }else{
                    $result['error'] = __('Error. File upload failed. Try it again!', '3dprinting');
                }
            }
            if (empty($result['files'])) {
                $result['error'] = __('Error loading file.', '3dprinting');
            }
        } else {
            $result['error'] = __('Error. File not found.', '3dprinting');
        }
    }
    echo json_encode($result);
    exit;
}
add_action('wp_ajax_upload_portrait_file', 'ajax_upload_portrait_file');
add_action('wp_ajax_nopriv_upload_portrait_file', 'ajax_upload_portrait_file');

/* AJAX - delete portrait file */
function ajax_delete_portrait_file()
{
    $upload_dir = wp_upload_dir();
    $uploads_dir_temp = $upload_dir['basedir'] . '/portrait_upload_files/';
    $file_name = $_POST['file_name'];
    // $file_arr = explode('/', $file);
    // $file_name = array_pop($file_arr);
    $res = 0;
    if ($file_name) {
        $file_link = $uploads_dir_temp . $file_name;
        if (file_exists($file_link)) {
            $res = unlink($file_link);
        }
    }
    if ($res) {
        $result = 1;
    } else {
        $result = 0;
    }
    echo json_encode($result);
    exit;
}
add_action('wp_ajax_delete_portrait_file', 'ajax_delete_portrait_file');
add_action('wp_ajax_nopriv_delete_portrait_file', 'ajax_delete_portrait_file');


function ajax_create_protrait_product()
{
    global $woocommerce, $wpdb;
    wc_clear_notices();
    @set_time_limit(300);
    $result           = array(
        'products' => array(),
        'products_add_to_cart' => array(),
        'html_cart' => '',
        'error' => ''
    );
    // if ( empty( $_POST['_wpnonce'] ) || ! wp_verify_nonce( $_POST['_wpnonce'], 'upload_stl_file' ) ) {
    // $result['error'] = 'Error. Nonce field. Refresh the page.';
    // }
    // else {
    $upload_dir       = wp_upload_dir();
    $uploads_dir_temp = $upload_dir['basedir'] . '/portrait_upload_files/';
    if (!empty($_POST['files'])) {
        $unit          = "cm";
        $cart_id       = WC()->cart->generate_cart_id(233);
        $cart_item_key = WC()->cart->find_product_in_cart($cart_id);
        if ($cart_item_key)
            wc_get_cart_remove_url($cart_item_key);
        foreach ($_POST['files'] as $key => $file) {
            $volume = $file['volume'];
            $surface_area = $file['surface_area'];
            $box_volume = $file['box_volume'];
            $file['price'] = str_replace(',', '.', $file['price']);
            if (file_exists("$uploads_dir_temp/" . $file['file_name'])) {
                $args_product = array(
                    'post_type' => 'product',
                    'post_status' => 'publish',
                    'post_title' => wp_strip_all_tags($file['file_name'] . ' | ' . get_post_field('post_title', $file['material_id'])).'-'.$file['portrait_height_text']
                );
                //echo "<br/>PostID -- ".
                $post_id      = wp_insert_post($args_product);
                /**/
                $my_post      = array(
                    'post_title' => 'Variation #' . $i . ' of ' . esc_attr(strip_tags($_POST['postTitle'])),
                    'post_name' => 'product-' . $post_id . '-variation-' . $i,
                    'post_status' => 'publish',
                    'post_parent' => $post_id,
                    'post_type' => 'product_variation',
                    'guid' => home_url() . '/?product_variation=product-' . $post_id . '-variation-' . $i
                );
                // Insert the post into the database
                wp_insert_post($my_post);
                $variable_id    = $post_id + 1;
                $variable_two   = $variable_id + 1;
                $variable_three = $variable_two + 1;
                update_post_meta($variable_id, 'attribute_pa_resolution', 'high-resolution');
                update_post_meta($variable_id, '_price', 8.50);
                update_post_meta($variable_id, '_regular_price', '8.50');
                update_post_meta($variable_two, 'attribute_pa_resolution', 'medium-resolution');
                update_post_meta($variable_two, '_price', 5.50);
                update_post_meta($variable_two, '_regular_price', '5.50');
                update_post_meta($variable_three, 'attribute_pa_resolution', 'low-resolution');
                update_post_meta($variable_three, '_price', 3.50);
                update_post_meta($variable_three, '_regular_price', '3.50');
                if ($post_id) {
                    // $price_product = get_post_meta((int)$file['material_id'], 'unit_price', 1);
                    // $material_process = get_post_meta((int)$file['material_id'], 'process', 1);
                    // $floor_price  = get_post_meta((int)$file['material_id'], 'floor_price', 1);

                    // Price Formula
                    // $density = get_post_meta($file['material_id'], 'density', 1);
                    // $price_args = array('volume' => $volume, 'density' => $density, 'unit_price' => $price_product, 'material_process'=>$material_process, 'floor_price'=>$floor_price);

                    // $price_valarray = array_merge($price_args, $file);


                    // $calculations_arr =  calculate_price_with_formula($price_valarray);
                    // $calculated_price = $calculations_arr['total_price'];

                    // // Modify Price for Add to cart Quantity problem
                    // $calculated_price = $calculated_price / $file['quantity'];
                    // // Modify Price for Add to cart Quantity problem

                    // $calculated_price_one_unit = $calculations_arr['one_unit_price'];

                    // Additon of one unit price
                    update_post_meta($post_id, 'one_unit_price', $file['price_unit']);
                    // Addition of one unit price
                    // Price Formula
                    //$newPrice      = $volume;
                    $updatePrice   = $file['price_unit'];
                    $price_unit = $file['price_unit'];
                    //echo $price_product;

                    // New Values for cart page
                    $leadtime_selected = $file['leadtime_selected'];
                    $leadtime = $file['leadtime'];
                    //$calculated_weight = $session_files[$session_key][2] * $density * $_POST['files'][$key]['quantity'];
                    $calculated_weight = $volume * $density * $file['quantity'];
                    $calculated_weight = $calculated_weight / 1000;
                    $calculated_weight = number_format((float) $calculated_weight, 2, '.', '');
                    $color_selected =    $file['color_selected'];

                    $weight = $calculated_weight;
                    update_post_meta($post_id, 'leadtime_selected', $leadtime_selected);
                    update_post_meta($post_id, 'leadtime', $leadtime);
                    update_post_meta($post_id, 'color_selected', $color_selected);
                    // New Values for cart page

                    update_post_meta($post_id, '_visibility', 'visible');
                    update_post_meta($post_id, '_stock_status', 'instock');
                    update_post_meta($post_id, 'total_sales', '0');
                    update_post_meta($post_id, '_downloadable', 'no');
                    update_post_meta($post_id, '_virtual', 'no');
                    update_post_meta($post_id, '_regular_price', $updatePrice);
                    update_post_meta($post_id, '_price', $price_unit);
                    update_post_meta($post_id, '_featured', 'no');
                    //update_post_meta( $post_id, '_product_version', '2.6.14' );
                    //update_post_meta( $post_id, '_manage_stock',    'no' );
                    //update_post_meta( $post_id, '_backorders',      'no' );
                    $estimated_delivery = get_post_meta((int) $file['material_id'], 'estimated_delivery', 1);
                    $date_delivery      = current_time('timestamp') + $estimated_delivery * 3600;
                    update_post_meta($post_id, 'volume', $volume);
                    update_post_meta($post_id, 'surface_area', $surface_area);
                    update_post_meta($post_id, 'box_volume', $box_volume);
                    update_post_meta($post_id, 'weight', $weight);
                    update_post_meta($post_id, 'density', $density);
                    update_post_meta($post_id, 'material_id', $file['material_id']);
                    update_post_meta($post_id, 'file', $upload_dir['baseurl'] . '/portrait_upload_files/' . $file['file_name']);
                    update_post_meta($post_id, 'estimated_delivery', $estimated_delivery);
                    update_post_meta($post_id, 'timestamp_delivery', $date_delivery);
                    $manufacture = "Protrait Printing";
                    update_post_meta($post_id, 'manufacture', $manufacture);
                    
                    WC()->cart->add_to_cart($post_id, (int) $file['quantity']);
                    $result['products'][] = $post_id;
                    //$result['products_add_to_cart'][] = array( $post_id, (int)$file['quantity'] );
                } else {
                    $result['error'] = __('Error. Failed create item.', '3dprinting');
                }
            } else {
                $result['error'] = __('Error. File not found in dir.', '3dprinting');
            }
        }
        update_cart_price($_POST['files'][0]['material_id']);

        //更新头部的购物车信息，具体参考 class-wc-ajax.php的public static function get_refreshed_fragments()
        ob_start();
        woocommerce_mini_cart();
        $mini_cart = ob_get_clean();
        $data = array(
            'fragments' => apply_filters(
                'woocommerce_add_to_cart_fragments',
                array(
                    'div.widget_shopping_cart_content' => '<div class="widget_shopping_cart_content">' . $mini_cart . '</div>',
                )
            ),
            'cart_hash' => WC()->cart->get_cart_hash(),
        );
        //wp_send_json( $data );
        $result['fragment'] = $data;

        //更新材料选择部分的购物车信息
        $result['table_html_cart'] = '<div class="ast-cart-menu-wrap"><span class="count">' . WC()->cart->get_cart_contents_count() . '</span></div> <span class="ast-woo-header-cart-total">' . WC()->cart->get_cart_subtotal() . '</span>';

    } else {
        $result['error'] = __('Error. File not found.', '3dprinting');
    }
    //}
    /*  echo '<pre>';
        print_r($result);
        echo '<pre>';*/
    echo json_encode($result);
    exit;
}
add_action('wp_ajax_prints_create_protrait_product', 'ajax_create_protrait_product');
add_action('wp_ajax_nopriv_prints_create_protrait_product', 'ajax_create_protrait_product');

/**
 * 得到某个目录下所有的文件名。
 * @param String $dir
 * @return Array
 * 
 */
function getFileName($dir) {
    $array = array();
    //1、先打开要操作的目录，并用一个变量指向它
    $handler = opendir($dir);
    //2、循环的读取目录下的所有文件
    /* 其中$filename = readdir($handler)是每次循环的时候将读取的文件名赋值给$filename，为了不陷于死循环，所以还要让$filename !== false。一定要用!==，因为如果某个文件名如果叫’0′，或者某些被系统认为是代表false，用!=就会停止循环 */
    while (($filename = readdir($handler)) !== false) {
        // 3、目录下都会有两个文件，名字为’.'和‘..’，不要对他们进行操作
        if ($filename != '.' && $filename != '..') {
            // 4、进行处理
            array_push($array, $filename);
        }
    }
    //5、关闭目录
    closedir($handler);
    return $array;
}

/* AJAX - DELETE upload file */
function ajax_delete_upload_file()
{
    $file_name = $_POST['file_name'];
    $file_url = $_POST['file_url'];
    $upload_dir = wp_upload_dir();
    $stl_files_uploads = $upload_dir['basedir'] . '/' . 'stl_files_uploads';
    $portrait_files_upload = $upload_dir['basedir'] . '/' . 'portrait_upload_files';
    if (strstr($file_url, 'stl_files_uploads')) {
        $file_link = $stl_files_uploads . '/' . $file_name;
        if (file_exists($file_link)) {
            $res = unlink($file_link);
            if ($res) {
                $return_res = 1;
            }else{
                $return_res = 0;
            }
        }else{
            $return_res = 0;
        }
    }
    if (strstr($file_url, 'portrait_upload_files')) {
        $file_link = $portrait_files_upload . '/' . $file_name;
        if (file_exists($file_link)) {
            $res = unlink($file_link);
            if ($res) {
                $return_res = 1;
            }else{
                $return_res = 0;
            }
        }else{
            $return_res = 0;
        }
    }
    
    echo json_encode($return_res);
    exit;
}
add_action('wp_ajax_delete_upload_file', 'ajax_delete_upload_file');
add_action('wp_ajax_nopriv_delete_upload_file', 'ajax_delete_upload_file');

//add All STL Files to backend menu
function add_all_stl_files_menu () {
    add_menu_page('All STL Files', 'All STL Files', 'manage_options', 'all_stl_files', 'view_all_stl_files', '', 135);
} 
add_action('admin_menu', 'add_all_stl_files_menu');

function view_all_stl_files(){
    $upload_dir = wp_upload_dir();
    $uploads_dir_name = $upload_dir['basedir'] . '/stl_files_uploads';
    $uploads_url_name = $upload_dir['baseurl'] . '/stl_files_uploads';
    $files = arraysort(printdirgetfiles($uploads_dir_name));
    $i = 1;
?>
    <div>
        <h1>All STL Files On The Server</h1>
        <table>
            <tbody>
                <?php foreach ($files as $time => $file): ?>
                <tr>
                    <td class="stl_count"><b><?php echo $i; ?>.</b></td>
                    <td class="stl_product"><b><?php echo $file; ?></b></td>
                    <td class="stl_upload_time" style="padding: 0 20px;"><b><?php echo $time; ?></b></td>
                    <td class="stl_file"><a href="<?php echo $uploads_url_name.'/'.$file; ?>">Download File</a></td>
                </tr>
                <?php $i++; ?>
                <?php endforeach ?>
            </tbody>
        </table>
    </div>
<?php
}
//遍历目录下文件方法
function printdirgetfiles($dir)
{
    $files = array();
    //opendir() 打开目录句柄
    if($handle = @opendir($dir)){
    //readdir()从目录句柄中（resource，之前由opendir()打开）读取条目,
    // 如果没有则返回false
        while(($file = readdir($handle)) !== false){//读取条目
            if( $file != ".." && $file != "."){//排除根目录
                if(is_dir($dir . "/" . $file)) {//如果file 是目录，则递归
                    $files[$file] = printdir($dir . "/" . $file);
                } else {
                    //获取文件修改日期
                    $filetime = date('Y-m-d H:i:s', filemtime($dir . "/" . $file));
                    //文件修改时间作为健值
                    $files[$filetime] = $file;
                }
            }
        }
        @closedir($handle);
        return $files;
    }
    
}
//根据修改时间对数组排序
function arraysort($aa) {
    if( is_array($aa)){
        krsort($aa);
        foreach($aa as $key => $value) {
            if (is_array($value)) {
                $arr[$key] = arraysort($value);
            } else {
                $arr[$key] = $value;
            }
        }
        return $arr;
    } else {
        return $aa;
    }
}

// 修改订单的金额，订单最小金额为50美金
add_action( 'woocommerce_checkout_create_order', 'change_total_on_checking', 20, 1 );
function change_total_on_checking( $order ){
    $total = $order->get_total();
    $shipping_total = $order->get_shipping_total();
    $subtotal = $total - $shipping_total;
    // if ($subtotal < 50) {
    //     $order->add_meta_data( 'original_subtotal', $subtotal );
    //     $order->add_meta_data( 'minimum_subtotal', 50 );
    //     $new_subtotal = 50;
    // }else{
        $new_subtotal = $subtotal;
    // }
    $new_total = $new_subtotal + $shipping_total;
    $order->set_total( $new_total );
}

// woocommerce order details addition 修改后台woocommerce的订单详情的页面内容
add_action('woocommerce_admin_order_item_headers', 'wlk_admin_order_items_headers');
function wlk_admin_order_items_headers($order)
{
?>
    <th class="item" data-sort="string-ins"><?php esc_html_e('Part Name', 'woocommerce'); ?></th>
    <th class="item" data-sort="string-ins"><?php esc_html_e('Material', 'woocommerce'); ?></th>
    <th class="item" data-sort="string-ins"><?php esc_html_e('Color', 'woocommerce'); ?></th>
<?php
}

add_action('woocommerce_admin_order_item_values', 'wlk_admin_order_item_values', 10, 3);
function wlk_admin_order_item_values($product, $item, $item_id)
{
    if (!$product) {
        return;
    }

    $productPartAndMaterial = explode('|', esc_attr($item->get_name()));
    $partName = strtolower($productPartAndMaterial[0]);
    $productId = $product->get_id();
    $materialId = get_post_meta($productId, 'material_id', true);
    $color_selected = get_post_meta($productId, 'color_selected', true);
    $color_surface_treatment = get_post_meta($productId, 'color_surface_treatment', true);
    $post = get_post($materialId);
    $color = !empty($color_selected) ? $color_selected : '';
    if (!$color) {
        $color = !empty($color_surface_treatment) ? get_after_processes_name($color_surface_treatment) : '';
    }
    $material = !empty($post) ? $post->post_title : '';

    if ($material == '') {
        $material = trim(end($productPartAndMaterial));
    }

    $manufacture = get_post_meta( $productId, 'manufacture', 1 );
    switch ($manufacture) {
        case 'CNC Machining':
            $material_pref = 'CNC ';
            break;
        case 'Plastic Injection Molding Part':
            $material_pref = 'Injection ';
            break;
        case 'Plastic Injection Molding Mould':
            $material_pref = 'Mould ';
            break;
        default:
            $material_pref = '';
            break;
    }

    ?>
    <td class="part-name"><?php echo $partName; ?></td>
    <td class="material"><?php echo $material_pref.$material; ?></td>
    <td class="color"><?php echo $color; ?></td>
<?php
}

/*修改后台自定义文章类型materials的显示界面 start*/
add_action('manage_materials_posts_custom_column',   'custom_columns_materials');
function custom_columns_materials( $column ) {
    global $post;
    switch($column)
    {       
        case 'color':
            echo get_post_meta( $post->ID, 'color', 1 );
        break;

        case 'menu_order':
            echo $post->menu_order;
        break;

        case 'show_shoppingpage':
            $checkval = get_post_meta($post->ID,'show_on_shopping_page',1);
            if(isset($checkval) && $checkval == 1) {
                $checked = " checked";
            } else {
                $checked = ''; 
            }
            echo '<input type="checkbox" class="show_shoppingpage" value="'.$post->ID.'" '.$checked.'>';
        
        break;
    }
}

add_filter('manage_materials_posts_columns',     'set_edit_materials_columns');
function set_edit_materials_columns( $columns ) {
    $date_title = $columns['date'];
    unset( $columns['date'] );
    $columns['color']              = 'Color';
    $columns['menu_order']              = 'Order';
    $columns['show_shoppingpage']  = "Show on Shopping page";
    $columns['date']               = $date_title;

    return $columns;
}

// 异步保存后台show_on_shopping_page字段的值
function post_show_on_shopping()
{
    update_post_meta($_POST['post_id'], 'show_on_shopping_page', $_POST['update']);
}
add_action('wp_ajax_post_show_on_shopping', 'post_show_on_shopping');
/* 修改后台自定义文章类型materials的显示界面 end */

/* add all_page script --start---*/
add_action('astra_footer_after', 'add_all_page_script', 100);
function add_all_page_script(){
    ?>
    <script src= "<?php echo get_stylesheet_directory_uri(); ?>/js/all-page.js?v=1.0.0"> </script>
    <?php
}
/* add all_page script --end---*/

// 人像打印自定义类型
function portrait_material_posttype()
{
    register_post_type(
        'portrait-material',
        // CPT Options
        array(
            'labels' => array(
                'name' => __('Portrait Material'),
                'singular_name' => __('portrait_material')
            ),
            'public' => true,
            'has_archive' => false,
            'rewrite' => array(
                'slug' => 'portrait_material'
            ),
            'show_in_rest' => true,
            'supports' => array('editor'),
            'supports' => array('title', 'author', 'page-attributes', 'editor', 'thumbnail')
        )
    );
}
// Hooking up our function to theme setup
add_action('init', 'portrait_material_posttype');

// 获取woocommerce的所有国家数组
function  get_countryname()
{
    $countryList  = WC()->countries->get_countries();
    return $countryList;
}

// 清空购物车
add_action('wp_ajax_woocommerce_clear_cart', 'woocommerce_clear_cart');
add_action('wp_ajax_nopriv_woocommerce_clear_cart', 'woocommerce_clear_cart');
function woocommerce_clear_cart()
{
    global $woocommerce;
    $woocommerce->cart->empty_cart();
    echo json_encode(1);
    exit;
}

// 计算人像打印的运费
function calculate_protrait_total_shipping()
{
    global $woocommerce;
    global $wpdb;
    // shipping calculation
    if (isset($_POST['change_country'])) {
        $countrycode = $_POST['change_country'];
    } elseif (!is_user_logged_in()) {
        //echo "In case"; exit;
        $ip_info = ip_info();
        $countrycode = $ip_info['country_code'];
    } else {
        $countrycode = $woocommerce->customer->get_shipping_country();
    }

    if ($countrycode == '--') {
        $sp = 0;
        echo json_encode($sp);
        exit;
    }

    $shipping_info = include WP_PLUGIN_DIR . '/flexible-shipping-lava/country-shipping.php';
    $total_shipping = 0;
    $total_volume = 0;
    $total_box_volume = 0;
    if (isset($_POST['total_box_volume'])) {
        $total_box_volume = number_format((float) $_POST['total_box_volume'] / 1000, 2, '.', '');
    }

    $first_weight = $shipping_info[ $countrycode ][ 'first_weight' ];
    $continued_weight = $shipping_info[ $countrycode ][ 'continued_weight' ];
    $weight_ratio = $shipping_info[ $countrycode ][ 'weight_ratio' ];
    $first_weight_quantity = 500;
    $shipping_exchange_rate = 6.4;

    $total_quantity = 1;
    $density = 0;
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
    $sp = number_format((float) $shipping_price, 2, '.', '');
    //$res = array('countrycode'=>$countrycode, 'total_box_volume'=>$total_box_volume, 'weight_ratio'=>$weight_ratio, 'sp'=>$sp);
    echo json_encode($sp);
    exit;
    // shipping calculation
}

add_action('wp_ajax_calculate_protrait_total_shipping', 'calculate_protrait_total_shipping');
add_action('wp_ajax_nopriv_calculate_protrait_total_shipping', 'calculate_protrait_total_shipping');


// 将 Page 页面默认排序修改为按照 Date 倒序
function set_page_order_in_admin( $wp_query ) {
    global $pagenow;
    if ( is_admin() && 'edit.php' == $pagenow && $wp_query->get('post_type') == 'page' && !isset($_GET['orderby'])) {
        $wp_query->set( 'orderby', 'date' );
        $wp_query->set( 'order', 'DESC' );       
    }
}
if (is_admin()) {
    add_filter('pre_get_posts', 'set_page_order_in_admin', 5 );
}

// 将 materials Page 页面默认排序修改为按照 menu_order 顺序
function set_materials_page_order_in_admin( $wp_query ) {
    global $pagenow;
    if ( is_admin() && 'edit.php' == $pagenow && $wp_query->get('post_type') == 'materials' && !isset($_GET['orderby'])) {
        $wp_query->set( 'orderby', 'menu_order' );
        $wp_query->set( 'order', 'ASC' );       
    }
}
if (is_admin()) {
    add_filter('pre_get_posts', 'set_materials_page_order_in_admin', 5 );
}

/*为后台users的编辑页面增加注册时间字段 并按注册时间倒序 start*/
add_filter( 'manage_users_columns', 'my_users_columns' );
function my_users_columns( $columns ){
    $columns[ 'registered' ] = 'Register time';
    return $columns;
}

add_action( 'manage_users_custom_column', 'output_my_users_columns', 10, 3 );
function  output_my_users_columns( $var, $column_name, $user_id ){
    switch( $column_name ) {
        case "registered" :
            return get_user_by('id', $user_id)->data->user_registered;
    }
}

add_filter( "manage_users_sortable_columns", 'wenshuo_users_sortable_columns' );
function wenshuo_users_sortable_columns($sortable_columns){
    $sortable_columns['registered'] = 'registered';
    return $sortable_columns;
}

add_action( 'pre_user_query', 'wenshuo_users_search_order' );
function wenshuo_users_search_order($obj){
    if(!isset($_REQUEST['order']) || $_REQUEST['order']=='registered' ){
        if( !in_array($_REQUEST['order'],array('asc','desc')) ){
            $_REQUEST['order'] = 'desc';
        }
    $obj->query_orderby = "ORDER BY user_registered ".$_REQUEST['order']."";
    }
}

/*为后台users的编辑页面增加注册时间字段 end*/

/*遍历materials文章类型的所有页面并做成短代码*/
add_shortcode('materials_list', 'materials_page_list');
function materials_page_list(){
    $posts_materials = get_posts(array(
        'post_type'      => 'materials',
        'posts_per_page' => -1,
        'orderby'        => 'menu_order',
        'order'          => 'ASC',
    ));
    $style='<style>.uagb-post__image a img{width:453.34px;height:373.25px;}.uagb-post__excerpt {padding-bottom: 25px!important;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;}
        .uagb-post__title a{
            padding-bottom: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display:block;
        }
        .m15{margin-top: 15px;}
        </style>';
    $top = '<div class="wp-block-uagb-post-grid uagb-post-grid  uagb-post__image-position-top uagb-post__image-enabled uagb-block-eacbb4ad    uagb-post__items uagb-post__columns-3 is-grid uagb-post__columns-tablet-2 uagb-post__columns-mobile-1 uagb-post__equal-height" data-total="1">';
    $end ='</div>';
    $html = '';
    foreach ($posts_materials as $key => $post) {
        //var_dump($post);
        $material_process = get_post_meta( $post->ID, 'process', 1 ); 
        $short_desc = get_post_meta( $post->ID, 'short_description', 1 );
        $comments = get_post($post->ID)->comment_count==0?'No Comments':$comments;
       
        if (strtoupper($material_process) != 'DMLS') {
            $html .= '<article class="uagb-post__inner-wrap">';
            $html .= '<div class="uagb-post__image"><a href="'.get_the_permalink( $post->ID ).'" target="_self" rel="bookmark noopener noreferrer"> ';
            $html .= wp_get_attachment_image(get_post_thumbnail_id( $post->ID ), 'medium');
            $html .= '</a></div>';
            $html .= '<h4 class="uagb-post__title uagb-post__text"><a href="'.get_the_permalink( $post->ID ).'" target="_self" rel="bookmark noopener noreferrer">'.get_the_title($post->ID).'</a></h4>';
            $html .= '<div class="uagb-post__text uagb-post-grid-byline">';
            $html .= '<time  class="uagb-post__date"> <span class="dashicons-calendar dashicons"></span>'.get_the_date().'</time> ';
            $html .= '<span class="uagb-post__comment"><span class="dashicons-admin-comments dashicons"></span>   '.$comments.'</span>';
            $html .= '</div>';
            $html .= '<div class="uagb-post__text uagb-post__excerpt"><p>'.$short_desc.'</p></div>';
            $html .= '<div class="uagb-post__text uagb-post__cta wp-block-button"><a class="wp-block-button__link uagb-text-link m15" href="'.get_the_permalink( $post->ID ).'" target="_self" rel="bookmark noopener noreferrer">Read More</a></div>';
            $html .= '</article>';
        }
    }
    $html .= '';
    return $style.$top.$html.$end;
}

/*遍历technologies文章类型的所有页面并做成短代码*/
add_shortcode('technologies_list', 'technologies_page_list');
function technologies_page_list(){
    $posts_technologies = get_posts(array(
        'post_type'      => 'technologies',
        'posts_per_page' => -1,
        'orderby'        => 'menu_order',
        'order'          => 'ASC',
    ));

    $style='<style>
   .uagb-post__inner-wrap .uagb-post__image a img {height:373.25px!important;}
     .uagb-post__excerpt {
        padding-bottom: 25px!important;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;}
        .uagb-post__title a{
            padding-bottom: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display:block;
        }
        .m15{margin-top: 15px;}
        </style>';
    $top = '<div class="wp-block-uagb-post-grid uagb-post-grid  uagb-post__image-position-top uagb-post__image-enabled uagb-block-9c1b49ab    uagb-post__items uagb-post__columns-3 is-grid uagb-post__columns-tablet-2 uagb-post__columns-mobile-1 uagb-post__equal-height" data-total="3">';
    $end ='</div>';
    $html = '';
    foreach ($posts_technologies as $key => $post) {
        
            $short_desc = get_post_meta( $post->ID, 'short_description', 1 );
            $comments = get_post($post->ID)->comment_count==0?'No Comments':$comments;


            $html .= '<article class="uagb-post__inner-wrap">';
            $html .= '<div class="uagb-post__image"><a href="'.get_the_permalink( $post->ID ).'" target="_self" rel="bookmark noopener noreferrer"> ';
            $html .= wp_get_attachment_image(get_post_thumbnail_id( $post->ID ), 'medium');
            $html .= '</a></div>';
            $html .= '<h4 class="uagb-post__title uagb-post__text"><a href="'.get_the_permalink( $post->ID ).'" target="_self" rel="bookmark noopener noreferrer">'.get_the_title($post->ID).'</a></h4>';
            $html .= '<div class="uagb-post__text uagb-post-grid-byline">';
            $html .= '<time  class="uagb-post__date"> <span class="dashicons-calendar dashicons"></span>'.get_the_date().'</time> ';
            $html .= '<span class="uagb-post__comment"><span class="dashicons-admin-comments dashicons"></span>   '.$comments.'</span>';
            $html .= '</div>';
            $html .= '<div class="uagb-post__text uagb-post__excerpt"><p>'.$short_desc.'</p></div>';
            $html .= '<div class="uagb-post__text uagb-post__cta wp-block-button"><a class="wp-block-button__link uagb-text-link m15" href="'.get_the_permalink( $post->ID ).'" target="_self" rel="bookmark noopener noreferrer">Read More</a></div>';
            $html .= '</article>';
    }

    $html .= '';
    return $style.$top.$html.$end;
}

/*遍历materials文章类型的所有页面把金属材料提取出来并做成短代码*/
add_shortcode('metal_materials_list', 'metal_materials_page_list');
function metal_materials_page_list(){
    $posts_materials = get_posts(array(
        'post_type'      => 'materials',
        'posts_per_page' => -1,
        'orderby'        => 'menu_order',
        'order'          => 'ASC',
    ));
    $html = '';
    $html .= '<div class="lava-block-columns wp-block-columns">';
    foreach ($posts_materials as $key => $post) {
        //var_dump($post);
        $material_process = get_post_meta( $post->ID, 'process', 1 ); 
        $short_desc = get_post_meta( $post->ID, 'short_description', 1 );

        if (strtoupper($material_process) == 'DMLS') {
            $html .= '<div class="wp-block-column">';
            $html .= '<a href="'.get_the_permalink( $post->ID ).'">';
            $html .= '<figure class="wp-block-image">';
            $html .= wp_get_attachment_image(get_post_thumbnail_id( $post->ID ), 'medium');
            $html .= '</figure><h4>';
            $html .= get_the_title($post->ID);
            $html .= '</h4><p>';
            $html .= $short_desc;
            $html .= '</p></a></div>';
        }
    }
    $html .= '</div>';
    return $html;
}

/*遍历materials文章类型的所有页面把非金属材料提取出来并做成短代码*/
add_shortcode('nonmetal_materials_list', 'nonmetal_materials_page_list');
function nonmetal_materials_page_list(){
    $posts_materials = get_posts(array(
        'post_type'      => 'materials',
        'posts_per_page' => -1,
        'orderby'        => 'menu_order',
        'order'          => 'ASC',
    ));
    $html = '';
    $html .= '<div class="wp-block-uagb-post-grid uagb-post-grid  uagb-post__image-position-top uagb-post__image-enabled uagb-block-eacbb4ad    uagb-post__items uagb-post__columns-3 is-grid uagb-post__columns-tablet-2 uagb-post__columns-mobile-1 uagb-post__equal-height" data-total="1">';
    foreach ($posts_materials as $key => $post) {
        //var_dump($post);
        $material_process = get_post_meta( $post->ID, 'process', 1 ); 
        $short_desc = get_post_meta( $post->ID, 'short_description', 1 );

        if (strtoupper($material_process) != 'DMLS') {
            $html .= '<article class="uagb-post__inner-wrap">';
            $html .= '<div class="uagb-post__image"><a href="'.get_the_permalink( $post->ID ).'" target="_self" rel="bookmark noopener noreferrer"> ';
            $html .= wp_get_attachment_image(get_post_thumbnail_id( $post->ID ), 'medium');
            $html .= '</a></div>';
            $html .= '<h4 class="uagb-post__title uagb-post__text"><a href="'.get_the_permalink( $post->ID ).'" target="_self" rel="bookmark noopener noreferrer">'.get_the_title($post->ID).'</h4>';
            $html .= '<div class="uagb-post__text uagb-post-grid-byline">';
            $html .= '<time datetime="2022-01-21T09:16:30+00:00" class="uagb-post__date"><span class="dashicons-calendar dashicons"></span>'.get_the_date().'</time>';
            $html .= '<span class="uagb-post__comment"><span class="dashicons-admin-comments dashicons"></span>'.$Comments.'</span>';
            $html .= '</div>';
            $html .= '<div class="uagb-post__text uagb-post__excerpt"><p>'.$short_desc.'</p></div>';
            $html .= '<div class="uagb-post__text uagb-post__cta wp-block-button"><a class="wp-block-button__link uagb-text-link" href="'.get_the_permalink( $post->ID ).'" target="_self" rel="bookmark noopener noreferrer">Read More</a></div>';
            $html .= '</article></div>';
        }
    }
    $html .= '</div>';
    return $html;
}

/* other page code start */
/* AJAX - Upload portrait file */
function ajax_upload_other_file()
{
    $result     = array(
        'files' => array(),
        'error' => ''
    );
    if($_FILES){
        $file = $_FILES['other_file'];

        $upload_dir       = wp_upload_dir();
        $uploads_dir_temp = $upload_dir['basedir'] . '/other_file';
        if (!is_dir($uploads_dir_temp)) {
            mkdir($uploads_dir_temp, 0777, true);
        }
        $tmp_name = $_FILES["other_file"]["tmp_name"];
        $name     = wp_unique_filename($uploads_dir_temp, basename($_FILES["other_file"]["name"]));
        $upl      = move_uploaded_file($tmp_name, "$uploads_dir_temp/$name");
        if ($upl) {
            $result['files'][] = array(
                $upload_dir['baseurl'] . '/other_file/' . $name,
                $name
            );
        } else{
            $result['error'] = "ERROR";
        }
    }else{
        $result['error'] = "ERROR";
    }
    echo json_encode($result);
    exit;
}
add_action('wp_ajax_upload_other_file', 'ajax_upload_other_file');
add_action('wp_ajax_nopriv_upload_other_file', 'ajax_upload_other_file');


//https://www.lava3dp.com/wp-content/uploads/other_file/Right-Arm-Base-v4-13.stl


/* AJAX - delete portrait file */
function ajax_delete_other_file()
{
    $upload_dir = wp_upload_dir();
    $uploads_dir_temp = $upload_dir['basedir'] . '/other_file/';
    $file_name = $_POST['file_name'];
    // $file_arr = explode('/', $file);
    // $file_name = array_pop($file_arr);
    $res = 0;
    if ($file_name) {
        $file_link = $uploads_dir_temp . $file_name;
        if (file_exists($file_link)) {
            $res = unlink($file_link);
        }
    }
    if ($res) {
        $result = 1;
    } else {
        $result = 0;
    }
    echo json_encode($result);
    exit;
}
add_action('wp_ajax_delete_other_file', 'ajax_delete_other_file');
add_action('wp_ajax_nopriv_delete_other_file', 'ajax_delete_other_file');

/* add script to head  --start--*/
add_action('astra_head_bottom', 'add_script_to_head', 50);

function add_script_to_head(){
    ?>
    <link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_directory_uri(); ?>/css/all.min.css">
    <?php
}


/* add script to head  --end--*/

/* add script to home page  --start--*/
add_action('astra_footer_after', 'add_script_to_home_page', 50);
function add_script_to_home_page(){
    if (is_page('home')) {
    ?>
        <script id="circle-animation-js">
            var csshref = "<?php echo get_stylesheet_directory_uri(); ?>/css/home-circle-animation.css";
            window.onscroll = function() {
                // 当首页的实力展示部分出现在可视区域，添加样式表出现动画
                var documentClientHeight = document.documentElement.clientHeight || window.innerHeight || document.body.clientHeight;
                var htmlElementClientTop = document.getElementById('circle-progress').getBoundingClientRect().top;
                if (documentClientHeight >= htmlElementClientTop) {
                    var linkNode = document.createElement("link");
                    linkNode.setAttribute("rel", "stylesheet");
                    linkNode.setAttribute("id", "home-circle-animation-css");
                    linkNode.setAttribute("type", "text/css");
                    linkNode.setAttribute("href", csshref);
                    var circleid = document.getElementById('home-circle-animation-css');
                    if (circleid == null) {
                        document.head.appendChild(linkNode);
                    }
                }
                 //监听向下滚动固定head在顶部
                var topScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                var ast_header = document.getElementById("masthead");
                if (topScroll > 150) {
                    ast_header.style.position = "fixed";
                    ast_header.style.top = "0";
                    ast_header.style.zIndex = "999";
                    ast_header.style.width = "100%";
                } else {
                    ast_header.style.position = "static";
                }
            }
        </script>
        <!-- 首页评论区域的轮播 -->
        <link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_directory_uri(); ?>/css/home-carousel.css">
        <script type="text/javascript" id="carousel-js">

            function fadeIn(elem, speed){
                var speed = speed || 20;
                elem.style.display = "block";
                elem.style.opacity = 0;
                var num = 1;
                var st = setInterval(function(){
                    num++;
                    elem.style.opacity = num/10;
                    if (num >= 10) {
                        clearInterval(st);
                    }
                }, speed);
                
            }

            function fadeOut(elem, speed){
                var speed = speed || 20;
                var num = 10;
                var st = setInterval(function(){
                    num--;
                    elem.style.opacity = num/10;
                    if (num <= 0) {
                        clearInterval(st);
                        elem.style.display = "none";
                    }
                }, speed);
            }

            function listenCarouselNumClick(){
                var carousel_number_li = document.getElementsByClassName("carousel-number-li");
                var carousel_li_num = carousel_number_li.length;
                for (var i = 0; i < carousel_li_num; i++) {
                    carousel_number_li[i].addEventListener('click',function(){

                        var current_num = this.getAttribute("data-number");
                        var carousel_number_active = document.getElementsByClassName("carousel-number-active");
                        //console.log("carousel_number_active",carousel_number_active)
                        var activenum = parseInt(carousel_number_active[0].getAttribute("data-number"));
                        //console.log("activenum",activenum)

                        for (var i = 0; i < carousel_li_num; i++) {
                            carousel_number_li[i].classList.remove("carousel-number-active");
                        }
                        this.classList.add("carousel-number-active");

                        var carousel_content_li_activeid = document.getElementById("carousel-content-li-" + activenum);
                        carousel_content_li_activeid.style.display = "none";
                        var carousel_content_li_id = document.getElementById("carousel-content-li-" + current_num);
                        fadeIn(carousel_content_li_id, 200);

                    },false);
                }
            }

            var carouseltimer = null;
            function autoPlayCarousel () {
                carouseltimer = setInterval(function () {
                    var carousel_number_li = document.getElementsByClassName("carousel-number-li");
                    var carousel_li_num = carousel_number_li.length;

                    var carousel_number_active = document.getElementsByClassName("carousel-number-active");
                    var activenum = parseInt(carousel_number_active[0].getAttribute("data-number"));

                    if (activenum < carousel_li_num) {
                        var nextactivenum = activenum + 1;
                    } else {
                        var nextactivenum = 1;
                    }

                    var carousel_number_li_id = document.getElementById("carousel-number-li-" + nextactivenum);
                    carousel_number_li_id.click();
                    
                },5000);
            }

            listenCarouselNumClick();

            autoPlayCarousel();

            var carouselcontainer = document.querySelector(".carousel-container");
            carouselcontainer.onmouseenter = function () {
                clearInterval(carouseltimer);
            }
            carouselcontainer.onmouseleave = function () {
                autoPlayCarousel();
            }
        </script>
        <script type="text/javascript" id="home-service-js">
            var homeservicewrapimghead = document.getElementsByClassName("home-service-wrap-img-head");
            var homeservicewraptext = document.getElementsByClassName("home-service-wrap-text");
            servicdocleght = homeservicewrapimghead.length;
            for (var i = 0; i < servicdocleght; i++) {
                homeservicewrapimghead[i].onmouseenter = function(){
                    this.style.display = "none";
                    this.parentNode.children[1].style.display = "block";
                }
                homeservicewraptext[i].onmouseleave = function(){
                    this.parentNode.children[0].style.display = "grid";
                    this.style.display = "none";
                }
            }
        </script>
        <script type="text/javascript" id="logo-auto-carousel-id">
            function logoAutoCarousel(){
                var carouseltime = 1;
                var perpicturewidth = 214;
                var customimggarllylu = document.getElementsByClassName("custom-img-garlly-ul")[0];
                var lilen = 16;

                logocarouseltimer = setInterval(function () {
                    console.log('carouseltime',carouseltime);
                    var positionx = (- perpicturewidth * carouseltime) + "px";
                    if (carouseltime == 0) {
                        customimggarllylu.style.transform = 'translate3d(' + positionx + ', 0, 0)';
                        customimggarllylu.style.transition = 'transform 0s ease 0s';
                    }else{
                        customimggarllylu.style.transform = 'translate3d(' + positionx + ', 0, 0)';
                        customimggarllylu.style.transition = 'transform 1s ease 0s';
                    }
                    carouseltime = carouseltime + 1;
                    if (carouseltime >= lilen) {
                        carouseltime = 0;
                    }
                },5000);
            }
            logoAutoCarousel();
        </script>
    <?php } else { ?>

        <script type="text/javascript" id="scroll-fixed-header">
            //监听向下滚动固定head在顶部
            window.onscroll = function(){
                var topScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                var ast_header = document.getElementById("masthead");
                if (topScroll > 150) {
                    ast_header.style.position = "fixed";
                    ast_header.style.top = "0";
                    ast_header.style.zIndex = "999";
                    ast_header.style.width = "100%";
                } else {
                    ast_header.style.position = "static";
                }
            }
        </script>

    <?php }

}
/* add script to home page  --end--*/


/* add google and baidu analytics script --start---*/
add_action('astra_footer_after', 'add_analytics_script', 100);
function add_analytics_script(){
    ?>
   <!-- Google Tag Manager
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-TX88RP5');</script>
     End Google Tag Manager -->

    <!-- Global site tag (gtag.js) - Google Analytics 
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-107958491-7"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-107958491-7');
    </script>-->
    
    <!--<script>
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?1dd3be75039161b3a6fe2e067e305cb2";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
    </script>-->
    <?php
}
/* add google and baidu analytics script --end---*/

/*修改后台woocommerce的order start*/
add_action('woocommerce_before_order_itemmeta', 'my_woocommerce_before_order_itemmeta', 10, 3 );
function my_woocommerce_before_order_itemmeta( $item_id, $item, $_product ) {
    $manufacture = get_post_meta( $_product->id, 'manufacture', 1 );
    if ($manufacture == '') {
        $manufacture = '3D Printing';
    }
    $file_unit = get_post_meta( $_product->id, 'file_unit', 1 );
    if ($file_unit == '') {
        $file_unit = 'mm';
    }
    $link_file = get_post_meta( $_product->id, 'file', 1 );
    $color = get_post_meta( $_product->id, 'color_selected', 1 );
    $surface_treatment = get_post_meta( $_product->id, 'surface_treatment', 1 );
    $finishing_coating = get_post_meta( $_product->id, 'finishing_coating', 1 );
    $logo_finishing = get_post_meta( $_product->id, 'logo_finishing', 1 );
    $protective_coating = get_post_meta( $_product->id, 'protective_coating', 1 );

    $basic_surface_treatment = get_post_meta($_product->id, 'basic_surface_treatment', 1);
    $advanced_surface_treatment = get_post_meta($_product->id, 'advanced_surface_treatment', 1);
    $color_surface_treatment = get_post_meta($_product->id, 'color_surface_treatment', 1);

    if (!$color) {
        $color = !empty($color_surface_treatment) ? get_after_processes_name($color_surface_treatment) : '';
    }

    $manufacture_html = '<br/><strong>Manufacture:</strong> '. $manufacture;
    $file_unit_html = '<br/><strong>File Unit:</strong> '. $file_unit;
    $link_file_html = '<br/><strong>File:</strong> <a href="'. $link_file .'" download="'.basename( $link_file ).'">'. basename( $link_file ) .'</a>';

    $color_html = '';
    $surface_treatment_html = '';
    $finishing_coating_html = '';
    $logo_finishing_html = '';
    $protective_coating_html = '';
    $basic_surface_treatment_html = '';
    $advanced_surface_treatment_html = '';
    $color_surface_treatment_html = '';
    if ($color) {
        $color_html = '<br/><strong>Color:</strong> '. $color;
    }
    if ($surface_treatment) {
        $surface_treatment_html = '<br/><strong>Surface Treatment:</strong> '. get_after_processes_name($surface_treatment);
    }
    if ($finishing_coating) {
        $finishing_coating_html = '<br/><strong>Finishing Coating:</strong> '. get_after_processes_name($finishing_coating);
    }
    if ($logo_finishing) {
        $logo_finishing_html = '<br/><strong>Logo Finishing:</strong> '. get_after_processes_name($logo_finishing);
    }
    if ($protective_coating) {
        $protective_coating_html = '<br/><strong>Protective Coating:</strong> '. get_after_processes_name($protective_coating);
    }
    if ($basic_surface_treatment) {
        $basic_surface_treatment_html = '<br/><strong>Basic Surface Treatment:</strong> '. get_after_processes_name($basic_surface_treatment);
    }
    if ($advanced_surface_treatment) {
        $advanced_surface_treatment_html = '<br/><strong>Advanced Surface Treatment:</strong> '. get_after_processes_name($advanced_surface_treatment);
    }
    if ($color_surface_treatment) {
        $color_surface_treatment_html = '<br/><strong>Color Surface Treatment:</strong> '. get_after_processes_name($color_surface_treatment);
    }

    $html = $manufacture_html.$file_unit_html.$color_html.$surface_treatment_html.$finishing_coating_html.$logo_finishing_html.$protective_coating_html.$basic_surface_treatment_html.$advanced_surface_treatment_html.$color_surface_treatment_html.$link_file_html;
    echo $html;
}
/*修改后台woocommerce的order end*/

/*cnc 注塑后处理的工序价格*/
function after_processes_cost(){
    return $processes_cost_map = array(
        0 => [
            'name'=>'None',
            'cost'=>0
        ],
        1 => [
            'name'=>'Basic deburred(default)',
            'cost'=>0
        ],
        2 => [
            'name'=>'Rough Sanded(with sanding mark on surfaces)',
            'cost'=>7.692307692
        ],
        3 => [
            'name'=>'Fine Sanded(Matte, almost no sanding marks visible)',
            'cost'=>15.38461538
        ],
        4 => [
            'name'=>'Fine Sanded & Sand blasted(fine ,matte surface)',
            'cost'=>23.07692308
        ],
        5 => [
            'name'=>'Fine Sanded, Sand blasted & Polished(Glossy)',
            'cost'=>30.76923077
        ],
        6 => [
            'name'=>'Brushing(with parallel marks on surfaces)',
            'cost'=>15.38461538
        ],
        7 => [
            'name'=>'Regular Painting, Matte',
            'cost'=>7.692307692
        ],
        8 => [
            'name'=>'Regular Painting, Glossy',
            'cost'=>38.46153846
        ],
        9 => [
            'name'=>'Metalic Paiting, Glossy',
            'cost'=>15.38461538
        ],
        10 => [
            'name'=>'Pearly Paiting, Glossy',
            'cost'=>23.07692308
        ],
        11 => [
            'name'=>'Gradient colors painting',
            'cost'=>30.76923077
        ],
        12 => [
            'name'=>'Electroplating',
            'cost'=>15.38461538
        ],
        13 => [
            'name'=>'Vacuum coating, Glossy',
            'cost'=>23.07692308
        ],
        14 => [
            'name'=>'Powder Coating',
            'cost'=>15.38461538
        ],
        15 => [
            'name'=>'Water Transfer Coating',
            'cost'=>46.15384615
        ],
        16 => [
            'name'=>'Rubber Painting',
            'cost'=>23.07692308
        ],
        17 => [
            'name'=>'Texture Painting',
            'cost'=>38.46153846
        ],
        18 => [
            'name'=>'Regular Anodizing',
            'cost'=>7.692307692
        ],
        19 => [
            'name'=>'Hardening Anodizing',
            'cost'=>18.46153846
        ],
        20 => [
            'name'=>'Conductive Anodizing',
            'cost'=>7.692307692
        ],
        21 => [
            'name'=>'Silkscreen Printing',
            'cost'=>36.92307692
        ],
        22 => [
            'name'=>'Pad Printing',
            'cost'=>40
        ],
        23 => [
            'name'=>'Laser etching',
            'cost'=>7.692307692
        ],
        24 => [
            'name'=>'Chemical Etching',
            'cost'=>15.38461538
        ],
        25 => [
            'name'=>'UV coating(Glossy)',
            'cost'=>18.46153846
        ],
        26 => [
            'name'=>'Natural',
            'cost'=>0
        ],
        27 => [
            'name'=>'White',
            'cost'=>0
        ],
        28 => [
            'name'=>'Black',
            'cost'=>0
        ],
        29 => [
            'name'=>'Clear',
            'cost'=>0
        ],
        30 => [
            'name'=>'Others',
            'cost'=>23.07692308
        ],
    );
}

/*获取cnc 注塑后处理的工序名称*/
function get_after_processes_name($order){
    $processes_cost_map = after_processes_cost();
    if ($processes_cost_map[$order]) {
        $name = $processes_cost_map[$order]['name'];
        return $name;
    } else {
        return false;
    }
}

/*获取cnc 注塑后处理的工序价格*/
function get_after_processes_cost($order){
    $processes_cost_map = after_processes_cost();
    if ($processes_cost_map[$order]) {
        $cost = $processes_cost_map[$order]['cost'];
        return $cost;
    } else {
        return false;
    }
}

/*ajax 获取后处理的价格表*/
function get_finishing_cost(){
    $processes_cost_map = after_processes_cost();
    echo json_encode($processes_cost_map);
    exit;
}
add_action('wp_ajax_get_finishing_cost', 'get_finishing_cost');
add_action('wp_ajax_nopriv_get_finishing_cost', 'get_finishing_cost');

/* AJAX - Add new CNC Produt  创建CNC新产品*/
function ajax_create_cnc_product()
{
    global $woocommerce, $wpdb;
    wc_clear_notices();
    @set_time_limit(300);
    $result           = array(
        'products' => array(),
        'products_add_to_cart' => array(),
        'error' => ''
    );

    $upload_dir       = wp_upload_dir();
    $uploads_dir_temp = $upload_dir['basedir'] . '/' . uploads_dir_name();
    if (!empty($_POST['files'])) {
        $cart_id       = WC()->cart->generate_cart_id(233);
        $cart_item_key = WC()->cart->find_product_in_cart($cart_id);
        if ($cart_item_key){
            wc_get_cart_remove_url($cart_item_key);
        }
        foreach ($_POST['files'] as $key => $file) {
            $volume = $file['volume'];
            $surface_area = $file['surface_area'];
            $sku =$file['sku'];
            $col =$file['col'];
            //$stl_unit = $file['stl_unit'];
            $box_volume = $file['box_volume'];
            $curved_surface = $file['curved_surface'];
            $one_price = $file['one_price'];
            $file_unit = $file['file_unit'];
            $len = $file['len'];
            $width = $file['width'];
            $thickness = $file['thickness'];
            if ($file_unit == "inch") {
                // inch change to mm
                $volume = 25.4 * 25.4 * 25.4 * floatval($volume);
                $surface_area = 25.4 * floatval($surface_area);
                $box_volume = 25.4 * 25.4 * 25.4 * floatval($box_volume);
                $len = 25.4 * floatval($len);
                $width = 25.4 * floatval($width);
                $thickness = 25.4 * floatval($thickness);
            }
            $price = $file['price'];
            if (file_exists("$uploads_dir_temp/" . $file['file_name'])) {
                $args_product = array(
                    'post_type' => 'product',
                    'post_status' => 'publish',
                    'post_title' => wp_strip_all_tags($file['file_name'] . ' | ' . get_post_field('post_title', $file['material_id']) )
                );
                //echo "<br/>PostID -- ".
                $post_id      = wp_insert_post($args_product);
                /**/
                $my_post      = array(
                    'post_title' => 'Variation #' . $i . ' of ' . esc_attr(strip_tags($_POST['postTitle'])),
                    'post_name' => 'product-' . $post_id . '-variation-' . $i,
                    'post_status' => 'publish',
                    'post_parent' => $post_id,
                    'post_type' => 'product_variation',
                    'guid' => home_url() . '/?product_variation=product-' . $post_id . '-variation-' . $i
                );
                // Insert the post into the database
                wp_insert_post($my_post);
                $variable_id    = $post_id + 1;
                $variable_two   = $variable_id + 1;
                $variable_three = $variable_two + 1;
                update_post_meta($variable_id, 'attribute_pa_resolution', 'high-resolution');
                update_post_meta($variable_id, '_price', 8.50);
                update_post_meta($variable_id, '_regular_price', '8.50');
                update_post_meta($variable_two, 'attribute_pa_resolution', 'medium-resolution');
                update_post_meta($variable_two, '_price', 5.50);
                update_post_meta($variable_two, '_regular_price', '5.50');
                update_post_meta($variable_three, 'attribute_pa_resolution', 'low-resolution');
                update_post_meta($variable_three, '_price', 3.50);
                update_post_meta($variable_three, '_regular_price', '3.50');
                if ($post_id) {
                    $density = $file['density'];
                    $quantity = $file['quantity'];
                    $price_unit = round($file['price']/$quantity,2);
                    //echo $price_product;

                    // New Values for cart page
                    $leadtime_checked = $file['leadtime_checked'];
                    $leadtime = $file['leadtime'];
                    //$calculated_weight = $session_files[$session_key][2] * $density * $_POST['files'][$key]['quantity'];
                    $calculated_weight = $volume * $density * $quantity;
                    $calculated_weight = $calculated_weight / 1000;
                    $calculated_weight = number_format((float) $calculated_weight, 2, '.', '');

                    $weight = $calculated_weight;
                    update_post_meta($post_id, 'leadtime_selected', $leadtime_checked);
                    update_post_meta($post_id, 'leadtime', $leadtime);
                    // New Values for cart page

                    update_post_meta($post_id, '_visibility', 'visible');
                    update_post_meta($post_id, '_stock_status', 'instock');
                    update_post_meta($post_id, 'total_sales', '0');
                    update_post_meta($post_id, '_downloadable', 'no');
                    update_post_meta($post_id, '_virtual', 'no');
                    update_post_meta($post_id, 'one_price', $one_price);
                    update_post_meta($post_id, '_regular_price', $price_unit);
                    update_post_meta($post_id, '_price', $price_unit);
                    update_post_meta($post_id, '_featured', 'no');
                    //update_post_meta( $post_id, '_product_version', '2.6.14' );
                    //update_post_meta( $post_id, '_manage_stock',    'no' );
                    //update_post_meta( $post_id, '_backorders',      'no' );
                    $estimated_delivery = intval($leadtime_checked);
                    $date_delivery      = current_time('timestamp') + $estimated_delivery * 3600;
                    update_post_meta($post_id, 'volume', $volume);
                    update_post_meta($post_id, 'surface_area', $surface_area);
                    update_post_meta($post_id, 'box_volume', $box_volume);
                    update_post_meta($post_id, 'weight', $weight);
                    update_post_meta($post_id, 'density', $density);
                    update_post_meta($post_id, 'len', $len);
                    update_post_meta($post_id, 'width', $width);
                    update_post_meta($post_id, 'thickness', $thickness);
                    update_post_meta($post_id, 'material_id', $file['material_id']);
                    update_post_meta($post_id, 'file_unit', $file_unit);
                    update_post_meta($post_id, 'file', $upload_dir['baseurl'] . '/' . uploads_dir_name() . '/' . $file['file_name']);
                    update_post_meta($post_id, 'estimated_delivery', $estimated_delivery);
                    update_post_meta($post_id, 'timestamp_delivery', $date_delivery);
                    update_post_meta($post_id, 'surface_treatment', $file['surface_treatment']);
                    update_post_meta($post_id, 'finishing_coating', $file['finishing_coating']);
                    update_post_meta($post_id, 'logo_finishing', $file['logo_finishing']);
                    update_post_meta($post_id, 'protective_coating', $file['protective_coating']);
                    update_post_meta($post_id, 'basic_surface_treatment', $file['basic_surface_treatment']);
                    update_post_meta($post_id, 'advanced_surface_treatment', $file['advanced_surface_treatment']);
                    update_post_meta($post_id, 'color_surface_treatment', $file['color_surface_treatment']);
                    $manufacture = "CNC Machining";
                    update_post_meta($post_id, 'manufacture', $manufacture);
                    update_post_meta($post_id, 'sku', $sku);
                    update_post_meta($post_id, 'col', $col);
                    
                    WC()->cart->add_to_cart($post_id, (int) $quantity);
                    

                    $result['products'][]=['id'=>$post_id,'sku'=>$sku];
                    //$result['products_add_to_cart'][] = array( $post_id, (int)$file['quantity'] );
                } else {
                    $result['error'] = __('Error. Failed create item.', '3dprinting');
                }
            } else {
                $result['error'] = __('Error. File not found in dir.', '3dprinting');
            }
        }
        update_cart_price($_POST['files'][0]['material_id']);

        //更新头部的购物车信息，具体参考 class-wc-ajax.php的public static function get_refreshed_fragments()
        ob_start();
        woocommerce_mini_cart();
        $mini_cart = ob_get_clean();
        $data = array(
            'fragments' => apply_filters(
                'woocommerce_add_to_cart_fragments',
                array(
                    'div.widget_shopping_cart_content' => '<div class="widget_shopping_cart_content">' . $mini_cart . '</div>',
                )
            ),
            'cart_hash' => WC()->cart->get_cart_hash(),
        );
        //wp_send_json( $data );
        $result['fragment'] = $data;

        //更新材料选择部分的购物车价格信息
        // $result['table_html_cart'] = '<div class="ast-cart-menu-wrap"><span class="count">' . WC()->cart->get_cart_contents_count() . '</span></div> <span class="ast-woo-header-cart-total">' . WC()->cart->get_cart_subtotal() . '</span>';
        $result['total_price'] = WC()->cart->get_cart_subtotal();
    } else {
        $result['error'] = __('Error. File not found.', '3dprinting');
    }

    echo json_encode($result);
    exit;
}
add_action('wp_ajax_create_cnc_product', 'ajax_create_cnc_product');
add_action('wp_ajax_nopriv_create_cnc_product', 'ajax_create_cnc_product');

/* AJAX - Add new Plastic Injection Molding Produt  创建 Plastic Injection Molding 新产品*/
function ajax_create_plastic_injection_molding_product()
{
    global $woocommerce, $wpdb;
    wc_clear_notices();
    @set_time_limit(300);
    $result           = array(
        'products' => array(),
        'products_add_to_cart' => array(),
        'error' => ''
    );

    $upload_dir       = wp_upload_dir();
    $uploads_dir_temp = $upload_dir['basedir'] . '/' . uploads_dir_name();
    if (!empty($_POST['files'])) {
        $cart_id       = WC()->cart->generate_cart_id(233);
        $cart_item_key = WC()->cart->find_product_in_cart($cart_id);
        if ($cart_item_key){
            wc_get_cart_remove_url($cart_item_key);
        }
        foreach ($_POST['files'] as $key => $file) {
            $volume = $file['volume'];
            $sku =$file['sku'];
            $col =$file['col'];
            $surface_area = $file['surface_area'];
            //$stl_unit = $file['stl_unit'];
            $box_volume = $file['box_volume'];
            $file_unit = $file['file_unit'];
            $len = $file['len'];
            $width = $file['width'];
            $thickness = $file['thickness'];
            if ($file_unit == "inch") {
                // inch change to mm
                $volume = 25.4 * 25.4 * 25.4 * floatval($volume);
                $surface_area = 25.4 * floatval($surface_area);
                $box_volume = 25.4 * 25.4 * 25.4 * floatval($box_volume);
                $len = 25.4 * floatval($len);
                $width = 25.4 * floatval($width);
                $thickness = 25.4 * floatval($thickness);
            }
            if (file_exists("$uploads_dir_temp/" . $file['file_name'])) {
                $quantity = $file['quantity'] ? $file['quantity'] : 0;
                $mould_quantity = $file['mould_quantity'] ? $file['mould_quantity'] : 0;
                $mould_price = $file['mould_price'] ? $file['mould_price'] : 0;
                $part_price = $file['part_price'] ? $file['part_price'] : 0;

                $price_qty_arr = [
                    [$quantity, $part_price, 'Part'],
                    [$mould_quantity, $mould_price, 'Mould']
                ];

                foreach ($price_qty_arr as $price_qty) {
                    $quantity = $price_qty[0];
                    $price = $price_qty[1];
                    if ($quantity < 1 ) {
                        continue;
                    }
                    $args_product = array(
                        'post_type' => 'product',
                        'post_status' => 'publish',
                        'post_title' => wp_strip_all_tags($file['file_name'] . ' | ' . get_post_field('post_title', $file['material_id']) )
                    );
                    //echo "<br/>PostID -- ".
                    $post_id      = wp_insert_post($args_product);
                    /**/
                    $my_post      = array(
                        'post_title' => 'Variation #' . $i . ' of ' . esc_attr(strip_tags($_POST['postTitle'])),
                        'post_name' => 'product-' . $post_id . '-variation-' . $i,
                        'post_status' => 'publish',
                        'post_parent' => $post_id,
                        'post_type' => 'product_variation',
                        'guid' => home_url() . '/?product_variation=product-' . $post_id . '-variation-' . $i
                    );
                    // Insert the post into the database
                    wp_insert_post($my_post);
                    $variable_id    = $post_id + 1;
                    $variable_two   = $variable_id + 1;
                    $variable_three = $variable_two + 1;
                    update_post_meta($variable_id, 'attribute_pa_resolution', 'high-resolution');
                    update_post_meta($variable_id, '_price', 8.50);
                    update_post_meta($variable_id, '_regular_price', '8.50');
                    update_post_meta($variable_two, 'attribute_pa_resolution', 'medium-resolution');
                    update_post_meta($variable_two, '_price', 5.50);
                    update_post_meta($variable_two, '_regular_price', '5.50');
                    update_post_meta($variable_three, 'attribute_pa_resolution', 'low-resolution');
                    update_post_meta($variable_three, '_price', 3.50);
                    update_post_meta($variable_three, '_regular_price', '3.50');
                    if ($post_id) {
                        $density = $file['density'];
                        $price_unit = round($price/$quantity,2);
                        //echo $price_product;

                        // New Values for cart page
                        $leadtime_checked = $file['leadtime_checked'];
                        $leadtime = $file['leadtime'];
                        //$calculated_weight = $session_files[$session_key][2] * $density * $_POST['files'][$key]['quantity'];
                        $calculated_weight = $volume * $density * $quantity;
                        $calculated_weight = $calculated_weight / 1000;
                        $calculated_weight = number_format((float) $calculated_weight, 2, '.', '');

                        $weight = $calculated_weight;
                        if ($price_qty[2] == 'Part') {
                            $leadtime_checked = "5 days";
                        } else{
                            $leadtime_checked = "25 days";
                        }
                        update_post_meta($post_id, 'leadtime_selected', $leadtime_checked);
                        update_post_meta($post_id, 'leadtime', $leadtime);
                        // New Values for cart page

                        update_post_meta($post_id, '_visibility', 'visible');
                        update_post_meta($post_id, '_stock_status', 'instock');
                        update_post_meta($post_id, 'total_sales', '0');
                        update_post_meta($post_id, '_downloadable', 'no');
                        update_post_meta($post_id, '_virtual', 'no');
                        update_post_meta($post_id, '_regular_price', $price_unit);
                        update_post_meta($post_id, '_price', $price_unit);
                        update_post_meta($post_id, '_featured', 'no');
                        //update_post_meta( $post_id, '_product_version', '2.6.14' );
                        //update_post_meta( $post_id, '_manage_stock',    'no' );
                        //update_post_meta( $post_id, '_backorders',      'no' );
                        $estimated_delivery = intval($leadtime_checked);
                        $date_delivery      = current_time('timestamp') + $estimated_delivery * 3600;
                        update_post_meta($post_id, 'volume', $volume);
                        update_post_meta($post_id, 'surface_area', $surface_area);
                        update_post_meta($post_id, 'box_volume', $box_volume);
                        update_post_meta($post_id, 'weight', $weight);
                        update_post_meta($post_id, 'density', $density);
                        update_post_meta($post_id, 'len', $len);
                        update_post_meta($post_id, 'width', $width);
                        update_post_meta($post_id, 'thickness', $thickness);
                        update_post_meta($post_id, 'material_id', $file['material_id']);
                        update_post_meta($post_id, 'file_unit', $file_unit);
                        update_post_meta($post_id, 'file', $upload_dir['baseurl'] . '/' . uploads_dir_name() . '/' . $file['file_name']);
                        update_post_meta($post_id, 'estimated_delivery', $estimated_delivery);
                        update_post_meta($post_id, 'timestamp_delivery', $date_delivery);
                        if ($price_qty[2] == 'Part') {
                            update_post_meta($post_id, 'surface_treatment', $file['surface_treatment']);
                            update_post_meta($post_id, 'finishing_coating', $file['finishing_coating']);
                            update_post_meta($post_id, 'logo_finishing', $file['logo_finishing']);
                            update_post_meta($post_id, 'protective_coating', $file['protective_coating']);
                        }
                        $manufacture = "Plastic Injection Molding " . $price_qty[2];
                        update_post_meta($post_id, 'manufacture', $manufacture);
                        update_post_meta($post_id, 'sku', $sku);
                        update_post_meta($post_id, 'col', $col);

                        WC()->cart->add_to_cart($post_id, (int) $quantity);
                        

                        $result['products'][]=['id'=>$post_id,'sku'=>$sku];
                        //$result['products_add_to_cart'][] = array( $post_id, (int)$file['quantity'] );
                    } else {
                        $result['error'] = __('Error. Failed create item.', '3dprinting');
                    }
                }
            } else {
                $result['error'] = __('Error. File not found in dir.', '3dprinting');
            }
        }
        update_cart_price($_POST['files'][0]['material_id']);

        //更新头部的购物车信息，具体参考 class-wc-ajax.php的public static function get_refreshed_fragments()
        ob_start();
        woocommerce_mini_cart();
        $mini_cart = ob_get_clean();
        $data = array(
            'fragments' => apply_filters(
                'woocommerce_add_to_cart_fragments',
                array(
                    'div.widget_shopping_cart_content' => '<div class="widget_shopping_cart_content">' . $mini_cart . '</div>',
                )
            ),
            'cart_hash' => WC()->cart->get_cart_hash(),
        );
        //wp_send_json( $data );
        $result['fragment'] = $data;

        //更新材料选择部分的购物车价格信息
        // $result['table_html_cart'] = '<div class="ast-cart-menu-wrap"><span class="count">' . WC()->cart->get_cart_contents_count() . '</span></div> <span class="ast-woo-header-cart-total">' . WC()->cart->get_cart_subtotal() . '</span>';
        $result['total_price'] = WC()->cart->get_cart_subtotal();
    } else {
        $result['error'] = __('Error. File not found.', '3dprinting');
    }

    echo json_encode($result);
    exit;
}
add_action('wp_ajax_create_plastic_injection_molding_product', 'ajax_create_plastic_injection_molding_product');
add_action('wp_ajax_nopriv_create_plastic_injection_molding_product', 'ajax_create_plastic_injection_molding_product');



// 计算后处理价格
function calculate_finishing_price_with_formula($args){
    $quantity = $args['quantity']?floatval($args['quantity']):1;
    $surface_treatment = $args['surface_treatment'];
    $finishing_coating = $args['finishing_coating'];
    $logo_finishing = $args['logo_finishing'];
    $protective_coating = $args['protective_coating'];

    $finishing_cost = after_processes_cost();
    $surface_treatment_cost = $finishing_cost[$surface_treatment]['cost'];
    $finishing_coating_cost = $finishing_cost[$finishing_coating]['cost'];
    $logo_finishing_cost = $finishing_cost[$logo_finishing]['cost'];
    $protective_coating_cost = $finishing_cost[$protective_coating]['cost'];

    if ($quantity > 99) {
        $quantity = 99;
    }

    $cost = ($surface_treatment_cost+$finishing_coating_cost+$logo_finishing_cost+$protective_coating_cost)*(1-($quantity-1)/100*0.4);
    return $cost;
}



// 计算注塑零件的价格
function calculate_plastic_injection_part_price_with_formula($args){
    $plastic_injection_quantity = $args['quantity']?floatval($args['quantity']):2000;
    $len = floatval($args['len']);
    $width = floatval($args['width']);
    $thickness = floatval($args['thickness']);

    $coefficient_1 = floatval($args['coefficient_1']);
    $coefficient_2 = floatval($args['coefficient_2']);
    $coefficient_3 = floatval($args['coefficient_3']);
    $coefficient_4 = floatval($args['coefficient_4']);

    $part_unit_price = $len*$width*$thickness/$coefficient_1*$coefficient_2*$coefficient_3/$coefficient_4;
    if($plastic_injection_quantity >=1 && $plastic_injection_quantity <= 1000) {
        $part_unit_price = $part_unit_price * ($plastic_injection_quantity/1000) ** (-1/4);
    }
    if($plastic_injection_quantity > 1000 && $plastic_injection_quantity <= 2000) {
        $part_unit_price = $part_unit_price * ($plastic_injection_quantity/1000) ** (-1/12);
    }
    if($plastic_injection_quantity > 2000) {
        $part_unit_price = $part_unit_price * (2000/1000) ** (-1/12);
    }
    $plastic_injection_part_price = $part_unit_price * $plastic_injection_quantity;
    // 最低价为80美金
    if ($plastic_injection_quantity > 0 && $plastic_injection_part_price < 80) {
        $plastic_injection_part_price = 80;
    }

    return $plastic_injection_part_price;
}
// 计算注塑模具的价格
function calculate_plastic_injection_mould_price_with_formula($args){
    $mould_quantity = $args['mould_quantity']?floatval($args['mould_quantity']):1;
    $len = floatval($args['len']);
    $width = floatval($args['width']);
    $thickness = floatval($args['thickness']);
    $D = 7.85;
    $P = 12;
    $I = 9;
    $E = 6.6;
    if ($len<$width) {
        $tem = $len;
        $len = $width;
        $width = $tem;
    }
    if ($width < $thickness) {
        $tem = $width;
        $width = $thickness;
        $thickness = $tem;
    }
    $mould_unit_cost = ($len+300)*($width+300)*($thickness+300)/1000000*$D*$P*$I/$E;
    $mould_cost = $mould_unit_cost*$mould_quantity;
    return $mould_cost;
}
// 计算注塑的基础价格
function calculate_plastic_injection_price_with_formula($args){
    $plastic_injection_price = calculate_plastic_injection_mould_price_with_formula($args);
    $mould_cost = calculate_plastic_injection_part_price_with_formula($args);
    $basic_price = $plastic_injection_price + $mould_cost;
    return $basic_price;
}

// 计算注塑零件后处理的价格
function calculate_plastic_injection_part_finishing_price_with_formula($args){
    // 基本价格
    $part_price = calculate_plastic_injection_part_price_with_formula($args);
    // 后处理价格
    $finishing_price = calculate_finishing_price_with_formula($args);
    // 总价格
    $cost = $finishing_price + $part_price;
    return $cost;
}

// 计算注塑后处理的总价格
function calculate_plastic_injection_finishing_price_with_formula($args){
    // 基本价格
    $basic_price = calculate_plastic_injection_price_with_formula($args);
    // 后处理价格
    $finishing_price = calculate_finishing_price_with_formula($args);
    // 总价格
    $cost = $finishing_price + $basic_price;
    return $cost;
}


// 根据内容判断垃圾邮件，阻止邮件发送。
add_filter('wpforms_email_message', 'judge_email_message');
function judge_email_message($message){
    $find = "Talk With Web Visitor";
    $pos = stripos($message, $find);
    if ($pos != FALSE) {
        return;
    } else {
        return $message;
    }
}

// 异步发邮件提示价格异常
function mail_about_abnormal_price (){
    $filename = $_POST['filename'];
    $file_unit = $_POST['file_unit'];
    $material_id = $_POST['material_id'];
    $quantity = $_POST['quantity'];
    $price = $_POST['price'];
    $manual = $_POST['manual'];
    $user_email = $_POST['email'];
    $message = $_POST['message'];

    $material = get_post_field('post_title', $material_id);

    $to = 'kevin@lava.limited';
    // $to = 'eason@lava.limited';

    $headers = 'From: Lava <myname@mydomain.com>' . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    $subject = $manual.' Price Exception Prompt';
    $upload_dir       = wp_upload_dir();

    $mail_attachment = $upload_dir['baseurl'] . '/' . uploads_dir_name() . '/' . $filename;
    $msg = '<div style="min-height: 500px; width: 90%; padding: 10px;">
        <h1>'.$manual.' Price Exception Prompt</h1>
        <p>User Email: '.$user_email.'</p>
        <p>User Message: '.$message.'</p>
        <p>manufacture: '.$manual.'</p>
        <p>File: '.$filename.'</p>
        <p>Material: '.$material.'</p>
        <p>Quantity: '.$quantity.'</p>
        <p>Price: '.$price.'</p>
        <p>File unit: '.$file_unit.'</p>
        <p>To get the file Please see the attachment below.<br/><a href="' . $mail_attachment . '">Click here to download file</a></p>
        </div>';

    $res = wp_mail($to, $subject, $msg, $headers, $mail_attachment);
    if ($res) {
        $result = 1;
    } else {
        $result = 0;
    }
    echo $result;
    exit;
}
add_action('wp_ajax_mail_about_abnormal_price', 'mail_about_abnormal_price');
add_action('wp_ajax_nopriv_mail_about_abnormal_price', 'mail_about_abnormal_price');

/*ajax 获取后处理的价格表*/

//限制admin登录
function my_login_error_message( $errors, $username, $password ) {
    $user = get_user_by( 'login', $username );
    if ( $user && in_array( 'administrator', (array) $user->roles ) ) {
        $errors->add( 'admin_login_error', '管理员不允许在此处登录。' );
    }

    return $errors;
}
add_filter( 'woocommerce_process_login_errors', 'my_login_error_message', 10, 3 );

 require __DIR__ . '/template-part/subfun.php';