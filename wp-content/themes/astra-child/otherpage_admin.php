<?php
/**
 * Template Name: Other Page Admin
 */
$admin_url=admin_url( 'admin-ajax.php' );
$upload_dir = wp_upload_dir();
$uploads_dir_name = $upload_dir['basedir'] . '/other_file/';
$uploads_url_name = $upload_dir['baseurl'] . '/other_file/';
$files = arraysort(printdirgetfiles($uploads_dir_name));
$i = 1;
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>管理后台</title>
	<script src= "<?php echo get_stylesheet_directory_uri(); ?>/js/jquery-3.1.1.min.js?v=1.0.0"> </script>
	<style type="text/css">
        .container{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .delete_file{
        	cursor: pointer;
        }
	</style>
</head>

<body>
	<div class="container">
	<!-- <h1>登陆</h1>
	<form>
		<div>
			<label>用户名：</label>
			<input type="text" name="username">
		</div>
		<div>
			<label>密码：</label>
			<input type="text" name="password">
		</div>
		<button type="submit" class="">登录</button>
	</form> -->

		<h1>文件上传</h1>
		<form id="other_form" method="post" enctype="multipart/form-data" class="other-form">
			<input type="file" class="other_file_upload" name="other_file" multiple="" accept="*" >
		</form>
		<br>
		<button onclick="js_upload();"   type="button" class="btn">确定上传</button>
		<br>
		<br>
		<br>
		<h1>文件列表</h1>
		<div>
            <table>
                <tbody>
                    <?php foreach ($files as $time => $file): ?>
                    <tr class="flie-list">
                        <td class="stl_count"><b><?php echo $i; ?>.</b></td>
                        <td class="stl_product"><b><?php echo $file; ?></b></td>
                        <td class="stl_upload_time" style="padding: 0 20px;"><b><?php echo $time; ?></b></td>
                        <td class="delete_file" data-file="<?php echo $file; ?>">删除</td>
                    </tr>
                    <?php $i++; ?>
                    <?php endforeach ?>
                </tbody>
            </table>
        </div>
	</div>
</body>
</html>
<script type="text/javascript">
	var ajaxurl = "<?php echo admin_url('admin-ajax.php'); ?>";//wp异步全部都提交到这里
	console.log('ajaxurl', ajaxurl);
    function js_upload(){
        var formData = new FormData(document.getElementById("other_form"));
        formData.append('action','upload_other_file');//wp必须设置这个,才能把参数传递给php_upload函数
        $.ajax({
            type:'post',
            url:ajaxurl,
            data:formData,
            processData: false,
            contentType: false,
            success:function(result){
            	var data = JSON.parse(result);
            	console.log('data', data);
            	if (data.error == '') {
            		alert("成功");
            		window.location.reload();
            	} else {
            		alert("失败");
            	}
            	
            },
            error:function(data){
            	alert("失败");
            }
        })
    }
    $('.delete_file').on('click', function() {
		var obj = jQuery(this);
		var filename = jQuery(this).attr('data-file');
		console.log('filename', filename);
		jQuery.post(
			ajaxurl, {
				'action': 'delete_other_file',
				'file_name': filename,
			},
			function(res) {
				var res = JSON.parse(res);
				console.log('res', res);
				if (res == 1) {
					obj.closest('.flie-list').remove();
				} else {
					alert('Delete failed, please try again!')
				}
			}
		);
	});
</script>