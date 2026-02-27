<?php


// 取回购物车数据
function my_mini_cart(){
 
    global $woocommerce;
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
        'total_price' =>WC()->cart->get_cart_subtotal(),
    );

    echo json_encode($data);

    exit();  
		
}

add_action('wp_ajax_my_mini_cart', 'my_mini_cart');
add_action('wp_ajax_nopriv_my_mini_cart', 'my_mini_cart');

// cnc移除购物车价格和数量
function cnc_Reduce_product_cart(){

    global $woocommerce, $wpdb;
    wc_clear_notices();
    @set_time_limit(300);
    $result           = array(
        'products' => array(),
        'products_add_to_cart' => array(),
        'error' => ''
    );

    $total_price = 0;

    $sku =$_POST['products'];

    //print_r($sku);
   


    if ( !WC()->cart->is_empty() ):
        if(is_array($sku)){
          foreach($sku as $key=>$v){
            console.log($sku);
            remove_product($v);
            
          }
        }else{
            remove_product($sku);
        }
    
    endif;

    $nums = WC()->cart->get_cart_contents_count();

    if($nums !==0){
        if(is_array($sku)){
            foreach($sku as $key=>$v){
              console.log($sku);
              remove_product($v);
              
            }
          }else{
              remove_product($sku);
          }
    }


    WC()->cart->calculate_totals();

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
     $result['total_price'] = WC()->cart->get_cart_subtotal();
     $tmp= return_cart();
     // print_r($tmp);
     $result['end']=$tmp;
     $result['number']=$nums;
     echo json_encode($result);
    
    exit;

}

add_action('wp_ajax_cnc_Reduce_product_cart', 'cnc_Reduce_product_cart');
add_action('wp_ajax_nopriv_cnc_Reduce_product_cart', 'cnc_Reduce_product_cart');


// pi 移除购物车价格和数量
function pi_Reduce_product_cart(){

    global $woocommerce, $wpdb;
    wc_clear_notices();
    @set_time_limit(300);
    $result           = array(
        'products' => array(),
        'products_add_to_cart' => array(),
        'error' => ''
    );

    $total_price = 0;

    $sku =$_POST['products'];

    //print_r($sku);
   


    if ( !WC()->cart->is_empty() ):
        if(is_array($sku)){
          foreach($sku as $key=>$v){
            console.log($sku);
            remove_product($v);
            
          }
        }else{
            remove_product($sku);
        }
    
    endif;

    $nums = WC()->cart->get_cart_contents_count();

    if($nums !==0){
        if(is_array($sku)){
            foreach($sku as $key=>$v){
              console.log($sku);
              remove_product($v);
              
            }
          }else{
              remove_product($sku);
          }
    }


    WC()->cart->calculate_totals();

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
     $result['total_price'] = WC()->cart->get_cart_subtotal();
     $tmp= return_cart();
     // print_r($tmp);
     $result['end']=$tmp;
     $result['number']=$nums;
     echo json_encode($result);
    
    exit;

}

add_action('wp_ajax_pi_Reduce_product_cart', 'pi_Reduce_product_cart');
add_action('wp_ajax_nopriv_pi_Reduce_product_cart', 'pi_Reduce_product_cart');
// ma 移除购物车价格和数量
function Reduce_product_cart(){

    global $woocommerce, $wpdb;
    wc_clear_notices();
    @set_time_limit(300);
    $result           = array(
        'products' => array(),
        'products_add_to_cart' => array(),
        'error' => ''
    );

    $total_price = 0;

    $sku =$_POST['products'];

    //print_r($sku);
   


    if ( !WC()->cart->is_empty() ):
        if(is_array($sku)){
          foreach($sku as $key=>$v){
            console.log($sku);
            remove_product($v);
            
          }
        }else{
            remove_product($sku);
        }
    
    endif;

    $nums = WC()->cart->get_cart_contents_count();


    WC()->cart->calculate_totals();

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
     $result['total_price'] = WC()->cart->get_cart_subtotal();
     $tmp= return_cart();
     // print_r($tmp);
     $result['end']=$tmp;
     $result['number']=$nums;
     echo json_encode($result);
    
    exit;

}
add_action('wp_ajax_Reduce_product_cart', 'Reduce_product_cart');
add_action('wp_ajax_nopriv_Reduce_product_cart', 'Reduce_product_cart');

