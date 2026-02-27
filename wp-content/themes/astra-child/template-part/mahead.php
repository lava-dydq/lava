<?php 
// one table head
?>
<div class="wp-container-62427cf911252a wp-block-group alignfull has-background" style="background-color:#efefef">
	<div class="custom-group-inner-container">
	<h2 class="has-text-align-center custom-upload-h2" style="text-transform: uppercase; font-weight: 600;">
		Pick Material, Process, Finish, Color...
	</h2>
	<div class="materials-select-outer-container">
	    <div class="materials-select-outer-container-header">
			<div class="order-alert-text">

                <div class="material-bottom-info-container">
                    <div class="material-bottom-info-total-price">
<!--                        <span class="material-bottom-info-total-price-label">Total Price: </span>-->
                        <span class="material-bottom-info-total-price-value"><?php echo WC()->cart->get_cart_subtotal(); ?></span>
                    </div>
                    <div class="material-bottom-info-cart">
                        <a href="/cart/">
                            <img class="cart-green" src="<?php echo get_stylesheet_directory_uri(); ?>/img/new-icon/shopping car2 未加购状态.png">
                            <img class="cart-gray" src="<?php echo get_stylesheet_directory_uri(); ?>/img/new-icon/shopping car2.png">
                        </a>
                    </div>
                </div>
				<!-- <div><i class="fa-solid fa-circle-exclamation"></i> The minimum order is US$50 (excluding freight).</div> -->
				<!-- <div style="color:red;"><i class="fa-solid fa-circle-exclamation"></i> CNC and Injection Molding are being tested and cannot be added to cart.</div> -->
			</div>
			<div class="full-screen-wrap">
				<span class="full-screen"><svg t="1674834683966" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2776" width="32" height="32"><path d="M1024 0 1024 384 885.728 245.728 673.728 457.728 566.272 350.272 778.272 138.272 640 0ZM245.728 138.272 457.728 350.272 350.272 457.728 138.272 245.728 0 384 0 0 384 0ZM885.728 778.272 1024 640 1024 1024 640 1024 778.272 885.728 566.272 673.728 673.728 566.272ZM457.728 673.728 245.728 885.728 384 1024 0 1024 0 640 138.272 778.272 350.272 566.272Z" fill="#8d3a56" p-id="2777"></path></svg></span>
				<span class="minimize-screen"><svg t="1674834794069" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3342" id="mx_n_1674834794069" width="32" height="32"><path d="M396.8 140.8c-12.8-4.266667-25.6-2.133333-34.133333 6.4l-76.8 76.8-128-125.866667c-17.066667-17.066667-42.666667-17.066667-59.733334 0-17.066667 17.066667-17.066667 42.666667 0 59.733334l125.866667 125.866666-76.8 76.8c-8.533333 8.533333-12.8 23.466667-6.4 34.133334 4.266667 12.8 17.066667 19.2 29.866667 19.2h213.333333c17.066667 0 32-14.933333 32-32V170.666667c0-12.8-8.533333-25.6-19.2-29.866667zM800 738.133333l76.8-76.8c8.533333-8.533333 12.8-23.466667 6.4-34.133333s-17.066667-19.2-29.866667-19.2H640c-17.066667 0-32 14.933333-32 32v213.333333c0 12.8 8.533333 25.6 19.2 29.866667 4.266667 2.133333 8.533333 2.133333 12.8 2.133333 8.533333 0 17.066667-4.266667 23.466667-8.533333l76.8-76.8 125.866666 125.866667c8.533333 8.533333 19.2 12.8 29.866667 12.8s21.333333-4.266667 29.866667-12.8c17.066667-17.066667 17.066667-42.666667 0-59.733334l-125.866667-128zM384 608H170.666667c-12.8 0-25.6 8.533333-29.866667 19.2-4.266667 12.8-2.133333 25.6 6.4 34.133333l76.8 76.8-125.866667 125.866667c-17.066667 17.066667-17.066667 42.666667 0 59.733333 8.533333 10.666667 19.2 14.933333 29.866667 14.933334s21.333333-4.266667 29.866667-12.8l125.866666-125.866667 76.8 76.8c6.4 6.4 14.933333 8.533333 23.466667 8.533333 4.266667 0 8.533333 0 12.8-2.133333 12.8-4.266667 19.2-17.066667 19.2-29.866667V640c0-17.066667-14.933333-32-32-32zM640 416h213.333333c12.8 0 25.6-8.533333 29.866667-19.2s2.133333-25.6-6.4-34.133333l-76.8-76.8 125.866667-125.866667c17.066667-17.066667 17.066667-42.666667 0-59.733333-17.066667-17.066667-42.666667-17.066667-59.733334 0l-125.866666 125.866666L663.466667 149.333333c-8.533333-8.533333-23.466667-12.8-34.133334-6.4-12.8 4.266667-19.2 17.066667-19.2 29.866667v213.333333c-2.133333 14.933333 12.8 29.866667 29.866667 29.866667z" fill="#8d3a56" p-id="3343"></path></svg></span>
			</div>
		</div>
	<figure class="wp-block-table is-style-stripes">
		<div class="printing-materials-select-outer-container" id="printing-container">
			<div class="our-service-name-wrap">
				<div class="our-service-name">
				<div style="display: flex;align-items: center;">	
				   <span class="printing-fa-angles-wrap fa-angles-wrap">
<!--				    <span class="open">-->
<!--				    <img src="--><?php //echo get_stylesheet_directory_uri(); ?><!--/img/icon/3dprint.png"></span>-->
				    <span>
				    <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/icon/3dprint_without_words.png"></span>
				    </span>
				    <span class="print_text">3d printing</span>
                </div>
				<span class="printing-fa-angles-wrap fa-angles-wrap">
				    <span class="open">
				    <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/printing_unfold.png"></span>
				    <span class="close">
				    <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/printing_fold.png"></span>
				</span>
				</div>
			</div>
		<div class="material-classification ma-one">
		    <div class="lr-title">All 3D PRINTING Meterial</div>
			<div class="lr-box">
				<div class="classification-le"></div>
				<div class="classification-ri"></div>
			</div>
		</div>
		<div class="materials-select-inner-container">
			<div class="material-box-head-name fix-head">
				<div class="custom-column-width-1 printing-column-swatch">Swatch<br>/Image</div>
				<div class="custom-column-width-1 icon-paixu iconfont printing-column-process">Process</div>
<!--				<div class="custom-column-width-2 material-box-head-properties material-item-overflow">-->
					<span class="material-part material-one icon-paixu iconfont printing-column-material">Material<br>/Part</span>
<!--					<span class="material-file-options-qty-wrap">-->
						<span class="select-color printing-column-color">Color</span>
						<span class="select-lead-time printing-column-lead_time">Leadtime</span>
						<span class="col-quantity printing-column-qty">Q'ty</span>
						<span class="uni-price printing-column-unit">Unit Price</span>
<!--                    </span>-->
<!--				</div>-->
				<!-- <th class="fixed-table-1">COLOR</th> -->
				<!-- <div class="custom-column-width-3 material-box-head-leadtime">Lead Time</div> -->
				<!-- <div class="ma-unit custom-column-width-3 material-box-head-price">Unit Price</div> -->
				<div class="custom-column-width-3 material-box-head-price icon-paixu iconfont printing-column-price">Price</div>
				<div class="custom-column-width-4 material-box-head-cart printing-column-cart">Cart</div>
				<div class="show-files-arrow-close-all"><span class="iconfont icon-zhedie"></span><span class="iconfont icon-zhankai"></span></div>
			</div>