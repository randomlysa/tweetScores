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

$getTokenSecret = $mysqli->query("SELECT * FROM `tweetClients` WHERE `clientid` = '$clientid'");
if(!$getTokenSecret){
    die('Error : ('. $mysqli->errno .') '. $mysqli->error);
}

while ($row = $getTokenSecret->fetch_assoc()) {
    $oauth_token  = $row['oauth_token'];
    $token_secret = $row['oauth_token_secret'];
}

$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $oauth_token, $token_secret);

$newTweet = $_POST["newTweet"];

if ($newTweet) {
    $statues = $connection->post("statuses/update", ["status" => $newTweet]);
} else {
    print "Nothing to post.";
}

?>
