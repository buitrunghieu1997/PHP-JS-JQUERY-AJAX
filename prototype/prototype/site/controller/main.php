<?php 
	date_default_timezone_set("Asia/Bangkok");
	$url = $_POST['url'];
	$ch = curl_init($url); 
  	curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION ,1);
	if(curl_exec($ch)){
		$subarr = array (
			"time_req" => date('Y-m-d H:i:s'), 
			"time_res" => curl_getinfo($ch)['total_time'], 
			"time_nu" => curl_getinfo($ch, CURLINFO_NAMELOOKUP_TIME), 
			"time_con" => curl_getinfo($ch, CURLINFO_CONNECT_TIME ), 
			"time_pt" => curl_getinfo($ch, CURLINFO_PRETRANSFER_TIME ), 
			"time_st" => curl_getinfo($ch, CURLINFO_STARTTRANSFER_TIME ), 
			"time_re" => curl_getinfo($ch, CURLINFO_REDIRECT_TIME )
		);
	} else {
		$subarr = array (
			"time_req" => date('Y-m-d H:i:s'), 
			"time_res" => 0, 
			"time_nu" => 0, 
			"time_con" => 0, 
			"time_pt" => 0, 
			"time_st" => 0, 
			"time_re" => 0
		);
	}
	echo json_encode($subarr);
  	curl_close($ch);
?>