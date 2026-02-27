<?php  ?>
<div id="alertToUploadFile" class="modal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div>
				<strong style="color: orange;">Sorry!</strong> You haven't upload any part yet,<br>Please<a href="javascript:void(0);" id="uploadCADFile" style="text-decoration: underline"> click</a> to upload CAD files(.stl only) first!<br>Or refresh the page if you have part uploaded.
			</div>
			<div class="close-modal"><svg t="1631676930327" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4580" width="20" height="20"><path d="M608 518.4l112 112c25.6 25.6 25.6 64 0 89.6-25.6 25.6-64 25.6-89.6 0L515.2 608l-112 112c-25.6 25.6-64 25.6-89.6 0-25.6-25.6-25.6-64 0-89.6l112-112-112-112c-25.6-22.4-25.6-64 0-89.6 25.6-25.6 64-25.6 89.6 0l112 112 112-112c25.6-25.6 64-25.6 89.6 0 25.6 25.6 25.6 64 0 89.6L608 518.4zM512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m0-64c246.4 0 448-201.6 448-448S758.4 64 512 64 64 265.6 64 512s201.6 448 448 448z" p-id="4581"></path></svg></div>
		</div>
	</div>
</div>
<!-- End of dialog box -->

<!-- Modal -->
<div id="emptyCart" class="emptycart">
	<div class="emptycart-modal-dialog">
		<div class="emptycart-modal-content">
			<div class="emptycart-modal-body">
				<p>Do you want to delete all the items in your cart?</p>
			</div>
			<div class="emptycart-modal-footer"> 
				<button type="button" class="yes-btn btn btn-default" data-dismiss="modal">Yes</button>
				<button type="button" class="no-btn btn btn-default" data-dismiss="modal">No</button>
			</div>
		</div>
	</div>
</div>
<!-- Modal -->

<!-- Modal -->
<div id="exception-prompt" class="exception-prompt">
	<div class="exception-prompt-modal-dialog">
		<div class="exception-prompt-modal-content">
			<div class="exception-prompt-modal-body">
				<div>Your Email (Required): <input type="text" name="prompt-email"></div>
				<div>Message (Optional): <textarea name="prompt-message" rows="3" cols="30"></textarea></div>
			</div>
			<div class="exception-prompt-modal-footer"> 
				<div class="prompt-cancel-btn" >Cancel</div>
				<div class="prompt-confirm-btn" data-filename="" data-file_unit="" data-material_id="" data-quantity="" data-price="" data-manual="">Submit</div>
			</div>
		</div>
	</div>
</div>
<style>
	.exception-prompt{
		display: none;
	}
	.exception-prompt-modal-dialog{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}
	.exception-prompt-modal-content{
		background: #fff;
		padding: 50px;
	}
	.exception-prompt-modal-body{
		margin-bottom: 20px;
	}
	.exception-prompt-modal-footer{
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	input[name="prompt-email"]{
		border: 1px solid #aaa;
	}
	input[name="prompt-email"]:focus{
		border: 1px solid #aaa;
	}
	textarea[name="prompt-message"]{
		border: 1px solid #aaa;
	}
	textarea[name="prompt-message"]:focus{
		border: 1px solid #aaa;
	}
	.prompt-cancel-btn{
		padding: 5px 30px;
		background: #ddd;
		cursor: pointer;
	}
	.prompt-confirm-btn{
		padding: 5px 30px;
		background: #006600;
		color: #ffffff;
		cursor: pointer;
	}
</style>
<!-- Modal -->