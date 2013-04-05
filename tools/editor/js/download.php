<?php
//echo '<script type="text/javascript">console.log("TROLOLOLOLO FROM PHP!!!");</script>';

if(empty($_POST['filename']) || empty($_POST['content'])){
    echo '<script type="text/javascript">console.log("|'.$_POST['filename'].'|'.$_POST['content'].'|");</script>';
    echo '<script type="text/javascript">console.log("EXIT!!!");</script>';
	exit;
}
//echo '<script type="text/javascript">console.log("|'.$_POST['filename'].'GOGOGO!!!'.$_POST['content'].'|");</script>';

$filename = preg_replace('/[^a-z0-9\-\_\.]/i','',$_POST['filename']);

header("Cache-Control: ");
header("Content-type: text/plain");
//header("Content-type: application/octet-stream");
header('Content-Disposition: attachment; filename="'.$filename.'"');

echo $_POST['content'];

?>