function remove_product($v){
    foreach ( WC()->cart->get_cart() as $item_key => $item ) {
        $product_id = apply_filters( 'woocommerce_cart_item_product_id', $item['product_id'], $item, $item_key );
        $material_id = get_post_meta( $product_id, 'material_id', 1 );
        $sku  = get_post_meta( $product_id, 'sku', 1 );
        //print_r($item['key']);
        //echo $sku.'</br>';
        //echo $v.'</br>';
        if($sku ==$v){
        WC()->cart->remove_cart_item( $item['key']); // we remove it
        break;
        }
    }
}

function return_cart(){

    $cart_array = [];

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
        
        $cart_item_id = $cart_item['data']->id;
        //,$count_price,$material_id
        array_push($cart_array,[$cart_item['data']->id]);
      
    }

    return $cart_array;
}

function add_to_cart(){
    return WC()->cart->add_to_cart(
        $_POST['product_id'], 
        $_POST['quantity'],
        $_POST['variation_id'],
        null, 
        null);
}

function remove_from_cart(){
    if(empty($_POST['cart_item_key'])){
        return 'Please specify cart_item_key';
    }
    WC()->cart->remove_cart_item($_POST['cart_item_key']);
    return 'Product removed from cart!';
}

function my_empty_cart(){
    global $woocommerce;
     ob_start();
     
     foreach ( WC()->cart->get_cart() as $item_key => $item ) {
            WC()->cart->remove_cart_item( $item['key']);
    }
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
     $result['total_price'] = WC()->cart->get_cart_subtotal();
     $result['code']=200;
     $result['msg']='已清空购物车';
     echo json_encode($result);
     exit;

}

add_action('wp_ajax_my_empty_cart', 'my_empty_cart');
add_action('wp_ajax_nopriv_my_empty_cart', 'my_empty_cart');



// 1列的材料
// @params  string POST materials, string,

function get_total_ma_material()
{
    $Object = get_posts(array(
        'post_type' => 'materials',
        'posts_per_page' => -1,
        'orderby' => 'menu_order,post_date',
        'order' => 'ASC',
        'meta_key' => 'show_on_shopping_page',
        'meta_value' => 1
    ));

    $list = object_array($Object);
    foreach ($list as $k1 => $v1) {
        unset($list[$k1]['post_content']);
    }

    $data = [];
    foreach ($list as $index => $item) {
        $data[$index]['type'] = get_field('public_type', $item['ID']);
        $data[$index]['post_title'] = $item['post_title'];
        $data[$index]['post_name'] = $item['post_name'];
        $data[$index]['ID'] = $item['ID'];
    }


    $Plastic = array_filter($data, function ($var) {
        return ($var['type'] == 'Plastic');
    });

    $Metal = array_filter($data, function ($var) {
        return ($var['type'] == 'Metal');
    });

    $Resin = array_filter($data, function ($var) {
        return ($var['type'] == 'Resin');
    });


    $result = [
        ['total' => count($Plastic), 'Plastic' => $Plastic],
        ['total' => count($Metal), 'Metal' => $Metal],
        ['total' => count($Resin), 'Resin' => $Resin],
    ];


    echo json_encode($result);

    exit;

}
add_action('wp_ajax_get_total_ma_material', 'get_total_ma_material');
add_action('wp_ajax_nopriv_get_total_ma_material', 'get_total_ma_material');


