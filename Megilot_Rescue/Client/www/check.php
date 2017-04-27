<?php
	$username = $_POST['user'];
	$password = $_POST['pass'];

	$username = stripcslashes($username);
	$password = stripcslashes($password);
	
	$con = mysqli_connect("localhost", "root", "123456","megilot/users");
	
	$username = mysqli_real_escape_string($con, $username);
	$password = mysqli_real_escape_string($con, $password);
		
	mysqli_select_db($con, "users");
	
	$result = mysqli_query($con, "select * from users where username = '$username' and password = '$password'") 
				or die("Failed to query database".mysqli_error($con));
	$row = mysqli_fetch_array($result);
	if($row['username'] == $username && $row['password'] == $password)
	{
		echo "Login succesfull! Welcome ".$row['username'];
	}
	else
	{
		echo "Failed to login!";
	}
?>