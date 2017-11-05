<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// Include library.
require "twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

// Key, secret, callback.
require("config.php");

// $oauth_token = '';
// $token_secret = '';

$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $oauth_token, $token_secret);

$newTweet = $_POST["newTweet"];

if ($newTweet) {
    $statues = $connection->post("statuses/update", ["status" => $newTweet]);
} else {
    print "Nothing to post.";
}

?>
