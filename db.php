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
    // print "Connected OK.";
}

$gameid = $_POST["gameid"];
$homeTeamName = $_POST["homeTeamName"];
$homeScore = $_POST["homeScore"];
$awayTeamName = $_POST["awayTeamName"];
$awayScore = $_POST["awayScore"];

// Check if gameid exists (determine insert or update.)
$checkGameId = $mysqli->query("SELECT * FROM tweetScores WHERE `gameid` = $gameid");
$doesGameIDExist = $checkGameId->num_rows;

if ($doesGameIDExist == 0) {
    $insert_row = $mysqli->query("INSERT INTO tweetScores(`gameid`, `homeTeamName`, `homeScore`, `awayTeamName`, `awayScore`) VALUES('$gameid', '$homeTeamName', '$homeScore', '$awayTeamName', '$awayScore')");

    if($insert_row){
        print $mysqli->insert_id;
    }else{
        die('Error : ('. $mysqli->errno .') '. $mysqli->error);
    }
} else {
    $update_row = $mysqli->query("UPDATE tweetScores SET `homeTeamName` = '$homeTeamName', `homeScore` = '$homeScore', `awayTeamName` = '$awayTeamName', `awayScore` = '$awayScore' WHERE `gameid` = $gameid");
}

// Close connection.
$mysqli->close();

?>
