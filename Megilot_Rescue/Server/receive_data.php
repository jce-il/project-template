<?php
header('Access-Control-Allow-Origin: *');

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dberror1 = "Could not connect to the database";
$dberror2 = "Could not select databse";
$database = "megilot_database";

$conn = mysqli_connect($dbhost,$dbuser,$dbpass,$database) or die($dberror1);

if(isset($_POST["Latitude"]) && isset($_POST["Longitude"]))
	{
		$param1=$_POST["Latitude"];
		$param2=$_POST["Longitude"];
		
		$query = "INSERT INTO coordinates (latitude, longitude)
				VALUES ($param1, $param2)";
				
		if($fetch_sql_query = mysqli_query($conn,$query))
		{
			echo 'good job';
		}
		else
		{
			echo 'balls';
		}
	}











?>