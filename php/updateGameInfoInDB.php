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
$clientid = $_POST["twitterAuth"];
$homeTeamName = $_POST["homeTeamName"];
$homeScore = $_POST["homeScore"];
$awayTeamName = $_POST["awayTeamName"];
$awayScore = $_POST["awayScore"];


// Check if gameid exists (determine insert or update.)
// Prepare succeeded.
if ($checkGameId = $mysqli->prepare("SELECT * FROM tweetScores WHERE `gameid` = ?")) {
    $checkGameId->bind_param('s', $gameid);
    $checkGameId->execute();
    $checkGameId->store_result();
    $doesGameIDExist = $checkGameId->num_rows;
    $checkGameId->close();
}

// Game doesn't exist. Create (insert).
if ($doesGameIDExist == 0) {
    // Prepare succeeded.
    if ($insert_row = $mysqli->prepare("INSERT INTO tweetScores(`gameid`, `clientid`, `homeTeamName`, `homeScore`, `awayTeamName`, `awayScore`) VALUES(?, ?, ?, ?, ?, ?)")) {
        $insert_row->bind_param('ssssss', $gameid, $clientid, $homeTeamName, $homeScore, $awayTeamName, $awayScore);
        $insert_row->execute();
        $insert_row->close();
    }

    if($insert_row){
        print $mysqli->insert_id;
    }else{
        die('Error : ('. $mysqli->errno .') '. $mysqli->error);
    }

// Game exists. Update.
} else {
    // Prepare succeeded.
    if ($update_row = $mysqli->prepare("UPDATE tweetScores SET `homeTeamName` = '$homeTeamName', `homeScore` = '$homeScore', `awayTeamName` = '$awayTeamName', `awayScore` = '$awayScore' WHERE `gameid` = ?")) {
        $update_row->bind_param('s', $gameid);
        $update_row->execute();
        $update_row->close();
    } // if prepare succeeded.
} // else

// Close connection.
$mysqli->close();

?>