// 2列的材料
// @params  string POST cnc-machined  string,
function  get_total_cn_material(){

    $Object = get_posts(array(
        'post_type'      => 'cnc-machined',
        'posts_per_page' => -1,
        'orderby'        => 'menu_order,post_date',
        'order'          => 'ASC',
      ));
      
       $list=object_array($Object);
       foreach ($list as $k1 => $v1){
       unset($list[$k1]['post_content']);
       }

       $data =[];
       foreach ($list as $index => $item){
       $data[$index]['type'] = get_field('public_type',$list[$index]['ID']);
       $data[$index]['post_title']=$item['post_title'];
       $data[$index]['post_name']=$item['post_name'];
       $data[$index]['ID'] =$item['ID'];
       }
       
       
    $Plastic =array_filter($data,function($var){
           return  ($var['type'] == 'Plastic');
    });
    
    $Metal =array_filter($data,function($var){
           return  ($var['type'] == 'Metal');
    });
    
    
    $Wood =array_filter($data,function($var){
           return  ($var['type'] == 'Wood');
    });
    
    
    $Stone =array_filter($data,function($var){
           return  ($var['type'] == 'Stone');
    });
    

    $Resin =array_filter($data,function($var){
        return  ($var['type'] == 'Resin');
   });
    
    
    
    $result=[
        ['total'=>count($Plastic),'Plastic'=>$Plastic],
        ['total'=>count($Metal),'Metal'=>$Metal],
        ['total'=>count($Resin),'Resin'=>$Resin],
        ['total'=>count($Wood),'Wood'=>$Wood],
        ['total'=>count($Stone),'Stone'=>$Stone],
        ];
      
    
      echo json_encode($result);
      
      exit;

}





add_action('wp_ajax_get_total_cn_material', 'get_total_cn_material');
add_action('wp_ajax_nopriv_get_total_cn_material', 'get_total_cn_material');


// @params  string POST public_type 
function get_one_type(){
    
    $ptype = $_POST['material_type'];//类型
        $Object = get_posts(array(
        'post_type'      => 'materials',
        'posts_per_page' => -1,
        'orderby'        => 'menu_order,post_date',
        'order'          => 'ASC',
        // 'meta_key'       => 'show_on_shopping_page',
        // 'meta_value'     =>  1
        ));
       
        $list=object_array($Object);
        foreach ($list as $k1 => $v1){
            unset($list[$k1]['post_content']);
       }
       //print_r($list);
       $data =[];
       foreach ($list as $index => $item){
       $data[$index]['type'] = get_field('public_type',$list[$index]['ID']);
       $data[$index]['post_title']=$item['post_title'];
       $data[$index]['post_name']=$item['post_name'];
       $data[$index]['ID'] =$item['ID'];
       }
       
       $data2  = array_filter($data,function($var)use($ptype) {
           return  $var['type'] == $ptype;
       });
   
       //print_r($data2);
   
       $result=['code'=>200,'total'=>count($data2),'data'=>$data2];

       echo json_encode($result);
       exit;
   
}

// @params  string POST public_type 
function get_two_type(){

        $ptype = $_POST['material_type'];//类型

        $Object = get_posts(array(
        'post_type'      => 'cnc-machined',
        'posts_per_page' => -1,
        'orderby'        => 'menu_order,post_date',
        'order'          => 'ASC',
        ));

        $list=object_array($Object);
        foreach ($list as $k1 => $v1){
            unset($list[$k1]['post_content']);
       }
       //print_r($list);

       $data =[];
       foreach ($list as $index => $item){
       $data[$index]['type'] = get_field('public_type',$list[$index]['ID']);
       $data[$index]['post_title']=$item['post_title'];
       $data[$index]['post_name']=$item['post_name'];
       $data[$index]['ID'] =$item['ID'];
       }
       
       $data2  = array_filter($data,function($var)use($ptype) {
           return  $var['type'] == $ptype;
       });
   
       //print_r($data2);
   
       $result=['code'=>200,'total'=>count($data2),'data'=>$data2];

       echo json_encode($result);
       exit;
   
}


add_action('wp_ajax_get_one_type', 'get_one_type');
add_action('wp_ajax_nopriv_get_one_type', 'get_one_type');

add_action('wp_ajax_get_two_type', 'get_two_type');
add_action('wp_ajax_nopriv_get_two_type', 'get_two_type');

/* materials */
add_filter('manage_materials_posts_columns',     'public_edit_materials_columns');
function public_edit_materials_columns( $columns ) {

    unset( $columns['author'] );
    $columns['ptype'] = 'public_type';
    $columns['pzoom'] = 'public_zoom';
    return $columns;
}


