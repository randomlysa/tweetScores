<?php
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

$gameid = $_GET["gameid"];

$getGameInfo = $mysqli->query("SELECT `gameid`, `homeTeamName`, `awayTeamName`, `homeScore`, `awayScore` FROM tweetScores WHERE `gameid` = '$gameid'");
$gameInfo = array();

// https://stackoverflow.com/a/3563464
while ($row = $getGameInfo->fetch_assoc()) {
    $gameInfo[] = array(
        'homeTeamName' => $row['homeTeamName'],
        'awayTeamName' => $row['awayTeamName'],
        'homeScore' => $row['homeScore'],
        'awayScore' => $row['awayScore']
    );
}

print json_encode($gameInfo);

// Close connection.
$mysqli->close();

?>
