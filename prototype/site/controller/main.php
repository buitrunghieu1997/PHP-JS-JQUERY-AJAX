<?php 
	date_default_timezone_set("Asia/Bangkok");
	$url = $_POST['url'];
	$ch = curl_init($url); 
  	curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
	if(curl_exec($ch)){
		$subarr = array ("time_req" => date('Y-m-d H:i:s'), "time_res" => curl_getinfo($ch)['total_time']);
	} else {
		$subarr = array ("time_req" => date('Y-m-d H:i:s'), "time_res" => 0);
	}
	echo json_encode($subarr);
  	curl_close($ch);
?>