add_action('manage_materials_posts_custom_column',   'public_columns_materials');
function public_columns_materials( $column ) {
    global $post;
    switch($column)
    {    
        case  'ptype':
            echo get_field('public_type',$post->ID); 
        break; 
        case  'pzoom':
            echo get_field('public_zoom',$post->ID );       
        break; 
    }
}

/* cnc_machined */
add_filter('manage_cnc-machined_posts_columns',     'public_edit_cnc_machined_columns');
function public_edit_cnc_machined_columns( $columns ) {

    unset( $columns['author'] );
    $columns['ptype'] = 'public_type';
    $columns['pzoom'] = 'public_zoom';
    return $columns;
}


add_action('manage_cnc-machined_posts_custom_column',   'public_columns_cnc_machined');
function public_columns_cnc_machined( $column ) {
    global $post;
    switch($column)
    {    
        case  'ptype':
            echo get_field('public_type',$post->ID); 
        break; 
        case  'pzoom':
            echo get_field('public_zoom',$post->ID );       
        break; 
    }
}

/* plastic_injection */
add_filter('manage_plastic-injection_posts_columns',     'public_edit_plastic_injection_columns');
function public_edit_plastic_injection_columns( $columns ) {

    unset( $columns['author'] );
    $columns['ptype'] = 'public_type';
    $columns['pzoom'] = 'public_zoom';
    return $columns;
}


add_action('manage_plastic-injection_posts_custom_column',   'public_columns_plastic_injection');
function public_columns_plastic_injection( $column ) {
    global $post;
    switch($column)
    {    
        case  'ptype':
            echo get_field('public_type',$post->ID); 
        break; 
        case  'pzoom':
            echo '';       
        break; 
    }
}


add_action('quick_edit_custom_box',  'quick_edit_fields', 10, 2);

function quick_edit_fields( $column_name, $post_type) {
    $html = '';
    global $post;
    //$post_type=="materials" && $post_type=="cnc-machined"  && $post_type=="plastic-injection"
	if($post_type=="materials") {
    if ($column_name == 'public_type'){
		$html .='<fieldset class="inline-edit-col-right">';
        $html .='<div class="inline-edit-col">';
        $html .='<div class="inline-edit-group wp-clearfix">';
        $html .='<label class="alignleft">';
        $html .='<span class="title">pulibc_type</span>';
        $html .='<span class="input-text-wrap"><input type="text" name="public_type" value=""></span>';
        $html .='</label>';
        $html .='</div>';
        $html .='</div>';
		$html .='</fieldset>';
    }
    echo $html;
}
}

//放大缩略图url转换
function return_url($str='',$p='',$material_process){
    
$p1='/wp-content/images/instant-quote/materials/3d-printing/';
$p2='/wp-content/images/instant-quote/materials/cnc/';
$p3='/wp-content/images/instant-quote/materials/modeling/';

$A47="_470x470.";

$full_name=substr($str,strripos($str,"/")+1);//获取文件名
$base =substr($full_name,0,strripos($full_name,"."));//获取基本名
//$end =substr($base,0,strripos($base,"-1"));
$ext="png";
switch($p){
case 'p1':
   $material_process= strtoupper($material_process);//小写转为大写
   $material_process = $material_process.'_';
   $url= $p1.$material_process.$base.$A47.$ext;
  break;
case 'p2':
  if($material_process !=''){
   $material_process= strtoupper($material_process);//小写转为大写
   $material_process = $material_process.'_';
   $url= $p2.$material_process.$base.$A47.$ext;
  }else{
   $url= $p2.$base.$A47.$ext;   
  }
break;

case 'p3':
  if($material_process !=''){
   $material_process= strtoupper($material_process);//小写转为大写
   $material_process = $material_process.'_';
   $url= $p3.$material_process.$base.$A47.$ext;
  }else{
   $url= $p3.$base.$A47.$ext;   
  }
break;
}
return $url;
}
//对象转数组

