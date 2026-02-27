<?php 
/* 
 * Template Name: 3D Printing Upload Xia
 * * Template Post Type: post, page
 */
get_header();


// $command = "/usr/bin/python /var/www/html/wp-content/themes/astra-child/test.py 2>&1";
// exec($command, $output);
// var_dump($output);

global $woocommerce;
//$woocommerce->cart->empty_cart();
?>
<script>
    let static_img = "<?php echo get_stylesheet_directory_uri(); ?>";
    less = {
        useFileCache: false
    }
</script>

<link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_directory_uri(); ?>/css/3dprinting.css?v=<?php echo $ts;?>">
<link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_directory_uri(); ?>/css/3dprinting-xia.css?v=<?php echo $ts;?>">
<link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_directory_uri(); ?>/css/3dpath.css?v=<?php echo $ts;?>">

<script src= "<?php echo get_stylesheet_directory_uri(); ?>/js/my3d.js?v=<?php echo $ts;?>"> </script>
<script src= "<?php echo get_stylesheet_directory_uri(); ?>/js/function.js?v=<?php echo $ts;?>"> </script>
<script src= "<?php echo get_stylesheet_directory_uri(); ?>/js/sub.js?v=<?php echo $ts;?>"> </script>
<script src= "<?php echo get_stylesheet_directory_uri(); ?>/js/ma-file.js?v=<?php echo $ts;?>"> </script>
<script src= "<?php echo get_stylesheet_directory_uri(); ?>/js/cnc-file.js?v=<?php echo $ts;?>"> </script>
<script src= "<?php echo get_stylesheet_directory_uri(); ?>/js/pi-file.js?v=<?php echo $ts;?>"> </script>

<script src= "<?php echo get_stylesheet_directory_uri(); ?>/js/3dprinting-xia.js?v=<?php echo $ts;?>"> </script>
<script src= "<?php echo get_stylesheet_directory_uri(); ?>/js/jquery.form.min.js?v=1.0.0"> </script>
<script src= "<?php echo get_stylesheet_directory_uri(); ?>/js/three.min.js?v=1.0.0"> </script>
<script src= "<?php echo get_stylesheet_directory_uri(); ?>/js/OrbitControls.js?v=1.0.0"> </script>
<script src= "<?php echo get_stylesheet_directory_uri(); ?>/js/STLLoader.js?v=1.0.0"> </script>
<script src= "<?php echo get_stylesheet_directory_uri(); ?>/js/STLView.js?v=1.0.0"> </script>
<script src= "<?php echo get_stylesheet_directory_uri(); ?>/js/quote.js?v=1.0.4"> </script>
<script src= "<?php echo get_stylesheet_directory_uri(); ?>/js/3dpath.js?v=<?php echo $ts;?>"> </script>


<!-- main-->
<?php require __DIR__ . '/template-part/mobile/upload3d.php'; ?>
<!-- main-->
<?php
$posts_material = get_posts(array(
  'post_type'      => 'materials',
  'posts_per_page' => -1,
  'orderby'        => 'menu_order',
  'order'          => 'ASC',
  'meta_key'       => 'show_on_shopping_page',
  'meta_value'     =>  1
));

