<?php
/**
 * Template Name: Other Page Download
 */
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
	<title>文件下载</title>
    <style type="text/css">
        .container{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    </style>
</head>
<body>
    <div class="container">
    	<h1>文件下载</h1>
    	<div>
            <table>
                <tbody>
                    <?php foreach ($files as $time => $file): ?>
                    <tr>
                        <td class="stl_count"><b><?php echo $i; ?>.</b></td>
                        <td class="stl_product"><b><?php echo $file; ?></b></td>
                        <td class="stl_upload_time" style="padding: 0 20px;"><b><?php echo $time; ?></b></td>
                        <td class="stl_file"><a href="<?php echo $uploads_url_name.'/'.$file; ?>">下载</a></td>
                    </tr>
                    <?php $i++; ?>
                    <?php endforeach ?>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>