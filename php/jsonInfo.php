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

// Prepare statement.
if ($getGameInfo = $mysqli->prepare("SELECT `gameid`, `homeTeamName`, `awayTeamName`, `homeScore`, `awayScore` FROM tweetScores WHERE `gameid` = ?")) {
    $getGameInfo->bind_param('s', $gameid);
    $getGameInfo->execute();
    $getGameInfo->bind_result($gameid, $homeTeamName, $awayTeamName, $homeScore, $awayScore);
    $getGameInfo->fetch();
    $getGameInfo->close();
}

// https://stackoverflow.com/a/3563464
$gameInfo[] = array(
    'homeTeamName' => $homeTeamName,
    'awayTeamName' => $awayTeamName,
    'homeScore' => $homeScore,
    'awayScore' => $awayScore
);

print json_encode($gameInfo);

// Close connection.
$mysqli->close();

?>