if ( $posts_material ) {
  $amount = WC()->cart->get_cart_contents_count();

?>
<!--table head -->
<?php require __DIR__ . '/template-part/mobile/mahead.php'; ?>
<!--table head -->
<?php
  $count = 0;
  // custom temp code
  // main loop

  foreach ( $posts_material as $post ) {
	setup_postdata($post);
	$material_process = get_post_meta( $post->ID, 'process', 1 );
	$leadtime_text = get_post_meta( $post->ID, 'lead_time_text', 1 );
	$leadtime_text = str_replace("_DATE_",date("F jS"),$leadtime_text);
	$price              = get_post_meta( $post->ID, 'price', 1 );
	
	$color              = get_post_meta( $post->ID, 'color', 1 );
	$density              = get_post_meta( $post->ID, 'density', 1 );
	$accuracy           = get_post_meta( $post->ID, 'accuracy', 1 );
	$tolerance_time     = get_post_meta( $post->ID, 'tolerance_time', 1 );
	$estimated_delivery = get_post_meta( $post->ID, 'estimated_delivery', 1 );
	$time_rate          = get_post_meta( $post->ID, 'seven_days_time_rate', 1 );
	$painting           = get_post_meta( $post->ID, 'painting', 1 );
	$price_painting     = get_post_meta( $post->ID, 'price_painting', 1 );
	$silk_screen        = get_post_meta( $post->ID, 'silk_screen', 1 );
	$price_silk_screen  = get_post_meta( $post->ID, 'price_silk_screen', 1 );
	$material_properties  = get_post_meta( $post->ID, 'material_properties', 1 );
	$hardness  = get_post_meta( $post->ID, 'hardness', 1 );
	//$date_delivery      = date( 'F d', (current_time('timestamp') + $estimated_delivery * 3600) );
	$Unit_price          = get_post_meta( $post->ID, 'unit_price', 1 );

	// Price Formula fields
	$fixed_cofficient  = get_post_meta( $post->ID, 'fixed_cofficient', 1 );
	$weight_range_1  = get_post_meta( $post->ID, 'weight_range_1', 1 );
	$weight_range_2  = get_post_meta( $post->ID, 'weight_range_2', 1 );
	$cofficient_1_greater_weightrange  = get_post_meta( $post->ID, 'cofficient_1_greater_weightrange', 1 );
	$cofficient_weight_bw_range_1_and_2  = get_post_meta( $post->ID, 'cofficient_weight_bw_range_1_and_2', 1 );
	$cofficient_2_smaller_weightrange  = get_post_meta( $post->ID, 'cofficient_2_smaller_weightrange', 1 );
	$usdrmb_exchange_rate  = get_post_meta( $post->ID, 'usdrmb_exchange_rate', 1 );
	$floor_price  = get_post_meta( $post->ID, 'floor_price', 1 );
	// Price Formula fields

	$words = array('Strength:','Finish:','Working temperature:');
	if(strlen($material_properties) >0){
	  $properties_html = "";
	  $arr = explode(';',$material_properties);
	  for($i=0; $i<count($arr); $i++) {
		$val = explode(':',$arr[$i]);
		$val[1] = ucfirst(trim($val[1]));
		$properties_html .= '<span class="material_td_heading">'.$val[0].'</span>'.$val[1].'<br/>';
	  }
	}

	// Dynamic values for color and lead time selectboxes
	$color_options = get_post_meta( $post->ID, 'color_options', 1 );
	$lead_time_options = get_post_meta( $post->ID, 'lead_time_options', 1 );
	// Dynamic values for color and lead time selectboxes
	// 
	// 对太长的的title处理，省略
	$title = $post->post_title; 
	// var_dump($title);
	$abbreviated_title = "";
	$title_count = str_word_count($title);
	// var_dump($title_count);
	$title_array = str_word_count($title, 1 , "(,),/");
	// var_dump($title_array);
	if ($title_count >= 4) {
		for ($i=0; $i < 3; $i++) { 
			$abbreviated_title .= $title_array[$i] . ' ';
		}
		$abbreviated_title .= "...";
	} else {
		$abbreviated_title = $title;
	}
	 $one_type = get_field('public_type',$post->ID);
	
	 //var_dump($one_type);
?>
<!--ma-->
<?php require __DIR__ . '/template-part/mobile/ma.php'; ?>
<!--ma-->			
<?php
  wp_reset_postdata();
?>
<?php $count++; }  ?>
		</div>
		</div>

<?php 
$cnc_material = get_posts(array(
  'post_type'      => 'cnc-machined',
  'posts_per_page' => -1,
  'orderby'        => 'menu_order,post_date',
  'order'          => 'ASC',
));

?>
		<!-- CNC -->
		<?php require __DIR__ . '/template-part/mobile/cnchead.php'; ?>
		<!-- CNC -->
		
<?php 
$bcount = 0;
$list=[];
foreach ( $cnc_material as $cncpost ) {
	setup_postdata($cncpost);

    $material_process = get_post_meta( $cncpost->ID, 'process', 1 );
    $Unit_price          = get_post_meta( $cncpost->ID, 'unit_price', 1 );

	$full_name = get_post_meta( $cncpost->ID, 'full_name', 1 );
	$density = get_post_meta( $cncpost->ID, 'density', 1 );
	$lead_time_text = get_post_meta( $cncpost->ID, 'lead_time_text', 1 );
	$lead_time_text = str_replace("_DATE_",date("F jS"),$lead_time_text);
    $lead_time_options = get_post_meta( $cncpost->ID, 'lead_time_option', 1 );

	$surface_treatment = get_post_meta( $cncpost->ID, 'surface_treatment', 1 );
	$finishingcoating = get_post_meta( $cncpost->ID, 'finishingcoating', 1 );
	$logopartial_finishing = get_post_meta( $cncpost->ID, 'logopartial_finishing', 1 );
	$protective_coating = get_post_meta( $cncpost->ID, 'protective_coating', 1 );

	$two_type = get_field('public_type',$cncpost->ID);
	//var_dump($two_type);
?>
	<!-- CNC -->
		<?php require __DIR__ . '/template-part/mobile/cnc.php'; ?>
		<!-- CNC -->			
<?php
wp_reset_postdata(); $bcount++; }
?>
		</div>
		</div>
<?php 
$plastic_injection_material = get_posts(array(
  'post_type'      => 'plastic-injection',
  'posts_per_page' => -1,
  'orderby'        => 'menu_order,post_date',
  'order'          => 'ASC'
));
//var_dump($pi_material);
//var_dump(count($pi_material));
?>
	
	<!-- pi  -->
	<?php require __DIR__ . '/template-part/mobile/pihead.php'; ?>
	<!-- pi  -->
	
<?php 
$dcount = 0;
foreach ( $plastic_injection_material as $pipost ) {
	setup_postdata($pipost);

    $material_process = get_post_meta( $pipost->ID, 'process', 1 );
    $Unit_price          = get_post_meta( $pipost->ID, 'unit_price', 1 );

    $full_name = get_post_meta( $pipost->ID, 'full_name', 1 );
	$density = get_post_meta( $pipost->ID, 'density', 1 );
	$lead_time_text = get_post_meta( $pipost->ID, 'lead_time_text', 1 );
	$lead_time_text = str_replace("_DATE_",date("F jS"),$lead_time_text);
    $lead_time_options = get_post_meta( $pipost->ID, 'lead_time_option', 1 );

	$coefficient_1 = get_post_meta( $pipost->ID, 'coefficient_1', 1 );
	$coefficient_2 = get_post_meta( $pipost->ID, 'coefficient_2', 1 );
	$coefficient_3 = get_post_meta( $pipost->ID, 'coefficient_3', 1 );
	$coefficient_4 = get_post_meta( $pipost->ID, 'coefficient_4', 1 );
	//var_dump($coefficient_4);
   
	$surface_treatment = get_post_meta( $pipost->ID, 'surface_treatment', 1 );
	$finishingcoating = get_post_meta( $pipost->ID, 'finishingcoating', 1 );
	$logopartial_finishing = get_post_meta( $pipost->ID, 'logopartial_finishing', 1 );
	$protective_coating = get_post_meta( $pipost->ID, 'protective_coating', 1 );
	 

	 $three_type = get_field('public_type',$pipost->ID);
     //var_dump($three_type);
	
?>

<!-- pi  -->
<?php require __DIR__ . '/template-part/mobile/pi.php'; ?>
	<!-- pi  -->
			
<?php
wp_reset_postdata(); $dcount++; }
?>
		</div>
		</div>
	</figure>

<?php } ?>



	</div>
	<div style="height:50px" aria-hidden="true" class="wp-block-spacer" id="table-foot-block"></div>
	</div>
	</div>

	</div><!-- .entry-content .clear -->

	</main><!-- #main -->

</div>

<!--<div class="horizontal-screen-icon">-->
<!--    <img src="--><?php //echo get_stylesheet_directory_uri(); ?><!--/img/Portrait-3D-Printing-Icon3.png">-->
<!--</div>-->

<?php get_footer(); ?>


<!-- Dialog box  -->
<?php require __DIR__ . '/template-part/dialog.php'; ?>
<!-- Dialog box -->
