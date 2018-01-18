<?php
	if ($_POST) {
	$name=$_POST['name'];
	$email=$_POST['email'];
	$message=$_POST['message'];
	if (($name=="")||($email=="")||($message==""))
		{
		echo "Please fill <a href=\"\">it all out</a> so I can get in touch with you!";
		}
	else{		
		$from="From: $name<$email>\r\nReturn-path: $email";
		$subject="Hot Springs Handbook Contact Form Message";
		mail("michael@hotspringshandbook.com", $subject, $message, $from);
		}
	}
?>