<?php

// Include library.
require "twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

// Key, secret, callback.
require("config.php");

// Start session.
session_start();
$request_token = [];
$request_token['oauth_token'] = $_SESSION['oauth_token'];
$request_token['oauth_token_secret'] = $_SESSION['oauth_token_secret'];

if (isset($_REQUEST['oauth_token']) && $request_token['oauth_token'] !== $_REQUEST['oauth_token']) {
    // Abort! Something is wrong.
    print "SOMETHING IS WRONG";
}

// Now we make a TwitterOAuth instance with the temporary request token.
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $request_token['oauth_token'], $request_token['oauth_token_secret']);

// At this point we will use the temporary request token to get the long lived access_token that authorized to act as the user.
$access_token = $connection->oauth("oauth/access_token", ["oauth_verifier" => $_REQUEST['oauth_verifier']]);

// Save access_token['oauth_token'] and access_token['oauth_token_secret']
print $access_token['oauth_token'];
print "<br>";
print $access_token['oauth_token_secret'];
?>