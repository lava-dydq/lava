<?php
// uploads 3d model
?>
<div id="primary" class="content-area primary">
<main id="main" class="site-main">

	<div class="entry-content clear" itemprop="text">

	<div style="height:50px" aria-hidden="true" class="wp-block-spacer"></div>

	<h1 class="has-text-align-center custom-upload-h1" style="font-style:normal;font-weight:600;text-transform:uppercase;letter-spacing:7px">Upload 3D Files To Get Prices Instantly</h1>

	<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>

	<!--拖拽上传区域-->
	<div id="drop" class="dropBox_wrap">
		<div id="dropbox" class="drop">
			<div class="wp-container-62284d512364f wp-block-buttons">
			<p class="drop-upload-placehoder">UPLOAD FILES TO GET PRICES</p>
			<p class="drop-upload-note"><span style="font-weight: 700;">.stp .step .stl supported</span></p>
				<div class="wp-block-button has-custom-font-size has-small-font-size upload-3d-model">
					<i class="fa-solid fa-cloud-upload-alt"></i>UPLOAD 3D MODEL
				</div>
			</div>
		</div>
	</div>
	<div class="file-model-container">
		<div class="wp-block-columns has-background" style="background-color:#eeeeee;">
			<div class="wp-box wp-block-column has-white-background-color has-background" style="margin-right:2%">
				<div id="files_wrap" class="flies-cover has-white-background-color">
				</div>

				<div class="upload-btn-clear-btn-container">
					<form method="post" enctype="multipart/form-data" class="clearfix form_files shopping_addmore">
						<input type="file" class="files_stl" name="files_stl[]" multiple="" accept=".stl,.stp,.step" >
						<?php wp_nonce_field( 'upload_stl_file' ); ?>
						<input type="hidden" name="action" value="upload_stl_file">
					</form>
					<div class="upload-btn-file-info-contianer">
						<div class="upload-btn-wrap">
							<div class="format-support">.stp .step .stl supported</div>
							<div class="wp-block-button has-custom-font-size has-small-font-size button-fill upload-button">
								<i class="fa-solid fa-cloud-upload-alt"></i>UPLOAD MODEL
							</div>
						</div>
						<div class="file-info-wrap">
							<div class="file-info-dimensions-wrap">
								<label class="file-info-label">Dimensions: </label><span class="file-info-dimensions">0*0*0</span><span class="file-info-unit">mm</span>
							</div>
							<div class="file-info-volume-wrap">
								<label class="file-info-label">Volume: </label><span class="file-info-volume">0</span><span class="file-info-unit">mm<sup>3</sup></span>
							</div>
							<div class="file-info-surface-wrap">
								<label class="file-info-label">Surface: </label><span class="file-info-surface">0</span><span class="file-info-unit">mm<sup>2</sup></span>
							</div>
						</div>
					</div>
					<div class="clear-all-file-unit-container">
						<div class="button-outline has-small-font-size clear-all-button">
                            <i class="fa-sharp fa-solid fa-trash"></i>
							CLEAR ALL
						</div>
						<div class="file-unit-wrap">
							<form class="file-unit-option">
								<label class="file-unit-label checked"><input type="radio" name="file_unit" value="mm" checked="checked"><span class="file-unit">mm</span><i></i></label>
								<label class="file-unit-label"><input type="radio" name="file_unit" value="inch"><span class="file-unit">inch</span><i></i></label>
							</form>
						</div>
					</div>
				</div>
			</div>

			<div class="wp-block-column wp-patch" style="flex-basis:63%">
				<!-- <div class="wp-block-cover has-white-background-color has-background-dim">
					<div class="wp-block-cover__inner-container">
						<p class="has-text-align-center has-large-font-size"></p>
					</div>
				</div> -->
				<div id="model-show-container" class="wp-block-cover has-white-background-color" style="min-height:400px;height: 100%;position: relative;">
					<!-- <div class="file-preview-text">FILE PREVIEW</div> -->
					<div class="wp-block-cover__inner-container preview-info">
						<div class="file-preview-text">FILE PREVIEW</div>
						<div id="progress" class="printingpage_progressbar">
							<div class="progress_sitelogo">
								<div id="bar"></div>
								<div id="percent">100%</div>
							</div>
						</div>
					</div>
					<div id="viewer"></div>
				</div>
			</div>
		</div>
	</div>