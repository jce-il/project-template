<?php
	if(isset($_POST["Latitude"]) && isset($_POST["Longitude"]) && isset($_POST["Timestamp"]))
	{
		$param1=$_POST["Latitude"];
		$param2=$_POST["Longitude"];
		$param3=$_POST["Timestamp"];
		echo "Latitude is: ". $param1;
		echo " Longitude is: ". $param2;
		echo " Timestamp is: ". $param3;
	}
?>