function url_800($url='',$size='800x800'){
    $A80="_$size.";
    
    $A2 =substr($url,0,strripos($url,"."));
    $A2 =substr($A2,0,strripos($A2,"_"));
    //die($A2);
    $ext=substr($url,strripos($url,".")+1);
    
    $s80=$A2.$A80.$ext;
    //die($s80);
    
    return $s80;
}
function object_array($array){
   if(is_object($array))
   {
    $array = (array)$array;
   }
   if(is_array($array))
   {
    foreach($array as $key=>$value)
    {
     $array[$key] = object_array($value);
    }
   }
   return $array;
}


function wp_font_method() {
    wp_deregister_style( 'Poppins-Regular' );
    wp_register_style( 'Poppins-Regular', '//'.site_url().'/wp-content/uploads/2022/03/Poppins-Regular.ttf');
    wp_enqueue_style( 'Poppins-Regular' );
}
add_action('wp_enqueue_style', 'wp_font_method');

function custom_columns( $columns ) {
    return [
            'featured_image' => 'Image',
            'material_process' => 'Process'
        ] + $columns;
}
add_filter('manage_posts_columns' , 'custom_columns');

function custom_columns_data( $column, $post_id ) {
    switch ( $column ) {
        case 'featured_image':
            the_post_thumbnail( 'thumbnail' );
            break;
    }
}
add_action( 'manage_posts_custom_column' , 'custom_columns_data', 10, 2 );

add_action( 'admin_enqueue_scripts', 'include_upload_script' );
function include_upload_script() {
    if ( ! did_action( 'wp_enqueue_media' ) ) {
        wp_enqueue_media();
    }
}

add_action( 'quick_edit_custom_box',  'featured_image_quick_edit', 10, 2 );
function featured_image_quick_edit( $column_name, $post_type ) {

    // add it only if we have featured image column
    if( 'featured_image' !== $column_name ){
        return;
    }
    ?>
    <fieldset id="misha_featured_image" class="inline-edit-col-left">
        <div class="inline-edit-col">
            <span class="title">Featured Image</span>
            <div>
                <a href="#" class="button rudr-upload-img">Set featured image</a>
                <input type="hidden" name="_thumbnail_id" value="" />
            </div>
            <a href="#" class="rudr-remove-img">Remove Featured Image</a>
        </div>
    </fieldset>
    <?php
}

add_action( 'admin_footer', 'featured_image_quick_edit_script' );

function featured_image_quick_edit_script(){
    ?>
    <script>
        jQuery(function($){

            // add image
            $('body').on( 'click', '.rudr-upload-img', function( event ) {
                event.preventDefault();

                const button = $(this);
                const customUploader = wp.media({
                    title: 'Set featured image',
                    library : { type : 'image' },
                    button: { text: 'Set featured image' },
                }).on( 'select', () => {
                    const attachment = customUploader.state().get('selection').first().toJSON();
                    button.removeClass('button').html( '<img src="' + attachment.url + '" />').next().val(attachment.id).parent().next().show();
                }).open();

            });

            // remove image

            $('body').on('click', '.rudr-remove-img', function( event ) {
                event.preventDefault();
                $(this).hide().prev().find( '[name="_thumbnail_id"]').val('-1').prev().html('Set featured Image').addClass('button' );
            });

            const $wp_inline_edit = inlineEditPost.edit;

            inlineEditPost.edit = function( id ) {
                $wp_inline_edit.apply( this, arguments );
                let postId = 0;
                if( typeof( id ) == 'object' ) {
                    postId = parseInt( this.getId( id ) );
                }

                if ( postId > 0 ) {
                    const editRow = $( '#edit-' + postId )
                    const postRow = $( '#post-' + postId )
                    const featuredImage = $( '.column-featured_image', postRow ).html()
                    const featuredImageId = $( '.column-featured_image', postRow ).find('img').data('id')

                    if( featuredImageId != -1 ) {

                        $( ':input[name="_thumbnail_id"]', editRow ).val( featuredImageId ); // ID
                        $( '.rudr-upload-img', editRow ).html( featuredImage ).removeClass( 'button' ); // image HTML
                        $( '.rudr-remove-img', editRow ).show(); // the remove link

                    }
                }
            }
        });
    </script>
<?php
}
?>
