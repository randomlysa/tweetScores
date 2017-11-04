<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// Get info from config.php.
require('config.php');

// Connect.
$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);

// Output any connection error.
if ($mysqli->connect_error) {
    die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
} else {
    print "Connected OK.";
}

$homeTeamName = $_POST["homeTeamName"];
$homeScore = $_POST["homeScore"];
$awayTeamName = $_POST["awayTeamName"];
$awayScore = $_POST["awayScore"];

$insert_row = $mysqli->query("INSERT INTO tweetScores(`homeTeamName`, `homeScore`, `awayTeamName`, `awayScore`) VALUES('$homeTeamName', '$homeScore', '$awayTeamName', '$awayScore')");

if($insert_row){
    print 'Success! ID of last inserted record is : ' .$mysqli->insert_id .'<br />';
}else{
    die('Error : ('. $mysqli->errno .') '. $mysqli->error);
}

// Close connection.
$mysqli->close();

?>
