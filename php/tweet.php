<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// Include library.
require "./twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

// Key, secret, callback.
require("config.php");

$clientid = $_GET["clientid"];

// Connect.
$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DBNAME);

// Output any connection error.
if ($mysqli->connect_error) {
    die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
} else {
    // print "Connected OK.";
}

if ($getTokenSecret = $mysqli->prepare("SELECT `oauth_token`, `oauth_token_secret` FROM `tweetClients` WHERE `clientid` = ?")) {
    $getTokenSecret->bind_param('s', $clientid);
    $getTokenSecret->execute();
    $getTokenSecret->bind_result($oauth_token, $token_secret);
    $getTokenSecret->fetch();
    $getTokenSecret->close();
}
if(!$getTokenSecret){
    die('Error : ('. $mysqli->errno .') '. $mysqli->error);
}

$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $oauth_token, $token_secret);

$newTweet = $_POST["newTweet"];

if ($newTweet) {
    $statues = $connection->post("statuses/update", ["status" => $newTweet]);
    $results = array('result' => 'success', 'tweet' => $newTweet);
} else {
    $results = array('result' => 'fail', 'tweet' => $newTweet);
}

print json_encode($results);
?>
